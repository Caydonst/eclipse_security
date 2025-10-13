import styles from "./page.module.css"
import Image from "next/image"
import {XMarkIcon, EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline"
import React, {useState, useEffect} from "react";

export default function Card({ open, setOpen, account, setIsSelected, copiedAnimation, setCopiedAnimation }: { open: boolean, setOpen: any, account: any, setIsSelected: any, copiedAnimation: boolean, setCopiedAnimation: any }) {
    const [showPassword, setShowPassword] = useState(false);

    const changeStates = () => {
        setOpen(false);
        setIsSelected(-1);
        setCopiedAnimation(false);
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log("Copied!");
                triggerAnimation();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const triggerAnimation = () => {
        setCopiedAnimation(false);
        setTimeout(() => setCopiedAnimation(true), 10); // restart animation
    };

    useEffect(() => {
        setShowPassword(false);
    }, [open])

    return (
        <div className={open ? styles.cardContainer : `${styles.cardContainer} ${styles.open}`}>
            <div className={styles.cardHeader}>
                <div className={styles.cardIconContainer}>
                    <img src={"https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"} alt={"Google logo"} />
                </div>
                <div className={styles.headerButtons}>
                    <button className={styles.closeBtn} onClick={() => changeStates()}><XMarkIcon className={styles.closeIcon} /></button>
                </div>
            </div>
            <div className={styles.infoContainer}>
                <h1>{account.name}</h1>
                <div className={styles.inputsContainer}>
                    <label htmlFor="emailInput">Login</label>
                    <input id={"emailInput"} value={account.email} readOnly={true} />
                </div>
                <div className={styles.inputsContainer}>
                    <label htmlFor="passwordInput">Password</label>
                    <div className={styles.cardPasswordContainer}>
                        <input id={"passwordInput"} type={showPassword ? "text" : "password"} value={account.password} readOnly={true} />
                        <button className={styles.showPasswordBtn} onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <EyeSlashIcon className={styles.eyeIcon} />
                            ) : (
                                <EyeIcon className={styles.eyeIcon} />
                            )}
                        </button>
                        <button className={styles.copyBtn} onClick={() => copyToClipboard(account.password)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M480 400L288 400C279.2 400 272 392.8 272 384L272 128C272 119.2 279.2 112 288 112L421.5 112C425.7 112 429.8 113.7 432.8 116.7L491.3 175.2C494.3 178.2 496 182.3 496 186.5L496 384C496 392.8 488.8 400 480 400zM288 448L480 448C515.3 448 544 419.3 544 384L544 186.5C544 169.5 537.3 153.2 525.3 141.2L466.7 82.7C454.7 70.7 438.5 64 421.5 64L288 64C252.7 64 224 92.7 224 128L224 384C224 419.3 252.7 448 288 448zM160 192C124.7 192 96 220.7 96 256L96 512C96 547.3 124.7 576 160 576L352 576C387.3 576 416 547.3 416 512L416 496L368 496L368 512C368 520.8 360.8 528 352 528L160 528C151.2 528 144 520.8 144 512L144 256C144 247.2 151.2 240 160 240L176 240L176 192L160 192z"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${styles.passwordCopiedMessage} ${copiedAnimation ? styles.animate : ""}`}>
                <p>Password Copied</p>
            </div>
        </div>
    )
}