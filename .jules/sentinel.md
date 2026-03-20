## 2024-05-24 - Missing Authorization Checks in Server Actions (IDOR)
**Vulnerability:** Server actions for updating and deleting cart items (`updateCartItem`, `removeCartItem`) did not verify the user's identity or ensure the modified item belonged to the current user, leading to Insecure Direct Object Reference (IDOR).
**Learning:** In Next.js Server Actions, even if the action is called from a component rendered for an authenticated user, the server action itself must perform its own authentication and authorization checks.
**Prevention:** Always validate authentication (`supabase.auth.getUser()`) within server actions and scope database queries to the authenticated user's ID (`.eq('user_id', user.id)`) when interacting with user-specific data.
