import { db } from '@/db';
import { createAccount, findAccountByUsername } from '@/db/accounts';
import bcrypt from 'bcryptjs';

const createAdminUser = async () => {
  try {
    console.log('🔐 Creating admin user...');

    // Admin user details - CHANGE THESE TO YOUR DETAILS
    const adminData = {
      username: 'superadmin', // Change this to your username
      password: 'admin123456', // Change this to your desired password
      role: 'admin',
    };

    // Check if admin already exists
    const existingAdmin = await findAccountByUsername(adminData.username);
    if (existingAdmin) {
      console.log(
        '❌ Admin user already exists with username:',
        adminData.username,
      );
      console.log(
        '💡 If you want to reset, delete the user first or use a different username',
      );
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(adminData.password, 12);

    // Create admin account
    await createAccount({
      username: adminData.username,
      email: `${adminData.username}@wave.local`, // Auto-generate email
      passwordHash,
      role: 'admin',
    });

    console.log('✅ Admin user created successfully!');
    console.log('👤 Username:', adminData.username);
    console.log('🔑 Password:', adminData.password);
    console.log('👑 Role: admin');
    console.log('');
    console.log(
      '🚀 You can now login to the admin panel with these credentials!',
    );
    console.log('⚠️  Remember to change your password after first login');
  } catch (error) {
    console.error('❌ Failed to create admin user:', error);
  } finally {
    process.exit(0);
  }
};

// Run the script
createAdminUser();
