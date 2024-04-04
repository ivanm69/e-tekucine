import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ProizvodjacService from "../../services/ProizvodjacService";


export default function ProizvodjaciPromjena(){

    const navigate=useNavigate();
    const routeParams= useParams();
    const[proizvodjac,setProizvodjac]=useState({});

    async function dohvatiProizvodjac(){
        const o = await ProizvodjacService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('Pogledaj konzolu');
            return;
        }

        setProizvodjac(o.poruka);
    }
    async function promjeni(proizvodjac){
        const odgovor=await ProizvodjacService.put(routeParams.sifra,proizvodjac
            );
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.PROZIVODJAC_PREGLED);
    }
    useEffect(()=>{
        dohvatiProizvodjac();

    },[]);

    function obradiSubmit(e){
    e.preventDefault();
    
   

    const podaci = new FormData(e.target);

    const proizvodjac = {

        naziv:podaci.get('naziv'),
        link:podaci.get('link')
    };

    promjeni(proizvodjac);
}

    return(

        <Container>

        <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="naziv">
        <Form.Label>Naziv</Form.Label>
        <Form.Control type="text" name="naziv" 
        defaultValue={proizvodjac.naziv} />
        </Form.Group>

       
        <Form.Group controlId="link">
        <Form.Label>Link</Form.Label>
        <Form.Control type="text" name="link" 
        defaultValue={proizvodjac.link} />
        </Form.Group>
       <hr />
        <Row >
        <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}> 
        <Link className="btn btn-danger" to={RoutesNames.PROZIVODJAC_PREGLED}>
            Odustani 
        </Link>
        
        </Col>
        <Col xs={6} sm={6} md={9} lg={6} xl={1} xxl={10}>

        <Button className="siroko" variant="primary" type="submit">
            Promjeni
        </Button>
        </Col>

        </Row>



</Form>
        </Container>
    );
}