import { db } from '@/db';
import { accounts } from '@/db/schema';
import { eq } from 'drizzle-orm';

const promoteToAdmin = async () => {
  try {
    console.log('👑 Promoting user to admin...');

    // Update the existing admin user to have admin role
    const result = await db
      .update(accounts)
      .set({
        role: 'admin',
        updatedAt: new Date().toISOString(),
      })
      .where(eq(accounts.username, 'admin'))
      .returning();

    if (result.length === 0) {
      console.log('❌ No user found with username "admin"');
      return;
    }

    const updatedUser = result[0];
    console.log('✅ User promoted to admin successfully!');
    console.log('👤 Username:', updatedUser.username);
    console.log('👑 Role:', updatedUser.role);
    console.log('');
    console.log('🚀 You can now login to the admin panel with:');
    console.log('👤 Username:', updatedUser.username);
    console.log('🔑 Password: (your existing password)');
    console.log('');
    console.log(
      '⚠️  If you forgot the password, you can reset it in the admin panel',
    );
  } catch (error) {
    console.error('❌ Failed to promote user to admin:', error);
  } finally {
    process.exit(0);
  }
};

promoteToAdmin();
