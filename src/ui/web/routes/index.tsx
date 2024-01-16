import React, {FC, memo} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from "../pages/home";
import {PropositionListPage} from "../pages/proposition/list";
import {NewsletterListPage} from "../pages/newsletter/list";
import {PropositionDetailsPage} from "../pages/proposition/details";
import {NewsletterDetailsPage} from "@pages/newsletter/details";
import {TrendingPage} from "@pages/trending";

interface Props {
    className?: string;
}

export const NavigationRoutes: FC<Props> = memo(function NavigationRoutes(props = {}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/proposicoes" element={<PropositionListPage />} />
                <Route path="/boletins" element={<NewsletterListPage />} />
                <Route path="/trendings" element={<TrendingPage />} />
                <Route path="/detalhes-da-proposicao/:id" element={<PropositionDetailsPage />} />
                <Route path="/detalhes-do-boletim/:id" element={<NewsletterDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
});
