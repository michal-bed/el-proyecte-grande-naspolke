import React from 'react';
import styles from '../Navbar.module.css';
import {Link} from "react-router-dom";

const itemsLeft = [
    ['Cennik', '#cennik'],
    ['Usługi', '#uslugi'],
    ['O nas', '#o_nas'],
    ['Kontakt', '#kontakt'],
    ['Pomoc', '#pomoc'],
]

const itemsRight = [
    ['Rejestracja', 'register'],
    ['Logowanie', 'login'],
]

export function NavbarItemsLeft () {
    return NavbarBox(itemsLeft, `${styles["left-element"]}`);
}

export function NavbarItemsRight () {
    return NavbarBox(itemsRight, `${styles["right-element"]}`);
}

function NavbarBox (itemsArray, className) {
    return (
        <div className={`${styles["flex-display"]} ${className}`}>
            <NavbarItems itemsArray={itemsArray} />
        </div>
    )
}

const NavbarItems = ({itemsArray}) => {
    let items = [];
    for (let i = 0; i < itemsArray.length; i++) {
        if (i === itemsArray.length-1) {
            items.push(
                <Link key={itemsArray[i][0]} className={`${styles["nav-button"]} ${styles["nav-animation"]}`} to={ itemsArray[i][1]}>{itemsArray[i][0]}</Link>
            )
        } else {
            items.push(
                <Link key={itemsArray[i][0]} className={`${styles["nav-button"]} ${styles["nav-animation"]} ${styles["right-border"]}`} to={itemsArray[i][1]}>{itemsArray[i][0]}</Link>
            )
        }
    }
    return items;
}