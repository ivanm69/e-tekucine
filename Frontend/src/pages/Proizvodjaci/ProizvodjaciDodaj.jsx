import { Col, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import Service from "../../services/ProizvodjacService";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";


export default function ProizvodjaciDodaj(){
    const navigate = useNavigate();
    const { prikaziError } = useError();

    async function dodajProizvodjac(proizvodjac){
        const odgovor = await Service.dodaj('Proizvodjac',proizvodjac);
        if(odgovor.ok){
          navigate(RoutesNames.PROZIVODJAC_PREGLED);
          return
        }
        prikaziError(odgovor.podaci);
    }

    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        dodajProizvodjac({
            naziv: podaci.get('naziv'),
            link: podaci.get('link')
            
        });
        
    }
        
    return (

        <Container className='mt-4 text-yellow-500 font-serif font-medium'>
           <Form onSubmit={handleSubmit}>
           
                <InputText atribut='naziv' vrijednost='' />
                <InputText atribut='link' vrijednost='' />
                <br/>
                <Akcije odustani={RoutesNames.PROZIVODJAC_PREGLED} akcija='Dodaj Proizvodjaca' />
               
           </Form>
        </Container>

    );

}