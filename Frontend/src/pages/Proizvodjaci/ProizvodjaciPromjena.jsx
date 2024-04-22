import { useEffect, useState } from "react";
import {  Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Service from "../../services/ProizvodjacService";
import { RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import useError from "../../hooks/useError";


export default function ProizvodajciPromjeni(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [proizvodjac,setProizvodjac] = useState({});
    const { prikaziError } = useError();

    async function dohvatiProizvodjac(){
        const odgovor = await Service.getBySifra('Proizvodjac',routeParams.sifra)
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.PROZIVODJAC_PREGLED);
            return;
        }
        setProizvodjac(odgovor.podaci);
    }

    useEffect(()=>{
        dohvatiProizvodjac();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function promjeniProizvodjac(proizvodjac){
        const odgovor = await Service.promjeni('Proizvodjac',routeParams.sifra,proizvodjac);
        if(odgovor.ok){
          navigate(RoutesNames.PROZIVODJAC_PREGLED);
          return;
        }
        prikaziError(odgovor.podaci);
    }

    
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeniProizvodjac({
            naziv: podaci.get('naziv'),
            link: podaci.get('link')
            
        });
    }



    return (
        <Container>
           <Form onSubmit={handleSubmit}>
                    <InputText atribut='naziv' vrijednost={proizvodjac.naziv} />
                    <InputText atribut='link' vrijednost={proizvodjac.link} />
                    
                    <Akcije odustani={RoutesNames.PROZIVODJAC_PREGLED} akcija='Promjeni proizvodjac' />
             </Form>
             </Container>
    );

}