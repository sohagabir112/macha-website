## 2024-05-24 - [Open Redirect]
**Vulnerability:** Open redirect via 'next' query parameter
**Learning:** The 'next' parameter in auth redirect could be manipulated to redirect to external domains.
**Prevention:** URL search parameters used for redirection must always be sanitized to ensure they begin with a single '/' and not '//' (protocol-relative).
