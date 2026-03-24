## 2024-03-24 - Open Redirect in Auth Callback
 **Vulnerability:** Unsanitized `next` URL parameter in `/auth/callback` used for redirection could allow attackers to redirect users to malicious external domains via protocol-relative URLs (e.g., `//malicious.com`).
 **Learning:** Next.js redirect functions blindly follow protocol-relative paths if they start with `//`. Using `URL.origin` with string interpolation `\${origin}\${next}` is unsafe if `next` can be manipulated to `//malicious.com`.
 **Prevention:** Always validate that redirect parameters intended to be relative paths start with a single `/` and explicitly reject or sanitize those starting with `//`.
