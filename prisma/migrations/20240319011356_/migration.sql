/*
  Warnings:

  - You are about to alter the column `published` on the `books` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `date` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `published` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `date` DATETIME NOT NULL;
