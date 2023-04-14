import Link from "next/link"
import Layout from "../../components/Layout"
import contacts from "../api/contacts"

export default function Contacts() {
  return (
    <Layout>
      <ul>
        {contacts.map((contact) => {
          return (
            <li key={contact.id} className="marker:text-pink-500 list-disc list-inside text-left text-lg font-medium">
              <Link href={`contacts/${contact.id}`}>{contact.name}</Link>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}
