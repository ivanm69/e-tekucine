import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/AromaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import InputCheckbox from '../../components/InputCheckbox';

export default function AromePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [aroma, setAroma] = useState({});

  const [proizvodi, setProizvodi] = useState([]);
  const [sifraProizvod, setSifraProizvod] = useState(0);

  


  async function dohvatiArome() {
    const odgovor = await Service.getBySifra('Aroma',routeParams.sifra);
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    let aroma = odgovor.podaci;
    
    
    setAroma(aroma);
    setSifraProizvod(aroma.proizvodSifra);
    if(aroma.proizvodSifra!=null){
      setSifraProizvod(aroma.ProizvodSifra);
    }       
  }

 

  async function dohvatiProizvod() {
    const odgovor =  await Service.get('Proizvod');
    if(!odgovor.ok){
      alert(Service.dohvatiPorukeAlert(odgovor.podaci));
      return;
    }
    setProizvodi(odgovor.podaci);
    setSifraProizvod(odgovor.podaci[0].sifra);
      
  }


  async function dohvatiInicijalnePodatke() {
    await dohvatiProizvod();
    await dohvatiArome();
    
  }

  useEffect(() => {
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function promjeni(e) {
    const odgovor = await Service.promjeni('Aroma',routeParams.sifra, e);
    if(odgovor.ok){
      navigate(RoutesNames.AROMA_PREGLED);
      return;
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }



  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    

    promjeni({
      naziv: podaci.get('naziv'),
      proizovdSifra: parseInt(sifraProizvod), 
      vrsta:podaci.get('vrsta'),
      hladilo:podaci.get('hladilo'),
     
    });
    
  }

  return (
    <Container className='mt-4'>
      <Form onSubmit={handleSubmit}>
        <InputText atribut='naziv' vrijednost={aroma.naziv} />
       
        <Form.Group className='mb-3' controlId='proizvodSifra'>
          <Form.Label>Proizvod</Form.Label>
          <Form.Select
            value={sifraProizvod}
            onChange={(e) => {
              setSifraProizvod(e.target.value);
            }}>
            {Array.isArray(proizvodi) &&
              proizvodi.map((aroma, index) => (
                <option key={index} value={aroma.proizvodSifra}>
                  {aroma.naziv}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <InputText atribut='vrsta' vrijednost={aroma.vrsta} />
        <InputCheckbox atribut='hladilo' vrijednost={aroma.hladilo}/>
       
        <Akcije odustani={RoutesNames.AROMA_PREGLED} akcija='Promjeni aroma' /> 
      </Form>
    </Container>
  );
}