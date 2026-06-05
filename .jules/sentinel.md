## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-06-05 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability in `app/shop/actions.ts` `addToCart` server action. The action accepted and trusted a client-provided `price` parameter, allowing malicious users to add items to their cart at an arbitrary price.
**Learning:** Client-provided data related to pricing, billing, or authorization should never be trusted blindly by server actions. The server action must have a single source of truth for critical data like pricing.
**Prevention:** Server actions should only accept item identifiers (like `name` or `id`) from the client, and independently query or look up the current verified price on the server side before persisting or processing the request.
