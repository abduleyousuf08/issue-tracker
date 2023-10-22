-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_assignedToUserId_fkey`;

-- AddForeignKey
ALTER TABLE `issue` ADD CONSTRAINT `issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
