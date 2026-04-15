## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.
## 2024-04-15 - Price Manipulation in E-commerce Cart
**Vulnerability:** The addToCart server action trusted the client-provided `price` payload and inserted it directly into the database. This allowed malicious users to manipulate the price of items in their cart (Insecure Direct Object Reference / Price Manipulation).
**Learning:** Never trust client-provided pricing data. All pricing must be determined authoritatively on the server-side during checkout or cart addition.
**Prevention:** Always look up item prices against a trusted server-side catalog or database table using the product identifier (e.g., product name or ID) and ignore any client-provided price values.
