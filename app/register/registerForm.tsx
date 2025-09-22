"use client"
import React, {useState, useEffect} from "react";
import styles from "./page.module.css";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

export default function RegisterForm({ action }: {action: (formData: FormData) => void}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [passwordCheck, setPasswordCheck] = useState(true);

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPassword = () => {
        setShowConfirmPassword(prev => !prev);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const insertMismatchHTML = () => {
        return (
            <div><p>Passwords do not match.</p></div>
        )
    }

    useEffect(() => {
        if (formData.password !== formData.confirmPassword) {
            setPasswordCheck(false);
            insertMismatchHTML()
        } else if (formData.password === formData.confirmPassword) {
            setPasswordCheck(true);
        }
    }, [formData]);

    return (
        <form action={action}>
            <div className={styles.registerTitle}>
                <hr />
                <p>Register</p>
                <hr/>
            </div>
            <div className={styles.content}>
                <div className={styles.emailInputWrapper}>
                    <input className={styles.emailInput} name={"email"} type={"text"} placeholder={"Email"} value={formData.email} onChange={handleChange} />
                </div>
                <div className={styles.password}>
                    <div className={passwordCheck ? styles.passwordInputWrapper : `${styles.passwordInputWrapper} ${styles.mismatch}`}>
                        <input id={"passwordInput"} name={"password"} className={styles.passwordInput} type={showPassword ? "text" : "password"} placeholder={"Password"} value={formData.password} onChange={handleChange} />
                        <button type={"button"} className={styles.showPasswordBtn} onClick={togglePassword}>
                            {showPassword ? (
                                <EyeSlashIcon className={styles.eyeIcon} />
                            ) : (
                                <EyeIcon className={styles.eyeIcon} />
                            )}
                        </button>
                    </div>
                    <div className={passwordCheck ? styles.passwordInputWrapper : `${styles.passwordInputWrapper} ${styles.mismatch}`}>
                        <input id={"confirmPasswordInput"} name={"confirmPassword"} className={styles.passwordInput} type={showConfirmPassword ? "text" : "password"} placeholder={"Confirm Password"} value={formData.confirmPassword} onChange={handleChange} />
                        <button type={"button"} className={styles.showPasswordBtn} onClick={toggleConfirmPassword}>
                            {showConfirmPassword ? (
                                <EyeSlashIcon className={styles.eyeIcon} />
                            ) : (
                                <EyeIcon className={styles.eyeIcon} />
                            )}
                        </button>
                    </div>
                    {passwordCheck ? (
                        <div></div>
                    ) : (
                        <div className={styles.mismatchPopup}><p>Passwords do not match.</p></div>
                    )}
                </div>
                <button className={styles.registerBtn}>Register</button>
            </div>
        </form>
    )
}