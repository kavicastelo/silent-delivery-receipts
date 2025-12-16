import { useState, useCallback } from 'react';
import { DeviceState, DeviceStateModel, DEFAULT_DEVICE_STATES } from './models/DeviceStateModel';
import { NetworkDelayModel, NETWORK_PROFILES } from './models/NetworkDelayModel';
import { ReceiptGenerator } from './models/ReceiptGenerator';
import { ConfigurationPanel } from './components/ConfigurationPanel';
import { ResultsDisplay } from './components/ResultsDisplay';

function App() {
  // State
  const [deviceState, setDeviceState] = useState<DeviceState>(DeviceState.ACTIVE);
  const [networkProfileName, setNetworkProfileName] = useState<string>("IDEAL");
  const [sampleSize, setSampleSize] = useState<number>(100);
  const [results, setResults] = useState<{ rtt: number }[]>([]);
  const [lostCount, setLostCount] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationSentCount, setSimulationSentCount] = useState<number>(0);

  const runSimulation = useCallback(async () => {
    setIsSimulating(true);

    // Allow UI to update before heavy calculation (though 5000 is fast)
    await new Promise(resolve => setTimeout(resolve, 50));

    try {
      // 1. Setup Models
      const deviceProfile = DEFAULT_DEVICE_STATES[deviceState];
      const deviceModel = new DeviceStateModel({
        [deviceState]: deviceProfile,
        ...DEFAULT_DEVICE_STATES // Pass all just in case, though we only look up current
      });

      const networkProfile = NETWORK_PROFILES[networkProfileName];
      const networkModel = new NetworkDelayModel(networkProfile);

      const generator = new ReceiptGenerator(deviceModel, networkModel);

      // 2. Run Simulation Loop
      const newResults: { rtt: number }[] = [];
      let newLostCount = 0;

      for (let i = 0; i < sampleSize; i++) {
        const rtt = generator.generate_receipt(deviceState);
        if (rtt !== null) {
          newResults.push({ rtt });
        } else {
          newLostCount++;
        }
      }

      setResults(newResults);
      setLostCount(newLostCount);
      setSimulationSentCount(sampleSize);

    } catch (error) {
      console.error("Simulation error:", error);
      alert("An error occurred during simulation.");
    } finally {
      setIsSimulating(false);
    }
  }, [deviceState, networkProfileName, sampleSize]);

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Educational SDR Simulator</h1>
        <p className="text-gray-600 mt-2">
          Experiment with how device states and network conditions affect Silent Delivery Receipts.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Configuration */}
        <div className="lg:col-span-1">
          <ConfigurationPanel
            deviceState={deviceState}
            setDeviceState={setDeviceState}
            networkProfileName={networkProfileName}
            setNetworkProfileName={setNetworkProfileName}
            sampleSize={sampleSize}
            setSampleSize={setSampleSize}
            onRunSimulation={runSimulation}
            isSimulating={isSimulating}
          />

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">How it works</h3>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li><strong>Device Delay:</strong> Processing time on the client. "Dozing" adds significant jitter.</li>
              <li><strong>Network Delay:</strong> Round-trip latency. "Poor Network" adds tail latency.</li>
              <li><strong>RTT:</strong> Total time = Device Delay + Network Forward + Network Return.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-2">
          <ResultsDisplay
            results={results}
            lostCount={lostCount}
            totalSent={simulationSentCount}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
