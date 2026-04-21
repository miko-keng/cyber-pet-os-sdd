# Requirements: Living Vitals

## Stat Definitions
- **Hunger (0-100):** Starts at 100.
- **Happiness (0-100):** Starts at 80.
- **Energy (0-100):** Starts at 100.

## The Tick Algorithm
- **Frequency:** Every 5 seconds.
- **Hunger:** -3 per tick.
- **Happiness:** -2 per tick.
- **Energy:** -1 per tick.

## Threshold Rules
- **Critical:** If any stat ≤ 20, UI bar turns **Red**.
- **Healthy:** If all stats > 70, UI bar is **Green**.
- **Neutral:** Otherwise, UI bar is **Yellow**.