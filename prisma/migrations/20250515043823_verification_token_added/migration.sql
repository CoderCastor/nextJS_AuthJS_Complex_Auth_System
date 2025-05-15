-- CreateTable
CREATE TABLE "verificaionToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "verificaionToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "verificaionToken_token_key" ON "verificaionToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificaionToken_email_token_key" ON "verificaionToken"("email", "token");
