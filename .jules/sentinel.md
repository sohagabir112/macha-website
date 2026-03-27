## 2024-05-24 - Server Actions missing user-scoping (IDOR)
**Vulnerability:** Server Actions performing database operations on user-specific resources (`cart_items`) did not verify if the authenticated user actually owned the resource being modified or deleted. They relied only on the item ID provided by the client.
**Learning:** Supabase RLS is the ideal defense, but when relying on application logic (especially inside Next.js Server Actions running server-side with elevated privileges), explicit `.eq('user_id', user.id)` checks are mandatory.
**Prevention:** Every update/delete operation on a user-owned resource must include an explicit clause scoping the query to the authenticated user's ID returned from `supabase.auth.getUser()`.
