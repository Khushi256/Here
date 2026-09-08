# ML

Emotion classification, intent classification, and safety/crisis detection
models, plus evaluation.

## Planned Components
- `emotion/` — Baseline (TF-IDF + LogReg) vs fine-tuned DistilBERT, trained on GoEmotions
- `intent/` — Classifier for vent / advice / calm-down / distract / reflect (custom-labeled data)
- `safety/` — Rule-based + lightweight classifier for crisis-language detection
- `eval/` — Accuracy/F1 comparisons, safety precision/recall, latency benchmarks

## Setup (once implemented)
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Notes
- Keep safety model separate from emotion/intent — different risk profile.
- Log all eval metrics for the portfolio writeup.