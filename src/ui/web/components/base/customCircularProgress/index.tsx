import React from 'react';
import styles from "./styles.module.scss";
import {CircularProgress} from "@mui/material";

interface Props {
    color?: string;
}

function CustomCircularProgress({color = '#0047ab' }: Props) {
    return (
        <div className={styles.circularProgress}>
            <CircularProgress sx={{ color: color, width: '64px !important' }} />
        </div>
    );
};

export default CustomCircularProgress;
