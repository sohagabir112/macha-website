## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Business Logic Flaw/Price Manipulation found in `app/shop/actions.ts`. The `addToCart` server action accepted a `price` value directly from the client without verification, allowing an attacker to intercept the request and modify the price of a product to an arbitrary value (e.g., $0.00).
**Learning:** Never trust client-provided data for critical business logic like pricing. Even in typed server actions, the inputs originate from the client and can be tampered with.
**Prevention:** Always define a single source of truth for product data (like pricing) on the server (e.g., querying a database or a trusted server-side catalog) and use that to validate or override client-provided values.
