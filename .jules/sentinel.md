## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Client-Side Price Manipulation]
**Vulnerability:** Client-Side Price Manipulation found in `app/shop/actions.ts`. The `addToCart` server action inserted items into the database using the price provided by the client, allowing malicious users to modify the price before submission.
**Learning:** Never trust client-provided data for critical business logic like pricing. The client should only send identifiers (like product name or ID), and the server must independently fetch and validate the price from a trusted source of truth (like a database or server-side configuration).
**Prevention:** Establish a single source of truth for product data on the server (e.g., `utils/products.ts`), and validate incoming requests against this data before performing database operations.
