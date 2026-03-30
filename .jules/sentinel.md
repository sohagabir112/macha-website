## $(date +%Y-%m-%d) - [HIGH] Fix Insecure Direct Object Reference (IDOR) in cart actions
**Vulnerability:** The `updateCartItem` and `removeCartItem` server actions in `app/cart/actions.ts` accepted an `itemId` but did not verify if the authenticated user owned the cart item, allowing an attacker to modify or delete cart items belonging to other users.
**Learning:** Even with an authenticated user context, server actions must explicitly scope database queries to the authenticated user's ID to prevent IDOR vulnerabilities.
**Prevention:** Always validate authentication via `supabase.auth.getUser()` and scope database queries to the authenticated user's ID (e.g., `.eq('user_id', user.id)`) for any operation that modifies or deletes user-specific data.
