import { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/ProizvodService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';


export default function ProizvodePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [proizvod, setProizvod] = useState({});

  const [proizvodjaci, setProizvodjaci] = useState([]);
  const [sifraProizvodjac, setSifraProizvodjac] = useState(0);

  const [arome, setArome] = useState([]);
  const [sifraAroma, setSifraAroma] = useState(0);


  async function dohvatiProizvode() {
    const odgovor = await Service.getBySifra('Proizvod',routeParams.sifra);
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    let proizvod = odgovor.podaci;
    
    
    setProizvod(proizvod);
    setSifraProizvodjac(proizvod.proizovdjacSifra);
    if(proizvod.aromaSifra!=null){
      setSifraAroma(proizvod.AromaSifra);
    }       
  }

 

  async function dohvatiProizvodjac() {
    const odgovor =  await Service.get('Proizvodjac');
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setProizvodjaci(odgovor.podaci);
    setSifraProizvodjac(odgovor.podaci[0].sifra);
      
  }

  async function dohvatiAroma() {
    const odgovor =  await Service.get('Aroma');
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setArome(odgovor.podaci);
    setSifraAroma(odgovor.podaci[0].sifra);
  }

 

  async function dohvatiInicijalnePodatke() {
    await dohvatiProizvodjac();
    await dohvatiAroma();
    await dohvatiProizvode();
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function promjeni(e) {
    const odgovor = await Service.promjeni('Proizvod',routeParams.sifra, e);
    if(odgovor.ok){
      navigate(RoutesNames.PROZIVOD_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }



  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    

    promjeni({
      naziv: podaci.get('naziv'),
      proizovdjacSifra: parseInt(sifraProizvodjac), 
      aromaSifra: parseInt(sifraAroma),
     
    });
    
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <InputText atribut='naziv' vrijednost={proizvod.naziv} />
        <Row>
          <Col key='1' sm={12} lg={6} md={6}>
            <Form.Group className='mb-3' controlId='datum'>
              
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className='mb-3' controlId='proizvodjac'>
          <Form.Label>Proizvodjac</Form.Label>
          <Form.Select
            value={sifraProizvodjac}
            onChange={(e) => {
              setSifraProizvodjac(e.target.value);
            }}>
            {proizvodjaci &&
              proizvodjaci.map((proizvodjac, index) => (
                <option key={index} value={proizvodjac.sifra}>
                  {proizvodjac.naziv}{proizvodjac.link}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className='mb-3' controlId='aroma'>
          <Form.Label>Aroma</Form.Label>
          <Form.Select
            value={sifraAroma}
            onChange={(e) => {
              setSifraAroma(e.target.value);
            }}>
            {arome &&
              arome.map((aroma, index) => (
                <option key={index} value={aroma.sifra}>
                  {aroma.proizvod} {aroma.vrsta}{aroma.hladilo}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
       
        <Akcije odustani={RoutesNames.PROZIVOD_PREGLED} akcija='Promjeni proizvod' /> 
      </Form>
    </Container>
  );
}