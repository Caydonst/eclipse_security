import styles from "../page.module.css"
import AccountCard from "@/app/vault/AccountCard/AccountCard";
import React from "react";
import ProfilePage from "../profilePage/profileMenu";
import VaultItem from "@/app/vault/passwords"
import Account from "@/app/vault/passwords"
import Password from "@/app/vault/passwords"
import PaymentCard from "@/app/vault/passwords"
import BankAccount from "@/app/vault/passwords"

type props = {
    accounts: Account;
    favorites: number[];
    handleOpenAccount: (accountIndex: number) => void;
    toggleFavorited: (id: number) => void;
    selectedCell: number | null;
    selected: string;
    isAnimating: boolean;
    cellType: string;
}

export default function Route({ vaultItems, favorites, handleOpenAccount, toggleFavorited, selectedCell, selected, isAnimating, cellType }: props) {
    const passwords: Password = vaultItems.items.filter((vaultItem: VaultItem) => vaultItem.type === "password");
    const paymentCards: PaymentCard = vaultItems.items.filter((vaultItem: VaultItem) => vaultItem.type === "paymentCard");
    const bankAccounts: BankAccount = vaultItems.items.filter((vaultItem: VaultItem) => vaultItem.type === "bankAccount");

    return (
        <div className={styles.main}>
            {selected === "all"
                &&
                <div className={`
                    ${styles.contentContainer}
                    ${cellType === "grid" ? styles.grid : ""}
                    ${cellType === "row" ? styles.row : ""}
                `}>
                    {vaultItems.items.map((vaultItem: VaultItem, i: number) => {
                        const isFavorited = favorites.includes(vaultItem.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} vaultItem={vaultItem} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} isAnimating={isAnimating} />
                        )
                    })}
                </div>
            }
            {selected === "passwords"
                &&
                <div className={`
                    ${styles.contentContainer}
                    ${cellType === "grid" ? styles.grid : ""}
                    ${cellType === "row" ? styles.row : ""}
                `}>
                    {passwords.map((vaultItem: VaultItem, i: number) => {
                        const isFavorited = favorites.includes(vaultItem.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} vaultItem={vaultItem} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} isAnimating={isAnimating} />
                        )
                    })}
                </div>
            }
            {selected === "cards"
                &&
                <div className={`
                    ${styles.contentContainer}
                    ${cellType === "grid" ? styles.grid : ""}
                    ${cellType === "row" ? styles.row : ""}
                `}>
                    {paymentCards.map((vaultItem: VaultItem, i: number) => {
                        const isFavorited = favorites.includes(vaultItem.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} vaultItem={vaultItem} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} isAnimating={isAnimating} />
                        )
                    })}
                </div>
            }
            {selected === "bank"
                &&
                <div className={`
                    ${styles.contentContainer}
                    ${cellType === "grid" ? styles.grid : ""}
                    ${cellType === "row" ? styles.row : ""}
                `}>
                    {bankAccounts.map((vaultItem: VaultItem, i: number) => {
                        const isFavorited = favorites.includes(vaultItem.id);
                        return (
                            <AccountCard key={i} index={i} handleOpenAccount={handleOpenAccount} vaultItem={vaultItem} isFavorited={isFavorited} toggleFavorited={toggleFavorited} selectedCell={selectedCell} isAnimating={isAnimating} />
                        )
                    })}
                </div>
            }
            {selected === "favorites"
                &&
                <div className={`
                    ${styles.contentContainer}
                    ${cellType === "grid" ? styles.grid : ""}
                    ${cellType === "row" ? styles.row : ""}
                `}>
                    {vaultItems.items
                        .filter((vaultItem: VaultItem) => favorites.includes(vaultItem.id))
                        .map((vaultItem: VaultItem, i: number) => (
                            <AccountCard
                                key={i}
                                index={i}
                                handleOpenAccount={handleOpenAccount}
                                vaultItem={vaultItem}
                                isFavorited={true}
                                toggleFavorited={toggleFavorited}
                                selectedCell={selectedCell}
                                isAnimating={isAnimating}
                            />
                        ))}
                </div>
            }
        </div>
    )
}