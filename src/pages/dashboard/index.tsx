import NavBar from "~/components/NavBar"
import styles from "./dashboard.module.css"
import Image from "next/image"
import ProtectedRoute from "~/utils/protectedRoute"

export default function DashBoard() {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <NavBar />
        <main className={styles.containerMain}>
          <div>
            <h1 className={styles.containerTitle}>Tableau de bord</h1>
            <div className={styles.containerProfile}>
              <Image
                width={250}
                height={250}
                src="/helene.png"
                alt="helene" />
              <div className={styles.profileText}>
                <h2 className={styles.profileName}>Helene</h2>
                <h2 className={styles.profileName}>Smith</h2>
              </div>
            </div>
            <h2 className={styles.taskTitle}>Dernières taches</h2>
            <div className={styles.taskCards}>

            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
