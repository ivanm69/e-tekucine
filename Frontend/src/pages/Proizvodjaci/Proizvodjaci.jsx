import { useEffect, useState } from "react";
import {  Button, Col, Container, Row, Table } from "react-bootstrap";
import Service from "../../services/ProizvodjacService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import { Card } from "react-bootstrap";
import nepoznato from '../../assets/nepoznato.jpg';

export default function Proizvodjaci(){
    const [proizvodjaci,setProizvodjaci] = useState();
    const navigate = useNavigate();
    const { prikaziError } = useError();
    async function dohvatiProizvodjace(){
        const odgovor = await Service.get('Proizvodjac');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setProizvodjaci(odgovor.podaci);
        
    }

    async function obrisiProizvodjac(sifra){
        const odgovor = await Service.obrisi('Proizvodjac',sifra);
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiProizvodjace();
        }
    }
     
    useEffect(()=>{
        dohvatiProizvodjace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return (
<Container>
  <br/>
             <Link to={RoutesNames.PROIZVODJAC_NOVI} class="btn bg-gradient-to-r from-red-900 to-purple-800  text-white font-medium py-3 px-10 rounded  flex flex-col items-center ">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <br/>
            <Row>
            { proizvodjaci && proizvodjaci.map((p) => (
           
           <Col key={p.sifra} sm={12} lg={3} md={3}>
              <Card style={{ marginTop: '1rem' }}>
              <Card.Img variant="top" src={nepoznato} className="slika"/>
                <Card.Body>
                  <Card.Title>{p.naziv} {p.link}</Card.Title>
                  <Card.Text>
                    {p.email}
                  </Card.Text>
                  <Row>
                      <Col>
                      <Link className="btn btn-primary gumb" to={`/proizvodjaci/${p.sifra}`}><FaEdit /></Link>
                      </Col>
                      <Col>
                      <Button variant="danger" className="gumb"  onClick={() => obrisiProizvodjac(p.sifra)}><FaTrash /></Button>
                      </Col>
                    </Row>
                </Card.Body>
              </Card>
            </Col>
          ))
      }
      </Row>
        </Container>


    );

}