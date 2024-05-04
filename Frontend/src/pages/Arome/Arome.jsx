import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Service from "../../services/AromaService";
import { IoIosAdd } from "react-icons/io";
import {  FaEdit, FaTrash} from "react-icons/fa";
import { Link } from "react-router-dom";
import {  RoutesNames } from "../../constants";
import { useNavigate } from "react-router-dom";
import { GrValidate } from "react-icons/gr";
import useError from "../../hooks/useError";
import { confirm } from "../../components/Potvrdivanje";
import useLoading from "../../hooks/useLoading";

export default function Arome(){
    const [arome,setArome] = useState();
    let navigate = useNavigate(); 
    const { showLoading, hideLoading } = useLoading();
    const{prikaziError}=useError();

    async function dohvatiArome(){
        showLoading();
        const odgovor = await Service.get('Aroma');
        hideLoading();
        if(!odgovor.ok){
            prikaziError(odgovor.podaci);
            return;
        }
        setArome(odgovor.podaci);
       
    }

    async function obrisiAroma(sifra) {
        
        if (await confirm("Jeste li sigurni da zelite obrisati proizvod sa sifrom " + sifra + "?")) {
        const odgovor = await Service.obrisi('Aroma',sifra);
        
        prikaziError(odgovor.podaci);
        if (odgovor.ok){
            dohvatiArome();
        }
    }
    }
    useEffect(()=>{
        dohvatiArome();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    function hladilo(aroma){
        if (aroma.hladilo==null) return 'gray';
        if(aroma.hladilo) return 'green';
        return 'red';
    }

    function hladiloTitle(aroma){
        if (aroma.hladilo==null) return 'Nije definirano';
        if(aroma.hladilo) return 'hladilo';
        return 'nema hladilo';
    }


    return (
        <Container>
            <br/>
            <Link to={RoutesNames.AROMA_NOVI} class="btn bg-gradient-to-r from-red-900 to-purple-800  text-white font-medium py-3 px-10 rounded  flex flex-col items-center ">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <br/>
            <br/>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th class="font-serif">Naziv</th>
                        <th class="font-serif">Proizvod</th>
                        <th class="font-serif">Vrsta</th>
                        <th class="font-serif">Hladilo</th>
                        
                        <th class="font-serif">Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {arome && arome.map((aroma,index)=>(
                        <tr key={index}>
                            <td class="font-serif">{aroma.naziv}</td>
                            <td class="font-serif">{aroma.proizvodNaziv}</td>
                            
                            <td class="font-serif">{aroma.vrsta}</td>
                            
                            <td class="font-serif">{aroma.hladilo}<GrValidate 
                            size={30} 
                            color={hladilo(aroma)}
                            title={hladiloTitle(aroma)}
                            /></td>
                            
                           

                                       
                            <td className="sredina">
                                    <Button 
                                        variant='primary'
                                        onClick={()=>{navigate(`/arome/${aroma.sifra}`)}}
                                    >  
                            
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