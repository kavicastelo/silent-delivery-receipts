# Silent Delivery Receipts
### Understanding Metadata Leakage & Timing Side-Channels in Encrypted Messaging

---

## 📌 Overview

This repository is an **educational and defensive research project** exploring
**Silent Delivery Receipts (SDRs)** and how they can create **timing side-channels**
in modern end-to-end encrypted (E2EE) messaging systems.

Although E2EE protects message content, **metadata such as delivery acknowledgments
and timing remain observable**. This project explains how those signals arise,
why they matter, and how systems can be designed to reduce privacy risk.

> 🔒 This repository **does not interact with WhatsApp, Signal, or any real messaging service**.

---

## 🎯 Goals

- Provide **clear explanations** of Silent Delivery Receipts
- Demonstrate **timing side-channels using simulations**
- Educate developers and researchers about **metadata risks**
- Propose **defensive mitigations** and design improvements
- Maintain **strict ethical and legal boundaries**

---

## 🧠 What You Will Learn

- Why delivery receipts exist and why they are “silent”
- How timing differences can leak behavioral information
- The difference between **content security** and **metadata privacy**
- How side-channels work without breaking encryption
- Practical mitigation strategies for privacy-preserving systems

---

## 🧪 What This Project Is *Not*

- ❌ Not a hacking tool
- ❌ Not a WhatsApp or Signal exploit
- ❌ Not a tracking or surveillance system
- ❌ Not designed to target real users

All demonstrations are **simulated, self-contained, and consent-based**.

---

## 📂 Repository Structure

```bash
silent-delivery-receipts/
│
├── README.md
├── RESPONSIBLE_USE.md
│
├── docs/
│ ├── 01_background.md
│ ├── 02_silent_delivery_receipts.md
│ ├── 03_timing_side_channels.md
│ ├── 04_metadata_vs_encryption.md
│ ├── 05_threat_models.md
│ └── 06_defensive_mitigations.md
│
├── lab/ # Simulations & experiments (no real services)
├── tool/ # Educational SDR simulator
└── LICENSE
```

---

## 🛡️ Ethics First

This project follows:
- Responsible security research practices
- Consent-based experimentation
- Non-operational demonstrations
- Clear legal and ethical boundaries

See **[RESPONSIBLE_USE.md](RESPONSIBLE_USE.md)** for details.

---

## 👥 Intended Audience

- Security & privacy researchers
- Software engineers
- Protocol designers
- Students learning applied cryptography
- Anyone interested in metadata privacy

---

## 📖 Disclaimer

This project is for **educational purposes only**.  
Misuse of messaging systems or tracking individuals without consent
may violate laws and ethical standards.

---

## 🤝 Contributions

Contributions are welcome if they:
- Improve clarity or accuracy
- Strengthen privacy-preserving design
- Respect ethical and legal constraints

Please open an issue or pull request with context and motivation.