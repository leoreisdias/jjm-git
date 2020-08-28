import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'

import { FaBars, FaFacebookSquare, FaWhatsapp } from 'react-icons/fa'

import { News } from '../../components/NewsItem';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Partners from '../../components/Partners';

import './styles.css'

import api from '../../services/api';


import 'semantic-ui-css/semantic.min.css'
import MyMenu from '../../components/MyMenu';

function NewsDetails() {
    const [visible, setVisible] = React.useState(false)
    const [news, setNews] = useState<News>();
    const [relatedNews, setRelatedNews] = useState([]);
    const [subjects, setSubjects] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const loadData = async () => {
            const response = await api.get('/detail', {
                params: {
                    id,
                }
            });
            setNews(response.data.news);
            setSubjects(response.data.news.subjects.join(', '))
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
        const response = await api.get('/search', {
            params: {
                subjects,
            }
        })
        const responseReverse = response.data.news.reverse()
        setRelatedNews(responseReverse);
    }

    function handleMetaUrl() {
        var link = document.createElement('meta');
        link.setAttribute('property', 'og:url');
        link.content = window.location.href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function handleBarTitle() {
        document.title = String(news?.title)
    }


    return news ? (
        <div id="page-news-details" className="container" onLoad={handleBarTitle}>
            <PageHeader title={news.title} backLink="newsBoard" >

                <FaBars className="openSidebar" color="white" size={50} onClick={handleSidebar} />

            </PageHeader>

            <MyMenu flag={visible}>
                <main onLoad={searchNews} className="newsdetailmain">
                    <article className="news-detail">
                        <header>
                            <img src={news.imageURL} alt="Materia Detalhada" />
                            <span className="summary" dangerouslySetInnerHTML={{
                                __html: news.summary
                            }} />
                        </header>

                        {news.description ? news.description.split('##').map(item => {
                            console.log(news.description)
                            return <span
                                className="description"
                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                                key={item} />
                        }) : ''}
                        <br />
                        {
                            news.webImageOne ?
                                <div className="altImages">
                                    <img src={news.webImageOne} alt="altImage1" />
                                    {
                                        news.webImageTwo ?
                                            <img src={news.webImageTwo} alt="altImage2" /> : ''
                                    }
                                </div> : ''
                        }
                        {
                            news.video_url ?
                                <>
                                    <div className="diviser"></div>
                                    <div className="video_youtube">
                                        <legend>Video/Reportagem</legend>

                                        <iframe
                                            title="video"
                                            frameBorder="0"
                                            allowFullScreen
                                            className="video_url"

                                            src={news.video_url.replace(/watch\?v=/i, 'embed/').split('&')[0]}></iframe>
                                    </div> </> : ''
                        }
                        {
                            news.facebook_url ?
                                <>
                                    <div className="diviser"></div>
                                    <div className="video_facebook">
                                        <legend>Video/Reportagem</legend>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: news.facebook_url
                                            }}
                                        />
                                    </div> </> : ''
                        }

                        <div className="diviser"></div>


                        {news.editorial ?
                            <>
                                <legend className="legendEditorial">Editorial | Opinião</legend>
                                {news.editorial.split('##').map(item => {
                                    return <p
                                        dangerouslySetInnerHTML={{
                                            __html: item
                                        }}
                                        key={item} className="editorial" />
                                })} </> : ''}

                        <footer className="footerNews">
                            <p>
                                <span className="info">Autor(a):</span> {news.author} <br /><br />
                                {news.source ? 'Fonte: ' + news.source : 'JJM'}<br /><br />

                                Data da Publicação
                                <strong>{`${news.date.substring(8, 10)}/${news.date.substring(5, 7)}/${news.date.substring(0, 4)}`}</strong>
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
                                href={`https://api.whatsapp.com/send?text=${news.title} - ${window.location.href}`}
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
                        <legend className="legendNewsrelated">Matérias Relacionadas</legend>
                        <div className="relatedNews">
                            {Object.keys(relatedNews).length !== 0 ? relatedNews.map((item: News, index: number) => {
                                return item._id !== id && index < 5 ?
                                    (<div key={item._id} className="relatedItem">
                                        <a href={`/news-detail/${item._id}`}>
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

export default NewsDetails;