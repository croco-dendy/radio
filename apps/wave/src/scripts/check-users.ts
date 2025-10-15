import { db } from '@/db';
import { accounts } from '@/db/schema';

const checkUsers = async () => {
  try {
    console.log('👥 Checking existing users...');

    const allUsers = await db.select().from(accounts);

    if (allUsers.length === 0) {
      console.log('📭 No users found in database');
      return;
    }

    console.log(`👤 Found ${allUsers.length} user(s):`);
    console.log('');

    allUsers.forEach((user, index) => {
      console.log(`${index + 1}. Username: ${user.username}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.isActive ? 'Yes' : 'No'}`);
      console.log(`   Created: ${user.createdAt}`);
      console.log('');
    });
  } catch (error) {
    console.error('❌ Failed to check users:', error);
  } finally {
    process.exit(0);
  }
};

checkUsers();
