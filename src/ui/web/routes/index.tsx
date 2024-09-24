import React, {FC, memo} from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from "../pages/home";
import {NewsletterListPage} from "../pages/newsletter/list";
import {PropositionDetailsPage} from "../pages/proposition/details";
import {NewsletterDetailsPage} from "@pages/newsletter/details";
import {TrendingPage} from "@pages/trending";
import {OriginalPropositionPage} from "@pages/proposition/original";
import NotFoundPage from "@components/base/notFound";
import {PropositionListByTypePage} from "@pages/proposition/listByType";
import {LoginPage} from "ui/web/pages/auth/login";
import {SignUpPage} from "ui/web/pages/auth/signUp";
import {ActivateAccountPage} from "@pages/user/activateAccount";
import {ViewLaterListPage} from "@pages/viewLater/list";

interface Props {
    className?: string;
}

export const NavigationRoutes: FC<Props> = memo(function NavigationRoutes(props = {}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/proposições-por-tipo/:id" element={<PropositionListByTypePage />} />
                <Route path="/boletins" element={<NewsletterListPage />} />
                <Route path="/trendings" element={<TrendingPage />} />
                <Route path="/detalhes-da-proposição/:id" element={<PropositionDetailsPage />} />
                <Route path="/detalhes-do-boletim/:id" element={<NewsletterDetailsPage />} />
                <Route path="/proposição-original/:codteor" element={<OriginalPropositionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/cadastre-se" element={<SignUpPage />} />
                <Route path="/ativar-conta" element={<ActivateAccountPage />} />
                <Route path="/ver-mais-tarde" element={<ViewLaterListPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
});
