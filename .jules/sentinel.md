## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Server action `addToCart` in `app/shop/actions.ts` was blindly trusting the `price` provided by the client in the request payload, enabling a malicious user to manipulate the price (e.g., setting it to 0 or negative) during cart insertion.
**Learning:** Never trust client-provided pricing or sensitive data in server actions. Next.js server actions are just API endpoints, and attackers can intercept requests or invoke them manually with arbitrary arguments.
**Prevention:** Always validate client-provided data (like product IDs or names) against a trusted server-side source (e.g., database or a single source of truth configuration file) and strictly use the server-side value for sensitive fields like price before performing database operations.
