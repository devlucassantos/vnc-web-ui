import React, {memo, useEffect, useState} from 'react';
import type {FC} from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import DIContainer from "../../../dicontainer";
import {PageTitle} from "../../../components/base/pageTitle";
import PropositionDetailsCard from "../../../components/proposition/details";
import TrendingContainer from "../../../components/base/trending";
import ShortRectangularAnnouncement from "../../../components/base/announcement/shortRectangular";
import {useParams} from "react-router-dom";
import Proposition from "../../../../../core/domain/models/Proposition";
import LongRectangularAnnouncement from "@components/base/announcement/longRectangular";

interface Props {
    className?: string;
}

const propositionService = DIContainer.getPropositionUseCase();

export const PropositionDetailsPage: FC<Props> = memo(function PropositionDetailsPage(props = {}) {
    const {id} = useParams();
    const [proposition, setProposition] = useState<Proposition>();

    useEffect(() => {
        const findProposition = async () => {
            try {
                if (id) {
                    const data = await propositionService.getPropositionByID(id);
                    setProposition(data);
                }
            } catch (error) {
                console.log(error)
            }
        };

        findProposition();
    }, []);

    return (
        <div className={`${styles.resets} ${styles.background}`}>
            <Navbar/>
            <div className={styles.body}>
                <LongRectangularAnnouncement/>
                <PageTitle iconStyle={styles.infoIcon} titleViewStyle={styles.titleView}
                           label="Detalhes da Proposição"/>
                <div className={styles.detailsContainer}>
                    <div className={styles.detailsLeftColumn}>
                        {proposition && <PropositionDetailsCard proposition={proposition}/>}
                    </div>
                    <div className={styles.detailsRightColumn}>
                        <TrendingContainer/>
                        <ShortRectangularAnnouncement/>
                    </div>
                </div>
            </div>
        </div>
    );
});
