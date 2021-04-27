import { useContext } from 'react'
import { useRouter } from 'next/router'
import { loadStripe } from '@stripe/stripe-js'

import styles from '../styles/buyButton.module.css'
import AuthContext from '../context/AuthContext'
import { STRIPE_PK, API_URL } from '../utils/urls'

const stripePromise = loadStripe(STRIPE_PK)

export default function BuyButton ({ product }) {

    const { user, getToken } = useContext(AuthContext)
    const router = useRouter()

    const redirectToLogin = () => {
        router.push('/login')
    }

    const handleBuy = async () => {
        const stripe = await stripePromise
        const token = await getToken()

        const res = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            body: JSON.stringify({ product }),
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        })
        const session = await res.json()

        const result = await stripe.redirectToCheckout({
            sessionId: session.id
        })
    }

    return (
        <>
            {!user &&
                <button
                    className={styles.buy}
                    onClick={redirectToLogin}
                    >Login to Buy
                </button>
            }
            {user &&
                <button
                    className={styles.buy}
                    onClick={handleBuy}
                    >BUY
                </button>
            }
        </>
    )
}