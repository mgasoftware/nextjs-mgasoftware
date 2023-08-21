import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";

import NavBar from "~/components/NavBar";
import useGetDatas, { type Item } from "~/api/useGetDatas"
import Loading from "../loading";
import styles from "./item.module.css"

export default function Item() {
    const { query } = useRouter();
    const itemId = query.itemId;
    const [item, setItem] = useState<Item | null>()

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const { data, loading } = useGetDatas(`https://mgamarket-djangoapp.onrender.com/api/v1/item/${itemId}`)

    useEffect(() => {
        setItem(data);
    }, [data, item])


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
                        {item && (
                            <Image
                                className={styles.img}
                                src={item.image}
                                priority={true}
                                width={500}
                                height={400}
                                alt={`Image de l'item ${item.name}`}
                            />
                        )}
                    </div>
                    <div className={styles.containerImg}>
                        <p className={styles.description}><strong>Description:</strong> {item?.description ?? "N/A"}</p>
                        <p className={styles.description}><strong>Prix:</strong> {item?.price ?? "N/A"}€</p>
                    </div>
                </div>
            </main>

        </div>
    )
}