# Network Delay Model

## Purpose

This module simulates **network-induced latency** for delivery receipts.

It models how:
- Different network types
- Jitter
- Congestion
- Variability

affect **observed round-trip time (RTT)** — without using real networks.

---

## Why Network Modeling Matters

Even if device behavior is constant, network conditions introduce:
- Noise
- Variance
- Overlap between states

This is why timing side-channel inference is **probabilistic**, not exact.

---

## Core Concepts

### Base Latency
Minimum delay imposed by the network path.

### Jitter
Random variation added to each transmission.

### Tail Latency
Occasional high delays caused by congestion or scheduling.

---

## Network Profiles

| Profile | Description |
|-------|------------|
| WiFi | Low latency, low jitter |
| Cellular | Moderate latency, variable jitter |
| Poor Network | High latency, heavy tail |
| Ideal | Minimal delay (baseline reference) |

---

## Latency Model

Observed delay is computed as:

```text
RTT = base_latency
    + device_state_delay
    + network_jitter
    + tail_event (optional)
```

---

## Jitter Distribution

Jitter is modeled using a **Gaussian distribution**:

```text
jitter ~ Normal(μ = 0, σ = network_variance)
```

Negative jitter is clamped to zero.

---

## Tail Latency Events

With small probability `p_tail`, an additional delay is added:

```text
tail_delay ~ Exponential(scale)
```

This simulates:

- Congestion
- Packet rescheduling
- Background network activity

---

## Design Constraints

- Deterministic with a fixed random seed
- Parameterized for experiments
- Simple enough to reason about
- No real packet modeling

---

## Ethical Note

This model simulates timing behavior only.
It does not resemble or interact with any real messaging system.
