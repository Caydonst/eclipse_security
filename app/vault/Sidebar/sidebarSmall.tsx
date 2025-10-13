import React, { useState } from "react";
import Image from "next/image";
import eclipse from "../../assets/eclipse.png";
import styles from "../page.module.css";
import {
    ListBulletIcon as ListBulletOutline,
    LockClosedIcon as LockClosedOutline,
    CreditCardIcon as CreditCardOutline,
    BuildingLibraryIcon as BuildingLibraryOutline,
    StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
import {
    ListBulletIcon as ListBulletSolid,
    LockClosedIcon as LockClosedSolid,
    CreditCardIcon as CreditCardSolid,
    BuildingLibraryIcon as BuildingLibrarySolid,
    StarIcon as StarSolid,
} from "@heroicons/react/24/solid";
import ProfileCard from "../profileCard";

export default function SidebarSmall({selected, setSelected, setRouteTitle}: {selected: string, setSelected: any, setRouteTitle: any}) {

    const buttons = [
        { id: "all", label: "All Items", outline: <ListBulletOutline />, solid: <ListBulletSolid /> },
        { id: "passwords", label: "Passwords", outline: <LockClosedOutline />, solid: <LockClosedSolid /> },
        { id: "cards", label: "Payment Cards", outline: <CreditCardOutline />, solid: <CreditCardSolid /> },
        { id: "bank", label: "Bank Accounts", outline: <BuildingLibraryOutline />, solid: <BuildingLibrarySolid /> },
        { id: "favorites", label: "Favorites", outline: <StarOutline />, solid: <StarSolid /> },
    ];

    const handleBtnClick = (id: string) => {
        setSelected(id);
        const obj: any = buttons.find(button => button.id === id);
        const title: string = obj.label;
        console.log(title);
        setRouteTitle(title);
    }

    return (
        <div className={styles.sideBarSmall}>
            <div className={styles.sideBarLogoContainer}>
                <Image src={eclipse} alt={""} className={styles.logo}/>
            </div>

            {buttons.map((btn) => (
                <button
                    key={btn.id}
                    onClick={() => handleBtnClick(btn.id)}
                    className={`${styles.sideBarSmallButton} ${selected === btn.id ? styles.sideBarSmallSelected : ""}`}
                >
          <span className={`${styles.sideBarIcon} ${selected === btn.id ? styles.sidebarIconSelected : ""}`}>
            {selected === btn.id ? btn.solid : btn.outline}
          </span>
                </button>
            ))}

            <ProfileCard />
        </div>
    );
}
