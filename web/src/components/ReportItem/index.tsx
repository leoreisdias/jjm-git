import React from 'react';

import infoIcon from '../../assets/images/icons/warning.svg'
import './styles.css';
import { Link } from 'react-router-dom';

export interface Report {
    _id: string;
    imageURL: string;
    title: string;
    name: string;
    description: string;
    date: string;
}

interface ReportItemProps {
    report: Report,
}


const ReportItem: React.FC<ReportItemProps> = ({ report }) => {
    const year = report.date.substring(0, 4);
    const month = report.date.substring(5, 7);
    const day = report.date.substring(8, 10);



    return (

        <article className="report-item">
            <header>
                <img src={report.imageURL} alt="Materia" />
                <div>
                    <strong>{report.title}</strong>
                    <span>{report.name}</span>
                </div>
            </header>
            <footer>
                <p>
                    Data da Nota
                    <strong>{`${day}/${month}/${year}`}</strong>
                </p>

                <Link to={`/report-detail/${report._id}`}>
                    <button type="button">
                        <img src={infoIcon} alt="Mais informações" />
                       Saiba Mais
                    </button>
                </Link>
            </footer>
        </article>
    );
}

export default ReportItem;