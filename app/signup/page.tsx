"use client"
import styles from "./page.module.css";
import {redirect} from "next/navigation"
import {signIn, useSession} from "next-auth/react";
import SignupForm from "./signupForm";
import Link from "next/link"
import React from "react";
import {useState} from "react";
import Navbar from "../components/navbar/navbar"
import Image from "next/image";
import loginImg from "@/app/assets/image1.png";

export default function SignupPage() {
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();

    if (session) {
        redirect("/vault")
    }

    const googleSignIn = async () => {
        setLoading(true);
        await signIn("google", { callbackUrl: "/vault" });
    }

    return (
        <>
            <Navbar />
            <div className={styles.signupPageContainer}>
                <div className={styles.signupImgContainer}>
                    <div className={styles.lightLeft}></div>
                    <div className={styles.lightRight}></div>
                    <div className={styles.imgContainer}>
                        <Image className={styles.image} src={loginImg} alt={"login image"}/>
                    </div>
                </div>
                <div className={styles.signupContainer}>
                    <div className={styles.header}>
                        <h1>Create account</h1>
                        <p>Create your Eclipse Security account.</p>
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
                                Sign up with Google
                            </div>
                        )}
                    </button>
                    <div className={styles.divider}>
                        <hr/>
                        <p>or</p>
                        <hr/>
                    </div>
                    <SignupForm/>
                    <div className={styles.footer}>
                        <p>Already have an account? <Link href={"/login"}>Sign in</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
}