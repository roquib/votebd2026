# VoteBD Setup Guide

This document explains how to set up and run the VoteBD project after cloning the repository.

## Prerequisites

Before running this project, ensure you have the following installed:

### Required Software

1. **Node.js** (v12.x recommended)
   ```bash
   # Using nvm (recommended)
   nvm install 12
   nvm use 12
   ```

2. **MongoDB** (v4.4 or v8.x)
   - Install MongoDB Community Edition
   - Start MongoDB service on `localhost:27017`

3. **Bower** (for frontend dependencies)
   ```bash
   npm install -g bower
   ```

4. **Grunt CLI** (for build tasks)
   ```bash
   npm install -g grunt-cli
   ```

## Setup Steps After Cloning

### 1. Install Node Dependencies

```bash
npm install --ignore-scripts
```

> **Note:** We use `--ignore-scripts` because the default bower version in package.json is outdated.

### 2. Install Bower Dependencies

```bash
bower install --allow-root
```

### 3. Restore Configuration Files

The repository may have backup config files. Restore them if the main files are missing:

```bash
# If Gruntfile.js is missing
cp Gruntfile_bkup.js Gruntfile.js

# If server config files are missing
cp server/config_backup.json server/config.json
cp server/config.local_backup.json server/config.local.json
cp server/datasources_backup.json server/datasources.json
```

### 4. Create Required Directories

```bash
mkdir -p storage
```

### 5. Configure Server Port

Edit `server/config.json` and `server/config.local.json` to set the port:

```json
{
  "port": 3000
}
```

### 6. Configure Database

Edit `server/datasources.json` to set your MongoDB database name:

```json
{
  "votebdmongo": {
    "host": "localhost",
    "port": 27017,
    "database": "votebd",
    "name": "votebdmongo",
    "connector": "mongodb"
  }
}
```

### 7. Upgrade MongoDB Connector (if using MongoDB 5.x+)

If you're using MongoDB 5.x or newer, upgrade the connector:

```bash
npm install loopback-connector-mongodb@5.5.0
```

## Running the Project

### Option 1: Full Development Mode (Frontend + API with livereload)

```bash
source ~/.nvm/nvm.sh && nvm use 12
grunt serve
```

This starts:
- **Frontend with livereload**: http://localhost:9003
- **API Server**: http://localhost:3000

### Option 2: API Server Only

```bash
source ~/.nvm/nvm.sh && nvm use 12
npm run dev
```

- **API**: http://localhost:3000

### Option 3: Production Mode

```bash
source ~/.nvm/nvm.sh && nvm use 12
grunt build
npm start
```

## Accessing the Admin Panel

### Login URL

Open your browser and go to:
- http://localhost:9003 (if using `grunt serve`)
- http://localhost:3000 (if using `npm run dev`)

### Default Admin Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@admin.com | admin |
| User | user@user.com | user |

### Admin Panel Features

After logging in as admin, you will have access to:

1. **Dashboard** - Overview and statistics
2. **Elections** - Manage election data
3. **Candidates** - Manage candidate profiles and forms
4. **Political Parties** - Manage party information
5. **Users** - User management
6. **Settings** - Application settings

### Viewing the Affidavit Form (হলফনামা)

1. Login as admin (`admin@admin.com` / `admin`)
2. Navigate to **Candidates** from the sidebar
3. Select a candidate from the list
4. Click on the **হলফনামা (Affidavit)** tab

The affidavit form contains:
- Personal information (নাম, পিতার নাম, মাতার নাম, ঠিকানা)
- National ID and voter information
- Criminal case history
- Dependents section
- Income sources
- Assets and liabilities
- Signature section

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/votebd` |
| `INITDB` | Load seed data on startup | `false` |
| `DEV_ACCESS_TOKEN` | Development API token | - |
| `API_URL` | API URL for lb-services generation | `http://0.0.0.0:3000/api` |

### Example with environment variables:

```bash
MONGODB_URL="mongodb://localhost:27017/votebd" INITDB=true npm run dev
```

## API Endpoints

Once running, the API is available at:
- API Root: `http://localhost:3000/api`
- Explorer (if enabled): `http://localhost:3000/explorer`

## Troubleshooting

### MongoDB Connection Error

If you see `Unsupported OP_QUERY command` error:
```bash
npm install loopback-connector-mongodb@5.5.0
```

### Port Permission Error (port 80)

Change the port to 3000 in config files:
```bash
# Edit server/config.json and server/config.local.json
# Change "port": 80 to "port": 3000
```

### Missing Bower Dependencies

Some bower packages may have moved. If bower install fails:
1. Check `bower.json` for outdated package URLs
2. Update to working forks/versions

### Node Version Issues

This project works best with Node.js 12.x. If using newer versions, you may encounter compatibility issues with some dependencies.

## Project Structure

```
votebd2023/
├── server/           # LoopBack backend
│   ├── boot/        # Boot scripts (run in order)
│   ├── models/      # Server-specific models
│   └── *.json       # Configuration files
├── common/
│   └── models/      # Shared model definitions
├── client/
│   └── app/         # AngularJS frontend
│       ├── modules/ # Feature modules
│       └── js/      # Main app files
├── storage/         # File uploads directory
└── test/            # Test files
```
