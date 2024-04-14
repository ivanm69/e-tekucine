import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Service from "../../services/AromaService";
import { IoIosAdd } from "react-icons/io";
import {  FaEdit, FaTrash} from "react-icons/fa";
import { Link } from "react-router-dom";
import {  RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";
import { GrValidate } from "react-icons/gr";

export default function Arome(){
    const [arome,setArome] = useState();
    let navigate = useNavigate(); 

    async function dohvatiArome(){
        const odgovor = await Service.get('Aroma');
        if(!odgovor.ok){
            alert(Service.dohvatiPorukeAlert(odgovor.podaci));
            return;
        }
        setArome(odgovor.podaci);
    }

    async function obrisiAroma(sifra) {
        const odgovor = await Service.obrisi('Aroma',sifra);
        alert(Service.dohvatiPorukeAlert(odgovor.podaci));
        if (odgovor.ok){
            dohvatiArome();
        }
    }

    useEffect(()=>{
        dohvatiArome();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function hladilo(aroma){
        if (aroma.hladilo==null) return 'gray';
        if(aroma.hladilo) return 'yellow';
        return 'red';
    }

    function hladiloTitle(aroma){
        if (aroma.hladilo==null) return 'Nije definirano';
        if(aroma.hladilo) return 'Verificiran';
        return 'NIJE verificiran';
    }


    return (
        <Container>
            <Link to={RoutesNames.AROMA_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Proizvod</th>
                        <th>Vrsta</th>
                        <th>Hladilo</th>
                        
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(arome) && arome.map((aroma,index)=>(
                        <tr key={index}>
                            <td>{aroma.naziv}</td>
                            <td>{aroma.proizvod}</td>
                            <td>{aroma.vrsta}</td>
                            <td>{aroma.hladilo}</td>
                            
                            <td className="sredina">
                                    <Button 
                                        variant='primary'
                                        onClick={()=>{navigate(`/arome/${aroma.sifra}`)}}
                                    >

                                        <td className="sredina">
                            <GrValidate 
                            size={30} 
                            color={hladilo(aroma)}
                            title={hladiloTitle(aroma)}
                            />
                            </td>
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiAroma(aroma.sifra)}
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