## 2024-05-24 - [Open Redirect in OAuth Callback]
**Vulnerability:** Open redirect vulnerability via the `next` parameter in `app/auth/callback/route.ts`. The parameter was used to construct redirect URLs without validating if it was an absolute URL or a protocol-relative URL (`//example.com`).
**Learning:** URL search parameters like `next` that are used for redirection must always be sanitized to ensure they point to relative paths within the application and cannot be manipulated to redirect users to malicious domains.
**Prevention:** Always ensure redirect paths derived from user input start with exactly one forward slash (`/`) and not two (`//`) to prevent protocol-relative redirects.
