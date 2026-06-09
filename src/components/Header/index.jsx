import React from "react";
import classes from "./Header.module.css";

export const Header = () => {
    return (
        <header className={classes.header}>
            <a href="/" className={classes.headerLink}>
                Blog
            </a>
            <a href="/contact" className={classes.headerLink}>
                お問い合わせ
            </a>
        </header>
    )
}