## 2026-02-23 - Insecure Direct Object Reference (IDOR) in Cart Actions
**Vulnerability:** The server actions `updateCartItem` and `removeCartItem` in `app/cart/actions.ts` accepted an `itemId` and modified the cart item without verifying it belonged to the authenticated user. This would allow an attacker to delete or modify any user's cart items if they could guess the ID.
**Learning:** Server actions behave like public API endpoints. Always validate user authentication and scope database queries to the authenticated user (e.g., using `user_id`) to prevent unauthorized access, even if RLS is enabled (Defense in Depth).
**Prevention:** Always retrieve the authenticated user and include `.eq('user_id', user.id)` in database queries within server actions.
