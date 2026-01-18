-- CreateTable
CREATE TABLE "Superhero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "real_name" TEXT,
    "origin_description" TEXT,
    "superpowers" TEXT NOT NULL,
    "catch_phrase" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "superheroId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Image_superheroId_fkey" FOREIGN KEY ("superheroId") REFERENCES "Superhero" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
