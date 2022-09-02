import React, {useEffect, useRef, useState} from 'react';
import {NavbarItemsLeft, NavbarItemsRight} from './NavbarItems/NavbarItems.js';
import Logo from './Logo/Logo.js';
import styles from './Navbar.module.css';


export default function Navbar () {

    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    const [stickyClass, setStickyClass] = useState('');

    useEffect(() => {
        setHeight(ref.current.clientHeight);

        setStickyNavbar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function setStickyNavbar () {
        stickyNavbar()
        window.addEventListener('scroll', stickyNavbar);
        return () => window.removeEventListener('scroll', stickyNavbar)
    }

    const stickyNavbar = () => {
        if (window !== undefined) {
            const navbar = document.getElementById('nav-wrapper');
            const sticky = navbar.offsetTop;

            window.scrollY > sticky ?
                setStickyClass(styles["sticky-nav"]) : setStickyClass('');
        }
    }

    return(
        <header>

            <Logo />

            <div id={'nav-wrapper'} style={{minHeight: height}}>
                <div ref={ref} id={styles["navbar"]} className={stickyClass}>
                    <NavbarItemsLeft />
                    <NavbarItemsRight />
                </div>
            </div>
        </header>
    )
}
