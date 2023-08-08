import { HomeIcon, CalendarDaysIcon, ChatBubbleBottomCenterIcon, BookmarkIcon, StopCircleIcon } from '@heroicons/react/24/solid'

import styles from "../pages/dashboard/dashboard.module.css"
import Link from "next/link"
import { useRouter } from "next/router"

export default function NavBar() {
    const router = useRouter()

    async function submitLogout(e: React.MouseEvent<Element, MouseEvent>) {
        e.preventDefault();
        localStorage.removeItem("token")
        await router.replace("/")
    }

    return (
        <div className={styles.navbar}>
                <h2 className={styles.titleNav}>MGA Market</h2>
                <div className={styles.containerLink}>
                    <HomeIcon className={styles.icon} />
                    <Link href={"/dashboard"} className={styles.link}>
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
