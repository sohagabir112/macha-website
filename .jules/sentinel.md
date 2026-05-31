## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Client-Side Price Manipulation in Server Action]
**Vulnerability:** The `addToCart` server action in `app/shop/actions.ts` blindly trusted the `price` parameter provided by the client when inserting new cart items into the database. An attacker could intercept the request and manipulate the price (e.g., setting it to $0.01).
**Learning:** Server actions must never trust critical business data (like pricing) submitted by the client. Client input should only be used as a lookup identifier (like product ID or name), and the actual sensitive data must be retrieved from a trusted server-side source.
**Prevention:** Implement a single server-side source of truth for critical data (e.g., a shared catalog file or a database table). Server actions must validate incoming requests against this trusted source and use the server-side values for all database operations and business logic.
