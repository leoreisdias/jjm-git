import React, { useEffect, useState } from 'react';
import coffeeApi from '../../services/coffeePrices';
import dollarToReal from '../../services/dollarToReal';

import './styles.css'
import { GiCoffeeBeans } from 'react-icons/gi';

function CoffeePrices() {
    const [prices, setPrices] = useState('');
    const [dolar, setDolar] = useState('');
    const [today, setToday] = useState('');

    const month = today.substring(5, 7);
    const day = today.substring(8, 10);

    useEffect(() => {
        const loadPrices = async () => {
            const response = await coffeeApi.get('');
            setPrices(response.data.dataset.data[0][1]);
            setToday(response.data.dataset.data[0][0]);
        }

        const loadDolar = async () => {
            const response = await dollarToReal.get('');
            setDolar(response.data.USD_BRL);
        }

        loadPrices();
        loadDolar();
    }, [])

    return (
        <fieldset>
            <legend>Valor do Café</legend>

            <div className="coffee">
                <div className="coffeeInfo">
                    <span>
                        <strong>{`${day}/${month}`}</strong>
                    Preço de hoje </span>
                    <strong>
                        R${String(Number(prices) * Number(dolar)).substr(0, 6)}
                    </strong>
                </div>
                <div className="iconCoffee">
                    <GiCoffeeBeans size={60} color="#785027" />
                    <strong>Café Arábica (Tipo Bebida Dura)</strong>
                </div>
                <div className="attentionCoffeeMsg">
                    <p>
                        *Pode haver pequenas variações no seu Armazem. Verifique com eles! *
            </p>
                </div>

            </div>
        </fieldset>
    )
}

export default CoffeePrices;