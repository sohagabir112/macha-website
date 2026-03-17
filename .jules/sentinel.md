## 2024-05-20 - Insecure Direct Object Reference (IDOR) in Cart Actions
**Vulnerability:** The `updateCartItem` and `removeCartItem` server actions in `app/cart/actions.ts` did not verify that the authenticated user actually owned the cart items being updated or deleted. A user could theoretically manipulate the `itemId` passed to the actions to delete or modify another user's cart items.
**Learning:** Supabase server actions must explicitly validate the authenticated user's ID against the database row's owner ID (e.g., `user_id`) when performing operations that modify or retrieve specific rows based solely on object IDs.
**Prevention:** Always scope database updates and deletes to the authenticated user's ID using `.eq('user_id', user.id)` on the query object.
