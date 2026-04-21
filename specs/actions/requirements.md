# Requirements: Care Actions

## 1. Feed
- **Effect:** Hunger +20, Energy -5.
- **Constraint:** Cannot feed if Hunger is 100.

## 2. Play
- **Effect:** Happiness +15, Energy -15, Hunger -5.
- **Constraint:** Disabled if Energy < 20 or Pet is `SICK`.

## 3. Rest
- **Effect:** Energy +30, Hunger -10.
- **Constraint:** This is the only way to recover from the `SICK` state.