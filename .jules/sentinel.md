## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-04-02 - Server-side Price Validation
**Vulnerability:** The `addToCart` server action blindly trusted the client-provided `price` when adding an item to the cart, leading to a critical price manipulation vulnerability.
**Learning:** Client inputs can easily be manipulated by users (e.g., using browser dev tools or intercepting network requests) before reaching the server. We should never trust critical data like price from the client.
**Prevention:** For e-commerce and financial transactions, always lookup and validate critical data (like product prices) on the server side against a trusted source of truth (like a database or an official product configuration list) rather than relying on what is sent by the client.
