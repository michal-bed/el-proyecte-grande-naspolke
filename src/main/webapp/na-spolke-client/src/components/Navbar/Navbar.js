import React, {useEffect, useRef, useState} from 'react';
import {NavbarItemsLeft, NavbarItemsRight} from './NavbarItems/NavbarItems.js';
import './Navbar.css';


export default function Navbar() {

    const [height, setHeight] = useState(0);
    const ref = useRef(null);

    const [stickyClass, setStickyClass] = useState('');
    useEffect(() => {
        setHeight(ref.current.clientHeight);

        window.addEventListener('scroll', stickyNavbar);
        return () => window.removeEventListener('scroll', stickyNavbar)
    }, [])

    const stickyNavbar = () => {
        if (window !== undefined) {
            const navbar = document.getElementById('nav-wrapper');
            const sticky = navbar.offsetTop;

            window.scrollY > sticky ?
                setStickyClass('sticky-nav') : setStickyClass('');
        }
    }

    return(
        <header>
            <div>
                <p>logo</p>
                <p>test</p>
                <p>test</p>
                <p>test</p>

            </div>
            <div ref={ref} id={'nav-wrapper'} style={{minHeight: height}}>
                <div id={'navbar'} className={stickyClass}>
                    <NavbarItemsLeft />
                    <NavbarItemsRight />
                </div>
            </div>
        </header>
    )
}
