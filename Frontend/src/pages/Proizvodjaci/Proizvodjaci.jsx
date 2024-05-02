import { useEffect, useState } from "react";
import {  Button, Col, Container, Row, Table } from "react-bootstrap";
import Service from "../../services/ProizvodjacService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { App, RoutesNames } from "../../constants";
import useError from "../../hooks/useError";
import { Card } from "react-bootstrap";
import nepoznato from '../../assets/nepoznato.jpg';
import useLoading from "../../hooks/useLoading";
import { confirm } from "../../components/Potvrdivanje";

export default function Proizvodjaci(){
    const [proizvodjaci,setProizvodjaci] = useState();
    const navigate = useNavigate();
    
    const { showLoading, hideLoading } = useLoading();
    const { prikaziError } = useError();


    async function dohvatiProizvodjace(){
       showLoading();
        const odgovor = await Service.get('Proizvodjac');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setProizvodjaci(odgovor.podaci);
        
    }

    async function obrisiProizvodjac(sifra){
        showLoading();
        if (await confirm("Jeste li sigurni da zelite obrisati proizvod sa sifrom " + sifra + "?")) {
        const odgovor = await Service.obrisi('Proizvodjac',sifra);
        hideLoading();
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiProizvodjace();
        }
    }
  }
    useEffect(()=>{
      showLoading();
        dohvatiProizvodjace();
        hideLoading();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    function slika(proizvodjac){
      if(proizvodjac.slika!=null){
          return App.URL + proizvodjac.slika+ `?${Date.now()}`;
      }
      return nepoznato;
    }
    
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
           
           <Col key={p.sifra} sm={12} lg={3} md={6}>
              <Card style={{ marginTop: '1rem' }}>
              <Card.Img variant="top" src={slika(p)} className="slika"/>
                <Card.Body>
                  <Card.Title>{p.naziv} </Card.Title>
                  <Card.Text>
                    {p.email}{p.link}
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