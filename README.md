# 📟 Cyber Pet OS (REL_4.0.1)

**Cyber Pet OS** is a retro-futuristic virtual pet simulation designed as a "salvaged 1990s research terminal." This project was built as part of the **DeepLearning.AI 7-Day Challenge** using a strict **Spec-Driven Development (SDD)** workflow with the Gemini CLI.

---

## 📺 Project Demo
Watch the full walkthrough of the state machine and system logic:
**[View Submission Video on YouTube](https://youtu.be/Dic8kemHaXA)**

---

## 🏗️ Spec-Driven Architecture
The primary goal of this project was to ensure the code is a 1:1 reflection of the technical documentation. The application logic is governed by the following specification files:

### 📁 /specs (Core Constitution)
- **`mission.md`**: Defines the project goals, target audience (retro-tech enthusiasts), and success criteria.
- **`roadmap.md`**: Outlines the development phases from MVP to the final OS aesthetic.
- **`tech-stack.md`**: Details the choice of React, Vite, and Tailwind CSS for a high-performance terminal UI.

### 📁 /features (System Logic)
Each feature follows the SDD tripod: **Plan → Requirements → Validation**.
- **Vitals (`/vitals`)**: Defines the "Living System" with Hunger, Happiness, and Energy decay algorithms.
- **Actions (`/actions`)**: Documents the "Care Loop" (Feed, Play, Rest) and their impact on system stats.
- **States (`/states`)**: Maps the complex state machine transitions between **NORMAL**, **SICK**, and **EVOLVED** based on image-led conceptual triggers.

---

## 🕹️ System Features
- **Living Vitals**: Real-time "Passive Tick" system where stats decay every 5 seconds.
- **State Machine**: Dynamic visual and logic transitions. 
  - **SICK**: Triggered by Neglect (Stats < 15%). Disables "Play" command.
  - **EVOLVED**: Triggered by Optimization (Stats > 90%). Features a custom "Ascended" visual form.
- **Terminal Log**: A timestamped `[SYSTEM_INFO]` audit trail recording every state change and command execution.
- **Retro-UI**: CRT scanlines, phosphor-glow text-shadows, and ASCII-inspired framing.

---

## 🛠️ Technical Setup
Ensure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/miko-keng/cyber-pet-os-sdd.git](https://github.com/miko-keng/cyber-pet-os-sdd.git)
