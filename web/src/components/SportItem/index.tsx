import React from 'react';

import infoIcon from '../../assets/images/icons/warning.svg'
import './styles.css';
import { Link } from 'react-router-dom';

export interface Sport {
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

interface SportsItemProps {
    sports: Sport,
}

const NewsItem: React.FC<SportsItemProps> = ({ sports }) => {
    const year = sports.date.substring(0, 4);
    const month = sports.date.substring(5, 7);
    const day = sports.date.substring(8, 10);

    return (
        <article className="sports-item">
            <header>
                <img src={sports.imageURL} alt="Materia A" />
                <div>
                    <strong>{sports.title}</strong>
                    <span>{sports.subjects.join(',  ')}</span>
                </div>
            </header>

            {sports.summary.split('##').map(item => {
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

                <Link to={`/sports-detail/${sports._id}`}>
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