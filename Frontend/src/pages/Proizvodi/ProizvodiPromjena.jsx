import { useState, useEffect } from 'react';
import { Container, Form, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/ProizvodService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import useError from '../../hooks/useError';


export default function ProizvodePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [proizvod, setProizvod] = useState({});

  const [proizvodjac, setProizvodjaci] = useState([]);
  const [sifraProizvodjac, setSifraProizvodjac] = useState(0);

  const [arome, setArome] = useState([]);
  const [sifraAroma, setSifraAroma] = useState(0);
  const { prikaziError } = useError();
  

  async function dohvatiProizvod() {
    const odgovor = await Service.getBySifra('Proizvod',routeParams.sifra);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    let proizvod = odgovor.podaci;
   
   
    setProizvod(proizvod);
    setSifraProizvodjac(proizvod.proizvodjacSifra);
    if(proizvod.aromaSifra!=null){
      setSifraAroma(proizvod.aromaSifra);
    }       
  }

 

  async function dohvatiProivodjac() {
    const odgovor =  await Service.get('Proizvodjac');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setProizvodjaci(odgovor.podaci);
    setSifraProizvodjac(odgovor.podaci[0].sifra);
      
  }

  async function dohvatiArome() {
    const odgovor =  await Service.get('Aroma');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      return;
    }
    setArome(odgovor.podaci);
    setSifraAroma(odgovor.podaci[0].sifra);
  }

 

  async function dohvatiInicijalnePodatke() {
    await dohvatiProivodjac();
    await dohvatiArome();
    await dohvatiProizvod();
    
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
    prikaziError(odgovor.podaci);
  }



  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
   

    promjeni({
      naziv: podaci.get('naziv'),
      
      proizvodjacSifra: parseInt(sifraProizvodjac), 
      aromaSifra: parseInt(sifraAroma),
      
    });
    
  }

  return (
    <Container className='mt-4 text-yellow-500 font-serif font-medium'>
      
        
          <Form onSubmit={handleSubmit} >
            <InputText atribut='naziv' vrijednost={proizvod.naziv} />
            
              
            <Form.Group className='mb-3' controlId='proizvodjac'>
              <Form.Label>Proizvodjac</Form.Label>
              <Form.Select
                value={sifraProizvodjac}
                onChange={(e) => {
                  setSifraProizvodjac(e.target.value);
                }}>
                {proizvodjac &&
                  proizvodjac.map((proizvodjac, index) => (
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
                      {aroma.naziv}{aroma.proizvod}{aroma.vrsta} {aroma.hladilo}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
            
            <Akcije odustani={RoutesNames.PROZIVOD_PREGLED} akcija='Promjeni proizvod' /> 
          </Form>
        
      
    </Container>
  );
}