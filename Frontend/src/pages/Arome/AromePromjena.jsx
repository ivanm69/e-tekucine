import { useEffect, useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Service from '../../services/AromaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import InputCheckbox from '../../components/InputCheckbox';
import useError from '../../hooks/useError';
import useLoading from '../../hooks/useLoading';


export default function AromePromjeni() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const [aroma, setAroma] = useState({});
  
  const [proizvodi, setProizvodi] = useState([]);
  const [proizvodSifra, setProizvodSifra] = useState(0);
  const { prikaziError } = useError();
  


  async function dohvatiArome() {
    
    const odgovor = await Service.getBySifra('Aroma',routeParams.sifra);
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      
      return;
    } 
    
    let aroma = odgovor.podaci;
    
    
    setAroma(aroma);
    setProizvodSifra(aroma.proizvodSifra);
    if(aroma.proizvodSifra!=null){
      setProizvodSifra(aroma.ProizvodSifra);
    }       
  }

 

  async function dohvatiProizvod() {
  
    const odgovor =  await Service.get('Proizvod');
    if(!odgovor.ok){
      prikaziError(odgovor.podaci);
      
      return;
    }
    setProizvodi(odgovor.podaci);
    setProizvodSifra(odgovor.podaci[0].sifra);
      
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
    prikaziError(odgovor.podaci);
  }



  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    

    promjeni({
      naziv: podaci.get('naziv'),
      proizvodSifra: parseInt(proizvodSifra), 
      vrsta:podaci.get('vrsta'),
      hladilo:podaci.get('hladilo')=='on'? true:false
     
    });
    
  }

  return (
    <Container className='mt-4 text-yellow-500 font-serif font-medium'>
      <Form onSubmit={handleSubmit}>
        <InputText atribut='naziv' vrijednost={aroma.naziv} />
       
        <Form.Group className='mb-3' controlId='proizvod'>
          <Form.Label>Proizvod</Form.Label>
          <Form.Select
           
            onChange={(e) => {
              setProizvodSifra(e.target.value);
            }}>
            {proizvodi &&
              proizvodi.map((s, index) => (
                <option key={index} value={s.sifra}>
                  {s.naziv}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <InputText atribut='vrsta' vrijednost={aroma.vrsta} />
        <br/>
        <InputCheckbox atribut='hladilo' vrijednost={aroma.hladilo}/>
       <br/>
        <Akcije odustani={RoutesNames.AROMA_PREGLED} akcija='Promjeni aroma' /> 
      </Form>
    </Container>
  );
}