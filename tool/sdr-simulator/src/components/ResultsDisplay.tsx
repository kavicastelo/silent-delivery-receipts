import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface SimulationResult {
    rtt: number;
}

interface ResultsDisplayProps {
    results: SimulationResult[];
    lostCount: number;
    totalSent: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, lostCount, totalSent }) => {
    if (totalSent === 0) {
        return (
            <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300 text-center h-full flex items-center justify-center">
                <p className="text-gray-500">Run a simulation to see results.</p>
            </div>
        );
    }

    // Calculate statistics
    const rtts = results.map(r => r.rtt).sort((a, b) => a - b);
    const min = rtts.length > 0 ? rtts[0] : 0;
    const max = rtts.length > 0 ? rtts[rtts.length - 1] : 0;
    const avg = rtts.length > 0 ? rtts.reduce((a, b) => a + b, 0) / rtts.length : 0;


    const p95 = rtts.length > 0 ? rtts[Math.floor(rtts.length * 0.95)] : 0;
    const p99 = rtts.length > 0 ? rtts[Math.floor(rtts.length * 0.99)] : 0;

    // Prepare histogram data
    const binCount = 20;
    const range = max - min || 10; // Avoid potential div by zero
    const binSize = range / binCount;

    const bins = Array.from({ length: binCount }, (_, i) => ({
        binStart: min + i * binSize,
        binEnd: min + (i + 1) * binSize,
        count: 0
    }));

    rtts.forEach(val => {
        const binIndex = Math.min(
            Math.floor((val - min) / binSize),
            binCount - 1
        );
        if (binIndex >= 0) bins[binIndex].count++;
    });

    const chartData = bins.map(b => ({
        name: `${Math.round(b.binStart)}-${Math.round(b.binEnd)}`,
        count: b.count,
        range: [b.binStart, b.binEnd]
    }));

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Simulation Results</h2>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 uppercase font-bold">Delivery Rate</p>
                    <p className="text-lg font-bold text-blue-700">
                        {totalSent > 0 ? ((results.length / totalSent) * 100).toFixed(1) : 0}%
                    </p>
                    <p className="text-xs text-gray-500">({results.length}/{totalSent} - Lost: {lostCount})</p>
                </div>
                <div className="bg-green-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 uppercase font-bold">Avg RTT</p>
                    <p className="text-lg font-bold text-green-700">{avg.toFixed(1)} ms</p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 uppercase font-bold">P95 RTT</p>
                    <p className="text-lg font-bold text-yellow-700">{p95.toFixed(1)} ms</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-md">
                    <p className="text-xs text-gray-500 uppercase font-bold">P99 RTT</p>
                    <p className="text-lg font-bold text-purple-700">{p99.toFixed(1)} ms</p>
                </div>
            </div>

            {/* Histogram */}
            <div className="h-64 w-full">
                <p className="text-sm font-medium text-gray-700 mb-2">RTT Distribution</p>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            interval={Math.ceil(binCount / 5)} // show fewer ticks
                        />
                        <YAxis />
                        <Tooltip
                            formatter={(value) => [value, "Count"]}
                            labelFormatter={(label) => `Range: ${label} ms`}
                        />
                        <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 text-sm text-gray-500">
                <p>Min: {min.toFixed(1)} ms | Max: {max.toFixed(1)} ms</p>
            </div>
        </div>
    );
};
