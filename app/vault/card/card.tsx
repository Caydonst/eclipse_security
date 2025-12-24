import styles from "./page.module.css"
import Image from "next/image"
import {XMarkIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"
import React, {useState, useEffect} from "react";
import {
    BuildingLibraryIcon as BuildingLibrarySolid,
    CreditCardIcon as CreditCardSolid,
    LockClosedIcon as LockClosedSolid
} from "@heroicons/react/24/solid";
import PasswordInfo from "./DisplayCard/PasswordInfo"
import PaymentCardInfo from "./DisplayCard/PaymentCardInfo";
import BankAccountInfo from "./DisplayCard/BankAccountInfo";
import CreateCardInfo from "./CreateCard/CreateCardInfo";
import {VaultItem, Account} from "@/app/api/vault/vaultItems"


type props = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    vaultItem: VaultItem;
    setSelectedCell: React.Dispatch<React.SetStateAction<number | null>>;
    copiedAnimation: boolean;
    setCopiedAnimation: React.Dispatch<React.SetStateAction<boolean>>;
    selectedAccountIndex: number | null;
    setVaultItems: React.Dispatch<React.SetStateAction<Account>>;
}

export default function Card({ open, setOpen, vaultItem, setSelectedCell, copiedAnimation, setCopiedAnimation, selectedAccountIndex, setVaultItems }: props) {
    const [showPassword, setShowPassword] = useState(false);


    const changeStates = () => {
        setOpen(false);
        setSelectedCell(-1);
        setCopiedAnimation(false);
        document.body.classList.remove("no-scroll-mobile");
    }

    const copyToClipboard = async (text: string) => {
        if (navigator.clipboard && window.isSecureContext) {
            // Use the modern clipboard API if available
            try {
                await navigator.clipboard.writeText(text);
                triggerAnimation();
                return;
            } catch (err) {
                console.log("Clipboard API failed, falling back:", err);
            }
        }

        // ✅ Fallback for Safari and older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand("copy");
            triggerAnimation();
        } catch (err) {
            console.log("Fallback copy failed:", err);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    const triggerAnimation = () => {
        setCopiedAnimation(false);
        setTimeout(() => setCopiedAnimation(true), 10); // restart animation
    };

    useEffect(() => {
        setShowPassword(false);
    }, [open])

    return (
        <div className={open ? styles.cardContainer : `${styles.cardContainer} ${styles.open}`}>
            {selectedAccountIndex !== null && selectedAccountIndex >= 0 &&
                <>
                    <div className={styles.cardHeader}>
                        {vaultItem.type === "password" &&
                            <div className={styles.lockLogoContainer}>
                                <LockClosedSolid className={styles.lockLogo} />
                            </div>
                        }
                        {vaultItem.type === "paymentCard" &&
                            <div className={styles.cardLogoContainer}>
                                <CreditCardSolid className={styles.cardLogo} />
                            </div>
                        }
                        {vaultItem.type === "bankAccount" &&
                            <div className={styles.bankLogoContainer}>
                                <BuildingLibrarySolid className={styles.bankLogo} />
                            </div>
                        }
                        <div className={styles.headerButtons}>
                            <button className={styles.closeBtn} onClick={() => changeStates()}><XMarkIcon className={styles.closeIcon} /></button>
                        </div>
                    </div>
                    {vaultItem.type === "password" && (
                        <PasswordInfo vaultItem={vaultItem} copyToClipboard={copyToClipboard} open={open} />
                    )}
                    {vaultItem.type === "paymentCard" && (
                        <PaymentCardInfo vaultItem={vaultItem} copyToClipboard={copyToClipboard} open={open} />
                    )}
                    {vaultItem.type === "bankAccount" && (
                        <BankAccountInfo vaultItem={vaultItem} copyToClipboard={copyToClipboard} open={open} />
                    )}
                    <div className={`${styles.passwordCopiedMessage} ${copiedAnimation ? styles.animate : ""}`}>
                        <p>Password Copied</p>
                    </div>
                </>
            }
            {selectedAccountIndex !== null && selectedAccountIndex === -1 &&
                <CreateCardInfo changeStates={changeStates} triggerAnimation={triggerAnimation} setVaultItems={setVaultItems} />
            }
        </div>
    )
}