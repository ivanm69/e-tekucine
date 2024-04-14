import { Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Service from '../../services/AromaService';
import { RoutesNames } from '../../constants';
import InputText from '../../components/InputText';
import Akcije from '../../components/Akcije';
import InputCheckbox from '../../components/InputCheckbox';


export default function AromeDodaj() {
  const navigate = useNavigate();


  async function dodajAroma(Aroma) {
    const odgovor = await Service.dodaj('Aroma',Aroma);
    if(odgovor.ok){
      navigate(RoutesNames.AROMA_PREGLED);
      return
    }
    alert(Service.dohvatiPorukeAlert(odgovor.podaci));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodajAroma({
      naziv: podaci.get('naziv'),
      proizvod: podaci.get('prozivod'),
      vrsta: podaci.get('vrsta'),
      hladilo: podaci.get('hladilo')=='on'? true:false,
      
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <InputText atribut='naziv' vrijednost='' />
        <InputText atribut='proizvod' vrijednost='' />
        <InputText atribut='vrsta' vrijednost='' />
        <InputCheckbox atribut='hladilo' vrijednost={false} />
        
        <Akcije odustani={RoutesNames.AROMA_PREGLED} akcija='Dodaj aroma' />       
      </Form>
    </Container>
  );
}