# Feature Plan: Vitals Decay

## Implementation
- Store vitals in a `vitals` object state.
- Use `useEffect` with a `setInterval` of 5000ms.
- Ensure `Math.max(0, val)` is used to prevent negative numbers.
- Vitals should pause decay if the pet state is `EVOLVED` (Easter Egg) or the game is paused.