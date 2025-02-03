-- CreateTable
CREATE TABLE "Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "done" BOOLEAN NOT NULL DEFAULT false,
    "details" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");
