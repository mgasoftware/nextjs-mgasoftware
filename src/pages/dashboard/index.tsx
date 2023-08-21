import ProtectedRoute from "~/utils/protectedRoute"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"

import NavBar from "~/components/NavBar"
import styles from "./dashboard.module.css"
import useGetDatas, { type Item } from "~/api/useGetDatas"
import Loading from "../loading"

export default function DashBoard() {
  const [items, setItems] = useState<Item[] | null>(null)
  const { data, loading } = useGetDatas('https://mgamarket-djangoapp.onrender.com/api/v1/item/')

  useEffect(() => {
    setItems(data)
  }, [data])

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <Head>
          <title>MGA Market</title>
        </Head>
        <NavBar />
        <main className={styles.containerMain}>
          <div>
            <h1 className={styles.containerTitle}>Dernières nouveautés</h1>
            <div className={styles.containerProfile}>
              {items?.slice().reverse().map(item => (
                <div key={item.id} className={styles.card}>
                  <a href={`item/${item.id}`}>
                    <Image
                      className={styles.cardImage}
                      priority={true} 
                      src={item.image}
                      width={200}
                      height={250}
                      alt="Image item" />
                    <div className={styles.cardDescrib}>
                      <p className={styles.cardName}>{item.name}</p>
                      <p className={styles.cardPrice}>{item.price}€</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
