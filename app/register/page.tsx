import styles from "./page.module.css";
import RegisterForm from "./registerForm";
import Link from "next/link";

export default function RegisterPage() {
    async function handleRegister(formData: FormData) {
        "use server";
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");

        console.log(email, password, confirmPassword);
    }

    return (
        <div className={styles.home}>
            <div className={styles.registerContainer}>
                <div className={styles.header}>
                    <h1>Eclipse</h1>
                    <p>Security</p>
                </div>
                <RegisterForm action={handleRegister}/>
                <div className={styles.footer}>
                    <p>Already have an account?</p>
                    <Link href={"/login"}>Login</Link>
                </div>
            </div>
        </div>
    );
}