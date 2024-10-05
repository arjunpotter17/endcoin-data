-- DropIndex
DROP INDEX "Records_Wallet_address_key";

-- AlterTable
ALTER TABLE "Records" ADD CONSTRAINT "Records_pkey" PRIMARY KEY ("Wallet_address");
