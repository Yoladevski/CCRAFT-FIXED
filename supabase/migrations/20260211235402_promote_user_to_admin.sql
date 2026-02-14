/*
  # Promote User to Admin - Helper Migration

  ## Overview
  This migration provides a helper to promote a specific user to admin role.
  
  ## Instructions
  To make a user an admin, you need to know their user_id from the auth.users table.
  
  ### Finding User ID:
  Run this query to find a user's ID by their email:
  ```sql
  SELECT id, email FROM auth.users WHERE email = 'your-email@example.com';
  ```
  
  ### Promoting to Admin:
  Once you have the user_id, update the query below and run this migration:
  ```sql
  UPDATE profiles 
  SET role = 'admin' 
  WHERE user_id = 'USER_ID_HERE';
  ```
  
  ## Example Usage
  If you want to make the first registered user an admin, you can run:
  ```sql
  UPDATE profiles 
  SET role = 'admin' 
  WHERE user_id = (
    SELECT id FROM auth.users ORDER BY created_at ASC LIMIT 1
  );
  ```
  
  ## Notes
  - This migration does not automatically promote any user
  - You must manually specify which user to promote
  - Admin users have access to the admin dashboard and can manage all users
  - Admin users can promote/demote other users through the admin interface
*/

-- This is a helper migration file
-- To promote a specific user to admin, uncomment and modify the following line:
-- UPDATE profiles SET role = 'admin' WHERE user_id = 'PASTE_USER_ID_HERE';

-- Or to promote the first user automatically (useful for development):
-- UPDATE profiles 
-- SET role = 'admin' 
-- WHERE user_id = (
--   SELECT user_id FROM profiles ORDER BY created_at ASC LIMIT 1
-- );