import styles from "./page.module.css"

export default function Card({ open }: { open: boolean }) {
    return (
        <div className={open ? styles.cardContainer : `${styles.cardContainer} ${styles.open}`}>

        </div>
    )
}