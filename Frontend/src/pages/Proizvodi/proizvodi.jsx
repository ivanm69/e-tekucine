import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "../../services/ProizvodService";
import { RoutesNames } from "../../constants";
import useError from "../../hooks/useError";



export default function Proizvodi(){
    const [proizvodi,setProizvode] = useState();
    let navigate = useNavigate(); 
    const { prikaziError } = useError();

    async function dohvatiProizvode(){
        const odgovor = await Service.get('Proizvod');
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setProizvode(odgovor.podaci);
    }

    async function obrisiProizvod(sifra) {
        const odgovor = await Service.obrisi('Proizvod',sifra);
        prikaziError(odgovor.podaci);
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
            <br/>
            <Link to={RoutesNames.PROIZVOD_NOVI} class="btn bg-gradient-to-r from-red-900 to-purple-800  text-white font-medium py-3 px-10 rounded  flex flex-col items-center ">
                
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <br/>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th class="font-serif ">Naziv</th>
                        <th class="font-serif">Proizvodjac</th>
                        
                        <th class="font-serif">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {proizvodi && proizvodi.map((entitet,index)=>(
                        <tr key={index}>
                            <td class="font-serif">{entitet.naziv}</td>
                            <td class="font-serif">{entitet.proizvodjacNaziv}</td>
                            
                            
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/proizvodi/${entitet.sifra}`)}}
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