## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Cart Action]
**Vulnerability:** The `addToCart` server action accepted a `price` directly from the client payload and inserted it into the database, allowing an attacker to manipulate network requests to purchase items at modified (e.g., $0.01) prices.
**Learning:** Client-provided data related to pricing, billing, or authorization should never be trusted as the source of truth, even when submitted through a typed server action.
**Prevention:** Always maintain a single server-side source of truth for critical data like catalog prices. Use client-provided IDs/names to query the trusted server-side catalog and use the authoritative price for database insertions.
