## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Business logic vulnerability (price manipulation) found in `app/shop/actions.ts`. The `addToCart` server action accepted a `product.price` argument directly from the client and used it to insert rows into the `cart_items` table. A malicious user could tamper with the request payload to add items with an arbitrary low price.
**Learning:** Never trust client-provided pricing or sensitive business logic data. Even if the UI shows correct prices, any data submitted by the client must be validated.
**Prevention:** Maintain a server-side source of truth (like a product catalog or database lookup) for item prices. When processing transactions like cart additions, ignore client-provided prices and use the trusted server-side price.
