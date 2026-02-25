# Sentinel's Journal

## 2025-02-18 - [CRITICAL] Insecure Direct Object Reference in Cart Actions

**Vulnerability:** Server actions in `app/cart/actions.ts` (`updateCartItem`, `removeCartItem`) were updating/deleting cart items based solely on `itemId` provided by the client, without verifying that the item belongs to the authenticated user.
**Learning:** This IDOR vulnerability allows an authenticated user to potentially modify or delete cart items belonging to other users if they can guess or obtain the `itemId`.
**Prevention:** Always scope database operations (update, delete, select) to the authenticated user's ID (`user_id`) in server actions, regardless of client-provided IDs. Do not rely solely on RLS if possible, but definitely enforce it in the application layer for defense in depth.
