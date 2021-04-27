import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import Link from 'next/link'

import AuthContext from '../context/AuthContext'
import { API_URL } from '../utils/urls'
import { twoDecimals } from '../utils/format'
import styles from '../styles/account.module.css'


const useOrders = (user, getToken) => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOrders = async () => {
            if(user) {
                try {
                    setLoading(true)
                    const token = await getToken()
                    const order_res = await fetch(`${API_URL}/orders`, {
                        headers: {
                            'Authorization': `bearer ${token}`
                        }
                    })
                    const data = await order_res.json()
                    setOrders(data)
                } catch (err) {
                    setOrders([])
                }
                setLoading(false)
            }
        }

        fetchOrders()
    }, [user])

    return {orders, loading }
}

export default function account() {

    const { user, logoutUser, getToken } = useContext(AuthContext)

    const { orders, loading } = useOrders(user, getToken)
    console.log("Account.render orders", orders)

    if(!user) {
        return(
            <div>
                <p>Please login or register</p>
                <Link href="/"><a>Go back</a></Link>
            </div>
        )
    }
    return (
        <div className={styles.account_wrapper}>
            <Head>
                <title>Account Page</title>
                <meta name="description" content="The account page, view your orders and logout"/>
            </Head>

            <h2 className={styles.account_header}>Account Page</h2>

            <h3>Your Orders</h3>
            {loading && <p>Loading your orders..</p>}
            {orders.map(order => (
                <div key={order.id}>
                    {new Date(order.created_at).toLocaleDateString( 'en-EN' )} {order.product.name} ${twoDecimals(order.total)} {order.status}
                </div>
            ))}
            <p className={styles.loggedInAs}>Logged in as: {user.email}</p>
            <a className={styles.logout} href="#" onClick={logoutUser}>Logout</a>
        </div>
    )
}