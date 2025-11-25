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
import React, {useState, useEffect, useRef} from "react";
import AccountCard from "./AccountCard/AccountCard";
import SearchBar from "./SearchBar/searchBar"
import MobileSearchBar from "./SearchBar/mobileSearchBar"

interface Account {
    id: number;
    type: string;
    name: string;
    email: string;
    password: string;
}

export default function VaultClient({accounts}: { accounts: Account[] }) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<Account>(accounts[-1]);
    const [selectedAccountIndex, setSelectedAccountIndex] = useState<number | null>(null);
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [selectedCell, setSelectedCell] = useState<number | null>(null);
    const [selected, setSelected] = useState<string>("all");
    const [routeTitle, setRouteTitle] = useState<string>("All Items");
    const [copiedAnimation, setCopiedAnimation] = useState<boolean>(false);
    const [searchSelected, setSearchSelected] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchAccounts, setSearchAccounts] = useState<Account[]>([]);
    const [mobileSearchActive, setMobileSearchActive] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const toggleFavorited = (id: number) => {
        setFavorites((prev) => prev.includes(id)
            ? prev.filter((favId) => favId !== id)
            : [...prev, id]);
    }

    const handleOpenAccount = (accountIndex: number) => {
        setSelectedCell(accountIndex);
        if (isAnimating) return;

        if (!open) {
            if (accountIndex >= 0) {
                setSelectedAccount(accounts[accountIndex - 1]);
            }
            setSelectedAccountIndex(accountIndex);
            setOpen(true);
        } else if (selectedAccountIndex == accountIndex) {
            setOpen(false);
            setSelectedCell(-1);
        } else if (selectedAccountIndex !== accountIndex) {
            setIsAnimating(true);
            setOpen(false);

            setTimeout(() => {
                if (accountIndex >= 0) {
                    setSelectedAccount(accounts[accountIndex - 1]);
                }
                setSelectedAccountIndex(accountIndex);
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

    const handleMobileSearchClick = () => {
        setMobileSearchActive(true);
        inputRef.current?.focus();
    };

    useEffect(() => {
        if (mobileSearchActive && inputRef.current) {
            inputRef.current.focus();
        }
    }, [mobileSearchActive]);

    return (
        <div className={styles.vaultPage}>
            <MobileSearchBar mobileSearchActive={mobileSearchActive} setMobileSearchActive={setMobileSearchActive} inputRef={inputRef} accounts={accounts} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                             setSearchAccounts={setSearchAccounts} setSearchSelected={setSearchSelected}
                             searchSelected={searchSelected} searchAccounts={searchAccounts}
                             handleOpenAccount={handleOpenAccount} selectedCell={selectedCell} favorites={favorites}
                             toggleFavorited={toggleFavorited} />
            <div className={open ? `${styles.vaultOverlay} ${styles.vaultActive}` : styles.vaultOverlay}></div>
            <div className={styles.mobileHeader}>
                <div className={styles.mobileHeaderTop}>
                    <div className={styles.mobileLogoContainer}>
                        <Image src={eclipse} alt={""} className={styles.mobileLogo}/>
                    </div>
                    <div className={styles.mobileHeaderRight}>
                        <button className={styles.mobileSearchBtn} onClick={() => handleMobileSearchClick()}>
                            <MagnifyingGlassOutline
                                className={styles.mobileSearchIcon}/></button>
                        <button className={styles.profileBtn} onClick={() => handleProfileClick("profile")}><UserIcon
                            className={styles.userIcon}/></button>
                    </div>
                </div>
                <div className={styles.mobileHeaderBottom}>
                    <h1>{routeTitle}</h1>
                </div>
            </div>
            <Sidebar selected={selected} setSelected={setSelected} setRouteTitle={setRouteTitle}
                     handleOpenAccount={handleOpenAccount}/>
            <div className={styles.topBar}>
                <SearchBar accounts={accounts} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                           setSearchAccounts={setSearchAccounts} setSearchSelected={setSearchSelected}
                           searchSelected={searchSelected} searchAccounts={searchAccounts}
                           handleOpenAccount={handleOpenAccount} selectedCell={selectedCell} favorites={favorites}
                           toggleFavorited={toggleFavorited}
                />
                <div className={styles.desktopHeader}>
                    <h1>{routeTitle}</h1>
                </div>
            </div>
            <Route accounts={accounts} favorites={favorites} handleOpenAccount={handleOpenAccount}
                   toggleFavorited={toggleFavorited} selectedCell={selectedCell} selected={selected}
                   isAnimating={isAnimating}/>
            <div className={styles.cardArea}>
                <Card open={open} setOpen={setOpen} account={selectedAccount} setSelectedCell={setSelectedCell}
                      copiedAnimation={copiedAnimation} setCopiedAnimation={setCopiedAnimation} selectedAccountIndex={selectedAccountIndex} />
            </div>
        </div>
    );
}
