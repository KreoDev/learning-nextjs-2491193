import Head from "next/head"
import Layout from "../../components/Layout"
import Link from "next/link"
import { handler } from "../api"

function Posts({ results, title }) {
  // Render post...
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      <main>
        <h1 className="mb-3 text-3xl font-bold text-indigo-300">{title}</h1>
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
// to register for a new New York Times API KEY, visit :
const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ"

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const results = await handler(`https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`)
  return {
    paths: results.map((result) => {
      return { params: { section: result.section } }
    }),
    fallback: false,
  }
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // Pass post data to the page via props
  const results = await handler(`https://api.nytimes.com/svc/news/v3/content/nyt/${params.section}.json?api-key=${API_KEY}`)
  return {
    props: {
      results,
      title: params.section,
    },
  }
}

export default Posts
