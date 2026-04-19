import { supabase as officialClient } from '@/integrations/supabase/client';

export const supabase = officialClient;

// Define user roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Create RLS policiesasync function createRLSPolicies() {
  try {
    // Enable RLS on products table    await supabase
     .from('products')
     .update({ is_hidden: false })
     .eq('is_hidden', true);

    // Create policies for products table
    await supabase.rpc('rls_create_policy', {
      table: 'products',
      role: USER_ROLES.ADMIN,
      policy: 'Admins can access all products',
      using: 'true',
    });

    await supabase.rpc('rls_create_policy', {
      table: 'products',
      role: USER_ROLES.USER,
      policy: 'Users can access visible products',
      using: 'is_hidden = false',
    });
    
    // Create policies for audits table
    await supabase.rpc('rls_create_policy', {
      table: 'audits',
      role: USER_ROLES.ADMIN,
      policy: 'Admins can read all audits',
      using: 'true',
    });

    await supabase.rpc('rls_create_policy', {
      table: 'audits',
      role: USER_ROLES.USER,
      policy: 'Users can read own audits',
      using: 'auth.uid()::text = user_id::text',
    });
  } catch (error) {
    console.error('Error creating RLS policies:', error);
  }
}

// Call the function to create RLS policies
createRLSPolicies();