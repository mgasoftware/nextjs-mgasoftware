import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import NavBar from "~/components/NavBar";
import useGetDatas, { type Item } from "~/api/useGetDatas"
import Loading from "../loading";
import styles from "./item.module.css"

export interface UserState {
    token: string
}

export default function Item() {
    const router = useRouter()
    const query = router.query
    // const { token } = useSelector((state: { user: UserState }) => state.user)
    const [item, setItem] = useState<Item[] | null>()

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const { data, loading, error } = useGetDatas(`http://127.0.0.1:8000/api/v1/item/${query.itemId}`)

    useEffect(() => {
        setItem(data)

    }, [data])


    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>MGA Market</title>
            </Head>
            <NavBar />
            <main className={styles.containerMain}>
                <h1 className={styles.containerTitle}>{item?.name}</h1>
                <div className={styles.containerDesc}>
                    <div className={styles.containerImg}>
                        <Image
                            className={styles.img}
                            src={item?.image}
                            width={500}
                            height={400}
                            alt="Image item" />
                    </div>
                    <div className={styles.containerImg}>
                        <p className={styles.description}><strong>Description:</strong> {item?.description}</p>
                        <p className={styles.description}><strong>Prix:</strong> {item?.price}€</p>
                    </div>
                </div>
            </main>

        </div>
    )
}