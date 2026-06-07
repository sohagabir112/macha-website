## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation via Server Actions]
**Vulnerability:** The `addToCart` server action accepted a `price` directly from the client and used it for database insertion, allowing users to potentially manipulate item prices by intercepting or forging the request.
**Learning:** Server actions must never trust critical business data (like prices) provided by the client. Client-provided data should only be used as identifiers (like product IDs or names) to look up the trusted data on the server.
**Prevention:** Always validate client-provided product identifiers against a trusted server-side source (e.g., a centralized catalog or database) and use the server-side price for all operations.
