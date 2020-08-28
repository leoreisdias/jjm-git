import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import DotLoader from 'react-spinners/DotLoader'

import { FaBars, FaFacebookSquare, FaWhatsapp } from 'react-icons/fa'

import { Report } from '../../components/ReportItem';
import PageFooter from '../../components/PageFooter';
import PageHeader from '../../components/PageHeader';
import Partners from '../../components/Partners';

import './styles.css'
import bannerFuneraria from '../../assets/images/BannerFuneraria.png'

import api from '../../services/api';

import 'semantic-ui-css/semantic.min.css'
import MyMenu from '../../components/MyMenu';

function ReportDetails() {
    const [visible, setVisible] = React.useState(false)
    const [reports, setReports] = useState<Report>();
    const { id } = useParams();

    useEffect(() => {
        const loadData = async () => {
            const response = await api.get('/reportDetail', {
                params: {
                    id,
                }
            });
            setReports(response.data.reports);
        }
        id && loadData()
    }, [id])

    function handleSidebar() {
        if (visible === false)
            setVisible(true);
        else
            setVisible(false)
    }

    function handleMetaUrl() {
        var link = document.createElement('meta');
        link.setAttribute('property', 'og:url');
        link.content = window.location.href;
        document.getElementsByTagName('head')[0].appendChild(link);
    }

    function handleBarTitle() {
        document.title = String(reports?.title)
    }


    return reports ? (
        <div id="page-report-details" className="container" onLoad={handleBarTitle}>
            <PageHeader title={reports.title} backLink="reportsBoard" >

                <FaBars color="white" size={50} onClick={handleSidebar} className="openSidebar" />

            </PageHeader>

            <MyMenu flag={visible}>
                <main className="reportdetailmain">
                    <article className="reports-detail">
                        <header>
                            <img src={bannerFuneraria} alt="Report Detalhado" />
                            <span className="summary">{reports.name}</span>
                        </header>

                        {reports.description ? reports.description.split('##').map(item => {
                            return <p
                                className="description"

                                dangerouslySetInnerHTML={{
                                    __html: item
                                }}
                                key={item} />
                        }) : ''}
                        <br />

                        {
                            reports.imageURL ?
                                <div className="lutoImages">
                                    <img src={reports.imageURL} alt="Imagem Falecido" />
                                </div>
                                : ''
                        }
                        <div className="diviser"></div>

                        <footer className="footerReport">
                            <p>
                                Fonte: <span className="info">Funerária São Dimas </span> <br /><br /><br /><br />
                                                Data da Publicação
                                <strong>{`${reports.date.substring(8, 10)}/${reports.date.substring(5, 7)}/${reports.date.substring(0, 4)}`}</strong>
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
                                    Compartilhar
                                </a>
                        </div>
                        <div className="whatsappShare">
                            <a
                                href={`https://api.whatsapp.com/send?text=${reports.title} - ${window.location.href}`}
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
                            data-width="500"
                            data-mobile={true}
                        ></div>
                        <br /><br />

                    </article>
                </main>

            </MyMenu>

            <Partners />

            <PageFooter />

        </div >

    ) : (<DotLoader color={"#8257E5"} size={150} css={"margin: 0 auto;"} />)
}

export default ReportDetails;