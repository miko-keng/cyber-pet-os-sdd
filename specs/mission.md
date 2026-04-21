# Mission: Project BitPet

## Overview
A minimalist web-based virtual pet (Tamagotchi MVP) designed to demonstrate Spec-Driven Development. The goal is to keep a digital companion alive by managing its vitals through a real-time care loop.

## Success Criteria
- **Autonomous Life:** Stats decay without user input.
- **Visual Feedback:** Pet state (Normal, Sick, Evolved) is immediately obvious.
- **Robust Logic:** Stats are capped between 0-100; "Sick" state restricts certain actions.

## Constraints
- Single user, single pet.
- No permanent death (Recovery path via "Rest").
- Local persistence only (no database).