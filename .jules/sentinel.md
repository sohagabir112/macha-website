## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.
## 2024-04-05 - Insecure Client Data Trust in Server Actions
**Vulnerability:** Server action `addToCart` was accepting and storing the product `price` directly from the client payload without verifying it against a trusted source.
**Learning:** Server Actions can be invoked directly by users with arbitrary payloads. Trusting client-provided critical product data (like price) can lead to price manipulation, where a user modifies the payload to purchase items at arbitrary prices.
**Prevention:** Critical product data (especially price) must always be validated against a server-side source of truth (e.g., a database or server-side catalog file) rather than blindly trusted from client input.
