import React from 'react';

const itemsLeft = [
    ['Cennik', '#cennik'],
    ['Usługi', '#uslugi'],
    ['O nas', '#o_nas'],
    ['Kontakt', '#kontakt'],
    ['Pomoc', '#pomoc'],
]

const itemsRight = [
    ['Rejestracja', '#link_do_rejestracji'],
    ['Logowanie', '#link_do_logowania'],
]

export function NavbarItemsLeft() {
    let items = [];
    for (let i = 0; i < itemsLeft.length; i++) {
        items.push(
            <a className={'button left-element'} href={itemsLeft[i][1]}>{itemsLeft[i][0]}</a>
        )
    }
    return items;
}

export function NavbarItemsRight() {
    let items = [];
    for (let i = 0; i < itemsRight.length; i++) {
        items.push(
            <a className={'button right-element'} href={itemsRight[i][1]}>{itemsRight[i][0]}</a>
        )
    }
    return items;
}