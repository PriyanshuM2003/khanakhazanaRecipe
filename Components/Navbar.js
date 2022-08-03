import React from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

const Navbar = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <ul>
                    <Link href="/"><a><li>Home</li></a></Link>
                    <Link href="/About"><a><li>About</li></a></Link>
                    <Link href="/Blog"><a><li>Blog</li></a></Link>
                    <Link href="/Contact"><a><li>Contact</li></a></Link>
                </ul>
            </nav>
        </>
    )
}

export default Navbar