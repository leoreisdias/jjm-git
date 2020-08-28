import React, { useState, useMemo, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader';

import './styles.css';
import Input from '../../components/Input';
import warningIcon from '../../assets/images/icons/warning.svg'
import Textarea from '../../components/Textarea';

import cameraIcon from '../../assets/images/icons/camera.svg'
import api from '../../services/api';
import { PacmanLoader } from 'react-spinners';


function ReportPost() {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [reportImage, setReportImage] = useState('');
    const [flag, setFlag] = useState(false);

    const preview = useMemo(() => {
        return reportImage ? URL.createObjectURL(reportImage) : null;
    }, [reportImage]);

    const handleChange = (event: any) => {
        setReportImage(event.currentTarget.files[0])
    }

    const handleCreateReport = async (e: FormEvent) => {
        e.preventDefault();
        setFlag(true);

        const data = new FormData();
        data.append('reportImage', reportImage);
        data.append('title', title);
        data.append('description', description.replace(/\n/g, "##"));
        data.append('date', date);
        data.append('name', name);

        try {
            const token = localStorage.getItem('token');
            await api.post('/deathreports', data, {
                headers: {
                    authorization: 'Bearer ' + token
                }
            })
            alert('Nota Postada com Sucesso!');
            setFlag(false);
            history.push('/options')
        } catch (err) {
            alert("Login Obrigátorio para Postagem!!")
            history.push('/dashboard')
        }



    }

    return (
        <div id="page-reportPost" className="container">
            <PageHeader
                title="Cadastro de Notas de Falecimento"
                description="Imagem do Falecido é opcional"
                backLink="reportsBoard"
            />

            {flag ? <PacmanLoader color={"#8257E5"} size={60} css={"margin: 20rem auto;"} /> :

                <main>
                    <form onSubmit={handleCreateReport}>
                        <fieldset className="reportpost">
                            <legend>Postagem</legend>

                            <Input
                                name="title"
                                label="Titulo *"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value) }}
                                required
                            />
                            <Input
                                name="name"
                                label="Nome do Falecido *"
                                value={name}
                                onChange={(e) => { setName(e.target.value) }}
                                required
                            />
                            <Textarea
                                name="description"
                                label="[OPCIONAL] Descrição da Nota de Falecimento"
                                value={description}
                                onChange={(e) => { setDescription(e.target.value) }}
                            />

                            <br />
                            <h2>Data</h2>
                            <Input
                                name="date"
                                label="Data *"
                                type="date"
                                value={date}
                                onChange={(e) => { setDate(e.target.value) }}
                                required
                            />

                        </fieldset>

                        <fieldset className="reportpost">
                            <legend>Imagem da Nota ou Falecido</legend>

                            <label
                                id="image"
                                style={{ backgroundImage: `url(${preview})` }}
                                className={reportImage ? "has-image" : 'no-image'}
                            >
                                <input
                                    type="file"
                                    onChange={handleChange}
                                />
                                <img src={cameraIcon} alt="Select" />
                            </label>
                            <br />
                        </fieldset>

                        <footer>
                            <p>
                                <img src={warningIcon} alt="Aviso Importante" />
                        Importante! <br />

                        Preencha todos os dados não opcionais
                    </p>
                            <button type="submit">Salvar Nota</button>
                        </footer>
                    </form>
                </main>
            }
        </div>
    )
}

export default ReportPost;