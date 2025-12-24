import React, { useState } from "react";
import Image from "next/image";
import eclipse from "../../assets/eclipse.png";
import styles from "./page.module.css";
import {
    ListBulletIcon as ListBulletOutline,
    LockClosedIcon as LockClosedOutline,
    CreditCardIcon as CreditCardOutline,
    BuildingLibraryIcon as BuildingLibraryOutline,
    StarIcon as StarOutline,
    PlusIcon as PlusOutline,
} from "@heroicons/react/24/outline";
import {
    ListBulletIcon as ListBulletSolid,
    LockClosedIcon as LockClosedSolid,
    CreditCardIcon as CreditCardSolid,
    BuildingLibraryIcon as BuildingLibrarySolid,
    StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import ProfileCard from "../profileCard";
import {Account} from "@/app/api/vault/vaultItems"

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

type props = {
    selected: boolean;
    setSelected: React.Dispatch<React.SetStateAction<boolean>>;
    setRouteTitle: React.Dispatch<React.SetStateAction<string>>;
    handleOpenAccount: () => void;
    user: User;
    setProfileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setVaultItems: React.Dispatch<React.SetStateAction<Account>>;
}

export default function Sidebar({selected, setSelected, setRouteTitle, handleOpenAccount, user, setProfileMenuOpen, setVaultItems}: props) {

    const buttons = [
        { id: "all", label: "All Items", outline: <ListBulletOutline />, solid: <ListBulletSolid /> },
        { id: "passwords", label: "Passwords", outline: <LockClosedOutline />, solid: <LockClosedSolid /> },
        { id: "cards", label: "Payment Cards", outline: <CreditCardOutline />, solid: <CreditCardSolid /> },
        { id: "bank", label: "Bank Accounts", outline: <BuildingLibraryOutline />, solid: <BuildingLibrarySolid /> },
        { id: "favorites", label: "Favorites", outline: <StarOutline />, solid: <StarSolid /> },

    ];

    const handleBtnClick = (id: string) => {
        setSelected(id);
        if (id === "profile") {
            setRouteTitle("Profile");
        } else {
            const obj: any = buttons.find(button => button.id === id);
            const title: string = obj.label;
            console.log(title);
            setRouteTitle(title);
        }
    }

    return (
        <>
            {/* ----------------- DESKTOP SIDEBAR ----------------- */}
            <div className={styles.sideBar}>
                <div className={styles.sideBarHeader}>
                    <div className={styles.headerIconContainer}>
                        <Image src={eclipse} alt={""} className={styles.logo}/>
                    </div>
                    <h1>Eclurity</h1>
                </div>
                <div className={styles.sidebarButtons}>
                    <button className={styles.addNewBtn} onClick={() => handleOpenAccount(-1)}><div  className={styles.addNewIcon}><PlusOutline /></div><p>Create New</p></button>
                    <div className={styles.routeBtnContainer}>
                        {buttons.map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => handleBtnClick(btn.id)}
                                className={`${styles.sideBarButton} ${selected === btn.id ? styles.selected : ""}`}
                            >
                  <div className={`${styles.sideBarIcon} ${selected === btn.id ? styles.selected: ""}`}>
                    {selected === btn.id ? btn.solid : btn.outline}
                  </div>
                                <p>{btn.label}</p>
                            </button>
                        ))}
                    </div>
                </div>
                <ProfileCard user={user} setProfileMenuOpen={setProfileMenuOpen} />
            </div>

            {/* ----------------- MOBILE SIDEBAR ----------------- */}
            <div className={styles.sidebarSmall}>
                <div className={styles.sidebarSmallButtons}>
                    <button className={styles.addNewBtnSmall} onClick={() => handleOpenAccount(-1)}><PlusOutline className={styles.addNewIconSmall} /></button>
                    <div className={styles.routeBtnContainerSmall}>
                        {buttons.map((btn) => (
                            <div key={btn.id} className={`${styles.sidebarSmallButton} ${selected === btn.id ? styles.selected : ""}`}>
                                <button
                                    onClick={() => handleBtnClick(btn.id)}
                                    className={styles.sidebarSmallButtonInner}
                                >
                  <span className={`${styles.sideBarSmallIcon} ${selected === btn.id ? styles.selected : ""}`}>
                    {selected === btn.id ? btn.solid : btn.outline}
                  </span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
