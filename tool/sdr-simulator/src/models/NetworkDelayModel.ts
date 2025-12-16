export interface NetworkProfile {
    name: string;
    base_latency_ms: number;
    jitter_std_ms: number;
    tail_probability?: number;
    tail_scale_ms?: number;
}

export class NetworkDelayModel {
    profile: NetworkProfile;

    constructor(profile: NetworkProfile) {
        this.profile = profile;
    }

    // Gaussian random helper (Box-Muller transform)
    private gaussian(mean: number, std: number): number {
        const u = 1 - Math.random();
        const v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * std + mean;
    }

    sample_delay(): number {
        // Base latency
        let delay = this.profile.base_latency_ms;

        // Jitter (Gaussian, clamped to zero)
        const jitter = this.gaussian(0, this.profile.jitter_std_ms);
        delay += Math.max(0.0, jitter);

        // Tail latency
        if (this.profile.tail_probability && this.profile.tail_scale_ms) {
            if (Math.random() < this.profile.tail_probability) {
                // Exponential distribution: -scale * ln(U)
                const tail_delay = -this.profile.tail_scale_ms * Math.log(Math.random());
                delay += tail_delay;
            }
        }

        return delay;
    }
}

export const NETWORK_PROFILES: Record<string, NetworkProfile> = {
    WIFI: {
        name: "WiFi",
        base_latency_ms: 20,
        jitter_std_ms: 5,
        tail_probability: 0.01,
        tail_scale_ms: 50,
    },
    CELLULAR: {
        name: "Cellular",
        base_latency_ms: 60,
        jitter_std_ms: 20,
        tail_probability: 0.05,
        tail_scale_ms: 120,
    },
    POOR_NETWORK: {
        name: "PoorNetwork",
        base_latency_ms: 120,
        jitter_std_ms: 50,
        tail_probability: 0.1,
        tail_scale_ms: 300,
    },
    IDEAL: {
        name: "Ideal",
        base_latency_ms: 5,
        jitter_std_ms: 1,
    },
};
