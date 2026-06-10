import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
    return (
        <header className={classes.header}>
            <Link to="/" className={classes.headerLink}>
                Blog
            </Link>
            <a href="/contact" className={classes.headerLink}>
                お問い合わせ
            </a>
        </header>
    )
}