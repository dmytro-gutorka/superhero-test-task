-- CreateTable
CREATE TABLE "Superhero" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "realName" TEXT,
    "originDescription" TEXT,
    "superpowers" TEXT NOT NULL,
    "catchPhrase" TEXT,
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
