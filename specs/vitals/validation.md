# Validation: Vitals

| Test ID | Strategy (Level) | Expected Result |
| :--- | :--- | :--- |
| V-01 | Automated (Logic) | `setInterval` triggers every 5s and reduces hunger by 3. |
| V-02 | Manual (Flow) | Visual bars change color from Green to Red as stats drop below 20. |
| V-03 | Automated (Boundary) | Stats stop at 0 and do not become negative. |
| V-04 | Automated (Clamping) | Stats stop at 100 and do not exceed 100. |