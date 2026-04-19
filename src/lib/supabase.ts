import { supabase as officialClient } from '@/integrations/supabase/client';

export const supabase = officialClient;

// Define user roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

// Create RLS policies
async function createRLSPolicies() {
  try {
    // Enable RLS on products table
    await supabase
     .from('products')
     .update({ is_hidden: false })
     .eq('is_hidden', true);

    // Create RLS policies for products table
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

    console.log('RLS policies created successfully');
  } catch (error) {
    console.error('Error creating RLS policies:', error);
  }
}

// Call the function to create RLS policies
createRLSPolicies();