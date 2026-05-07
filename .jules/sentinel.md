## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Client-Side Price Manipulation]
**Vulnerability:** Client-Side Price Manipulation in `app/shop/actions.ts`. The `addToCart` server action accepted the price from the client. A malicious user could intercept the request and manipulate the price to add items to their cart at any price.
**Learning:** Never trust the client with sensitive data like pricing. Server actions must retrieve prices from a trusted server-side source (e.g. database or internal single source of truth module).
**Prevention:** Always validate client-provided product IDs against a trusted server-side source to enforce correct pricing.
