"use client"
import styles from "./page.module.css"
import ProfileCard from "./profileCard"
import eclipse from "../assets/eclipse.png"
import Image from 'next/image';
import {
    MagnifyingGlassIcon as MagnifyingGlassOutline,
    UserIcon
} from "@heroicons/react/24/outline";
import Sidebar from "./Sidebar/sidebar"
import Route from "./VaultRoutes/route"
import Card from "./card/card";
import React, {useState, useEffect} from "react";
import AccountCard from "./AccountCard/AccountCard";
import SearchBar from "./SearchBar/searchBar"

export default function VaultClient({ accounts }: { accounts: any }) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<number>(1);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isSelected, setIsSelected] = useState<number>();
    const [selected, setSelected] = useState<string>("all");
    const [routeTitle, setRouteTitle] = useState<string>("");
    const [copiedAnimation, setCopiedAnimation] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchAccounts, setSearchAccounts] = useState([]);

    const toggleFavorited = (id: number) => {
        setFavorites((prev) => prev.includes(id)
            ? prev.filter((favId) => favId !== id)
            : [...prev, id]);
    }

    const handleOpenAccount = (account: number, index: number) => {
        setIsSelected(index);
        console.log(index);
        if (isAnimating) return;

        if (!open) {
            setSelectedAccount(account);
            setOpen(true);
        } else if (selectedAccount == account) {
            setOpen(false);
            setIsSelected(-1);
        } else if (selectedAccount !== account) {
            setIsAnimating(true);
            setOpen(false);

            setTimeout(() => {
                setSelectedAccount(account);
                setOpen(true);
                setIsAnimating(false);
            }, 400);
        }
        setCopiedAnimation(false);
    }

    const handleProfileClick = (id: string) => {
        setSelected(id);
        setRouteTitle("Profile");
    }

    return (
        <div className={styles.vaultPage}>
            <div className={styles.mobileHeader}>
                <div className={styles.mobileHeaderTop}>
                    <div className={styles.mobileLogoContainer}>
                        <Image src={eclipse} alt={""} className={styles.mobileLogo}/>
                        <h1>Eclipse</h1>
                    </div>
                    <div className={styles.mobileHeaderRight}>
                        <button className={styles.mobileSearchBtn}><MagnifyingGlassOutline
                            className={styles.mobileSearchIcon}/></button>
                        <button className={styles.profileBtn} onClick={() => handleProfileClick("profile")}><UserIcon className={styles.userIcon}/></button>
                    </div>
                </div>
                <div className={styles.mobileHeaderBottom}>
                    <h1>{routeTitle}</h1>
                </div>
            </div>
            <Sidebar selected={selected} setSelected={setSelected} setRouteTitle={setRouteTitle}/>
            <div className={styles.topBar}>
                <SearchBar accounts={accounts} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSearchAccounts={setSearchAccounts} setSelected={setSelected} />
            </div>
            <Route accounts={accounts} favorites={favorites} handleOpenAccount={handleOpenAccount}
                   toggleFavorited={toggleFavorited} isSelected={isSelected} selected={selected} searchAccounts={searchAccounts} />
            <div className={styles.cardArea}>
                <Card open={open} setOpen={setOpen} account={accounts[selectedAccount-1]} setIsSelected={setIsSelected} copiedAnimation={copiedAnimation} setCopiedAnimation={setCopiedAnimation} />
            </div>
        </div>
    );
}
