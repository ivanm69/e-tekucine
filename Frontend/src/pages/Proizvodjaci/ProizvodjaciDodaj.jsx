import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Route, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import ProizvodjacService from "../../services/ProizvodjacService";



export default function ProizvodjaciDodaj(){

    const navigate=useNavigate();

    async function dodaj(proizvodjac){
        const odgovor = await ProizvodjacService.post(proizvodjac);
        if(odgovor.greska){
            console.log(poruka.odgovor);
            alert('Pogledaj konzolu');
            return;
        }

        navigate(RoutesNames.PROZIVODJAC_PREGLED);
    }

    function obradiSubmit(e){
    e.preventDefault();
    //alert('dodajem smjer');

    const podaci = new FormData(e.target);

    const proizvodjac = {

        naziv:podaci.get('naziv'),
        link:podaci.get('link')
    };

    dodaj(proizvodjac);
}

    return(

        <Container>

        <Form onSubmit={obradiSubmit}>
        <Form.Group controlId="naziv">
        <Form.Label>Naziv</Form.Label>
        <Form.Control type="text" name="naziv" />
        </Form.Group>

       
        <Form.Group controlId="link">
        <Form.Label>Link</Form.Label>
        <Form.Control type="text" name="link" />
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
            Dodaj
        </Button>
        </Col>

        </Row>



</Form>
        </Container>
    );
}