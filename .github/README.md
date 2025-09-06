# GitHub Actions CI/CD

Automated testing and validation workflows for the radio streaming platform.

## Workflows

### 🧪 `test.yml` - Basic Tests
**Triggers:** Push to main, feature branches, and pull requests
- Runs Wave backend tests
- Validates TypeScript types
- Basic linting checks

### 🔄 `ci.yml` - Full CI Pipeline
**Triggers:** Push/PR to main, develop, feature branches
- **Backend Tests**: Monitoring service tests and type checking
- **Frontend Tests**: Admin panel type checking and builds
- **Integration**: Project structure validation
- **Summary**: Complete pipeline status

### 📊 `monitoring.yml` - Monitoring Service
**Triggers:** Changes to monitoring service files only
- Focused testing for monitoring service
- API endpoint validation
- Service method verification

## What Gets Tested

### ✅ Backend (Wave)
- Monitoring service integration tests (11 tests)
- TypeScript type checking
- Service exports validation
- API endpoint functionality

### ✅ Frontend (Admin)
- TypeScript compilation
- Build process
- Basic structure validation

### ✅ Integration
- Project structure integrity
- Service interconnections
- Export/import validation

## Status Badges

Add these to your README.md:

```markdown
![Tests](https://github.com/your-username/radio/workflows/Tests/badge.svg)
![CI](https://github.com/your-username/radio/workflows/CI/badge.svg)
![Monitoring](https://github.com/your-username/radio/workflows/Monitoring%20Service/badge.svg)
```

## Local Testing

Run the same commands locally:

```bash
# Install dependencies
bun install

# Run backend tests
cd apps/wave && bun test

# Type checking
cd apps/wave && bun run check-types
```

## Workflow Features

- **Fast**: Uses Bun for speed
- **Focused**: Monitoring workflow only runs on relevant changes
- **Comprehensive**: Full CI pipeline for complete validation
- **Informative**: Clear success/failure messages
- **Parallel**: Jobs run concurrently when possible

## Requirements

- Bun runtime (automatically installed in workflows)
- Valid `package.json` in workspace root
- Test files in `apps/wave/src/tests/`
- TypeScript configuration

The workflows will automatically run on every push and pull request, ensuring your monitoring service and radio platform stay reliable! 🎵
