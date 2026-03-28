## 2024-03-28 - IDOR in Cart Actions

**Vulnerability:** Insecure Direct Object Reference (IDOR) in `app/cart/actions.ts` where users could modify (`updateCartItem`) or delete (`removeCartItem`) any cart item by specifying its `itemId`, without validating that the authenticated user actually owned the cart item.

**Learning:** When using Next.js server actions to interact with the database, querying by ID alone is insufficient for resources tied to users. The lack of an authentication check and database query scope `eq('user_id', user.id)` allowed any user to alter any other user's data.

**Prevention:** All server actions interacting with user data must explicitly validate authentication via `supabase.auth.getUser()` and strictly scope database operations (updates, deletes) by appending `.eq('user_id', user.id)` to ensure users can only affect their own records.
