# KAIST Village Hall

[![Expo](https://img.shields.io/badge/expo-1c1e24?style=for-the-badge&logo=expo&logoColor=#d04A37)](https://expo.dev)
[![Hono](https://img.shields.io/badge/Hono-ffffff.svg?style=for-the-badge&logo=hono)](https://hono.dev)
[![Drizzle](https://img.shields.io/badge/drizzle-000.svg?style=for-the-badge&logo=drizzle)](https://orm.drizzle.team)
[![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)

## Introduction

KAIST Village Hall is a mental care app designed specifically for the KAIST community.
It enables users to share their concerns anonymously, receive professional counseling,
and engage in small challenges to positively enhance their lives. This platform
is dedicated to creating a supportive environment that fosters personal growth and
well-being.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Docker
- [Bun v1.1](https://bun.sh/) (JavaScript runtime and package manager)

### Installation

1. **Set up environment variables:**

   Copy the example environment files and, if necessary, modify them according to
   your local environment settings.

   ```bash
   cp packages/api/.env.example packages/api/.env
   cp packages/app/.env.example packages/app/.env
   ```

2. **Install dependencies:**

   Use Bun to install all necessary dependencies.

   ```bash
   bun install
   ```

3. **Database Setup:**

   Start the database container using Docker, then run database migrations to set
   up the required database schema.

   ```bash
   cd packages/api
   bun db up -d # This will start the database container in detached mode
   bun db:migrate
   cd -
   ```

4. **Running the application:**

   To start the application in development mode, use the following commands:

   ```bash
   # Terminal 1
   cd packages/app
   bun start

   # Terminal 2
   cd packages/api
   bun dev
   ```

## Commit Guidelines

This project uses [gitmoji](https://gitmoji.dev) for commit messages.
Check the [gitmoji specification](https://gitmoji.dev/specification) for more details.
