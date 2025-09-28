"use client"
import React, {useState, useEffect} from "react";
import styles from "./page.module.css";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {signIn} from "next-auth/react";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "", confirmPassword: "" });
    const [passwordCheck, setPasswordCheck] = useState(true);
    const [loading, setLoading] = useState(false);

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
        console.log(formData);
        if (formData.password !== formData.confirmPassword) {
            setPasswordCheck(false);
            insertMismatchHTML()
        } else if (formData.password === formData.confirmPassword) {
            setPasswordCheck(true);
        }
    }, [formData]);

    const createAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email, password: formData.password }),
        });

        if (res.ok) {
            await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                callbackUrl: "/vault",
            });
        } else {
            console.error(await res.json());
        }
    };


    return (
        <form className={styles.signupForm} onSubmit={e => createAccount(e)}>
            <div className={styles.emailWrapper}>
                <label htmlFor={"email"}>Email</label>
                <input id={"emailInput"} className={styles.emailInput} name={"email"} type={"email"} placeholder={"Enter your email"} value={formData.email} onChange={e => handleChange(e)}/>
            </div>
            <div className={styles.passwordWrapper}>
                <label htmlFor={"password"}>Password</label>
                <div className={styles.passwordInputWrapper}>
                    <input id={"passwordInput"} name={"password"} className={passwordCheck ? styles.passwordInput : `${styles.passwordInput} ${styles.mismatch}`} type={showPassword ? "text" : "password"} placeholder={"Enter your password"} value={formData.password} onChange={handleChange} />
                    <button type={"button"} className={styles.showPasswordBtn} onClick={togglePassword}>
                        {showPassword ? (
                            <EyeSlashIcon className={styles.eyeIcon} />
                        ) : (
                            <EyeIcon className={styles.eyeIcon} />
                        )}
                    </button>
                </div>
            </div>
            <div className={styles.passwordWrapper}>
                <label htmlFor={"confirmPassword"}>Confirm Password</label>
                <div className={passwordCheck ? styles.passwordInputWrapper : `${styles.passwordInputWrapper} ${styles.mismatch}`}>
                    <input id={"confirmPasswordInput"} name={"confirmPassword"} className={passwordCheck ? styles.passwordInput : `${styles.passwordInput} ${styles.mismatch}`} type={showConfirmPassword ? "text" : "password"} placeholder={"Confirm your password"} value={formData.confirmPassword} onChange={handleChange} />
                    <button type={"button"} className={styles.showPasswordBtn} onClick={toggleConfirmPassword}>
                        {showConfirmPassword ? (
                            <EyeSlashIcon className={styles.eyeIcon} />
                        ) : (
                            <EyeIcon className={styles.eyeIcon} />
                        )}
                    </button>
                </div>
                {!passwordCheck && (
                    <div className={styles.mismatchPopup}><p>Passwords do not match.</p></div>
                )}
            </div>
            <button
                type={"submit"}
                className={styles.signupBtn}
                disabled={loading || !passwordCheck || !formData.email || !formData.password || !formData.confirmPassword}
            >
                {loading ? (
                    <div className={styles.dotLoader}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                ) : (
                    "Sign up"
                )}
            </button>
        </form>
    )
}