## 2025-02-28 - [IDOR in Server Actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) found in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` were directly updating/deleting records using only `itemId` without verifying ownership.
**Learning:** Even when using Supabase (which might have RLS), application-level server actions must explicitly validate the authenticated user and scope database queries to the user's ID to provide defense in depth and ensure proper authorization.
**Prevention:** Always fetch the current user via `supabase.auth.getUser()` in server actions that modify data, and always append `.eq('user_id', user.id)` to update/delete queries.

## 2024-05-24 - [Server-Side Validation] Prevent Price Manipulation in Shopping Cart

**Vulnerability:** The shopping cart `addToCart` server action accepted a raw `price` directly from the client. A malicious user could tamper with the payload to insert arbitrary prices, bypassing the established product catalog cost.
**Learning:** Never trust pricing data sent from the client. The client should only send identifiers (e.g., `product.id`), and the server must resolve the sensitive properties (like price) against a trusted source.
**Prevention:** Establish a single source of truth for the product catalog on the server and use it to look up the expected item properties inside server actions instead of passing them in from the client.
