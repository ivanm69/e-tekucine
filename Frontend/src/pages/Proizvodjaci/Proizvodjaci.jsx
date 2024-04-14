import { useEffect, useState } from "react";
import {  Button, Container, Table } from "react-bootstrap";
import Service from "../../services/ProizvodjacService";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constants";


export default function Proizvodjaci(){
    const [proizvodjaci,setProizvodjaci] = useState();
    const navigate = useNavigate();

    async function dohvatiProizvodjace(){
        const odgovor = await Service.get('Proizvodjac');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setProizvodjaci(odgovor.podaci);
    }

    async function obrisiProizvodjac(sifra){
        const odgovor = await Service.obrisi('Proizvodjac',sifra);
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiProizvodjace();
        }
    }
     // Ovo se poziva dvaput u dev ali jednom u produkciji
    // https://stackoverflow.com/questions/60618844/react-hooks-useeffect-is-called-twice-even-if-an-empty-array-is-used-as-an-ar
    useEffect(()=>{
        dohvatiProizvodjace();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    
    return (

        <Container>
            <Link to={RoutesNames.PROIZVODJAC_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Link</th>
                        
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(proizvodjaci) && proizvodjaci.map((proizvodjac,index)=>(
                        <tr key={index}>
                            <td>{proizvodjac.naziv}</td>
                            <td className="desno">{proizvodjac.Link}</td>
                            
                                <Button 
                                variant="primary"
                                onClick={()=>{navigate(`/proizvodjaci/${proizvodjac.sifra}`)}}>
                                    <FaEdit 
                                    size={25}
                                    />
                                </Button>
                                
                                    &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={()=>obrisiProizvodjac(proizvodjac.sifra)}
                                >
                                    <FaTrash  
                                    size={25}
                                    />
                                </Button>

                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}