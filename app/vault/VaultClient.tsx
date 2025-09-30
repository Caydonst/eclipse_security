"use client"
import styles from "./page.module.css"
import LogoutBtn from "./LogoutBtn"
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {BuildingLibraryIcon} from "@heroicons/react/24/outline";
import {CreditCardIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/24/outline";
import {ListBulletIcon} from "@heroicons/react/24/outline";
import {EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import {StarIcon} from "@heroicons/react/24/outline";
import React from "react";
import Card from "./card";
import {useState} from "react";
import AccountCard from "./AccountCard";

export default function VaultClient() {
    const [open, setOpen] = useState(false);

    const openAccount = () => {
        setOpen(!open);
    }

    // Load vault items where ownerId = session.user.id
    return (
        <div className={styles.vaultPage}>
            <div className={styles.sideBar}>
                <h1>Eclipse</h1>
                <button className={styles.sideBarButton}><ListBulletIcon className={styles.sideBarIcon}/>All Items</button>
                <button className={styles.sideBarButton}><LockClosedIcon className={styles.sideBarIcon}/>Passwords</button>
                <button className={styles.sideBarButton}><CreditCardIcon className={styles.sideBarIcon}/>Payment Cards</button>
                <button className={styles.sideBarButton}><BuildingLibraryIcon className={styles.sideBarIcon}/>Bank Accounts</button>
                <LogoutBtn />
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.topBar}>
                    <div className={styles.searchContainer}>
                        <MagnifyingGlassIcon className={styles.searchIcon}/>
                        <input className={styles.searchInput} type={"text"} placeholder={"Search my vault"} />
                    </div>
                </div>
                {Array.from({ length: 12 }, (_, i) => (
                    <AccountCard key={i} openAccount={openAccount}/>
                ))}
            </div>
            <div className={styles.cardArea}>
                <Card open={open}/>
            </div>
        </div>
    );
}
