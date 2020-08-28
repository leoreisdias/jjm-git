import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'


import { FaBars, FaFacebookSquare, FaWhatsapp } from 'react-icons/fa'

import { PopNews } from '../../components/PopNewsItem';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Partners from '../../components/Partners';

import './styles.css'

import api from '../../services/api';


import 'semantic-ui-css/semantic.min.css'
import MyMenu from '../../components/MyMenu';

function PopNewsDetails() {
    const [visible, setVisible] = React.useState(false)
    const [popnews, setPopNews] = useState<PopNews>();
    const [relatedPopNews, setRelatedPopNews] = useState([]);
    const [subjects, setSubjects] = useState('');
    const { id } = useParams();


    useEffect(() => {
        const loadData = async () => {
            const response = await api.get('/popnewsdetail', {
                params: {
                    id,
                }
            });
            setPopNews(response.data.popnews);
            setSubjects(response.data.popnews.subjects.join(', '))


            // let link2 = await document.createElement('meta');
            // link2.setAttribute('property', 'og:title');
            // link2.content = response.data.popnews.title;
            // await document.getElementsByTagName('head')[0].appendChild(link2);

            // let link3 = await document.createElement('meta');
            // link3.setAttribute('property', 'og:image');
            // link3.content = response.data.popnews.imageURL;
            // await document.getElementsByTagName('head')[0].appendChild(link3);

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
        const response = await api.get('/searchpopnews', {
            params: {
                subjects,
            }
        })
        const responseReverse = response.data.popnews.reverse()
        setRelatedPopNews(responseReverse);
    }



    function handleBarTitle() {
        document.title = String(popnews?.title)
    }


    return popnews ? (
        <div id="page-popnews-details" className="container" onLoad={handleBarTitle}>

            <PageHeader title={popnews.title} backLink="popBoard" >


                <FaBars className="openSidebar" color="white" size={50} onClick={handleSidebar} />

            </PageHeader>

            <MyMenu flag={visible}>
                <main onLoad={searchNews} className="popdetailmain">
                    <article className="popnews-detail">
                        <header>

                            <img src={popnews.imageURL} alt="Materia Detalhada" /> :


                            <span className="summary" dangerouslySetInnerHTML={{
                                __html: popnews.summary
                            }} />

                        </header>

                        {popnews.description ? popnews.description.split('##').map(item => {
                            return <span
                                className="description"
                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                                key={item} />
                        }) : ''}
                        <br />


                        {popnews.altImageOne ?
                            <div className="altImages">
                                <img src={popnews.altImageOne} alt="altImage1" />

                                {popnews.altImageTwo ?
                                    <img src={popnews.altImageTwo} alt="altImage1" /> : ''}
                            </div> : ''
                        }
                        {
                            popnews.video_url ?
                                <>
                                    <div className="diviser"></div>
                                    <div className="video_youtube">
                                        <legend>Video/Reportagem</legend>

                                        <iframe
                                            title="video"
                                            frameBorder="0"
                                            allowFullScreen
                                            className="video_url"

                                            src={popnews.video_url.replace(/watch\?v=/i, 'embed/').split('&')[0]}></iframe>
                                    </div> </> : ''
                        }
                        {
                            popnews.facebook_url ?
                                <>
                                    <div className="diviser"></div>
                                    <div className="video_facebook">
                                        <legend>Video/Reportagem</legend>

                                        <p
                                            dangerouslySetInnerHTML={{
                                                __html: popnews.facebook_url
                                            }}
                                        />
                                    </div> </> : ''
                        }

                        <div className="diviser"></div>


                        {popnews.editorial ?
                            <>
                                <legend className="legendEditorial">Editorial | Opinião</legend>
                                {popnews.editorial.split('##').map(item => {
                                    return <p
                                        dangerouslySetInnerHTML={{
                                            __html: item
                                        }}
                                        key={item} className="editorial" />
                                })} </> : ''}

                        <footer className="footerPopnews">
                            <p>
                                <span className="info">Autor(a):</span> {popnews.author} <br /><br /><br />
                                {popnews.source ? 'Fonte: ' + popnews.source : 'JJM'}<br /><br />
                                Data da Publicação <br />
                                <strong>{`${popnews.date.substring(8, 10)}/${popnews.date.substring(5, 7)}/${popnews.date.substring(0, 4)}`}</strong>
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
                            >
                                <FaFacebookSquare color="white" size={24} className="icon" />
                                    Compartilhar
                                </a>
                        </div>
                        <div className="whatsappShare">
                            <a
                                href={`https://api.whatsapp.com/send?text=${popnews.title} - ${window.location.href}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaWhatsapp size={25} className="iconWpp" color="white" />
                                    Compartilhar
                            </a>
                        </div>

                        <div
                            className="fb-comments"
                            data-href={window.location.href}
                            data-numposts="5"
                            data-width="500"
                            data-mobile={true}
                        ></div>
                        <br /><br />
                        <legend className="legendPoprelated">Matérias Relacionadas</legend>

                        <div className="relatedPopNews">
                            {Object.keys(relatedPopNews).length !== 0 ? relatedPopNews.map((item: PopNews, index: number) => {
                                return item._id !== id && index < 5 ?
                                    (<div key={item._id} className="relatedItem">
                                        <a href={`/popnews-detail/${item._id}`}>
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

export default PopNewsDetails;