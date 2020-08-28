import React from 'react';
import { Link } from 'react-router-dom'

import logoImg from '../../assets/images/logo.png'
// import landingImg from '../../assets/images/jota.png';

import studyIcon from '../../assets/images/icons/study.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';


function Landing() {
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt="JJM" />
                    <h2>Jornal Jota Maria</h2>
                </div>

                <div className="buttons-container">
                    <Link to="/dashboard" className="study">
                        <img src={studyIcon} alt="Acessar" />
                        Acessar
                    </Link>
                </div>

                <span className="total-connections">
                    O seu site de informações de Muzambinho e Região <img src={purpleHeartIcon} alt="Coração Roxo" />
                </span>
            </div>
        </div>
    )
}

export default Landing;