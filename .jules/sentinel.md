## 2024-05-24 - [Fix IDOR in cart actions]
**Vulnerability:** IDOR (Insecure Direct Object Reference) in `app/cart/actions.ts`. Server actions `updateCartItem` and `removeCartItem` took entity IDs directly from the client without checking if the user actually owned the cart items. Furthermore, database errors were leaked.
**Learning:** Server actions interacting with user data must explicitly validate authentication (e.g., via `supabase.auth.getUser()`) and scope Supabase database queries to the authenticated user's ID (e.g., using `.eq('user_id', user.id)`) to prevent IDOR.
**Prevention:** Always authenticate the user in the server action and append `.eq('user_id', user.id)` to queries that modify or access user-owned data. Never leak error messages in production code.
