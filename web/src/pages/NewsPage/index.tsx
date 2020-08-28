import React, { useState, useEffect } from 'react';

import { FiArrowRight, FiArrowLeft } from 'react-icons/fi'
import { GiOmega, GiScrollUnfurled, GiPocketWatch } from 'react-icons/gi'
import { FaBars } from 'react-icons/fa'

import './styles.css'

import PageHeader from '../../components/PageHeader';
import NewsItem, { News } from '../../components/NewsItem';
import Input from '../../components/Input';
import PageFooter from '../../components/PageFooter';
import Partners from '../../components/Partners';

import api from '../../services/api';

import 'semantic-ui-css/semantic.min.css'
import MyMenu from '../../components/MyMenu';

function NewsPage() {
    const [subjects, setSubject] = useState('');
    const [title, setTitle] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [flag, setFlag] = useState(false)
    const [news, setNews] = useState([]);
    const [searchFlag, setSearchFlag] = useState(false);
    const [visible, setVisible] = React.useState(false)

    useEffect(() => {
        async function countPages() {
            const maxPages = await api.get('/news');
            setTotalPages(maxPages.data.pages)
        }
        countPages();
        document.title = "JJM - Notícias"

    }, []);

    useEffect(() => {

        const loadNews = async (currentPage: number) => {
            const response = await api.get(`/news?page=${currentPage}`);
            // response.data.docs.reverse();
            setNews(response.data.docs);
            setSearchFlag(false);
            setFlag(false);
        }

        loadNews(page);
    }, [page, searchFlag])

    const prevPage = () => {
        if (page === 1) return;

        const pageNumber = page - 1;
        setPage(pageNumber)
        window.scrollTo(0, 0);

    }

    const nextPage = () => {
        if (page === totalPages) return;

        const pageNumber = page + 1;
        setPage(pageNumber)
        window.scrollTo(0, 0);

    }

    function handleSidebar() {
        if (visible === false)
            setVisible(true);
        else
            setVisible(false)
    }

    async function searchNews() {
        if (title !== '' || subjects !== '') {
            setFlag(true);
            const response = await api.get('/search', {
                params: {
                    subjects,
                    title,
                }
            })
            setNews(response.data.news.reverse());
        } else {
            setSearchFlag(true);
        }
    }

    const debounceEvent = (fn: Function, wait = 1000, time: any) => (...args: any) => {
        clearTimeout(time)
        time = setTimeout(() => {
            fn(...args)
        }, wait)
    }

    function handleKeyUp() {
        searchNews()
    }

    function handleSearchParams(event: string) {
        setSubject(event);
        setTitle(event);
    }


    return (
        <div id="page-dashboard" className="container" >
            <PageHeader
                title="Últimas Notícias"
                backLink="newsBoard"
            >
                <form id="search-news" >
                    <FaBars className="openSidebar" color="white" size={50} onClick={handleSidebar} />

                    <Input
                        name="subject"
                        label="Assunto/Titulo"
                        value={subjects}
                        onChange={e => { handleSearchParams(e.target.value) }}
                        onKeyUp={debounceEvent(handleKeyUp, 1000, 500)}
                    />
                </form>
            </PageHeader>



            <MyMenu flag={visible}>

                <main className="newspageMain">
                    {Object.keys(news).length !== 0 ? news.map((news: News) => {
                        return <NewsItem key={news._id} news={news} />
                    }) : <><h1>Nada encontrado... <br /><br />Clique novamente no Buscar para voltar</h1>
                            <h1>Nada encontrado... <br /><br />Clique novamente no Buscar para voltar</h1></>}



                </main>

                <div className="pageButton-group">
                    <button disabled={page === 1 || flag === true} onClick={prevPage} className="button-prev">
                        <FiArrowLeft size={30} /> Anterior
                            </button>
                    {page === totalPages ? <GiOmega size={30} /> : page === 1 ? <GiPocketWatch size={30} /> : <GiScrollUnfurled size={30} />}
                    <button disabled={page === totalPages || flag === true} onClick={nextPage} className="button-next">
                        Próximo <FiArrowRight size={30} />
                    </button>
                </div>

            </MyMenu>





            <Partners />

            <PageFooter />
        </div>
    )
}

export default NewsPage;