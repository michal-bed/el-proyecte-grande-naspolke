import React from 'react';
import logo from './img/logo.png'
import styles from './Logo.module.css';

export default function Logo () {
    return (
        <div id={'banner'} className={`${styles["logo-container"]}`}>
            <div id={'logo'}>
                <img src={logo} alt={'Logo'}/>
            </div>
        </div>
    )
}

