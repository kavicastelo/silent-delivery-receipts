"""
Device State Model

Simulates how device state affects receipt generation timing.
"""

import random
from enum import Enum


class DeviceState(Enum):
    ACTIVE = "active"
    IDLE = "idle"
    DOZING = "dozing"
    OFFLINE = "offline"


class DeviceStateProfile:
    """
    Defines timing behavior for a specific device state.
    """

    def __init__(
        self,
        name: DeviceState,
        base_delay_ms: float,
        jitter_ms: float,
        receipt_enabled: bool = True,
    ):
        self.name = name
        self.base_delay_ms = base_delay_ms
        self.jitter_ms = jitter_ms
        self.receipt_enabled = receipt_enabled


class DeviceStateModel:
    """
    Generates state-dependent delays for receipt creation.
    """

    def __init__(self, state_profiles: dict, seed: int | None = None):
        self.state_profiles = state_profiles
        if seed is not None:
            random.seed(seed)

    def sample_processing_delay(self, state: DeviceState) -> float | None:
        """
        Returns the device-side delay before a receipt is generated.
        Returns None if no receipt is generated (e.g., offline).
        """

        profile = self.state_profiles[state]

        if not profile.receipt_enabled:
            return None

        jitter = random.uniform(0, profile.jitter_ms)
        return profile.base_delay_ms + jitter


# Default device state profiles (safe abstractions)

DEFAULT_DEVICE_STATES = {
    DeviceState.ACTIVE: DeviceStateProfile(
        name=DeviceState.ACTIVE,
        base_delay_ms=5,
        jitter_ms=5,
        receipt_enabled=True,
    ),
    DeviceState.IDLE: DeviceStateProfile(
        name=DeviceState.IDLE,
        base_delay_ms=40,
        jitter_ms=30,
        receipt_enabled=True,
    ),
    DeviceState.DOZING: DeviceStateProfile(
        name=DeviceState.DOZING,
        base_delay_ms=150,
        jitter_ms=150,
        receipt_enabled=True,
    ),
    DeviceState.OFFLINE: DeviceStateProfile(
        name=DeviceState.OFFLINE,
        base_delay_ms=0,
        jitter_ms=0,
        receipt_enabled=False,
    ),
}