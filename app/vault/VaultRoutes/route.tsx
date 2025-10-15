import styles from "../page.module.css"
import AccountCard from "@/app/vault/AccountCard/AccountCard";
import React from "react";
import ProfilePage from "../profilePage/profilePage";

export default function Route({ accounts, favorites, handleOpenAccount, toggleFavorited, isSelected, selected }: {accounts: any, favorites: number[], handleOpenAccount: any, toggleFavorited: any, isSelected: number, selected: string}) {
    return (
        <div className={styles.main}>
            {selected === "all"
                &&
                <div className={styles.contentContainer}>
                    {accounts.map((account: any, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} isSelected={isSelected} />
                        )
                    })}
                </div>
            }
            {selected === "passwords"
                &&
                <div className={styles.contentContainer}>
                    {accounts.map((account: any, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} isSelected={isSelected} />
                        )
                    })}
                </div>
            }
            {selected === "cards"
                &&
                <div className={styles.contentContainer}>
                    {accounts.map((account: any, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} isSelected={isSelected} />
                        )
                    })}
                </div>
            }
            {selected === "bank"
                &&
                <div className={styles.contentContainer}>
                    {accounts.map((account: any, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} isSelected={isSelected} />
                        )
                    })}
                </div>
            }
            {selected === "favorites"
                &&
                <div className={styles.contentContainer}>
                    {accounts
                        .filter((account: any) => favorites.includes(account.id))
                        .map((account: any, i: number) => (
                            <AccountCard
                                key={i}
                                index={i}
                                handleOpenAccount={handleOpenAccount}
                                account={account}
                                isFavorited={true}
                                toggleFavorited={toggleFavorited}
                                isSelected={isSelected}
                            />
                        ))}
                </div>
            }
            {selected === "profile"
                &&
                <div className={styles.contentContainer}>
                    <ProfilePage />
                </div>
            }
        </div>
    )
}