import React from 'react'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'
import { FaArrowCircleUp, FaFacebookSquare } from 'react-icons/fa'
import sonicGif from '../../assets/images/sonic.gif'

import './styles.css';

function goUp() {
    window.scrollTo(0, 0);

}

function PageFooter() {
    return (
        <span>
            {/* <iframe src="https://www.noticiasagricolas.com.br/cotacoes/cafe" title="cafe"></iframe> */}

            <iframe
                src="//widget.horoscopovirtual.com.br/horoscopo?background=E6E6F0&amp;color=585ca9&amp;border=E6E6F0&amp;text=585ca9&amp;font=roboto"
                className="horoscopoIframe"
                title="horoscopo"
            >

            </iframe>
            <div className="goUp">
                <FaArrowCircleUp size={50} color="#6842C2" onClick={goUp} className="iconUp" /><br />
                <p onClick={goUp}>Voltar ao Topo</p>

            </div>


            <footer className="page-footer" >
                <div className="footer-content">
                    <div className="contact">
                        <p>Feito por Leonardo R. Dias<br />
                            <span><strong>Contatos:</strong> leonardord99@gmail.com</span>
                        </p>
                        <a href="https://github.com/leoreisdias" target="_blank" rel="noopener noreferrer">
                            <AiFillGithub size={30} color="black" />
                        </a>
                        <a href="https://www.linkedin.com/in/leonardord99/" target="_blank" rel="noopener noreferrer">
                            <AiFillLinkedin size={30} color="#342566" />
                        </a>

                    </div>
                    <p><strong> Contatos JJM</strong><br />
                        <span><strong>Email:</strong>  jornaljotamaria@gmail.com</span><br />
                        <a href="https://www.facebook.com/jornaljotamaria" target="_blank" rel="noopener noreferrer">
                            <FaFacebookSquare color="#0000ff" size={20} className="icon" />
                            Nossa Página
                        </a>

                    </p>
                    <div
                        className="fb-page"
                        data-href="https://www.facebook.com/jornaljotamaria/"
                        data-tabs="timeline"
                        data-width="300"
                        data-height="200"
                        data-small-header="false"
                        data-adapt-container-width="false"
                        data-hide-cover="false"
                        data-show-facepile="true"
                    >
                        <blockquote
                            cite="https://www.facebook.com/jornaljotamaria/"
                            className="fb-xfbml-parse-ignore"
                        >
                            <a
                                href="https://www.facebook.com/jornaljotamaria/">
                                JJM - Jornal Jota Maria
                                        </a>
                        </blockquote>
                    </div>
                </div>

                <div>
                    <img src={sonicGif} alt="Gif Animado" />
                </div>
            </footer >
        </span >
    );
}

export default PageFooter;