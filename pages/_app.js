import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Head from 'next/head'

import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <content>
        <Head>
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet"/>
        </Head>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </content>
    </AuthProvider>
  )
}

export default MyApp
