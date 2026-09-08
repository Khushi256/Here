# Backend

FastAPI service handling chat requests, routing to ML models, and
persisting conversations.

## Planned Endpoints
- `POST /classify-emotion`
- `POST /classify-intent`
- `POST /safety-check`
- `POST /respond`

## Setup (once implemented)
\`\`\`bash
pip install -r requirements.txt
uvicorn main:app --reload
\`\`\`

## Notes
- Safety classifier logic must stay independent of emotion/intent models.
- Minimal data retention — support delete-my-data from the start.