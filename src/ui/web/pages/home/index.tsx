import {memo, useEffect, useState} from 'react';
import type { FC } from 'react';

import style from './styles.module.scss';
import Navbar from "../../components/base/navbar";
import BigCard from "../../components/base/card/bigCard";
import TimeLine from "../../components/base/timeLine";
import {Filters} from "../../components/base/filters";
import DIContainer from "../../dicontainer";
import News from "../../../../core/domain/models/News";

interface Props {
  className?: string;
}

const newsService = DIContainer.getNewsUseCase();

export const Home: FC<Props> = memo(function Home(props = {}) {
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
    <div className={`${style.resets} ${style.root} ${style.background}`}>
      <Navbar />
      <div className={style.body}>
          <Filters filtersRowStyle={style.filtersRow}/>
          {newsList.length > 0 && <BigCard news={newsList[0]} />}
          {newsList.length > 1 && <TimeLine newsList={newsList.slice(1)}/>}
      </div>
    </div>
  );
});
