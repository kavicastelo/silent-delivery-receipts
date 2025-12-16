# Labs Overview

## Purpose of the Labs

The labs in this repository provide **hands-on, ethical demonstrations**
of how **Silent Delivery Receipts (SDRs)** can produce **timing side-channels**.

All labs are:
- Fully simulated
- Non-operational against real services
- Designed for education and defense

---

## What the Labs Demonstrate

Through controlled experiments, you will observe how:
- Timing alone can leak information
- Device and network states affect receipt delays
- Inference is probabilistic, not deterministic
- Metadata can be sensitive even without content access

---

## Lab Design Principles

1. **Simulation-Only**
   - No WhatsApp, Signal, or real protocols
2. **Deterministic + Randomized**
   - Controlled models with injected noise
3. **Reproducible**
   - Same parameters → same results
4. **Ethical by Default**
   - No targeting, probing, or real-world identifiers

---

## Lab Structure

```bash
lab/
│
├── simulator/
│ ├── ARCHITECTURE.md
│ ├── message_flow.py
│ ├── receipt_emulator.py
│ └── network_delay_model.py
│
├── experiments/
│ ├── online_vs_offline.ipynb
│ ├── network_type_comparison.ipynb
│ └── inference_error_analysis.ipynb
```

---

## Who Should Use These Labs

- Students learning security & privacy
- Researchers studying metadata leakage
- Engineers designing messaging systems
- Educators teaching side-channel concepts

---

## Important Notice

These labs **must not be adapted** to:
- Interact with real messaging services
- Measure real users
- Collect real metadata

Such use violates the intent of this project.
