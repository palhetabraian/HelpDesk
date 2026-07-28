-- AlterTable
ALTER TABLE "users" ADD COLUMN     "availableHours" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "avatarURL" TEXT,
ADD COLUMN     "mustChangePassword" BOOLEAN NOT NULL DEFAULT false;
