-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Products policies
CREATE POLICY "products_select_public" ON products 
FOR SELECT TO public USING (true);

CREATE POLICY "products_insert_authenticated" ON products 
FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "products_update_authenticated" ON products FOR UPDATE TO authenticated USING (true);

CREATE POLICY "products_delete_authenticated" ON products 
FOR DELETE TO authenticated USING (true);

-- Orders policies
CREATE POLICY "orders_select_own" ON orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "orders_insert_own" ON orders 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "orders_update_own" ON orders 
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "orders_delete_own" ON orders 
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "order_items_select_own" ON order_items 
FOR SELECT TO authenticated USING (EXISTS (
  SELECT 1 FROM orders o 
  WHERE o.id = order_id AND o.user_id = auth.uid()
));

CREATE POLICY "order_items_insert_own" ON order_items FOR INSERT TO authenticated WITH CHECK (EXISTS (
  SELECT 1 FROM orders o 
  WHERE o.id = order_id AND o.user_id = auth.uid()
));

-- Profiles policiesCREATE POLICY "profiles_select_own" ON profiles 
FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "profiles_update_own" ON profiles 
FOR UPDATE TO authenticated USING (auth.uid() = id);

-- Audit logs policies
CREATE POLICY "audit_logs_select_admin" ON audit_logs 
FOR SELECT TO authenticated USING (EXISTS (
  SELECT 1 FROM profiles p 
  WHERE p.id = auth.uid() AND p.user_metadata->>'role' = 'admin'
));

-- Insert default admin user (should be set up via migration)
INSERT INTO profiles (id, first_name, last_name, avatar_url)
VALUES ('00000000-0000-0000-0000-000000000000', 'Admin', 'User', 'https://example.com/avatar.png')
ON CONFLICT (id) DO NOTHING;

-- Grant admin role to admin user
UPDATE profiles 
SET user_metadata = jsonb_set(coalesce(user_metadata, '{}'), '{role}', '"admin"')
WHERE id = '00000000-0000-0000-0000-000000000000';