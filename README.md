# Superhero Database (Test Task)

Full-stack web app to manage a superhero database with CRUD operations and image management.

## Tech Stack

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite
- Multer (image uploads)

### Frontend
- React + TypeScript
- Vite
- React Router
- TanStack Query
- MUI


## Requirements Covered

✅ Create, edit and remove a superhero  
✅ Assign and remove images for a superhero (upload + bulk remove)  
✅ List superheroes with pagination (5 per page by default), show nickname + one image  
✅ View superhero details with all info + all images  
✅ Basic error handling and validation  
✅ Unit tests for main logic (backend)

## Prerequisites

- Node.js 18+ (recommended)
- npm (or yarn/pnpm)


# Backend Setup 
P.S .env file is stored in the repo, just to make project setup a little easier

## 1) Install dependencies

```bash
cd backend
npm install
```

## 3) Prisma migrate (create DB tables)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## 4) Run backend

```bash
npm run dev
```


# Frontend Setup (from zero)
P.S .env file is stored in the repo, just to make project setup a little easier

## 1) Install dependencies

```bash
cd ../frontend
npm install
```

## 2) Run frontend

```bash
npm run dev
```

P.S .env file is stored in the repo, just to make setup a little easier



## Images

Upload images for superhero


Form-data:
key: images (multiple files)

max files: 10

allowed: jpeg/png/webp

## Running Tests (Backend)
```bash
cd backend
npm run test
```



## Assumptions

- SQLite is used to keep setup simple.

- Images are stored on local filesystem (backend/uploads) and referenced by URL in DB.

- Only basic validation rules are used (required nickname, superpowers as list).

- No authentication/authorization is implemented (not required by task).

- Pagination defaults: page=1, limit=5, max limit clamped to 50.

