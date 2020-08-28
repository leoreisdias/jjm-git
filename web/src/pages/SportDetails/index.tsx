import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'

import { FaBars, FaFacebookSquare, FaWhatsapp } from 'react-icons/fa'

import { Sport } from '../../components/SportItem';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Partners from '../../components/Partners';

import './styles.css'

import api from '../../services/api';


import 'semantic-ui-css/semantic.min.css'
import MyMenu from '../../components/MyMenu';

function SportDetail() {
    const [visible, setVisible] = React.useState(false)
    const [sports, setSport] = useState<Sport>();
    const [relatedNews, setRelatedNews] = useState([]);
    const [subjects, setSubjects] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const loadData = async () => {
            const response = await api.get('/sportsDetail', {
                params: {
                    id,
                }
            });
            setSport(response.data.sports);
            setSubjects(response.data.sports.subjects.join(', '))
        }
        id && loadData()
    }, [id])

    function handleSidebar() {
        if (visible === false)
            setVisible(true);
        else
            setVisible(false)
    }

    async function searchNews() {
        const response = await api.get('/searchSport', {
            params: {
                subjects,
            }
        })
        const responseReverse = response.data.sports.reverse()
        setRelatedNews(responseReverse);
    }

    function handleMetaUrl() {
        var link = document.createElement('meta');
        link.setAttribute('property', 'og:url');
        link.content = window.location.href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function handleBarTitle() {
        document.title = String(sports?.title)
    }


    return sports ? (
        <div id="page-sport-details" className="container" onLoad={handleBarTitle}>
            <PageHeader title={sports.title} backLink="sportBoard" >

                <FaBars color="white" size={50} onClick={handleSidebar} className="openSidebar" />

            </PageHeader>

            <MyMenu flag={visible}>
                <main onLoad={searchNews} className="sportdetailmain">
                    <article className="sport-detail">
                        <header>
                            <img src={sports.imageURL} alt="Materia Detalhada" />
                            <div>
                                <span className="summary" dangerouslySetInnerHTML={{
                                    __html: sports.summary
                                }} />
                            </div>
                        </header>

                        {sports.description ? sports.description.split('##').map(item => {
                            return <span
                                className="description"

                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                                key={item} />
                        }) : ''}
                        <br />
                        {
                            sports.webImageOne ?
                                <div className="altImages">
                                    <img src={sports.webImageOne} alt="altImage1" />
                                    {
                                        sports.webImageTwo ?
                                            <img src={sports.webImageTwo} alt="altImage2" /> : ''
                                    }
                                </div> : ''
                        }
                        {
                            sports.video_url ?
                                <>
                                    <div className="diviser"></div>
                                    <div className="video_youtube">
                                        <legend>Video/Reportagem</legend>

                                        <iframe
                                            title="video"
                                            frameBorder="0"
                                            allowFullScreen
                                            className="video_url"

                                            src={sports.video_url.replace(/watch\?v=/i, 'embed/').split('&')[0]}></iframe>
                                    </div> </> : ''
                        }
                        {
                            sports.facebook_url ?
                                <>
                                    <div className="diviser"></div>
                                    <div className="video_facebook">
                                        <legend>Video/Reportagem</legend>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: sports.facebook_url
                                            }}
                                        />
                                    </div> </> : ''
                        }

                        <div className="diviser"></div>


                        {sports.editorial ?
                            <>
                                <legend className="legendEditorial">Editorial | Opinião</legend>
                                {sports.editorial.split('##').map(item => {
                                    return <p
                                        dangerouslySetInnerHTML={{
                                            __html: item
                                        }}
                                        key={item} className="editorial" />
                                })} </> : ''}

                        <footer className="footerSport">
                            <p>
                                <span className="info">Autor(a):</span> {sports.author} <br /><br />
                                {sports.source ? 'Fonte: ' + sports.source : 'JJM'}<br /><br />

                                Data da Publicação
                                <strong>{`${sports.date.substring(8, 10)}/${sports.date.substring(5, 7)}/${sports.date.substring(0, 4)}`}</strong>
                                <br />
                            </p>
                        </footer>
                        <div
                            className="shareFacebook"
                            data-href={window.location.href}
                        >
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&amp;src=sdkpreparse`}
                                className="fb-xfbml-parse-ignore"
                                onClick={handleMetaUrl}
                            >
                                <FaFacebookSquare color="white" size={24} className="icon" />
                                    Compartilhe
                                </a>
                        </div>

                        <div className="whatsappShare">
                            <a
                                href={`https://api.whatsapp.com/send?text=${sports.title} - ${window.location.href}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={handleMetaUrl}
                            >
                                <FaWhatsapp size={25} className="iconWpp" color="white" />
                                    Compartilhe
                            </a>
                        </div>
                        <div
                            className="fb-comments"
                            data-href={window.location.href}
                            data-numposts="5"
                            data-width="400"
                            data-mobile={true}
                        ></div>
                        <br /><br />
                        <legend className="legendSportrelated">Matérias Relacionadas</legend>
                        <div className="relatedSport">
                            {Object.keys(relatedNews).length !== 0 ? relatedNews.map((item: Sport, index: number) => {
                                return item._id !== id && index < 5 ?
                                    (<div key={item._id} className="relatedItem">
                                        <a href={`/sports-detail/${item._id}`}>
                                            <img src={item.imageURL} alt="Materia A" className="imgRelated" />
                                            <div>
                                                <strong>{item.title}</strong>
                                                <p>{`${item.date.substring(8, 10)}/${item.date.substring(5, 7)}/${item.date.substring(0, 4)}`}</p>
                                            </div>
                                        </a>
                                    </div>)
                                    : ''
                            }) : ''}
                        </div>
                    </article>


                </main>

            </MyMenu>

            <Partners />

            <PageFooter />

        </div >

    ) : (<DotLoader color={"#8257E5"} size={150} css={"margin: 0 auto;"} />)
}

export default SportDetail;