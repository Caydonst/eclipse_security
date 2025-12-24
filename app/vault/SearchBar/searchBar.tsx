import styles from "@/app/vault/page.module.css";
import {MagnifyingGlassIcon as MagnifyingGlassOutline} from "@heroicons/react/24/outline";
import React, {useEffect, useRef, useState} from "react";
import AccountCard from "../AccountCard/AccountCard"
import {Account} from "@/app/api/vault/vaultItems"
import {VaultItem} from "@/app/api/vault/vaultItems"


type props = {
    vaultItems: Account;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setSearchAccounts: React.Dispatch<React.SetStateAction<Account>>;
    setSearchSelected: React.Dispatch<React.SetStateAction<boolean>>;
    favorites: number[];
    handleOpenAccount: (accountIndex: number) => void;
    toggleFavorited: (id: number) => void;
    selectedCell: number | null;
    searchSelected: boolean;
    searchAccounts: VaultItem[];
}

export default function SearchBar({vaultItems, searchQuery, setSearchQuery, setSearchAccounts, setSearchSelected, searchSelected, searchAccounts, handleOpenAccount, selectedCell, favorites, toggleFavorited}: props) {
    const searchRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setSearchSelected(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    }

    useEffect(() => {
        if (searchQuery === "") {
            setSearchAccounts([]);
            return;
        }

        const filtered = vaultItems.items.filter((vaultItem: VaultItem) =>
            vaultItem.name.toLowerCase().startsWith(searchQuery.toLowerCase())
        );

        setSearchAccounts(filtered);
        console.log(filtered);
    }, [searchQuery, searchSelected]);

    return (
        <div ref={searchRef} className={searchSelected ? `${styles.searchContainer} ${styles.active}` : `${styles.searchContainer}`}>
            <div className={styles.searchContainerInner}>
                <MagnifyingGlassOutline className={styles.searchIcon}/>
                <input className={styles.searchInput} type={"text"} placeholder={"Search my vault"} value={searchQuery}
                       onChange={(e) => changeSearchQuery(e)} onClick={() => setSearchSelected(true)}/>
            </div>
            {searchSelected
                &&
                <div className={styles.searchItemsContainer}>
                    {searchAccounts.map((vaultItem: VaultItem, i: number) => {
                        const isFavorited = favorites.includes(vaultItem.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} vaultItem={vaultItem}
                                         isFavorited={isFavorited} toggleFavorited={toggleFavorited}
                                         selectedCell={selectedCell}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}