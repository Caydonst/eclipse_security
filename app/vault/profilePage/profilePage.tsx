import styles from "./page.module.css"
import LogoutBtn from "./logoutBtn"
import {useState} from "react";
import {signOut} from "next-auth/react";

export default function ProfilePage() {

    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await signOut();
    };

    return (
        <div className={styles.profilePage}>
            <LogoutBtn handleLogout={handleLogout} loading={loading} />
        </div>
    )
}