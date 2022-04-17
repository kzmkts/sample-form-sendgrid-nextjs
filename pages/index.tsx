import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import ContactForm from '@/components/ContactForm'

const Home: NextPage = () => {
  return (
    <Layout title="Index-Page">
      <h1 className="text-6xl font-bold">Contact</h1>
      <ContactForm />
    </Layout>
  )
}

export default Home
