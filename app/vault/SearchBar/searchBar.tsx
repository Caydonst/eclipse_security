import styles from "@/app/vault/page.module.css";
import {MagnifyingGlassIcon as MagnifyingGlassOutline} from "@heroicons/react/24/outline";
import React, {useEffect} from "react";

export default function SearchBar({accounts, searchQuery, setSearchQuery, setSearchAccounts, setSelected}: {accounts: any, searchQuery: string, setSearchQuery: any, setSearchAccounts: any, setSelected: any}) {

    const changeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        console.log(searchQuery);
    }

    useEffect(() => {

        setSelected("search");
        setSearchAccounts([]);
        accounts.forEach((account: { name: string }) => {
            if (account.name.toLowerCase().startsWith(searchQuery.toLowerCase())) {
                console.log("Account found")
                setSearchAccounts(prev => [...prev, account])
            }
        })
    }, [searchQuery]);

    return (
        <div className={styles.searchContainer}>
            <MagnifyingGlassOutline className={styles.searchIcon}/>
            <input className={styles.searchInput} type={"text"} placeholder={"Search my vault"} value={searchQuery}
                   onChange={(e) => changeSearchQuery(e)}/>
        </div>
    )
}