import Pagination from '@mui/material/Pagination';
import {createTheme} from '@mui/material/styles';
import {CssBaseline, ThemeProvider} from "@mui/material";
import styles from "./styles.module.scss";
import React from "react";

interface Props {
    currentPage: number;
    count: number;
    actionOnChange: Function;
    color?: string;
}

function CustomPagination({ currentPage, count, actionOnChange, color = '#0047ab' }: Props) {
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        actionOnChange(value);
    };

    const theme = createTheme({
        palette: {
            primary: {
                main: color,
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
                className={styles.pagination}
                count={count}
                page={currentPage}
                onChange={handleChange}
                showFirstButton
                showLastButton
                size="large"
                color="primary"
            />
        </ThemeProvider>
    );
}

export default CustomPagination;
