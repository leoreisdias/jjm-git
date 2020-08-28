import React, { useState, useEffect } from 'react';
import { PulseLoader, PropagateLoader } from 'react-spinners'

import { FaBars } from 'react-icons/fa'

import './styles.css'

import PageHeader from '../../components/PageHeader';
import NewsItem, { News } from '../../components/NewsItem';
import PopNewsItem, { PopNews } from '../../components/PopNewsItem';
import SportItem, { Sport } from '../../components/SportItem';
import PageFooter from '../../components/PageFooter';
import Partners from '../../components/Partners';

import api from '../../services/api';

import 'semantic-ui-css/semantic.min.css'
import MyMenu from '../../components/MyMenu';
import WeatherForecast from '../../components/WeatherForecast';
import CoffeePrices from '../../components/CoffeePrices';

function Dashboard() {
    const [news, setNews] = useState([]);
    const [popnews, setPopNews] = useState([]);
    const [sports, setSport] = useState([]);
    const [visible, setVisible] = React.useState(false)


    useEffect(() => {

        const loadDatas = async () => {
            const responseNews = await api.get(`/news?page=1`);
            const responsePop = await api.get(`/popnews?page=1`);
            const responseSport = await api.get(`/sports?page=1`);
            setNews(responseNews.data.docs);
            setPopNews(responsePop.data.docs);
            setSport(responseSport.data.docs);
        }

        loadDatas();
        document.title = "JJM - Na Pura Verdade"
    }, [])


    function handleSidebar() {
        if (visible === false)
            setVisible(true);
        else
            setVisible(false)
    }

    return news ? (
        <div id="page-dashboard-land" className="container" >
            <PageHeader
                title="JJM | Na pura verdade é isso"
                backLink="dashboard"
            >

                <FaBars color="white" size={50} onClick={handleSidebar} className="openSidebar" />

            </PageHeader>

            <MyMenu flag={visible}>

                <main className="dashboardMain">
                    <div className="newsArea">
                        {Object.keys(news).length !== 0 ? news.map((news: News) => {
                            return <NewsItem key={news._id} news={news} />
                        }) : <PulseLoader color={"#8257E5"} size={60} css={"margin: 20rem auto;"} />}
                    </div>

                    <div className="popnewsArea">
                        {Object.keys(popnews).length !== 0 ? popnews.map((popnews: PopNews, index) => {
                            return index !== 5 ?
                                <PopNewsItem key={popnews._id} popnews={popnews} /> : ''
                        }) : <PulseLoader color={"#8257E5"} size={60} css={"margin: 20rem auto;"} />}
                    </div>

                    <div className="sportArea">
                        {Object.keys(sports).length !== 0 ? sports.map((sports: Sport) => {
                            return <SportItem key={sports._id} sports={sports} />
                        }) : <PulseLoader color={"#8257E5"} size={60} css={"margin: 20rem auto;"} />}
                    </div>


                </main>


            </MyMenu>
            <br />
            <WeatherForecast />
            <br />
            <br />
            <CoffeePrices />

            <Partners />

            <PageFooter />
        </div>
    ) : (<PropagateLoader color={"#8257E5"} size={150} css={"margin: 0 auto;"} />)
}

export default Dashboard;