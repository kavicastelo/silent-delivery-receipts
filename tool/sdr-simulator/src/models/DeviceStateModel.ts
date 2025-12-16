export const DeviceState = {
    ACTIVE: "active",
    IDLE: "idle",
    DOZING: "dozing",
    OFFLINE: "offline",
} as const;

export type DeviceState = typeof DeviceState[keyof typeof DeviceState];

export interface DeviceStateProfile {
    name: DeviceState;
    base_delay_ms: number;
    jitter_ms: number;
    receipt_enabled: boolean;
}

export class DeviceStateModel {
    state_profiles: Record<DeviceState, DeviceStateProfile>;

    constructor(state_profiles: Record<DeviceState, DeviceStateProfile>) {
        this.state_profiles = state_profiles;
    }

    sample_processing_delay(state: DeviceState): number | null {
        const profile = this.state_profiles[state];

        if (!profile.receipt_enabled) {
            return null;
        }

        const jitter = Math.random() * profile.jitter_ms;
        return profile.base_delay_ms + jitter;
    }
}

export const DEFAULT_DEVICE_STATES: Record<DeviceState, DeviceStateProfile> = {
    [DeviceState.ACTIVE]: {
        name: DeviceState.ACTIVE,
        base_delay_ms: 5,
        jitter_ms: 5,
        receipt_enabled: true,
    },
    [DeviceState.IDLE]: {
        name: DeviceState.IDLE,
        base_delay_ms: 40,
        jitter_ms: 30,
        receipt_enabled: true,
    },
    [DeviceState.DOZING]: {
        name: DeviceState.DOZING,
        base_delay_ms: 150,
        jitter_ms: 150,
        receipt_enabled: true,
    },
    [DeviceState.OFFLINE]: {
        name: DeviceState.OFFLINE,
        base_delay_ms: 0,
        jitter_ms: 0,
        receipt_enabled: false,
    },
};
