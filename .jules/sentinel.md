## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-05-12 - Price Manipulation via Client-Provided Payload
**Vulnerability:** A server action (`addToCart`) blindly trusted the `price` provided by the client in the request payload. This allowed malicious users to manipulate the price (e.g., buying items for $0.01).
**Learning:** Server actions must not rely on client-provided data for critical business logic like pricing. The client payload should only provide identifiers (like product name or ID).
**Prevention:** Implement a single source of truth on the server (e.g., a shared `utils/products.ts` or database) and look up trusted data (like price) using the client-provided identifier before proceeding with any transactions.
