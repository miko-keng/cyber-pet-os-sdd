# Validation: States

| Test ID | Strategy (Level) | Expected Result |
| :--- | :--- | :--- |
| S-01 | Automated (Logic) | If Hunger or Energy reaches 0, `petState` updates to `SICK`. |
| S-02 | Manual (Flow) | Verify pet icon becomes "Special form" with sunglasses and wings when Evolved. |
| S-03 | Automated (Boundary) | EVOLVED state reduces decay by 50% automatically. |