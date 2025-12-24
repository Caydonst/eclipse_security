import styles from "../page.module.css"
import AccountCard from "@/app/vault/AccountCard/AccountCard";
import React, {useEffect} from "react";
import ProfilePage from "../profilePage/profileMenu";
import {VaultItem} from "@/app/api/vault/vaultItems"
import {Account} from "@/app/api/vault/vaultItems"
import {Password} from "@/app/api/vault/vaultItems"
import {PaymentCard} from "@/app/api/vault/vaultItems"
import {BankAccount} from "@/app/api/vault/vaultItems"

type props = {
    vaultItems: Account;
    favorites: number[];
    handleOpenAccount: (accountIndex: number) => void;
    toggleFavorited: (id: number) => void;
    selectedCell: number | null;
    selected: string;
    isAnimating: boolean;
    cellType: string;
    setCellType: React.Dispatch<React.SetStateAction<string>>;
}

export default function Route({ vaultItems, favorites, handleOpenAccount, toggleFavorited, selectedCell, selected, isAnimating, cellType, setCellType }: props) {
    const passwords: VaultItem[] = vaultItems.items.filter((vaultItem: VaultItem) => vaultItem.type === "password");
    const paymentCards: VaultItem[] = vaultItems.items.filter((vaultItem: VaultItem) => vaultItem.type === "paymentCard");
    const bankAccounts: VaultItem[] = vaultItems.items.filter((vaultItem: VaultItem) => vaultItem.type === "bankAccount");

    useEffect(() => {
        function displayWindowSize() {
            const currentWidth = window.innerWidth;
            if (currentWidth <= 500) {
                setCellType("row");
            }
            console.log(currentWidth);
            // You can add your custom logic here
        }


        window.addEventListener('resize', displayWindowSize);

    }, []);

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