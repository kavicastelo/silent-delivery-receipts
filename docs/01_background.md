# Background

## Purpose of This Documentation

This repository documents **Silent Delivery Receipts (SDRs)** and their role in
**metadata leakage and timing side-channels** in modern end-to-end encrypted (E2EE)
messaging systems.

The goal is **education and defense**, not exploitation.

This project:
- Does **not** interact with real messaging platforms
- Does **not** target real users
- Uses **simulation and models only**

---

## Why This Matters

End-to-end encryption protects **message content**, but **metadata** often remains exposed.
Even minimal metadata — such as message acknowledgments and timing — can leak
behavioral information.

This documentation explains:
- How such leakage happens
- Why it is difficult to eliminate
- How systems could be designed more safely

---

## Messaging Systems Overview

Modern instant messengers typically include:

- End-to-end encrypted message payloads
- Server-mediated routing
- Device synchronization (multi-device)
- Delivery acknowledgments
- Read acknowledgments (optional)

Even when content is encrypted, **system behavior itself can be observed**.

---

## Key Definitions

| Term | Meaning |
|-----|--------|
| E2EE | End-to-End Encryption |
| Metadata | Data about communication, not its content |
| Receipt | Server or client acknowledgment of message handling |
| Side-Channel | Information leak via indirect observable effects |

---

## Research Context

Recent academic research has shown that:
- Some acknowledgments are **mandatory and silent**
- Their timing can act as a **covert signal**
- These signals can reveal **user state** without consent

This repository explains those findings in a **safe, reproducible way**.
