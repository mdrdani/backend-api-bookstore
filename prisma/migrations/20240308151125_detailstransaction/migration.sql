/*
  Warnings:

  - You are about to alter the column `published` on the `books` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to drop the column `price` on the `transaction_details` table. All the data in the column will be lost.
  - You are about to alter the column `date` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `authorBook` to the `transaction_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageBook` to the `transaction_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceBook` to the `transaction_details` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleBook` to the `transaction_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `books` MODIFY `published` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `transaction_details` DROP COLUMN `price`,
    ADD COLUMN `authorBook` VARCHAR(255) NOT NULL,
    ADD COLUMN `imageBook` TEXT NOT NULL,
    ADD COLUMN `priceBook` INTEGER NOT NULL,
    ADD COLUMN `titleBook` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `transactions` MODIFY `date` DATETIME NOT NULL;
