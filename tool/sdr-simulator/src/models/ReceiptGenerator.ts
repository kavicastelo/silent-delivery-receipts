import { DeviceState, DeviceStateModel } from "./DeviceStateModel";
import { NetworkDelayModel } from "./NetworkDelayModel";

export class ReceiptGenerator {
    device_model: DeviceStateModel;
    network_model: NetworkDelayModel;

    constructor(device_model: DeviceStateModel, network_model: NetworkDelayModel) {
        this.device_model = device_model;
        this.network_model = network_model;
    }

    generate_receipt(device_state: DeviceState): number | null {
        // Device-side processing delay
        const device_delay = this.device_model.sample_processing_delay(device_state);
        if (device_delay === null) {
            return null;
        }

        // Network delays (forward + return)
        const forward_delay = this.network_model.sample_delay();
        const return_delay = this.network_model.sample_delay();

        const rtt = forward_delay + device_delay + return_delay;
        return rtt;
    }
}
