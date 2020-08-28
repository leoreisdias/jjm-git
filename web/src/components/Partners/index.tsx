import React from 'react';

import './styles.css'
import ModalExampleContentImage from '../Modal';


function Partners() {
    return (
        <fieldset className="partners-container">
            <legend>Parceiros</legend>
            <ul>
                <ModalExampleContentImage flag="milbr">
                    <span className="Link1" >
                        <li className="ImagePartner_1">

                        </li>
                    </span>
                </ModalExampleContentImage>

                <ModalExampleContentImage flag="thyda">
                    <span className="Link1" >
                        <li className="ImagePartner_2">

                        </li>
                    </span>
                </ModalExampleContentImage>

                <ModalExampleContentImage flag="frutibom">
                    <span className="Link1">

                        <li className="ImagePartner_3" >

                        </li>
                    </span>
                </ModalExampleContentImage>

                <ModalExampleContentImage flag="funeraria">
                    <span className="Link1" >
                        <li className="ImagePartner_4">

                        </li>
                    </span>
                </ModalExampleContentImage>

                <ModalExampleContentImage flag="wizard">
                    <span className="Link1" >
                        <li className="ImagePartner_5">

                        </li>
                    </span>
                </ModalExampleContentImage>


                <ModalExampleContentImage flag="minasmed">
                    <span className="Link1">

                        <li className="ImagePartner_6" >

                        </li>
                    </span>
                </ModalExampleContentImage>


            </ul>
        </fieldset>
    )


}

export default Partners;