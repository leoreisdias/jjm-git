import React from 'react'
import { Header, Modal } from 'semantic-ui-react'
import WeatherForecast from '../WeatherForecast'
import CoffeePrices from '../CoffeePrices'
import { DiCoffeescript } from 'react-icons/di'
import PartnersText from '../PartnersText'

interface ModalProps {
    flag?: string;
}

const ModalExampleBasic: React.FC<ModalProps> = ({ children, flag }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='fullscreen'
            trigger={children}
            onClick={() => setOpen(false)}
        >
            <Header icon>
                {flag === "weather" ?
                    <h1>*Mais dias podem ser vistos na parte inferior da página inicial</h1> : flag === "coffee" ?
                        <DiCoffeescript size={60} color="white" /> : ''
                }
            </Header>
            <Modal.Content>
                {flag === "weather" ? <WeatherForecast /> : flag === "coffee" ? <CoffeePrices /> :
                    flag ? <PartnersText partner={flag} /> : ''
                }
            </Modal.Content>

        </Modal>

    )
}

export default ModalExampleBasic