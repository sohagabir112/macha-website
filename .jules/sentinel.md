## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-04-11 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action blindly accepted the client-provided `price` without validating it against the server-side source of truth.
**Learning:** Clients can easily modify request payloads. Never trust the client's provided price for products. The server must maintain a single source of truth for critical data like pricing and authorize data internally before execution.
**Prevention:** Always validate client inputs against a server-side catalog to fetch and use server-side values (e.g., `catalogProduct.price`) for critical operations like adding to cart or purchasing.