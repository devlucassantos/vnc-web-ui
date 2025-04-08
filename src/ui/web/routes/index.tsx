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
import {EventListPage} from "@pages/event/list";
import {VotingListPage} from "@pages/voting/list";
import {VotingDetailsPage} from "@pages/voting/details";
import {EventDetailsPage} from "@pages/event/details";

interface Props {
    className?: string;
}

export const NavigationRoutes: FC<Props> = memo(function NavigationRoutes(props = {}) {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/propositions-by-type/:id" element={<PropositionListByTypePage />} />
                <Route path="/newsletters" element={<NewsletterListPage />} />
                <Route path="/events" element={<EventListPage />} />
                <Route path="/votes" element={<VotingListPage />} />
                <Route path="/trendings" element={<TrendingPage />} />
                <Route path="/proposition-details/:id" element={<PropositionDetailsPage />} />
                <Route path="/newsletter-details/:id" element={<NewsletterDetailsPage />} />
                <Route path="/voting-details/:id" element={<VotingDetailsPage />} />
                <Route path="/event-details/:id" element={<EventDetailsPage />} />
                <Route path="/original-proposition/:codteor" element={<OriginalPropositionPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/activate-account" element={<ActivateAccountPage />} />
                <Route path="/view-later" element={<ViewLaterListPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
});
