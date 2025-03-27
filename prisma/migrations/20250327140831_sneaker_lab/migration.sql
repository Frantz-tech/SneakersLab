-- CreateEnum
CREATE TYPE "BadgeType" AS ENUM ('Influenceur', 'Professionnel', 'Fidèle', 'Modérateur', 'Community_Helper');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(50) NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "dateNaissance" TIMESTAMP(3) NOT NULL,
    "email" VARCHAR(200) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "pseudo" VARCHAR(100) NOT NULL,
    "profilPic" TEXT,
    "expertise" VARCHAR(50) NOT NULL,
    "dateInscription" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" VARCHAR(250) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Badge" (
    "id" SERIAL NOT NULL,
    "name" "BadgeType" NOT NULL,
    "icon" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "adminId" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "type" VARCHAR(10) NOT NULL,
    "nbMembres" INTEGER NOT NULL DEFAULT 0,
    "maxMembres" INTEGER,
    "dateCreation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersGroup" (
    "id" SERIAL NOT NULL,
    "membreId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "dateAdhesion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UsersGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_dateNaissance_key" ON "User"("dateNaissance");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersGroup" ADD CONSTRAINT "UsersGroup_membreId_fkey" FOREIGN KEY ("membreId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersGroup" ADD CONSTRAINT "UsersGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
