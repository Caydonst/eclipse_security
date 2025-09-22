import styles from "./page.module.css";
import LoginForm from "./loginForm"
import Link from "next/link";
import {users} from "../users"
import { redirect } from "next/navigation";

export default function LoginPage() {
    async function handleLogin(formData: FormData) {
        "use server";
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(email, password);

        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            // ✅ Redirect to their page
            redirect(`/auth?user=${user.id}`);
        } else {
            // You can throw an error here, or later handle with error UI
            throw new Error("Invalid credentials");
        }

    }

    return (
        <div className={styles.home}>
            <div className={styles.loginContainer}>
                <div className={styles.header}>
                    <h1>Eclipse</h1>
                    <p>Security</p>
                </div>
                <LoginForm action={handleLogin}/>
                <div className={styles.footer}>
                    <p>Don&#39;t have an account?</p>
                    <Link href={"/register"}>Register</Link>
                </div>
            </div>
        </div>
    );
}