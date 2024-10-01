import React, { memo } from 'react';
import type { FC } from 'react';

import appStyles from './App.module.scss';
import {NavigationRoutes} from "../routes";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";

interface Props {
  className?: string;
}

const theme = createTheme({
    typography: {
        fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans'",
    },
});

export const App: FC<Props> = memo(function App(props = {}) {
  return (
      <ThemeProvider theme={theme}>
        <div className={`${appStyles.root}`}>
            <NavigationRoutes />
        </div>
      </ThemeProvider>
  );
});
