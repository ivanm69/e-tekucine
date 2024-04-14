import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/AromaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';

export default function AromePromjeni() {
  const [aroma, setAroma] = useState({});

  const routeParams = useParams();
  const navigate = useNavigate();


  async function dohvatiAroma() {
    const odgovor = await Service.getBySifra('Aroma',routeParams.sifra);
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setAroma(odgovor.podaci);
  }

  async function promjeniAroma(aroma) {
    const odgovor = await Service.promjeni('Aroma',routeParams.sifra, aroma);
    if(odgovor.ok){
      navigate(RoutesNames.AROMA_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  useEffect(() => {
    dohvatiAroma();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  function handleSubmit(e) {
    e.preventDefault();
    const podaci = new FormData(e.target);
    promjeniAroma({
      naziv: podaci.get('naziv'),
      proizvod: podaci.get('prozivod'),
      vrsta: podaci.get('vrsta'),
      hladilo: podaci.get('hladilo')=='on'? true:false,
      
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputText atribut='naziv' vrijednost={aroma.naziv} />
        <InputText atribut='proizvod' vrijednost={aroma.proizvod} />
        <InputText atribut='vrsta' vrijednost={aroma.vrsta} />
        <InputText atribut='hladilo' vrijednost={aroma.hladilo} />
        
        <Akcije odustani={RoutesNames.AROMA_PREGLED} akcija='Promjeni aroma' />
      </Form>
    </Container>
  );
}