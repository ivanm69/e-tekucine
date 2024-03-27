import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProizvodService from '../../services/ProizvodService';
import { Table,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RoutesNames } from '../../constants';



export default function Proizvodi(){
    const [proizvodi,setProizvodi] = useState();

    async function dohvatiProizvode(){
    await ProizvodService.get()
     .then((odg)=>{
        setProizvodi(odg);
     })
     .catch((e)=>{
        console.log(e);
     })
     
     ;
    }

    useEffect(()=>{
        dohvatiProizvode();
    },[]);

async function obrisiAsync(sifra){
   const odgovor = await ProizvodService._delete(sifra);
      if(odgovor.greska){
          console.log(poruka.odgovor);
          alert('Pogledaj konzolu');
          return;
      }
      dohvatiProizvode();
}

    function obrisi(sifra){
      obrisiAsync(sifra);
    }


    return(
        <>
           <Container>
            <Link 
            to={RoutesNames.PROIZVOD_NOVI}
            >Dodaj
            </Link>
            
            
            <Table striped bordered hover responsive>
             <thead>
              <tr>
                <th>Naziv</th>
                <th>Proizvodjac</th>
                <th>Akcija</th>
             </tr>
             </thead>
             <tbody>
                {proizvodi && proizvodi.map((proizvod,index)=> (
                <tr key={index}>
                <td>{proizvod.naziv} </td>
                <td>{proizvod.proizvodjac} </td>
                <td>
                  <Button onClick={()=>obrisi(proizvod.sifra)}
                  variant='danger'>Obrisi</Button>
                </td>

                </tr>


                ))}
            </tbody>
           </Table>
           </Container>
        </>
    );
}