import { useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Layout from "../../components/Layout"
import { handler } from "../api"

const News = ({ results, title }) => {
  const [query, getQuery] = useState()
  const router = useRouter()
  const handleOnChange = (e) => getQuery(e.target.value)
  const handleOnSubmit = (e) => {
    e.preventDefault()
    router.push(`/search/${query}`)
  }
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main>
        <h1 className="mb-3 text-3xl font-bold text-indigo-300">{title}</h1>
        <form onSubmit={handleOnSubmit}>
          <input type="text" onChange={handleOnChange} className="caret-pink-500 text-black mb-3 p-1" />
        </form>
        <ul>
          {results.map((result) => {
            const key = title === "Sections" ? `/section/${result.section}` : result.uri
            return (
              <li key={key} className="marker:text-pink-500 list-disc list-inside text-left text-lg font-medium">
                {title === "Sections" ? (
                  <Link href={key}>{result.display_name}</Link>
                ) : (
                  <a href={result.url} target="_blank" rel="noopener norefferer">
                    {result.title}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { path: "top-stories" } }, { params: { path: "popular" } }, , { params: { path: "sections" } }],
    fallback: true, // false or 'blocking'
  }
}

const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ"
export async function getStaticProps({ params }) {
  const TOP_STORIES_URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`
  const POPULAR_URL = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`
  const SECTIONS_URL = `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`

  // The value of the `props` key will be
  //  passed to the `Home` component
  switch (params.path) {
    case "top-stories":
      return {
        props: {
          results: await handler(TOP_STORIES_URL),
          title: "Top Stories",
        },
      }
    case "popular":
      return {
        props: {
          results: await handler(POPULAR_URL),
          title: "Popular",
        },
      }
    case "sections":
      return {
        props: {
          results: await handler(SECTIONS_URL),
          title: "Sections",
        },
      }

    default: {
      return {
        props: null,
      }
    }
  }
}
export default News
