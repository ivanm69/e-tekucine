import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import ProizvodService from '../../services/ProizvodService';
import { Table } from 'react-bootstrap';


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

    return(
        <>
           <Container>
            <Table striped bordered hover responsive>
             <thead>
              <tr>
                <th>Naziv</th>
                <th>Proizvodjac</th>
             </tr>
             </thead>
             <tbody>
                {proizvodi && proizvodi.map((proizvod,index)=> (
                <tr key={index}>
                <td>{proizvod.naziv} </td>
                <td>{proizvod.proizvodjac} </td>

                </tr>


                ))}
            </tbody>
           </Table>
           </Container>
        </>
    );
}