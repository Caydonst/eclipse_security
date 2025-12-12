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
import profileMenu from "./profilePage/profileMenu"
import ProfileMenu from "./profilePage/profileMenu";
import {Bars4Icon} from "@heroicons/react/24/outline"

interface Account {
    id: number;
    type: string;
    name: string;
    email: string;
    password: string;
}
interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export default function VaultClient({accounts, user}: { accounts: Account[], user: User }) {
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
    const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const toggleFavorited = (id: number) => {
        setFavorites((prev) => prev.includes(id)
            ? prev.filter((favId) => favId !== id)
            : [...prev, id]);
    }

    const handleOpenAccount = (accountIndex: number, cellIndex: number) => {
        setSelectedCell(cellIndex);
        if (isAnimating) return;

        if (!open) {
            if (accountIndex >= 0) {
                setSelectedAccount(accounts[accountIndex - 1]);
            }

            document.body.classList.add("no-scroll-mobile");
            setSelectedAccountIndex(accountIndex);
            setOpen(true);
        } else if (selectedAccountIndex === accountIndex) {
            setOpen(false);
            setSelectedCell(-1);
            document.body.classList.remove("no-scroll-mobile");
        } else if (selectedAccountIndex !== accountIndex) {
            setIsAnimating(true);
            setOpen(false);

            setTimeout(() => {
                if (accountIndex >= 0) {
                    setSelectedAccount(accounts[accountIndex - 1]);
                }
                document.body.classList.add("no-scroll-mobile");
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
            <div className={open ? `${styles.vaultOverlay} ${styles.vaultActive}` : styles.vaultOverlay}></div>
            <MobileSearchBar mobileSearchActive={mobileSearchActive} setMobileSearchActive={setMobileSearchActive} inputRef={inputRef} accounts={accounts} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                             setSearchAccounts={setSearchAccounts} setSearchSelected={setSearchSelected}
                             searchSelected={searchSelected} searchAccounts={searchAccounts}
                             handleOpenAccount={handleOpenAccount} selectedCell={selectedCell} favorites={favorites}
                             toggleFavorited={toggleFavorited} />
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
                     handleOpenAccount={handleOpenAccount} user={user} profileMenuOpen={profileMenuOpen} setProfileMenuOpen={setProfileMenuOpen} />
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
                <div className={styles.layoutSelector}>
                    <button className={styles.rowBtn}><Bars4Icon /></button>
                    <button className={styles.gridBtn}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M152 160C174.1 160 192 177.9 192 200L192 248C192 270.1 174.1 288 152 288L104 288C81.9 288 64 270.1 64 248L64 200C64 177.9 81.9 160 104 160L152 160zM344 288L296 288C273.9 288 256 270.1 256 248L256 200C256 177.9 273.9 160 296 160L344 160C366.1 160 384 177.9 384 200L384 248C384 270.1 366.1 288 344 288zM536 288L488 288C465.9 288 448 270.1 448 248L448 200C448 177.9 465.9 160 488 160L536 160C558.1 160 576 177.9 576 200L576 248C576 270.1 558.1 288 536 288zM536 480L488 480C465.9 480 448 462.1 448 440L448 392C448 369.9 465.9 352 488 352L536 352C558.1 352 576 369.9 576 392L576 440C576 462.1 558.1 480 536 480zM344 352C366.1 352 384 369.9 384 392L384 440C384 462.1 366.1 480 344 480L296 480C273.9 480 256 462.1 256 440L256 392C256 369.9 273.9 352 296 352L344 352zM152 480L104 480C81.9 480 64 462.1 64 440L64 392C64 369.9 81.9 352 104 352L152 352C174.1 352 192 369.9 192 392L192 440C192 462.1 174.1 480 152 480z"/></svg></button>
                </div>
            </div>
            <Route accounts={accounts} favorites={favorites} handleOpenAccount={handleOpenAccount}
                   toggleFavorited={toggleFavorited} selectedCell={selectedCell} selected={selected}
                   isAnimating={isAnimating}/>
            <div className={styles.cardArea}>
                <Card open={open} setOpen={setOpen} account={selectedAccount} setSelectedCell={setSelectedCell}
                      copiedAnimation={copiedAnimation} setCopiedAnimation={setCopiedAnimation} selectedAccountIndex={selectedAccountIndex} />
            </div>
            <ProfileMenu profileMenuOpen={profileMenuOpen} setProfileMenuOpen={setProfileMenuOpen} user={user} />
        </div>
    );
}
