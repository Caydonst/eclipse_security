"use client"
import styles from "./page.module.css";
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function LoginForm({ action }: {action: (formData: FormData) => void}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(prev => !prev);
    };

    return (
        <form action={action}>
            <div className={styles.loginTitle}>
                <hr />
                <p>Login</p>
                <hr/>
            </div>
            <div className={styles.content}>
                <div className={styles.emailInputWrapper}>
                    <input className={styles.emailInput} name={"email"} type={"email"} placeholder={"Email"}/>
                </div>
                <div className={styles.password}>
                    <div className={styles.passwordInputWrapper}>
                        <input id={"passwordInput"} name={"password"} className={styles.passwordInput} type={showPassword ? "text" : "password"} placeholder={"Password"}/>
                        <button type={"button"} className={styles.showPasswordBtn} onClick={togglePassword}>
                            {showPassword ? (
                                <EyeSlashIcon className={styles.eyeIcon} />
                            ) : (
                                <EyeIcon className={styles.eyeIcon} />
                            )}
                        </button>
                    </div>
                    <div className={styles.questions}>
                        <div className={styles.rememberMe}>
                            <input type={"checkbox"} id={"rememberMe"} />
                            <label htmlFor={"rememberMe"}>Remember me</label>
                        </div>
                        <a href={""}> Forgot password?</a>
                    </div>
                </div>
                <button className={styles.loginBtn}>Login</button>
            </div>
        </form>
    )
}