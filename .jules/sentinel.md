## 2025-03-07 - [Sentinel Journal]
**Vulnerability:** Insecure Direct Object Reference (IDOR) in `app/cart/actions.ts` - `updateCartItem` and `removeCartItem` functions allowed any user to update or delete any cart item simply by providing an `itemId`, without verifying if the item belonged to them.
**Learning:** Next.js Server Actions that interact with user-specific data must explicitly authenticate the user and scope database queries to the authenticated user's ID to prevent IDOR attacks.
**Prevention:** Always use `.eq('user_id', user.id)` when querying, updating, or deleting user-specific records in Supabase.
