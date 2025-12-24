import styles from "@/app/vault/page.module.css";
import React, {useEffect} from "react";
import {XMarkIcon} from "@heroicons/react/24/outline"
import AccountCard from "@/app/vault/AccountCard/AccountCard";
import {Account} from "@/app/api/vault/vaultItems"
import {VaultItem} from "@/app/api/vault/vaultItems"

type props = {
    mobileSearchActive: boolean
    setMobileSearchActive: React.Dispatch<React.SetStateAction<boolean>>
    inputRef: React.RefObject<HTMLInputElement | null>;
    vaultItems: Account;
    searchQuery: string
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
    setSearchAccounts: React.Dispatch<React.SetStateAction<Account>>
    setSearchSelected: React.Dispatch<React.SetStateAction<boolean>>
    favorites: number[]
    handleOpenAccount: (accountIndex: number) => void
    toggleFavorited: (id: number) => void
    selectedCell: number | null
    searchSelected: boolean
    searchAccounts: VaultItem[];
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
        <div className={mobileSearchActive ? `${styles.mobileSearchContainer} ${styles.active}` : styles.mobileSearchContainer}>
            <button className={styles.closeBtn} onClick={() => handleCloseClick()}><XMarkIcon className={styles.closeIcon} /></button>
            <div className={styles.mobileSearchContainerInner}>
                <input ref={inputRef} type={"text"} placeholder={"Search my vault"} value={searchQuery}
                       onChange={(e) => changeSearchQuery(e)} />
            </div>
            {mobileSearchActive
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