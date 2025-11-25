import styles from "../page.module.css"
import AccountCard from "@/app/vault/AccountCard/AccountCard";
import React from "react";
import ProfilePage from "../profilePage/profilePage";

type Account = {
    id: number;
    type: string;
    name: string;
    email: string;
    password: string;
}

type props = {
    accounts: Account[]
    favorites: number[]
    handleOpenAccount: (accountIndex: number) => void
    toggleFavorited: (id: number) => void
    selectedCell: number | null
    selected: string
    isAnimating: boolean
}

export default function Route({ accounts, favorites, handleOpenAccount, toggleFavorited, selectedCell, selected, isAnimating }: props) {
    const passwords: Account[] = accounts.filter((account: Account) => account.type === "password");
    const paymentCards: Account[] = accounts.filter((account: Account) => account.type === "paymentCard");
    const bankAccounts: Account[] = accounts.filter((account: Account) => account.type === "bankAccount");

    return (
        <div className={styles.main}>
            {selected === "all"
                &&
                <div className={styles.contentContainer}>
                    {accounts.map((account: Account, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} />
                        )
                    })}
                </div>
            }
            {selected === "passwords"
                &&
                <div className={styles.contentContainer}>
                    {passwords.map((account: Account, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} />
                        )
                    })}
                </div>
            }
            {selected === "cards"
                &&
                <div className={styles.contentContainer}>
                    {paymentCards.map((account: Account, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} />
                        )
                    })}
                </div>
            }
            {selected === "bank"
                &&
                <div className={styles.contentContainer}>
                    {bankAccounts.map((account: Account, i: number) => {
                        const isFavorited = favorites.includes(account.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} account={account} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} />
                        )
                    })}
                </div>
            }
            {selected === "favorites"
                &&
                <div className={styles.contentContainer}>
                    {accounts
                        .filter((account: Account) => favorites.includes(account.id))
                        .map((account: Account, i: number) => (
                            <AccountCard
                                key={i}
                                index={i}
                                handleOpenAccount={handleOpenAccount}
                                account={account}
                                isFavorited={true}
                                toggleFavorited={toggleFavorited}
                                selectedCell={selectedCell}
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
            <div className={isAnimating ? `${styles.cellOverlay} ${styles.active}` : ""}></div>
        </div>
    )
}