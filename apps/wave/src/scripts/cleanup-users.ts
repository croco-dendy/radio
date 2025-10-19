import { db } from '@/db';
import { accounts } from '@/db/schema';
import { eq, like } from 'drizzle-orm';
import readline from 'node:readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
};

const cleanupUsers = async () => {
  try {
    console.log('🧹 User Cleanup Tool');
    console.log('===================');
    console.log('');

    // Find test users (users with test patterns)
    const testUsers = await db
      .select()
      .from(accounts)
      .where(like(accounts.username, '%test%'));

    const inactiveUsers = await db
      .select()
      .from(accounts)
      .where(eq(accounts.isActive, 0));

    console.log('🔍 Found cleanup candidates:');
    console.log('');

    if (testUsers.length > 0) {
      console.log('📝 Test users (contain "test" in username):');
      testUsers.forEach((user, index) => {
        console.log(
          `${index + 1}. ${user.username} - Created: ${user.createdAt}`,
        );
      });
      console.log('');
    }

    if (inactiveUsers.length > 0) {
      console.log('💤 Inactive users:');
      inactiveUsers.forEach((user, index) => {
        console.log(`${index + 1}. ${user.username} - Inactive`);
      });
      console.log('');
    }

    if (testUsers.length === 0 && inactiveUsers.length === 0) {
      console.log('✅ No cleanup candidates found');
      return;
    }

    console.log('What would you like to do?');
    console.log('1. Delete all test users');
    console.log('2. Delete all inactive users');
    console.log('3. Delete specific user by username');
    console.log('4. Cancel');
    console.log('');

    const choice = await prompt('Enter your choice (1-4): ');

    switch (choice) {
      case '1': {
        if (testUsers.length === 0) {
          console.log('❌ No test users found');
          break;
        }

        const confirmTest = await prompt(
          `Delete ${testUsers.length} test users? (yes/no): `,
        );
        if (confirmTest.toLowerCase() === 'yes') {
          await db.delete(accounts).where(like(accounts.username, '%test%'));
          console.log(`✅ Deleted ${testUsers.length} test users`);
        } else {
          console.log('❌ Cancelled');
        }
        break;
      }

      case '2': {
        if (inactiveUsers.length === 0) {
          console.log('❌ No inactive users found');
          break;
        }

        const confirmInactive = await prompt(
          `Delete ${inactiveUsers.length} inactive users? (yes/no): `,
        );
        if (confirmInactive.toLowerCase() === 'yes') {
          await db.delete(accounts).where(eq(accounts.isActive, 0));
          console.log(`✅ Deleted ${inactiveUsers.length} inactive users`);
        } else {
          console.log('❌ Cancelled');
        }
        break;
      }

      case '3': {
        const username = await prompt('Enter username to delete: ');
        const user = await db
          .select()
          .from(accounts)
          .where(eq(accounts.username, username));

        if (user.length === 0) {
          console.log('❌ User not found:', username);
          break;
        }

        if (user[0].role === 'admin') {
          console.log('⚠️  Warning: This is an admin user!');
          const confirmAdmin = await prompt(
            'Are you sure you want to delete an admin? (yes/no): ',
          );
          if (confirmAdmin.toLowerCase() !== 'yes') {
            console.log('❌ Cancelled');
            break;
          }
        }

        const confirmDelete = await prompt(
          `Delete user "${username}"? (yes/no): `,
        );
        if (confirmDelete.toLowerCase() === 'yes') {
          await db.delete(accounts).where(eq(accounts.username, username));
          console.log(`✅ Deleted user: ${username}`);
        } else {
          console.log('❌ Cancelled');
        }
        break;
      }

      case '4':
        console.log('❌ Cancelled');
        break;

      default:
        console.log('❌ Invalid choice');
    }
  } catch (error) {
    console.error('❌ Failed to cleanup users:', error);
  } finally {
    rl.close();
    process.exit(0);
  }
};

cleanupUsers();
