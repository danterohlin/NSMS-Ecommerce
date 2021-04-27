import Head from 'next/head'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import styles from '../styles/login.module.css'

export default function Login() {

    const [email, setEmail] = useState("")
    const { loginUser } = useContext(AuthContext)

    const handleSubmit = (event) => {
        event.preventDefault()
        loginUser(email)
    }

    return (
        <div className={styles.login_wrapper}>
            <Head>
                <title>Login</title>
                <meta name="description" content="Login here to make your purchase"></meta>
            </Head>

            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                className={styles.input}
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter email.."
                />
                <button className={styles.button}>Login</button>
            </form>
        </div>
    )
}