/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "userUser_id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pet" ADD CONSTRAINT "Pet_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
