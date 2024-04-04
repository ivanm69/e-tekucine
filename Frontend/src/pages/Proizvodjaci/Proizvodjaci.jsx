import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Table,Button } from 'react-bootstrap';
import {  Link, useNavigate } from 'react-router-dom';
import { RoutesNames } from '../../constants';
import ProizvodjacService from '../../services/ProizvodjacService';



export default function Proizvodjaci(){
    const [proizvodjaci,setProizvodjaci] = useState();
    const navigate=useNavigate();

    async function dohvatiProizvodjace(){
    await ProizvodjacService.get()
     .then((odg)=>{
        setProizvodjaci(odg);
     })
     .catch((e)=>{
        console.log(e);
     })
     
     ;
    }

    useEffect(()=>{
        dohvatiProizvodjace();
    },[]);

async function obrisiAsync(sifra){
   const odgovor = await ProizvodjacService._delete(sifra);
      if(odgovor.greska){
          console.log(poruka.odgovor);
          alert('Pogledaj konzolu');
          return;
      }
      dohvatiProizvodjace();
}

    function obrisi(sifra){
      obrisiAsync(sifra);
    }


    return(
        <>
           <Container>
            <Link to={RoutesNames.PROIZVODJAC_NOVI}> Dodaj </Link>
           
            
            
            
            
            <Table striped bordered hover responsive>
             <thead>
              <tr>
                <th>Naziv</th>
                <th>Link</th>
                <th>Akcija</th>
             </tr>
             </thead>
             <tbody>
                {proizvodjaci && proizvodjaci.map((proizvodjac,index)=> (
                <tr key={index}>
                <td>{proizvodjac.naziv} </td>
                <td>{proizvodjac.link} </td>
                

                <td>
                  <Button onClick={()=>obrisi(proizvodjac.sifra)}
                  variant='danger'>Obrisi</Button>

                  <Button onClick={()=>{navigate(`/proizvodjaci/${proizvodjac.sifra}`)}}>Promjeni</Button>
                </td>

                </tr>


                ))}
            </tbody>
           </Table>
           </Container>
        </>
    );
}