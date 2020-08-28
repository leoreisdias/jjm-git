import React, { useEffect, useState } from 'react';

import {
    Grid,
    Menu,
    Segment,
    Sidebar,
} from 'semantic-ui-react'
import logoImg from '../../assets/images/logo.png'

import './styles.css'

import 'semantic-ui-css/semantic.min.css'
import { Link } from 'react-router-dom';
import { FcFaq, FcNews } from 'react-icons/fc';
import { FiLogIn } from 'react-icons/fi';
import { GiCoffeeBeans, GiStarFormation, GiGamepad, GiDeadWood, GiSwordsPower, GiSoccerBall } from 'react-icons/gi';
import ModalExampleContentImage from '../Modal';
import { WiDayCloudy } from 'react-icons/wi';

interface MyMenuProps {
    flag: boolean
}

const MyMenu: React.FC<MyMenuProps> = ({ flag, children }) => {
    const [visible, setVisible] = React.useState(false)
    const [session, setSession] = useState(false);

    useEffect(() => {
        setVisible(flag)
        if (localStorage.getItem('token'))
            setSession(true);
    }, [flag, session])

    function handleHoroscopo() {
        window.scrollTo(0, document.body.scrollHeight);
    }

    function handleLogout() {
        setSession(false);
        localStorage.clear();
        window.location.reload();
    }

    return (
        <Grid columns={1}  >
            <Grid.Column >

                <Sidebar.Pushable as={Segment}
                >
                    <Sidebar
                        as={Menu}
                        animation='overlay'
                        icon='labeled'
                        inverted
                        onHide={() => setVisible(false)}
                        vertical
                        visible={visible}
                        width='wide'
                        color="black"
                        compact

                    >
                        <Link to="/dashboard">

                            <Menu.Item header as="div" color="pink">
                                <div className="menuHeader">
                                    <h1>Jornal Jota Maria</h1>
                                    <img src={logoImg} alt="" />
                                </div>

                            </Menu.Item>
                        </Link>

                        <Link to="/newspage">
                            <Menu.Item as='div' >
                                <div className="menuItem">
                                    <FcNews size={30} />
                                    <h1>Notícias</h1>
                                </div>
                            </Menu.Item>
                        </Link>

                        <Link to="/popnews">
                            <Menu.Item as='div'>
                                <div className="menuItem">
                                    <GiGamepad size={35} color="#00cdac" />
                                    <h1>Mundo POP</h1>
                                </div>
                            </Menu.Item>
                        </Link>

                        <Link to="/sports">
                            <Menu.Item as='div'>
                                <div className="menuItem">
                                    <GiSoccerBall size={30} color="#E2F0F9" />
                                    <h1>Esporte</h1>
                                </div>
                            </Menu.Item>
                        </Link>

                        <Link to="/deathreports">
                            <Menu.Item as='div'>
                                <div className="menuItem">
                                    <GiDeadWood size={30} color="white" />
                                    <h1>Notas de Falecimento</h1>
                                </div>
                            </Menu.Item>
                        </Link>

                        <Menu.Item as='div'>
                            <div className="menuItem">
                                <ModalExampleContentImage flag="coffee">
                                    <div className="menuItem">
                                        <GiCoffeeBeans size={30} color="#D2691E" />
                                        <h1>Cotação do Café Arábica</h1>
                                    </div>
                                </ModalExampleContentImage>

                            </div>
                        </Menu.Item>

                        <Menu.Item as='div'>
                            <ModalExampleContentImage flag="weather">
                                <div className="menuItem">
                                    <WiDayCloudy size={40} color="#2BE600" />
                                    <h1>Previsão do Tempo</h1>
                                </div>
                            </ModalExampleContentImage>
                        </Menu.Item>

                        <Menu.Item as='div'>
                            <div className="menuItem" onClick={handleHoroscopo}>
                                <GiStarFormation size={30} color="#b3b300" />
                                <h1>Horóscopo Diário</h1>
                            </div>
                        </Menu.Item>

                        <Menu.Item as='div'>
                            <div className="menuDiviser">

                            </div>
                        </Menu.Item>

                        {session ?
                            <Link to="/options">
                                <Menu.Item as='div'>
                                    <div className="menuItem">
                                        <GiSwordsPower size={30} color="#06beb6 " />
                                        <h1>Cadastro de Postagens</h1>
                                    </div>
                                </Menu.Item>
                            </Link> : ''
                        }


                        <Menu.Item as='div'>
                            <div className="menuLogin" onClick={handleHoroscopo}>
                                <FcFaq size={20} />
                                <h1>Contato</h1>
                            </div>
                        </Menu.Item>


                        {!session ?
                            <Link to="/login">
                                <Menu.Item as='div'>
                                    <div className="menuLogin">
                                        <FiLogIn size={20} />
                                        <h1>Login</h1>
                                    </div>
                                </Menu.Item>
                            </Link> :
                            <Link to="/dashboard">
                                <Menu.Item as='div'>
                                    <div className="menuLogin" onClick={handleLogout}>
                                        <FiLogIn size={20} color="red" />
                                        <h1>Sair</h1>
                                    </div>
                                </Menu.Item>
                            </Link>
                        }

                    </Sidebar>
                    <Sidebar.Pusher dimmed={visible} >
                        <Segment basic  >
                            {children}
                        </Segment>
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Grid.Column>
        </Grid >
    )
}

export default MyMenu;