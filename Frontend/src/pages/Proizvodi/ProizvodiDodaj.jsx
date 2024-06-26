import { Col, Container, Form} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Service from '../../services/ProizvodService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';




export default function ProzivodeDodaj() {
  const navigate = useNavigate();

  const [proizvodjaci, setProizvodjaci] = useState([]);
  const [proizvodjacSifra, setProizvodjacSifra] = useState(0);

  const [arome, setAroma] = useState([]);
  const [aromaSifra, setAromaSifra] = useState(0);
  
  const { prikaziError } = useError();
  
  
  async function dohvatiProizvodjac(){
    
    const odgovor = await Service.get('Proizvodjac');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      
      return;
    }
    setProizvodjaci(odgovor.podaci);
    setProizvodjacSifra(odgovor.podaci[0].sifra);
  }

  async function dohvatiAroma(){
   
    const odgovor = await Service.get('Aroma');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      
        return;
    }
    setAroma(odgovor.podaci);
    setAromaSifra(odgovor.podaci[0].sifra);
  }

  async function ucitaj(){
    
    await dohvatiProizvodjac();
    await dohvatiAroma();
   
  }

  useEffect(()=>{
    
    ucitaj();
   
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    
    const odgovor = await Service.dodaj('Proizvod',e);
    if(odgovor.ok){
      navigate(RoutesNames.PROZIVOD_PREGLED);
      
      return
    }
    prikaziError(odgovor.podaci);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      naziv: podaci.get('naziv'),
      proizvodjacSifra: parseInt(proizvodjacSifra),
      aromaSifra: parseInt(aromaSifra),
      
    });
  }

  return (
    <Container className='mt-4 text-yellow-500 font-serif font-medium'>
      <Form onSubmit={handleSubmit} >
      <Col >
        <InputText  atribut='naziv' vrijednost=''/>

        </Col>

        <Form.Group className='mb-3' controlId='proizvodjac'>
          <Form.Label>Proizvodjac</Form.Label>
          <Form.Select multiple={true}
          onChange={(e)=>{setProizvodjacSifra(e.target.value)}}
          >
          {proizvodjaci && proizvodjaci.map((s,index)=>(
            <option key={index} value={s.sifra}>
              {s.naziv}
            </option>
          ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className='mb-3' controlId='aroma'>
          <Form.Label>Aroma</Form.Label>
          <Form.Select
          onChange={(e)=>{setAromaSifra(e.target.value)}}
          >
          {arome && arome.map((e,index)=>(
            <option key={index} value={e.sifra}>
              {e.naziv} {e.proizvod}{e.vrsta}{e.hladilo}
            </option>
          ))}
          </Form.Select>
        </Form.Group>

        
        <Akcije odustani={RoutesNames.PROZIVOD_PREGLED} akcija='Dodaj proizvod' /> 
      </Form>
    </Container>
  );
}