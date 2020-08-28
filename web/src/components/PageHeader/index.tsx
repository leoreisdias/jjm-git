import React from 'react'
import logoImg from '../../assets/images/logo.png'

import './styles.css';


interface PageHeaderProps {
    title: string;
    description?: string;
    backLink: string;
}


const PageHeader: React.FC<PageHeaderProps> = ({ title, description, backLink, children }) => {

    return (
        <header className="page-header" id={backLink}>
            <div className="JJM">
                <img src={logoImg} alt="" />
            </div>
            <div className="header-content">

                <strong>{title}</strong>
                {children}
            </div>

        </header >

    );
}

export default PageHeader;