## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.
## 2024-07-03 - Prevent Client-Side Price Manipulation
**Vulnerability:** The `addToCart` server action accepted `price` and `name` directly from the client. This allowed a malicious user to modify the payload and add items to their cart with arbitrary prices (e.g., $0.01) - a form of Insecure Direct Object Reference (IDOR) / Parameter Tampering.
**Learning:** Server actions that process business logic (like transactions or carts) must not trust client-provided data for critical fields like price or product details.
**Prevention:** Always use a single server-side source of truth (e.g., a database query or a trusted server-side catalog like `utils/products.ts`). The client should only send an identifier (like `id`), and the server action must retrieve the trusted details using that identifier.
