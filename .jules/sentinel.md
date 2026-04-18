## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-05-18 - [CRITICAL] Prevent Price Manipulation in Shopping Cart
**Vulnerability:** The shopping cart server action (`addToCart`) was trusting the product price provided by the client instead of enforcing the server-side price. This could allow an attacker to modify the request and purchase items for arbitrary prices (e.g. $0.01).
**Learning:** Never trust client-provided pricing data in e-commerce applications. Pricing data on the client should only be used for display purposes.
**Prevention:** Always use a trusted, server-side catalog or database to determine the correct price of a product during cart additions and checkout. Validations should occur on the backend based on the product ID or name.
