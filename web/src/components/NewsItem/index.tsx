import React from 'react';

import infoIcon from '../../assets/images/icons/warning.svg'
import './styles.css';
import { Link } from 'react-router-dom';

export interface News {
    _id: string;
    imageURL: string;
    title: string;
    description: string;
    date: string;
    subjects: [string];
    video_url: string;
    facebook_url: string;
    webImageOne: string;
    webImageTwo: string;
    editorial: string;
    author: string;
    source: string;
    summary: string;
}

interface NewsItemProps {
    news: News,
}

const NewsItem: React.FC<NewsItemProps> = ({ news }) => {
    const year = news.date.substring(0, 4);
    const month = news.date.substring(5, 7);
    const day = news.date.substring(8, 10);

    return (
        <article className="news-item">
            <header>
                <img src={news.imageURL} alt="Materia A" />
                <div>
                    <strong>{news.title}</strong>
                    <span>{news.subjects.join(',  ')}</span>
                </div>
            </header>

            {news.summary.split('##').map(item => {
                return <p
                    dangerouslySetInnerHTML={{
                        __html: item
                    }}
                    key={item} />
            })}
            <footer>
                <p>
                    Data da Publicação
                <strong>{`${day}/${month}/${year}`}</strong>
                </p>

                <Link to={`/news-detail/${news._id}`}>
                    <button type="button">
                        <img src={infoIcon} alt="Mais informações" />
                        Mais informações
                </button>
                </Link>
            </footer>
        </article>
    )
}

export default NewsItem;