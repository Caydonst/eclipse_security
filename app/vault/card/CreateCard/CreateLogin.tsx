import styles from "../page.module.css"
import React, {useState} from "react";
import {createLogin} from "@/app/api/card/route";
import {Account} from "@/app/api/vault/vaultItems";

type props = {
    setVaultItems: React.Dispatch<React.SetStateAction<Account>>
}

export default function CreateLogin({ setVaultItems }: props) {
    const [name, setName] = useState("")
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    function newLogin(formData: FormData) {
        const items = createLogin(formData);
        console.log(items);
        setVaultItems(items);
    }

    return (
        <form className={styles.loginForm} action={newLogin}>
            <div className={styles.createInputsContainer}>
                <h2>Login</h2>
                <div className={styles.createInput}>
                    <label htmlFor={"nameInput"}>Name</label>
                    <input id={"nameInput"} name={"name"} placeholder={"Name"} type={"text"} maxLength={"255"} value={name} onChange={(e) => handleNameChange(e)} />
                </div>
                <hr/>
                <div className={styles.createInput}>
                    <label htmlFor="loginInput">Login</label>
                    <input id={"loginInput"} name={"login"} type={"text"} placeholder={"Username/Email"} maxLength={"255"} value={login} onChange={(e) => handleLoginChange(e)} />
                </div>
                <div className={styles.createInput}>
                    <label htmlFor="passwordInput">Password</label>
                    <input id={"passwordInput"} name={"password"} type={"text"} placeholder={"Password"} maxLength={"255"} value={password} onChange={(e) => handlePasswordChange(e)} />
                </div>
                <div className={styles.createBtnContainer}>
                    <button className={styles.createBtn}>Create</button>
                    <p className={styles.encryptTag}>All information is encrypted.</p>
                </div>
                <div className={styles.footerColor} style={{backgroundColor: '#FF4654'}}></div>
            </div>
        </form>
    )
}