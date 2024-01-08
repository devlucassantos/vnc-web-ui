import {memo, useEffect, useState} from 'react';
import type { FC } from 'react';

import styles from './styles.module.scss';
import Navbar from "../../../components/base/navbar";
import BigCard from "../../../components/base/card/bigCard";
import TimeLine from "../../../components/base/timeLine";
import {Filters} from "../../../components/base/filters";
import DIContainer from "../../../dicontainer";
import News from "../../../../../core/domain/models/News";
import {PageTitle} from "../../../components/base/pageTitle";

interface Props {
  className?: string;
}

const newsService = DIContainer.getNewsUseCase();

export const NewsletterListPage: FC<Props> = memo(function NewsletterListPage(props = {}) {
    const [newsList, setNews] = useState<News[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await newsService.getNews();
                setNews(data);
            } catch (error) {
                console.log(error)
            }
        };

        fetchNews();
    }, []);


  return (
    <div className={`${styles.resets} ${styles.root} ${styles.background}`}>
      <Navbar />
      <div className={styles.body}>
          <PageTitle iconStyle={styles.newsletterIcon} label="Boletins" />
          <Filters filtersRowStyle={styles.filtersRow}/>
          {newsList.length > 0 && <TimeLine newsList={newsList}/>}
      </div>
    </div>
  );
});
