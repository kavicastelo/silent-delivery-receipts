"""
Network Delay Model

Simulates network-induced latency and jitter for delivery receipts.
This module does NOT perform any networking.
"""

import random
import math


class NetworkProfile:
    """
    Defines parameters for a simulated network type.
    """

    def __init__(
        self,
        name: str,
        base_latency_ms: float,
        jitter_std_ms: float,
        tail_probability: float = 0.0,
        tail_scale_ms: float = 0.0,
    ):
        self.name = name
        self.base_latency_ms = base_latency_ms
        self.jitter_std_ms = jitter_std_ms
        self.tail_probability = tail_probability
        self.tail_scale_ms = tail_scale_ms


class NetworkDelayModel:
    """
    Generates network delay values based on a selected NetworkProfile.
    """

    def __init__(self, profile: NetworkProfile, seed: int | None = None):
        self.profile = profile
        if seed is not None:
            random.seed(seed)

    def sample_delay(self) -> float:
        """
        Returns a simulated network delay in milliseconds.
        """

        # Base latency
        delay = self.profile.base_latency_ms

        # Jitter (Gaussian, clamped to zero)
        jitter = random.gauss(0, self.profile.jitter_std_ms)
        delay += max(0.0, jitter)

        # Tail latency event (optional)
        if random.random() < self.profile.tail_probability:
            tail_delay = random.expovariate(1 / self.profile.tail_scale_ms)
            delay += tail_delay

        return delay


# Predefined network profiles (safe defaults)

WIFI = NetworkProfile(
    name="WiFi",
    base_latency_ms=20,
    jitter_std_ms=5,
    tail_probability=0.01,
    tail_scale_ms=50,
)

CELLULAR = NetworkProfile(
    name="Cellular",
    base_latency_ms=60,
    jitter_std_ms=20,
    tail_probability=0.05,
    tail_scale_ms=120,
)

POOR_NETWORK = NetworkProfile(
    name="PoorNetwork",
    base_latency_ms=120,
    jitter_std_ms=50,
    tail_probability=0.1,
    tail_scale_ms=300,
)

IDEAL = NetworkProfile(
    name="Ideal",
    base_latency_ms=5,
    jitter_std_ms=1,
)