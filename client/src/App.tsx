import { useState } from 'react'

// import './App.css'

function App () {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  async function resultData() {
    try {
      setLoading(true)
      setSearched(true)

      setPosts([])
      const url = `https://reddit-search-24wf.onrender.com/api/search?q=${search}`

      const response = await fetch(url)
      if(!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      const result = await response.json()
      setPosts(result || [])
      // console.log("arr: ", arr)
      // console.log("r: ", result)

    } catch (error: any) {
        console.error("err: ", error.message)
    } finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   resultData()
  // }, [])

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#000000",
        padding: "40px 20px",
        fontFamily: "Urbanist, sans-serif",
        color: "#FFFFFF",
        overflowX: "hidden",
        width: "100%",
        boxSizing: "border-box"
      }}
    >

      <h1
        style={{
          fontSize: window.innerWidth < 768 ? "38px" : "58px",
          marginBottom: "24px",
          fontWeight: "700",
          color: "#FFFFFF",
          textAlign: "center",
          lineHeight: "1.1"
        }}
      >
        Reddit Search
      </h1>

      {/* Search Bar */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto 28px",
          display: "flex",
          gap: "12px",
          flexDirection: window.innerWidth < 768 ? "column" : "row",
          width: "100%"
        }}
      >

        <input
          type="text"
          placeholder="Search Reddit posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "16px 18px",
            borderRadius: "18px",
            border: "2px solid #83AF3B",
            background: "#111111",
            color: "#FFFFFF",
            outline: "none",
            fontSize: "15px",
            fontFamily: "Urbanist, sans-serif",
            boxSizing: "border-box",
            width: "100%",
            minWidth: 0,
          }}
        />

        <button
          onClick={resultData}
          style={{
            padding: "16px 24px",
            borderRadius: "18px",
            border: "none",
            background: "#D7FE03",
            color: "#000000",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "15px",
            fontFamily: "Urbanist, sans-serif",
            width: window.innerWidth < 768 ? "100%" : "auto",
          }}
        >
          Search
        </button>
    </div>
    
    {/* Hero Section */}
    {!searched && !loading && (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >

        <p
          style={{
            color: "#9CA3AF",
            fontSize: "18px",
            lineHeight: "1.8",
          }}
        >
          Search anything from Reddit and discover
          discussions, interview experiences, guides,
          and community insights.
        </p>
      </div>
    )}

    {/* Loading State */}
    {loading && (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "34px",
            color: "#FFFFFF",
            marginBottom: "12px",
            fontWeight: "700",
          }}
        >
          Searching...
        </h2>

        <p
          style={{
            color: "#9CA3AF",
            fontSize: "16px",
            lineHeight: "1.7",
          }}
        >
          Fetching Reddit discussions and community insights.
        </p>
      </div>
    )}

    {/* No Results */}
    {!loading && searched && posts.length === 0 && (
      <div
        style={{
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "#999999",
        }}
      >
        <h2
          style={{
            fontSize: "34px",
            marginBottom: "10px",
            color: "#FFFFFF",
          }}
        >
          No Results Found
        </h2>

        <p
          style={{
            fontSize: "15px",
            lineHeight: "1.7",
            maxWidth: "500px",
          }}
        >
          The topic you searched for does not exist
          or has no matching Reddit discussions.
        </p>
      </div>
    )}

    {/* Posts */}
    {!loading && posts.length > 0 && (
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {posts.map((post: any) => (
          <div
            key={post.redditId}
            style={{
              background: "#111111",
              border: "1px solid #222222",
              borderRadius: "24px",
              padding: window.innerWidth < 768 ? "18px" : "24px",
              marginBottom: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
              overflow: "hidden",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              boxSizing: "border-box",
            }}
          >
            {/* Meta */}
            <div
              style={{
                fontSize: "13px",
                color: "#83AF3B",
                marginBottom: "12px",
                fontWeight: 600,
                wordBreak: "break-word",
              }}
            >
              r/{post.subreddit} • by u/{post.author} •{" "}
              {post.ups} upvotes
            </div>

            {/* Title */}
            <a
              href={`https://reddit.com${post.permalink}`}
              target="_blank"
              style={{
                fontSize: window.innerWidth < 768 ? "20px" : "24px",
                fontWeight: 700,
                color: "#FFFFFF",
                textDecoration: "none",
                lineHeight: "1.5",
                wordBreak: "break-word",
                overflowWrap: "break-word",
                display: "block",
              }}
            >
              {post.title.replace(/&amp;/g, "&")}
            </a>

            {/* Description */}
            {post.selftext && (
              <p
                style={{
                  marginTop: "14px",
                  fontSize: "15px",
                  color: "#CFCFCF",
                  lineHeight: "1.8",
                  wordBreak: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {post.selftext.slice(0, 150)}...
              </p>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
) 
}

export default App
