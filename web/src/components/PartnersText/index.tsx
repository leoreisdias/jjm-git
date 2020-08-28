import React from 'react';
import './styles.css';
import { FaFacebook } from 'react-icons/fa';

interface PartnersTextProps {
    partner: string;
}


const PartnersText: React.FC<PartnersTextProps> = ({ partner, children }) => {
    return (
        <fieldset className="market">

            <div className="information">

                <div className={partner}>
                </div>
                <div className="textPartner">
                    <p>
                        {partner === "milbr" ? <>
                            Quer aproveitar todas as emoções que a internet pode oferecer, com a qualidade que a sua família merece? <br />
                            <strong>Internet + TeIefonia Fixa Digital + TV por Assinatura </strong><br />
                        Na Milbr.Net o cliente é especial e sempre está em primeiro lugar. <br />
                        São 29 funcionários qualificados e treinados para desempenhar o melhor atendimento. <br />
                        A assistência técnica é personalizada, com atendimento 24h, 07 dias por semana, sempre um profissional
                        disponível para melhor atender as necessidades de seus clientes. <br />
                            <strong>Confira os planos:</strong><br />
                            <ul>
                                <li><strong>80 Mb: </strong>R$89,90</li>
                                <li><strong>150 Mb: </strong>R$109,90</li>
                                <li><strong>300 Mb: </strong>R$124,90</li>
                            </ul>
                        E ainda pode contar com a <strong>Milbr.ti</strong>, uma loja completa de peças e serviços para informática. <br />
                        </> : ''}

                        {partner === "thyda" ? <>
                            <strong>Endereço: </strong> Avenida  Rebeca, 318 <br />
                            <strong>Thyda Motos</strong> tem: <br />
                            <ul>
                                <li>Peças</li>
                                <li>Servicos</li>
                                <li>Mexedores de Café</li>
                                <li>Motocaçamba</li>
                            </ul>
                        E agora com<strong> Auto Socorro Gaspar</strong>. <br />
                        A Thyda Motos conta com mecânicos  qualificados e responsaveis.
                        Também com injeção  eletrônica e  Guincho  24 horas! <br />

                            <strong>Telefone: </strong>(35) 9 9151-6661 | 9 9148-9304 <br />
                            <strong>Guincho  24 horas: </strong> (35) 9 9264-4638
                            </> : ''}

                        {partner === "frutibom" ? <>
                            <strong>Endereço: </strong> Avenida Dr. Américo Luz, 82 e Rua João Pessoa, 117 | Também em Juruaia <br />
                            Na sorveteria Fruti Bom você encontra: <br />
                            <ul>
                                <li>Pagão</li>
                                <li>Taças</li>
                                <li>Tortas de Vários Sabores</li>
                                <li>Picoles</li>
                                <li>Milk Shake</li>
                                <li>Paleta Mexicana</li>
                                <li>Sorvete Expresso</li>
                            </ul>
                            Tudo isso na melhor sorveteria da cidade!
                            </> : ''}

                        {partner === "funeraria" ? <>
                            <strong>Telefone: </strong> (35) 3571-1736<br />
                            A senhora Sônia Maria Sapata trabalhou durante anos com funerárias de
                            tradição no Estado de São Paulo e adquiriu uma experiência incomparável no ramo. <br />

                            Hoje, com filiais firmadas em Muzambinho, Guaxupé,
                            Cabo Verde, Botelhos, Alterosa e Nova Resende, a Funerária São Dimas completa 30 anos de
                            pioneirismo no fornecimento de assistência funeral, na <strong>estrutura completa e moderna e no
                            atendimento focado no carinho, atenção e dignidade de seus clientes.</strong>
                        </> : ''}

                        {partner === "wizard" ? <>
                            <strong>Sabe as vantagens de ser bilíngue?</strong><br />
                            Quando você aprender o Inglês novas portas podem se abrir! <br />
                            Novas experiencias e possibilidades, como ser capaz de conversar com estrangeiros ou
                            mesmo assistir aquela sua série favorita sem legenda! <br />
                            Ou você leitor, já pensou em ler a obra original na língua de origem? <br />
                            É aprendendo uma nova língua que tudo isso chega a ser possível! <br />
                            E a Wizard está aqui para ajudar você ou ao seu filho(a) nessa trajetória,
                            com seu estudo e com os profissionais e material da Wizard, seu mundo expandirá! <br />
                            Esperamos você na Wizard! Você falando mais do que o Português! <br />
                            <strong>Telefone: </strong> (35) 3571-2006<br />
                            <strong>WhatsApp: </strong> (35) 99936-3004 <br />
                            <strong>Endereço: </strong> Rua Dr. Américo Luz, 340
                        </> : ''}

                        {partner === "minasmed" ? <>
                            <strong>Precisando de produtos ortopédicos e hospitalares?!</strong> <br />
                            Na MinasMed você encontra: <br />
                            <ul>
                                <li>Joelheiras</li>
                                <li>Tornozeleiras</li>
                                <li>Munhequeiras</li>
                                <li>Protetor de Escaras para Calcanhar</li>
                                <li>Colchão Caixa de Ovo</li>
                                <li>Travesseiro Suave Encosto, para repouso das pernas também, ajudando na circulação</li>
                            </ul>
                            <strong>Isso e muito mais com entrega grátis!</strong> <br />
                            <strong>Endereço: </strong> Rua Aristides Coimbra, 116 - Descendo para o hospital <br />
                            <strong>Telefone: </strong>(35) 3571-5744 <br />
                            <strong>WhatsApp: </strong>(35) 9 9817 5503
                        </> : ''}
                    </p>
                </div>
                <a href={
                    partner === "thyda" ? "https://www.facebook.com/thydamotos" :
                        partner === "milbr" ? "https://www.facebook.com/milbrnet" :
                            partner === "frutibom" ? "https://www.facebook.com/FrutiBomSorveteria" :
                                partner === "funeraria" ? "https://www.facebook.com/funerariasaodimas" :
                                    partner === "wizard" ? "https://www.facebook.com/WIZARDMUZAMBINHO10" :
                                        partner === "minasmed" ? "https://www.facebook.com/minasmedmuzambinho" :
                                            'www.jornaljotamaria.com.br'
                }
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="linkPartner">
                        Página no Facebook
                            <FaFacebook color="white" size={20} className="fbIcon" />

                    </div>
                </a>

            </div>

        </fieldset>
    )
}

export default PartnersText