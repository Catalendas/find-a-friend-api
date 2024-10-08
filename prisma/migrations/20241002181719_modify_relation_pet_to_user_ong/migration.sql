/*
  Warnings:

  - Added the required column `userUser_id` to the `Pet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `petPet_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" ADD COLUMN     "userUser_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "petPet_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
