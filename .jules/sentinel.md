## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-03-05 - [Price Manipulation in Server Actions]
**Vulnerability:** Price manipulation vulnerability found in `app/shop/actions.ts`. The `addToCart` server action accepted the price from the client without any server-side validation, allowing a malicious client to submit a modified price.
**Learning:** Server actions should never trust data originating from the client, particularly pricing and billing information, which can lead to direct financial loss.
**Prevention:** Always use a single source of truth for critical data (like extracting a shared product catalog to `utils/products.ts`) and perform strict server-side validation against that trusted source before processing transactions or updating the database.