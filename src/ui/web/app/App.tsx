import React, { memo } from 'react';
import type { FC } from 'react';

import appStyles from './App.module.scss';
import {NavigationRoutes} from "../routes";

interface Props {
  className?: string;
}

export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div className={`${appStyles.root}`}>
        <NavigationRoutes />
    </div>
  );
});
