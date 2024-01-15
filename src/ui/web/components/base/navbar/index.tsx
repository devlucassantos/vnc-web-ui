import React, {FC, memo, useState} from "react";
import styles from "./styles.module.scss";
import {DrawerMenu} from "./drawerMenu";
import {Link} from "react-router-dom";
import {MenuIcon} from "../icon/MenuIcon";

interface Props {
    className?: string;
}

export const Navbar: FC<Props> = memo(function Navbar(props = {}) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.iconMenu} onClick={handleDrawerOpen} >
                <MenuIcon className={styles.icon} />
            </div>
            <Link to="/">
                <div className={styles.logoWhite} />
            </Link>
            <DrawerMenu isOpen={isDrawerOpen} onClose={handleDrawerClose} />
        </div>
    );
});

export default Navbar;
