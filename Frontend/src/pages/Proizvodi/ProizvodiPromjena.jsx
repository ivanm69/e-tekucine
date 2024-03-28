import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ProizvodService from "../../services/ProizvodService";


export default function ProizvodiPromjena(){

    const navigate=useNavigate();
    const routeParams= useParams();
    const[proizvod,setProizvod]=useState({});

    async function dohvatiProizvod(){
        const o = await ProizvodService.getBySifra(routeParams.sifra);
        if(o.greska){
            console.log(o.poruka);
            alert('Pogledaj konzolu');
            return;
        }

        setProizvod(o.poruka);
    }
    async function promjeni(proizvod){
        const odgovor=await ProizvodService.put(routeParams.sifra,proizvod);
        if(odgovor.greska){
            console.log(odgovor.poruka);
            alert('Pogledaj konzolu');
            return;
        }
        navigate(RoutesNames.PROZIVOD_PREGLED);
    }
    useEffect(()=>{
        dohvatiProizvod();

    },[]);

    function obradiSubmit(e){
    e.preventDefault();
    //alert('dodajem smjer');

    const podaci = new FormData(e.target);

    const proizvod = {

        naziv:podaci.get('naziv'),
        proizvodjac:podaci.get('proizvodjac')
    };

    promjeni(proizvod);
}

    return(

        <Container>

        <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="naziv">
        <Form.Label>Naziv</Form.Label>
        <Form.Control type="text" name="naziv" 
        defaultValue={proizvod.naziv} required/>
        </Form.Group>

       
        <Form.Group controlId="proizvodjac">
        <Form.Label>Proizvodjac</Form.Label>
        <Form.Control type="text" name="proizvodjac" 
        defaultValue={proizvod.proizvodjac}required />
        </Form.Group>
       <hr />
        <Row >
        <Col xs={6} sm={6} md={3} lg={6} xl={1} xxl={2}> 
        <Link className="btn btn-danger" to={RoutesNames.PROZIVOD_PREGLED}>
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