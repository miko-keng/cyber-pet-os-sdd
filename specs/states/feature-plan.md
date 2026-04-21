# Feature Plan: State Machine

- Define an enum-like object: `PET_STATES = { NORMAL, SICK, EVOLVED }`.
- Use a `petState` variable in React state.
- Use a `useEffect` that monitors the `vitals` object to trigger state transitions.
- Visuals: Swap the main character image/emoji based on the current state.