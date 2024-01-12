import Pagination from '@mui/material/Pagination';
import {createTheme, makeStyles, Theme} from '@mui/material/styles';
import {CssBaseline, ThemeProvider} from "@mui/material";
import styles from "./styles.module.scss";
import React, {useState} from "react";

interface Props {
    count: number;
    actionOnChange: Function;
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#0047ab',
        },
    },
});

function CustomPagination({ count, actionOnChange }: Props) {
    const [page, setPage] = useState<number>(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
        actionOnChange(value);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Pagination
                className={styles.pagination}
                count={count}
                page={page}
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
