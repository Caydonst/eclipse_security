"use client"

import styles from "@/app/login/page.module.css";
import React, {useState} from "react";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";

// @ts-ignore
export default function LoginForm({ handleSubmit, error }) {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await handleSubmit(e);
        } finally {
            setLoading(false);
        }
    }

    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <form className={styles.loginForm} onSubmit={signIn}>
            <div className={styles.emailWrapper}>
                <label htmlFor={"email"}>Email</label>
                <input id={"emailInput"} className={styles.emailInput} name={"email"} type={"email"} placeholder={"Enter your email"} value={email} onChange={e => changeEmail(e)} />
            </div>
            <div className={styles.passwordWrapper}>
                <label htmlFor={"password"}>Password</label>
                <div className={styles.passwordInputWrapper}>
                    <input id={"passwordInput"} name={"password"} className={styles.passwordInput} type={showPassword ? "text" : "password"} placeholder={"Enter your password"} value={password} onChange={(e) => changePassword(e)}/>
                    <button type={"button"} className={styles.showPasswordBtn} onClick={togglePassword}>
                        {showPassword ? (
                            <EyeSlashIcon className={styles.eyeIcon} />
                        ) : (
                            <EyeIcon className={styles.eyeIcon} />
                        )}
                    </button>
                </div>
            </div>
            {error && (
                <p className={styles.errorMsg}>Incorrect email or password.</p>
            )}
            <button
                type={"submit"}
                className={styles.loginBtn}
                disabled={loading || !email || !password}
            >
                {loading ? (
                    <div className={styles.dotLoader}>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                        <div className={styles.dot}></div>
                    </div>
                ) : (
                    "Sign in"
                )}
            </button>
        </form>
    )
}