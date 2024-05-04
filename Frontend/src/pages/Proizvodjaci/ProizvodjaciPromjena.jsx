import { useEffect, useState,useRef } from "react";
import Service from "../../services/ProizvodjacService";
import {  Button, Col, Container, Form, Row,Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { App, RoutesNames } from "../../constants";
import InputText from "../../components/InputText";
import Akcije from "../../components/Akcije";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import nepoznato from '../../assets/nepoznato.jpg'; 
import useError from "../../hooks/useError";
import useLoading from "../../hooks/useLoading";

export default function ProizvodajciPromjeni(){
    const [proizvodjac,setProizvodjac] = useState({});
  
    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);

    
    const routeParams = useParams();
   const navigate = useNavigate();
    const { prikaziError } = useError();
   

    async function dohvatiProizvodjac(){
        
        const odgovor = await Service.getBySifra('Proizvodjac',routeParams.sifra)
      
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            navigate(RoutesNames.PROZIVODJAC_PREGLED);
            return;
        }
        setProizvodjac(odgovor.podaci);
        if(odgovor.podaci.slika!=null){
          setTrenutnaSlika(App.URL + odgovor.podaci.slika + `?${Date.now()}`);
        }else{
          setTrenutnaSlika(nepoznato);
        }
      }
    
    useEffect(()=>{
        dohvatiProizvodjac();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    async function promjeniProizvodjac(proizvodjac){
        
        const odgovor = await Service.promjeni('Proizvodjac',routeParams.sifra,proizvodjac);
       
        if(odgovor.ok){
          navigate(RoutesNames.PROZIVODJAC_PREGLED);
          return;
        }
        prikaziError(odgovor.podaci);
    }

    
    function handleSubmit(e){
        e.preventDefault();
        const podaci = new FormData(e.target);
        promjeniProizvodjac({
            naziv: podaci.get('naziv'),
            link: podaci.get('link'),
            slika:''
            
        });
    }
    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }
      function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setSlikaZaCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }
    
      async function spremiSliku() {
        
        const base64 = slikaZaServer;
    
        const odgovor = await Service.postaviSliku(routeParams.sifra, {Base64: base64.replace('data:image/png;base64,', '')});
        if(!odgovor.ok){
          
          prikaziError(odgovor.podaci);
        }

        setTrenutnaSlika(slikaZaServer);
        
      }
<br/>
    return (
        <Container className='mt-2 text-yellow-500 font-serif font-medium'>
            <Row  >
                <Col key='1' sm={12}lg={6}md={6} >
           <Form onSubmit={handleSubmit}>
<br/>
                    <InputText atribut='naziv' vrijednost={proizvodjac.naziv}  />
                    <InputText atribut='link' vrijednost={proizvodjac.link} />
                    <br/>
                    <Akcije odustani={RoutesNames.PROZIVODJAC_PREGLED} akcija='Promjeni proizvodjac' />
             </Form>
             <br/>
             <Row className='mb-4'>
              <Col key='1' sm={12} lg={6} md={12}>
                <p className='form-label' >Trenutna slika:</p><br/>
                <Image
                  
                  
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <p className='form-label'>Nova slika</p>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>
        </Col>
        <Col key='2' sm={12} lg={6} md={6}>
          <br/>
          
        <input className="mb-2 bg-slate-50  " type='file'  onChange={onChangeImage} />
              <Button  disabled={!slikaZaServer} onClick={spremiSliku} >
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
        </Col>
      </Row>
      
    </Container>
  );
}
