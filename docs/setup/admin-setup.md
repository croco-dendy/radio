# Admin User Management

This guide covers how to create and manage admin users for the Wave Radio platform.

## 🚀 Quick Start

### Interactive Admin Creation (Recommended)

The easiest way to create or promote admin users:

```bash
cd /home/croco/dev/radio/apps/wave
bun run admin
```

This interactive script will:
- Show all existing users
- Let you choose to create new admin or promote existing user
- Guide you through the process with prompts

## 📋 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Interactive Admin** | `bun run admin` | Interactive admin creation/promotion |
| **Check Users** | `bun run check-users` | List all users and their roles |
| **Promote User** | `bun run promote-admin` | Promote existing "admin" user to admin role |
| **Create Admin** | `bun run create-admin` | Create new admin with predefined details |

## 🎯 Method 1: Interactive Creation (Recommended)

### Step 1: Run Interactive Script
```bash
cd apps/wave
bun run admin
```

### Step 2: Choose Your Option
```
What would you like to do?
1. Create new admin user
2. Promote existing user to admin

Enter your choice (1 or 2): 
```

### Step 3a: Create New Admin User
If you choose option 1:
```
Enter username: your_username
Enter email: your_email@domain.com
Enter password (min 8 characters): ********
```

### Step 3b: Promote Existing User
If you choose option 2:
```
Enter username to promote to admin: existing_username
```

## 🔧 Method 2: Direct Scripts

### Check Existing Users
```bash
bun run check-users
```

Output example:
```
👤 Found 5 user(s):

1. Username: testuser
   Email: test@example.com
   Role: user
   Active: Yes
   Created: 2025-10-15 17:25:43

2. Username: admin
   Email: admin@wave.local
   Role: user
   Active: Yes
   Created: 2025-10-15 18:00:06
```

### Promote Existing "admin" User
```bash
bun run promote-admin
```

This promotes the user with username "admin" to admin role.

### Create New Admin (Predefined)
```bash
# Edit the script first to set your details
nano src/scripts/create-admin.ts

# Then run
bun run create-admin
```

## 🗄️ Database Schema

### Accounts Table Structure
```sql
CREATE TABLE accounts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',        -- 'user' or 'admin'
  is_active INTEGER DEFAULT 1,     -- 1 = active, 0 = inactive
  last_login_at TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### User Roles
- **`user`**: Regular user with basic permissions
- **`admin`**: Administrator with full access to admin panel

## 🔐 Security Best Practices

### Password Requirements
- Minimum 8 characters
- Automatically hashed with bcrypt (12 rounds)
- Never stored in plain text

### Admin Access
- Admin users can access the admin panel at `/admin`
- Admin users can manage collections and other users
- JWT tokens are used for authentication

## 🛠️ Troubleshooting

### Common Issues

#### "UNIQUE constraint failed: accounts.username"
**Problem**: Username already exists
**Solution**: 
- Use `bun run check-users` to see existing usernames
- Choose a different username
- Or promote the existing user instead

#### "UNIQUE constraint failed: accounts.email"
**Problem**: Email already exists
**Solution**: 
- Use `bun run check-users` to see existing emails
- Choose a different email
- Or promote the existing user instead

#### "User not found"
**Problem**: Trying to promote non-existent user
**Solution**: 
- Use `bun run check-users` to see available usernames
- Use exact username (case-sensitive)

### Database Access

#### View Database in Browser
```bash
bun run db:studio
```
Opens Drizzle Studio in your browser to view/edit database.

#### Direct Database Access
```bash
sqlite3 data/wave.sqlite
.tables
SELECT * FROM accounts;
```

## 📁 Script Locations

All admin management scripts are located in:
```
apps/wave/src/scripts/
├── interactive-admin.ts    # Interactive admin creation
├── check-users.ts         # List all users
├── promote-to-admin.ts    # Promote existing user
└── create-admin.ts        # Create new admin (predefined)
```

## 🔄 Manual Database Operations

### Promote User to Admin (SQL)
```sql
UPDATE accounts 
SET role = 'admin', updated_at = CURRENT_TIMESTAMP 
WHERE username = 'your_username';
```

### Create Admin User (SQL)
```sql
INSERT INTO accounts (username, email, password_hash, role) 
VALUES ('admin', 'admin@example.com', '$2a$12$...', 'admin');
```

### Check User Roles (SQL)
```sql
SELECT username, email, role, is_active FROM accounts;
```

## 🚀 After Creating Admin

1. **Login to Admin Panel**: Navigate to `/admin` and login with your credentials
2. **Change Password**: Update your password in the admin panel for security
3. **Manage Users**: Use the admin panel to create/manage other users
4. **Manage Collections**: Access collection management features

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Use `bun run check-users` to verify current state
3. Check database with `bun run db:studio`
4. Review logs in the terminal output

---

**Next Steps**: [Admin Panel Usage](../apps/admin-panel.md) | [API Documentation](../api/README.md)
