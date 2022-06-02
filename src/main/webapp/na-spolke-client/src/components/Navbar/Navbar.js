import React, {useEffect, useState} from 'react';
import {NavbarItemsLeft, NavbarItemsRight} from './NavbarItems/NavbarItems.js';
import './Navbar.css';


export default function Navbar() {
    const [stickyClass, setStickyClass] = useState('');
    useEffect(() => {
        window.addEventListener('scroll', stickyNavbar);
        return () => window.removeEventListener('scroll', stickyNavbar)
    }, [])

    const stickyNavbar = () => {
        if (window !== undefined) {
            window.scrollY > document.getElementById('navbar').offsetTop ?
                setStickyClass('sticky-nav') : setStickyClass('');
        }
    }

    return(
        <header>
            <div>logo space</div>
            <div id={'navbar'} className={stickyClass}>
                <NavbarItemsLeft />
                <NavbarItemsRight />
            </div>
        </header>
    )
}
