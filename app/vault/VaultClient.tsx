"use client"
import styles from "./page.module.css"
import LogoutBtn from "./LogoutBtn"
import eclipse from "../assets/eclipse.png"
import Image from 'next/image';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {BuildingLibraryIcon} from "@heroicons/react/24/outline";
import {CreditCardIcon} from "@heroicons/react/24/outline";
import {LockClosedIcon} from "@heroicons/react/24/outline";
import {ListBulletIcon} from "@heroicons/react/24/outline";
import {EllipsisHorizontalIcon, StarIcon, UserIcon} from "@heroicons/react/24/outline";
import React from "react";
import Card from "./card/card";
import {useState} from "react";
import AccountCard from "./AccountCard";

export default function VaultClient({ accounts }) {
    const [open, setOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleOpenAccount = (account: number) => {
        if (isAnimating) return;

        if (!open) {
            setSelectedAccount(account);
            setOpen(true);
        } else if (selectedAccount == account) {
            setOpen(false);
        } else if (selectedAccount !== account) {
            setIsAnimating(true);
            setOpen(false);

            setTimeout(() => {
                setSelectedAccount(account);
                setOpen(true);
                setIsAnimating(false);
            }, 400);
        }

    }


    // Load vault items where ownerId = session.user.id
    return (
        <div className={styles.vaultPage}>
            <div className={styles.mobileHeader}>
                <h1>Eclipse</h1>
                <button className={styles.profileBtn}><UserIcon className={styles.userIcon} /></button>
            </div>
            <div className={styles.sideBar}>
                <h1>Eclipse</h1>
                <button className={styles.sideBarButton}><ListBulletIcon className={styles.sideBarIcon}/>All Items
                </button>
                <button className={styles.sideBarButton}><LockClosedIcon className={styles.sideBarIcon}/>Passwords
                </button>
                <button className={styles.sideBarButton}><CreditCardIcon className={styles.sideBarIcon}/>Payment Cards
                </button>
                <button className={styles.sideBarButton}><BuildingLibraryIcon className={styles.sideBarIcon}/>Bank
                    Accounts
                </button>
                <LogoutBtn/>
            </div>
            <div className={styles.sideBarSmall}>
                <div className={styles.sideBarLogoContainer}>
                    <Image src={eclipse} alt={""} className={styles.logo} />
                </div>
                <button className={styles.sideBarSmallButton}><ListBulletIcon className={styles.sideBarIcon}/>
                </button>
                <button className={styles.sideBarSmallButton}><LockClosedIcon className={styles.sideBarIcon}/>
                </button>
                <button className={styles.sideBarSmallButton}><CreditCardIcon className={styles.sideBarIcon}/>
                </button>
                <button className={styles.sideBarSmallButton}><BuildingLibraryIcon className={styles.sideBarIcon}/>
                </button>
                <LogoutBtn/>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.topBar}>
                    <div className={styles.searchContainer}>
                        <MagnifyingGlassIcon className={styles.searchIcon}/>
                        <input className={styles.searchInput} type={"text"} placeholder={"Search my vault"}/>
                    </div>
                </div>
                {accounts.map((account: any, i: number) => (
                    <AccountCard key={i} openAccount={() => handleOpenAccount(account.id)} account={account}/>
                ))}
            </div>
            <div className={styles.cardArea}>
                <Card open={open} setOpen={setOpen} account={accounts[selectedAccount-1]} />
            </div>
        </div>
    );
}
