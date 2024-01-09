import React, { memo } from 'react';
import type { FC } from 'react';

import appStyles from './App.module.scss';
import {Home} from '../pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {PropositionListPage} from "../pages/proposition/list";
import {NewsletterListPage} from "../pages/newsletter/list";

interface Props {
  className?: string;
}

export const App: FC<Props> = memo(function App(props = {}) {
  return (
    <div className={`${appStyles.resets} ${appStyles.root}`}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/proposicoes" element={<PropositionListPage />} />
                <Route path="/boletins" element={<NewsletterListPage />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
});