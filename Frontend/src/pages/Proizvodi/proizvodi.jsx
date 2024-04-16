import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import Service from "../../services/ProizvodService";
import { RoutesNames } from "../../constants";

export default function Proizvodi(){
    const [proizvodi,setProizvode] = useState();
    let navigate = useNavigate(); 

    async function dohvatiProizvode(){
        const odgovor = await Service.get('Proizvod');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setProizvode(odgovor.podaci);
    }

    async function obrisiProizvod(sifra) {
        const odgovor = await Service.obrisi('Proizvod',sifra);
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiProizvode();
        }
    }

    useEffect(()=>{
        dohvatiProizvode();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    

    return (

        <Container>
            <Link to={RoutesNames.PROIZVOD_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
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
                    {Array.isArray(proizvodi) && proizvodi.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.naziv}</td>
                            <td>{entitet.proizvodjacNaziv}</td>
                            
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/proizvode/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiProizvod(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}