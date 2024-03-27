import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Route, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ProizvodService from "../../services/ProizvodService";



export default function ProizvodiDodaj(){

    const navigate=useNavigate();

    async function dodaj(proizvod){
        const odgovor = await ProizvodService.post(proizvod);
        if(odgovor.greska){
            console.log(poruka.odgovor);
            alert('Pogledaj konzolu');
            return;
        }

        navigate(RoutesNames.PROZIVOD_PREGLED);
    }

    function obradiSubmit(e){
    e.preventDefault();
    //alert('dodajem smjer');

    const podaci = new FormData(e.target);

    const proizvod = {

        naziv:podaci.get('naziv'),
        proizvodjac:podaci.get('proizvodjac')
    };

    dodaj(proizvod);
}

    return(

        <Container>

        <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="naziv">
        <Form.Label>Naziv</Form.Label>
        <Form.Control type="text" name="naziv" />
        </Form.Group>

       
        <Form.Group controlId="proizvodjac">
        <Form.Label>Proizvodjac</Form.Label>
        <Form.Control type="text" name="proizvodjac" />
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
            Dodaj
        </Button>
        </Col>

        </Row>



</Form>
        </Container>
    );
}