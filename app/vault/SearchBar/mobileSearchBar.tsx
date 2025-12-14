import styles from "./page.module.css";
import React, {useEffect} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline"
import AccountCard from "@/app/vault/AccountCard/AccountCard";
import Account from "@/app/vault/passwords"

type props = {
    mobileSearchActive: boolean
    setMobileSearchActive: React.Dispatch<React.SetStateAction<boolean>>
    inputRef: React.RefObject<HTMLInputElement | null>;
    vaultItems: Account;
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    setSearchAccounts: React.Dispatch<React.SetStateAction<Account[]>>
    setSearchSelected: React.Dispatch<React.SetStateAction<boolean>>
    favorites: number[]
    handleOpenAccount: (accountIndex: number) => void
    toggleFavorited: (id: number) => void
    selectedCell: number | null
    searchSelected: boolean
    searchAccounts: Account[]
}

export default function MobileSearchBar({ mobileSearchActive, setMobileSearchActive, inputRef, vaultItems, searchQuery, setSearchQuery, setSearchAccounts, setSearchSelected, searchSelected, searchAccounts, handleOpenAccount, selectedCell, favorites, toggleFavorited }: props) {
    const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    }

    const handleCloseClick = () => {
        setMobileSearchActive(false);
        setSearchQuery("");
    }

    useEffect(() => {
        setSearchAccounts([]);
        vaultItems.items.forEach((account: Account) => {
            if ((account.name.toLowerCase().startsWith(searchQuery.toLowerCase()) && (searchQuery !== ""))) {
                setSearchAccounts(prev => [...prev, account])
            }
        })
    }, [searchQuery]);

    return (
        <div className={mobileSearchActive ? `${styles.mobileSearchContainer} ${styles.active}` : styles.mobileSearchContainer}>
            <button className={styles.closeBtn} onClick={() => handleCloseClick()}><XMarkIcon className={styles.closeIcon} /></button>
            <div className={styles.mobileSearchContainerInner}>
                <input ref={inputRef} type={"text"} placeholder={"Search my vault"} value={searchQuery}
                       onChange={(e) => changeSearchQuery(e)} />
            </div>
            {mobileSearchActive
                &&
                <div className={styles.searchItemsContainer}>
                    {searchAccounts.map((account: Account, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account}
                                         isFavorited={isFavorited} toggleFavorited={toggleFavorited}
                                         selectedCell={selectedCell}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}