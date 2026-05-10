-- CreateTable
CREATE TABLE "post" (
    "redditId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subreddit" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "ups" INTEGER NOT NULL,
    "num_comments" INTEGER NOT NULL,
    "created_utc" BIGINT NOT NULL,
    "selftext" TEXT,
    "permalink" TEXT NOT NULL,
    "thumbnail" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("redditId")
);
