import styles from "./page.module.css"
import LogoutBtn from "./logoutBtn"
import React, {useEffect, useState, useRef} from "react";
import {signOut} from "next-auth/react";
import {XMarkIcon} from "@heroicons/react/24/outline"

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

type props = {
    profileMenuOpen: boolean,
    setProfileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    user: User;
}

export default function ProfileMenu({profileMenuOpen, setProfileMenuOpen, user}: props) {
    const [loading, setLoading] = useState(false);
    const profileMenuRef = useRef<HTMLDivElement | null>(null);

    const handleLogout = async () => {
        setLoading(true);
        await signOut();
    };

    useEffect(() => {
        function handleClickOutside(e) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
                setProfileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (profileMenuOpen) {
            document.body.classList.add("no-scroll-desktop");
        } else {
            document.body.classList.remove("no-scroll-desktop");
        }
    }, [profileMenuOpen]);

    return (
        <div className={profileMenuOpen ? `${styles.profileMenu} ${styles.open}` : styles.profileMenu}>
            <div ref={profileMenuRef} className={styles.profileMenuInner}>
                <p className={styles.title}>Profile</p>
                <div className={styles.profileContainer}>
                    {user.image && (
                        <img src={user.image} />
                    )}
                </div>
                <p className={styles.name}>{user.name}</p>
                <p className={styles.email}>{user.email}</p>
                <LogoutBtn handleLogout={handleLogout} loading={loading} />
                <button className={styles.closeBtn} onClick={() => setProfileMenuOpen(false)}><XMarkIcon className={styles.closeIcon} /></button>
            </div>
        </div>
    )
}