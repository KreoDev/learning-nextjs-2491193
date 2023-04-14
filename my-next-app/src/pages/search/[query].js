import Layout from "../../components/Layout"
import { search } from "../api"

export default function News({ results, query }) {
  return (
    <Layout>
      <h1 className="mb-3 text-3xl font-bold text-indigo-300">
        Search: <span className="mb-3 text-3xl font-bold text-purple-300">{query}</span>
      </h1>
      <ul>
        {results.map((result) => {
          return (
            <li key={result.uri} className="marker:text-pink-500 list-disc list-inside text-left text-lg font-medium">
              <a href={result.url} target="_blank" rel="noopener norefferer">
                {result.title}
              </a>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

// to register for a new New York Times API KEY, visit :
const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ"
export async function getServerSideProps({ params }) {
  // The value of the `props` key will be
  //  passed to the `Home` component
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&api-key=${API_KEY}`
  const results = await search(URL)
  return {
    props: {
      results,
      query: params.query,
    },
  }
}
