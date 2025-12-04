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

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

export default function Sidebar({selected, setSelected, setRouteTitle, handleOpenAccount, user}: {selected: string, setSelected: any, setRouteTitle: any, handleOpenAccount: any, user: User}) {

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
                    <Image src={eclipse} alt={""} className={styles.logo}/>
                    <h1>Eclurity</h1>
                </div>
                <div className={styles.sidebarButtons}>
                    <button className={styles.addNewBtn} onClick={() => handleOpenAccount(-1)}><PlusOutline className={styles.sideBarIcon} />Create New</button>
                    <div className={styles.routeBtnContainer}>
                        {buttons.map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => handleBtnClick(btn.id)}
                                className={`${styles.sideBarButton} ${selected === btn.id ? styles.selected : ""}`}
                            >
                  <span className={`${styles.sideBarIcon} ${selected === btn.id ? styles.selected: ""}`}>
                    {selected === btn.id ? btn.solid : btn.outline}
                  </span>
                                {btn.label}
                            </button>
                        ))}
                    </div>
                </div>
                <ProfileCard user={user} />
            </div>

            {/* ----------------- MOBILE SIDEBAR ----------------- */}
            <div className={styles.sidebarSmall}>
                <div className={styles.sideBarHeader}>
                    <Image src={eclipse} alt={""} className={styles.logo}/>
                </div>
                <div className={styles.sidebarButtons}>
                    <button className={styles.addNewBtn} onClick={() => handleOpenAccount(-1)}><PlusOutline className={styles.sideBarIcon} /></button>
                    <div className={styles.routeBtnContainer}>
                        {buttons.map((btn) => (
                            <button
                                key={btn.id}
                                onClick={() => handleBtnClick(btn.id)}
                                className={`${styles.sidebarSmallButton} ${selected === btn.id ? styles.selected : ""}`}
                            >
                  <span className={`${styles.sideBarIcon} ${selected === btn.id ? styles.selected : ""}`}>
                    {selected === btn.id ? btn.solid : btn.outline}
                  </span>
                            </button>
                        ))}
                    </div>
                </div>
                <ProfileCard user={user} />
            </div>
        </>
    );
}
