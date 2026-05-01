## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-05-01 - Prevent Price Manipulation in Server Action
**Vulnerability:** A Next.js Server Action (`addToCart`) blindly trusted the product price provided by the client when inserting data into the database, allowing an attacker to modify the payload and purchase items for lower prices.
**Learning:** Never trust client-provided pricing data. When building e-commerce apps, server actions handling cart logic must validate the item against a trusted backend catalog before proceeding.
**Prevention:** Always extract the product catalog to a single source of truth (e.g. database or shared module) and cross-reference the client's request (`product.name` or `id`) with the trusted catalog to retrieve the correct price server-side.
