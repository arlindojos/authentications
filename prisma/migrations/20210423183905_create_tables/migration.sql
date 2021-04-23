/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[username]` on the table `users`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users.username_unique" ON "users"("username");
