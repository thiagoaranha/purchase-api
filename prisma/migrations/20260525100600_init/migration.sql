-- CreateTable
CREATE TABLE "purchases" (
    "id" UUID NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "transaction_date" DATE NOT NULL,
    "purchase_amount_usd" DECIMAL(18,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "purchases_pkey" PRIMARY KEY ("id")
);
