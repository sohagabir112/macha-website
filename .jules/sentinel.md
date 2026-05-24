## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2025-02-28 - [Price Manipulation in Server Actions]
**Vulnerability:** Client-side price manipulation in `app/shop/actions.ts`. The `addToCart` server action blindly trusted the `price` parameter provided by the client, allowing malicious users to add items to their cart at an arbitrary price.
**Learning:** Never trust client-provided data for critical business logic (like product pricing). Even when using server actions, the inputs originate from the client and can be intercepted and modified. Always validate client inputs against a trusted server-side source of truth.
**Prevention:** Establish a single source of truth for product data (e.g., a database or a shared server-side file like `utils/products.ts`). In server actions, only accept identifiers (like product name or ID) from the client and look up the sensitive data (like price) from the trusted source before performing database operations.
