import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Service from '../../services/AromaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import InputCheckbox from '../../components/InputCheckbox';
import { useEffect, useState } from 'react';

export default function ProzivodeDodaj() {
  const navigate = useNavigate();

  const [proizvodi, setProizvodi] = useState([]);
  const [proizvodSifra, setProizvodSifra] = useState(0);

  const [arome, setAroma] = useState([]);
  const [aromaSifra, setAromaSifra] = useState(0);

  async function dohvatiProizvod(){
    
    const odgovor = await Service.get('Proizvod');
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setProizvodi(odgovor.podaci);
    setProizvodSifra(odgovor.podaci[0].sifra);
  }

  async function dohvatiAroma(){
    const odgovor = await Service.get('Aroma');
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        return;
    }
    setAroma(odgovor.podaci);
    setAromaSifra(odgovor.podaci[0].sifra);
  }

  async function ucitaj(){
    await dohvatiProizvod();
    await dohvatiAroma();
  }

  useEffect(()=>{
    ucitaj();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    const odgovor = await Service.dodaj('Aroma',e);
    if(odgovor.ok){
      navigate(RoutesNames.AROMA_PREGLED);
      return
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
      naziv: podaci.get('naziv'),
      proizvodSifra: parseInt(proizvodSifra),
      aromaSifra: parseInt(aromaSifra),
      vrsta:podaci.get('vrsta'),
      hladilo:podaci.get('hladilo')=='on'? true:false
      
    });
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>

        <InputText atribut='naziv' vrijednost='' />

        

        <Form.Group className='mb-3' controlId='proizvod'>
          <Form.Label>Proizvod</Form.Label>
          <Form.Select multiple={true}
          onChange={(e)=>{setProizvodSifra(e.target.value)}}
          >
          {proizvodi && proizvodi.map((s,index)=>(
            <option key={index} value={s.sifra}>
              {s.naziv}
            </option>
          ))}
          </Form.Select>
        </Form.Group>

        <InputText atribut='vrsta' vrijednost='' />
        <InputCheckbox atribut='hladilo'vrijednost=""/>

        
        <Akcije odustani={RoutesNames.AROMA_PREGLED} akcija='Dodaj proizvod' /> 
      </Form>
    </Container>
  );
}