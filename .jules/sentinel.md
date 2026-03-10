## 2024-03-10 - Server Action IDOR Vulnerability in Cart Operations
**Vulnerability:** Insecure Direct Object Reference (IDOR) in cart server actions (`updateCartItem`, `removeCartItem`). A user could pass arbitrary `itemId`s and modify or delete other users' cart items because the queries did not check the `user_id`.
**Learning:** Next.js Server Actions don't inherently validate authentication or scope database queries. Authentication must be explicitly validated in every server action that accesses or modifies user data.
**Prevention:** Always validate `supabase.auth.getUser()` in server actions, and always scope update/delete operations using `.eq('user_id', user.id)` to ensure the authenticated user owns the resource being manipulated.
