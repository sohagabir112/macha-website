## 2024-05-20 - Insecure Direct Object Reference (IDOR) in Cart Actions
**Vulnerability:** Server actions in `app/cart/actions.ts` (`updateCartItem`, `removeCartItem`) modified or deleted database records based solely on the `itemId` parameter passed from the client, without verifying if the item belonged to the currently authenticated user.
**Learning:** Even if the UI only displays the current user's items, attackers can manipulate requests to send other users' `itemId`s. Server actions must not rely on client-provided IDs for authorization.
**Prevention:** Always authenticate the user (`supabase.auth.getUser()`) within the server action and scope all database queries (select, update, delete) to the authenticated user's ID (`.eq('user_id', user.id)`).
