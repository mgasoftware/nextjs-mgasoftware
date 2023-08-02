import Image from "next/image"
import { HomeIcon, CalendarDaysIcon, ChatBubbleBottomCenterIcon, BookmarkIcon, StopCircleIcon } from '@heroicons/react/24/solid'
import axios from "axios"

import styles from "../pages/dashboard/dashboard.module.css"
import Link from "next/link"

export default function NavBar() {
    async function submitLogout(e: React.MouseEvent<Element, MouseEvent>) {
        e.preventDefault();
        localStorage.removeItem("token")
    }

    return (
        <div className={styles.navbar}>
            <Image width={152} height={93} className={styles.image} src="/logo.png" alt="logo" />
            <div className={styles.containerLink}>
                <HomeIcon className={styles.icon} />
                <Link href={"/"} className={styles.link}>
                    <p className={styles.text}>Acceuil</p>
                </Link>
            </div>
            <div className={styles.containerLink}>
                <CalendarDaysIcon className={styles.icon} />
                <Link href={"/"} className={styles.link}>
                    <p className={styles.text}>Calendrier</p>
                </Link>
            </div>
            <div className={styles.containerLink}>
                <ChatBubbleBottomCenterIcon className={styles.icon} />
                <Link href={"/"} className={styles.link}>
                    <p className={styles.text}>Chat</p>
                </Link>
            </div>
            <div className={styles.containerLink}>
                <BookmarkIcon className={styles.icon} />
                <Link href={"/"} className={styles.link}>
                    <p className={styles.text}>Taches</p>
                </Link>
            </div>
            <div className={styles.containerLink}>
                <StopCircleIcon className={styles.icon} />
                <button className={styles.link} onClick={(e) => void submitLogout(e)}>
                    <p className={styles.text}>Déconnexion</p>
                </button>
            </div>
        </div>
    )
}
