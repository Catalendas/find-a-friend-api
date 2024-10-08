-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ONG');

-- CreateTable
CREATE TABLE "Pet" (
    "pet_id" TEXT NOT NULL,
    "pet_name" TEXT NOT NULL,
    "pet_description" TEXT,
    "age" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "energy_level" INTEGER NOT NULL,
    "level_of_independence" INTEGER NOT NULL,
    "environment" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("pet_id")
);

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "addres" TEXT NOT NULL,
    "uphone" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Pet_pictures" (
    "picture_id" TEXT NOT NULL,
    "ppicture_path" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pictures_pkey" PRIMARY KEY ("picture_id")
);

-- AddForeignKey
ALTER TABLE "Pet_pictures" ADD CONSTRAINT "Pet_pictures_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "Pet"("pet_id") ON DELETE RESTRICT ON UPDATE CASCADE;
