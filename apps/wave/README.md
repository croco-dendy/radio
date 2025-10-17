# Wave Radio Backend

Real-time radio streaming platform with WebSocket chat, audio file management, and admin panel.

## 🚀 Quick Start

### Development
```bash
bun install
bun run dev
```

### Database Setup
```bash
bun run db:migrate
```

### Create Admin User
```bash
bun run admin
```
Interactive script to create or promote admin users. See [Admin Setup Guide](../../docs/setup/admin-setup.md) for details.

## 📋 Available Scripts

### Development
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server

### Database
- `bun run db:migrate` - Run database migrations
- `bun run db:generate` - Generate new migration
- `bun run db:push` - Push schema changes
- `bun run db:studio` - Open database browser
- `bun run db:test` - Test database connection

### Admin Management
- `bun run admin` - Interactive admin creation (recommended)
- `bun run check-users` - List all users
- `bun run promote-admin` - Promote existing user to admin
- `bun run create-admin` - Create new admin user

### Services
- `bun run rtmp` - Start RTMP streaming server
- `bun run telegram` - Start Telegram stream service

## 🏗️ Architecture

### Core Features
- **WebSocket Server**: Real-time chat and streaming
- **REST API**: Collection and user management
- **File Upload**: Audio file handling with metadata
- **Authentication**: JWT-based auth with roles
- **Database**: SQLite with Drizzle ORM

### Key Components
- **Chat System**: WebSocket-based real-time chat
- **Collection Management**: Audio file organization
- **User Management**: Role-based access control
- **Admin Panel**: Web-based administration interface

## 🗄️ Database Schema

### Tables
- **accounts**: User accounts with roles
- **collections**: Audio file collections
- **audio_files**: Uploaded audio files with metadata
- **collection_items**: Many-to-many collection/audio relationships
- **sessions**: User authentication sessions

## 🔐 Authentication

### User Roles
- **user**: Basic user permissions
- **admin**: Full admin panel access

### Admin Setup
1. Run `bun run admin` for interactive setup
2. Choose to create new admin or promote existing user
3. Login to admin panel at `/admin`

See [Admin Setup Guide](../../docs/setup/admin-setup.md) for detailed instructions.

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Collections
- `GET /api/collections` - List collections
- `POST /api/collections` - Create collection
- `PUT /api/collections/:id` - Update collection
- `DELETE /api/collections/:id` - Delete collection

### Audio Files
- `POST /api/audio-files/upload` - Upload audio file
- `GET /api/audio-files/:id` - Get audio file info
- `GET /api/audio-files/:id/stream` - Stream audio file
- `DELETE /api/audio-files/:id` - Delete audio file

### User Management (Admin only)
- `GET /api/accounts` - List users
- `POST /api/accounts` - Create user
- `PUT /api/accounts/:id` - Update user
- `DELETE /api/accounts/:id` - Delete user

## 🔧 Configuration

### Environment Variables
```bash
PORT=6870                    # Server port
DATABASE_URL=data/wave.sqlite # Database path
JWT_SECRET=your-secret-key   # JWT signing key
```

### File Storage
- Audio files: `data/uploads/`
- Database: `data/wave.sqlite`
- Logs: `logs/`

## 📁 Project Structure

```
src/
├── api/           # REST API routes and handlers
├── db/            # Database schema and queries
├── services/      # Business logic services
├── utils/         # Utility functions
├── ws/            # WebSocket server and handlers
└── scripts/       # Database and admin scripts
```

## 🛠️ Development

### Adding New Features
1. Update database schema in `src/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Create service in `src/services/`
4. Add API routes in `src/api/routes/`
5. Add handlers in `src/api/handlers/`

### Testing
```bash
bun test
bun run db:test  # Test database connection
```

## 📚 Documentation

- [Admin Setup Guide](../../docs/setup/admin-setup.md)
- [API Documentation](../../docs/api/README.md)
- [Database Schema](../../docs/database/schema.md)

## 🚀 Deployment

### Production
```bash
bun run build
bun run start
```

### PM2 (Process Manager)
```bash
bun run pm2:start    # Start with PM2
bun run pm2:stop     # Stop PM2 processes
bun run pm2:restart  # Restart PM2 processes
bun run pm2:logs     # View PM2 logs
```

## 🔍 Troubleshooting

### Common Issues
- **Port in use**: Change PORT in environment or kill existing process
- **Database locked**: Ensure no other processes are using the database
- **Admin access**: Use `bun run admin` to create admin user

### Logs
- Application logs: `logs/`
- PM2 logs: `bun run pm2:logs`
- Database studio: `bun run db:studio`

---

**Related**: [Admin Panel](../admin/README.md) | [Player App](../player/README.md)
