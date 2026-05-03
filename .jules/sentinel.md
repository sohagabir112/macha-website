## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-05-03 - [CRITICAL] Fix Price Manipulation Vulnerability in Cart Addition
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` directly used the `price` provided by the client when inserting a new item into the database. A malicious user could manipulate the payload to purchase items at a reduced or zero price.
**Learning:** Never trust client-provided data for critical business logic or financial transactions, such as pricing. Data passed from the frontend to server actions must be treated as untrusted.
**Prevention:** Extract pricing configurations or catalogs to a server-side single source of truth (e.g., `utils/products.ts` or a database). Server actions must validate the client's request against this trusted source and use the server-validated price before persisting changes to the database.
