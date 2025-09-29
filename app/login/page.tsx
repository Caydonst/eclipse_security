"use client"
import styles from "./page.module.css";
import {redirect} from "next/navigation"
import {signIn, useSession} from "next-auth/react";
import LoginForm from "./loginForm";
import Link from "next/link"
import React from "react";
import {useState} from "react";
import Navbar from "../components/navbar/navbar"
import Image from "next/image";
import loginImg from "../assets/image1.png"

export default function LoginPage() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();

    if (session) {
        redirect("/vault")
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem("email") as HTMLInputElement).value;
        const password = (form.elements.namedItem("password") as HTMLInputElement).value;

        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        console.log(res);

        if (!res.ok) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const googleSignIn = async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: "/vault" });
    }

    return (
        <>
            <Navbar />
            <div className={styles.loginPageContainer}>
                <div className={styles.loginImgContainer}>
                    <div className={styles.imgContainer}>
                        <Image className={styles.image} src={loginImg} alt={"login image"} />
                    </div>
                </div>
                <div className={styles.loginContainer}>
                    <div className={styles.header}>
                        <h1>Welcome back</h1>
                        <p>Log into your Eclipse Security account.</p>
                    </div>
                    <button className={styles.googleBtn} onClick={googleSignIn} disabled={loading}>
                        {loading ? (
                            <div className={styles.dotLoader}>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                                <div className={styles.dot}></div>
                            </div>
                        ) : (
                            <div className={styles.googleBtnContent}>
                                <img className={styles.googleImg}
                                     src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                                     alt="Google logo"
                                />
                                Sign in with Google
                            </div>
                        )}
                    </button>
                    <div className={styles.divider}>
                        <hr />
                        <p>or</p>
                        <hr />
                    </div>
                    <LoginForm handleSubmit={handleSubmit} error={error} />
                    <div className={styles.footer}>
                        <p>Don't have an account? <Link href={"/signup"}>Sign up</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}