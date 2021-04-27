import { useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import styles from '../styles/header.module.css'

import AuthContext from '../context/AuthContext'

export default () => {

    const router = useRouter()
    const isHome = router.pathname === "/"

    const goBack = (event) => {
        event.preventDefault()
        router.back()
    }

    const { user } = useContext(AuthContext)

    return (
        <div className={styles.nav_wrapper}>
            <div className={styles.nav}>
                {!isHome &&
                    <div className={styles.back}>
                        <a onClick={goBack}>{"<"} Back</a>
                    </div>
                }
                {isHome &&
                    <div className={styles.back_parry}>
                        <a></a>
                    </div>
                }
                <div className={styles.title}>
                    <Link href="/">
                        <h1>The E-Commerce</h1>
                    </Link>
                </div>

                <div className={styles.auth}>
                    {user ? (
                        <Link href="/account">
                            <a><img src="/User_icon.png" alt={user.email}/></a>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <a>Log in</a>
                        </Link>
                    )}

                </div>
            </div>
        </div>
    )
}