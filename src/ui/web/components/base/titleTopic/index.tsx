import React, {FC, memo} from "react";
import styles from "./styles.module.scss";

interface Props {
    className?: string;
    titleViewStyle: any;
    label: string;
    color?: string;
}

export const TitleTopic: FC<Props> = memo(function TitleTopic({
    label,
    titleViewStyle,
    color = '#0047ab',
    ...props
}) {
    return (
        <div className={titleViewStyle}>
            <div className={styles.label} style={{color: color}}>{label}</div>
            <div className={styles.divider} style={{ outline: `solid 1.5px ${color}` }}/>
        </div>
    );
});
