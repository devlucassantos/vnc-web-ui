import React, {FC, memo, useState} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
    iconStyle: any;
    titleViewStyle: any;
    label: string;
}

export const PageTitle: FC<Props> = memo(function PageTitle({
    iconStyle,
    titleViewStyle,
    label,
    ...props
}) {
    return (
        <div className={titleViewStyle}>
            <div className={iconStyle} />
            <div className={styles.label}>{label}</div>
        </div>
    );
});
