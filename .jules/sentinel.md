## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Cart]
**Vulnerability:** Price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `product.price` parameter passed from the client, allowing an attacker to submit an arbitrary price for any item when adding it to the cart.
**Learning:** Client-provided data related to critical business logic (such as pricing) should never be trusted or inserted directly into the database without server-side validation against a single source of truth.
**Prevention:** Maintain a definitive catalog or database of products on the server side and always fetch pricing information using a trusted identifier (like product ID or name) instead of accepting pricing data from user requests.
