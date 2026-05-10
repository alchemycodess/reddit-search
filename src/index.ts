import { prisma } from "./lib/prisma";

import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173"
    })
)

async function getRedditData(request: string) {
    const url = `https://www.reddit.com/search.json?q=${request}`
    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`)
        }

        const result = await response.json()
    
        // now i can loop through the array to get all things?
        //ex logs
        // console.log("res: ", result.data.children[0].data.title)
        const allData = result.data.children
        // diff method
        // for(const {data: {title, subreddit, author, ups, num_comments, created_utc, selftext, permalink}} of allData) {
        //     // console.log(`${title} | ${subreddit} | ${author} | ${ups}`)
        //     // console.log("data:", data.data.title)
            
        // }
        for(const data of allData) {
            // console.log("d: ", data.data)
            const { id, title, subreddit, author, ups, num_comments, created_utc, selftext, permalink, thumbnail } = data.data
            
            // console.log("res: ", { id })
            
            const upsertPost = await prisma.post.upsert({
                where: {redditId: id},
                update: {
                    title,
                    subreddit,
                    author,
                    ups,
                    num_comments,
                    selftext,
                    permalink,
                    thumbnail
                },
                create: {
                    redditId: id,
                    title,
                    subreddit,
                    author,
                    ups,
                    num_comments,
                    created_utc,
                    selftext,
                    permalink,
                    thumbnail
                }
            })
            // console.log("saved: ", upsertPost.selftext)
        }
    } catch (error: any) {
        console.error("err: ", error.message)
    }
}

app.get("/api/search", async (req, res) => {
    try {
        const q = req.query.q as string
        console.log("user searched for: ", q)
    
        // calling fetch with the req coming from FE
        await getRedditData(q)
    
        // ok after this function this result will run and give me result and we are sending result in json
        const result = await prisma.$queryRaw`
            SELECT "redditId", title, subreddit, author, ups, permalink, selftext,
                ts_rank(to_tsvector('english', title || ' ' || coalesce(selftext, '')),
                plainto_tsquery('english', ${q})) AS rank
            FROM "post"
            WHERE to_tsvector('english', title || ' ' || coalesce(selftext, ''))
                @@ plainto_tsquery('english', ${q})
            ORDER BY rank DESC
            LIMIT 20
        `
    
        res.json(result)
    } catch (error: any) {
        console.error("err: ", error.message)
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})