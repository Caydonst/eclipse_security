import styles from "@/app/vault/page.module.css";
import {MagnifyingGlassIcon as MagnifyingGlassOutline} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";
import AccountCard from "../AccountCard/AccountCard"

export default function SearchBar({accounts, searchQuery, setSearchQuery, setSearchAccounts, setSearchSelected, searchSelected, searchAccounts, handleOpenAccount, isSelected, favorites, toggleFavorited}: {accounts: any, searchQuery: string, setSearchQuery: any, setSearchAccounts: any, setSearchSelected: any, favorites: number[], handleOpenAccount: any, toggleFavorited: any, isSelected: number, searchSelected: boolean, searchAccounts: any[]}) {

    const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    }

    useEffect(() => {
        if (searchQuery === "") {
            setSearchAccounts(accounts);
        } else {
            setSearchAccounts([]);
            accounts.forEach((account: { name: string }) => {
                if (account.name.toLowerCase().startsWith(searchQuery.toLowerCase())) {
                    console.log("Account found")
                    setSearchAccounts(prev => [...prev, account])
                }
            })
        }
    }, [searchQuery, searchSelected]);

    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchContainerInner}>
                <MagnifyingGlassOutline className={styles.searchIcon}/>
                <input className={styles.searchInput} type={"text"} placeholder={"Search my vault"} value={searchQuery}
                       onChange={(e) => changeSearchQuery(e)} onClick={() => setSearchSelected(true)}/>
            </div>
            {searchSelected === true
                &&
                <div className={styles.searchItemsContainer}>
                    {searchAccounts.map((account: any, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account}
                                         isFavorited={isFavorited} toggleFavorited={toggleFavorited}
                                         isSelected={isSelected}/>
                        )
                    })}
                </div>
            }
        </div>
    )
}