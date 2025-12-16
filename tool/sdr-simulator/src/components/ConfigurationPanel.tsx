import React from 'react';
import { DeviceState, DEFAULT_DEVICE_STATES } from '../models/DeviceStateModel';
import { NETWORK_PROFILES } from '../models/NetworkDelayModel';

interface ConfigurationPanelProps {
    deviceState: DeviceState;
    setDeviceState: (state: DeviceState) => void;
    networkProfileName: string;
    setNetworkProfileName: (name: string) => void;
    sampleSize: number;
    setSampleSize: (size: number) => void;
    onRunSimulation: () => void;
    isSimulating: boolean;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
    deviceState,
    setDeviceState,
    networkProfileName,
    setNetworkProfileName,
    sampleSize,
    setSampleSize,
    onRunSimulation,
    isSimulating
}) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Simulation Configuration</h2>

            <div className="space-y-4">
                {/* Device State Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Device State</label>
                    <select
                        value={deviceState}
                        onChange={(e) => setDeviceState(e.target.value as DeviceState)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        {Object.values(DeviceState).map((state) => (
                            <option key={state} value={state}>
                                {state.charAt(0).toUpperCase() + state.slice(1)}
                                {DEFAULT_DEVICE_STATES[state].receipt_enabled ? '' : ' (No Receipts)'}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Affects processing delay and receipt probability.
                    </p>
                </div>

                {/* Network Profile Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Network Conditions</label>
                    <select
                        value={networkProfileName}
                        onChange={(e) => setNetworkProfileName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                        {Object.keys(NETWORK_PROFILES).map((key) => (
                            <option key={key} value={key}>
                                {NETWORK_PROFILES[key].name}
                            </option>
                        ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Simulates network latency, jitter, and tail events.
                    </p>
                </div>

                {/* Sample Size Slider */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sample Size: <span className="font-bold">{sampleSize}</span>
                    </label>
                    <input
                        type="range"
                        min="10"
                        max="5000"
                        step="10"
                        value={sampleSize}
                        onChange={(e) => setSampleSize(parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Run Button */}
                <button
                    onClick={onRunSimulation}
                    disabled={isSimulating}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${isSimulating
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isSimulating ? 'Simulating...' : 'Run Simulation'}
                </button>
            </div>
        </div>
    );
};
