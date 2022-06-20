import React from 'react';
import styles from '../Navbar.module.css';

const itemsLeft = [
    ['Cennik', 'cennik'],
    ['Usługi', 'uslugi'],
    ['O nas', 'o_nas'],
    ['Kontakt', 'kontakt'],
    ['Pomoc', 'pomoc'],
]

const itemsRight = [
    ['Rejestracja', '#link_do_rejestracji'],
    ['Logowanie', '#link_do_logowania'],
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
                <a key={itemsArray[i][0]} className={`${styles["nav-button"]} ${styles["nav-animation"]}`} href={'#' + itemsArray[i][1]}>{itemsArray[i][0]}</a>
            )
        } else {
            items.push(
                <a key={itemsArray[i][0]} className={`${styles["nav-button"]} ${styles["nav-animation"]} ${styles["right-border"]}`} href={'#' + itemsArray[i][1]}>{itemsArray[i][0]}</a>
            )
        }
    }
    return items;
}