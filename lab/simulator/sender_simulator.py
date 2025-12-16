"""
Sender Simulator

Collects RTT samples from the Receipt Generator.
"""

import time
from typing import List, Optional


class RTTSample:
    """
    Represents a single RTT observation.
    """

    def __init__(self, index: int, timestamp: float, rtt_ms: Optional[float]):
        self.index = index
        self.timestamp = timestamp
        self.rtt_ms = rtt_ms

    def to_dict(self) -> dict:
        return {
            "index": self.index,
            "timestamp": self.timestamp,
            "rtt_ms": self.rtt_ms,
        }


class SenderSimulator:
    """
    Generates delivery events and records RTT samples.
    """

    def __init__(self, receipt_generator):
        self.receipt_generator = receipt_generator
        self.samples: List[RTTSample] = []

    def collect_samples(
        self,
        device_state,
        num_samples: int,
        interval_sec: float = 1.0,
    ) -> List[RTTSample]:
        """
        Collects RTT samples at a fixed interval.
        """

        self.samples.clear()

        for i in range(num_samples):
            timestamp = time.time()
            rtt = self.receipt_generator.generate_receipt(device_state)

            sample = RTTSample(
                index=i,
                timestamp=timestamp,
                rtt_ms=rtt,
            )
            self.samples.append(sample)

            time.sleep(interval_sec)

        return self.samples