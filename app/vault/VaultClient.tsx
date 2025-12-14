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

export default function VaultClient({vaultItems, user}: { vaultItems: Account, user: User }) {
    const [open, setOpen] = useState<boolean>(false);
    const [selectedAccount, setSelectedAccount] = useState<Account>(vaultItems[-1]);
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
    const [cellType, setCellType] = useState<string>("grid");

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
                setSelectedAccount(vaultItems.items[accountIndex - 1]);
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
                    setSelectedAccount(vaultItems.items[accountIndex - 1]);
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
            <MobileSearchBar mobileSearchActive={mobileSearchActive} setMobileSearchActive={setMobileSearchActive} inputRef={inputRef} vaultItems={vaultItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
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
                <SearchBar vaultItems={vaultItems} searchQuery={searchQuery} setSearchQuery={setSearchQuery}
                           setSearchAccounts={setSearchAccounts} setSearchSelected={setSearchSelected}
                           searchSelected={searchSelected} searchAccounts={searchAccounts}
                           handleOpenAccount={handleOpenAccount} selectedCell={selectedCell} favorites={favorites}
                           toggleFavorited={toggleFavorited}
                />
                <div className={styles.desktopHeader}>
                    <h1>{routeTitle}</h1>
                </div>
                <div className={styles.layoutSelector}>
                    <button className={cellType === "row" ? `${styles.rowBtn} ${styles.selected}` : `${styles.rowBtn}`} onClick={() => setCellType("row")}><Bars4Icon /></button>
                    <button className={cellType === "grid" ? `${styles.gridBtn} ${styles.selected}` : `${styles.gridBtn}`} onClick={() => setCellType("grid")}>
                        <svg className="svg-icon"
                             viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M928 1024h-288a96 96 0 0 1-96-96v-288a96 96 0 0 1 96-96h288a96 96 0 0 1 96 96v288a96 96 0 0 1-96 96z m32-384a32 32 0 0 0-32-32h-288a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h288a32 32 0 0 0 32-32v-288z m-32-160h-288a96 96 0 0 1-96-96V96a96 96 0 0 1 96-96h288a96 96 0 0 1 96 96v288a96 96 0 0 1-96 96z m32-384a32 32 0 0 0-32-32h-288a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h288a32 32 0 0 0 32-32V96zM384 1024H96a96 96 0 0 1-96-96v-288a96 96 0 0 1 96-96h288a96 96 0 0 1 96 96v288a96 96 0 0 1-96 96z m32-384a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h288a32 32 0 0 0 32-32v-288z m-32-160H96a96 96 0 0 1-96-96V96a96 96 0 0 1 96-96h288a96 96 0 0 1 96 96v288a96 96 0 0 1-96 96z m32-384a32 32 0 0 0-32-32H96a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h288a32 32 0 0 0 32-32V96z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <Route vaultItems={vaultItems} favorites={favorites} handleOpenAccount={handleOpenAccount}
                   toggleFavorited={toggleFavorited} selectedCell={selectedCell} selected={selected}
                   isAnimating={isAnimating} cellType={cellType}/>
            <div className={styles.cardArea}>
                <Card open={open} setOpen={setOpen} vaultItem={selectedAccount} setSelectedCell={setSelectedCell}
                      copiedAnimation={copiedAnimation} setCopiedAnimation={setCopiedAnimation}
                      selectedAccountIndex={selectedAccountIndex}/>
            </div>
            <ProfileMenu profileMenuOpen={profileMenuOpen} setProfileMenuOpen={setProfileMenuOpen} user={user}/>
        </div>
    );
}
