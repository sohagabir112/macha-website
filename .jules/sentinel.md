## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Business logic vulnerability (price manipulation) found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `product.price` provided by the client, allowing an attacker to add items to their cart with arbitrary prices (e.g., $0.01 instead of $49.00).
**Learning:** Client-provided data related to pricing, quantity, or roles should never be trusted in e-commerce applications.
**Prevention:** Server actions must define or look up a server-side source of truth for pricing (e.g., from a database or constant) and use that trusted value instead of the client's input when persisting orders or cart items.
