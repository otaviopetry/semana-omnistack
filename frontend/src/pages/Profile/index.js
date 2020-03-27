import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect( () => {
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then( response => {
            setIncidents(response.data);
        } )
    }, [ ] );
    
    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });

            setIncidents(incidents.filter( incident => incident.id !== id ));

        } catch(err) {
            alert('Erro ao deletar o caso. Por favor, tente novamente.')
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero" />
                <span>Bem vinda, ONG {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                { // quando se faz um map ou outro tipo de loop no react, deve-se passar um atributo "key" no elemento que será repetido, com um valor que seja único para cada repetição. No caso, o id

                // se passar apenas a função() como parâmetro do onClick (com parenteses e algo dentro), ela vai ser executada assim que a aplicação iniciar. Ao criar uma nova função dentro do parâmetro, ela só é executada no click.
                    incidents.map(incident => (
                        <li key={incident.id} >  
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))
                }                
            </ul>
        </div>
    );
}