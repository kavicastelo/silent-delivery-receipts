"""
Receipt Generator

Assembles a simulated Silent Delivery Receipt (SDR)
and returns an observed RTT.
"""

from typing import Optional

from network_delay_model import NetworkDelayModel
from device_state_model import DeviceState, DeviceStateModel


class ReceiptGenerator:
    """
    Combines device state and network delay to produce a simulated RTT.
    """

    def __init__(
        self,
        device_model: DeviceStateModel,
        network_model: NetworkDelayModel,
    ):
        self.device_model = device_model
        self.network_model = network_model

    def generate_receipt(self, device_state: DeviceState) -> Optional[float]:
        """
        Returns a simulated RTT in milliseconds.
        Returns None if no receipt is generated.
        """

        # Device-side processing delay
        device_delay = self.device_model.sample_processing_delay(device_state)
        if device_delay is None:
            return None

        # Network delays (forward + return)
        forward_delay = self.network_model.sample_delay()
        return_delay = self.network_model.sample_delay()

        rtt = forward_delay + device_delay + return_delay
        return rtt