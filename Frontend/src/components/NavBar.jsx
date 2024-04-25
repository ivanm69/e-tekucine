import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function NavBar(){

    const navigate= useNavigate();
        
   

    return(
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-indigo-500">
            <Container>
                <Navbar.Brand 
                className='kursor'
                onClick={()=>navigate(RoutesNames.HOME)}>
                <img src="\logo.svg" alt="Logo" className="d-inline-block align-middle  w-20 text-yellow-50" />
                E-tekućineAPP</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link 
                    href="https://plax69-001-site1.itempurl.com/swagger/index.html"
                    target='_blank' className="text-yellow-50 font-medium no-underline hover:underline decoration-green-500">API</Nav.Link>
                    
                    <NavDropdown title="Izbornik" id="collapsible-nav-dropdown">
                    <NavDropdown.Item 
                    onClick={()=>navigate(RoutesNames.PROZIVOD_PREGLED)}
                    >Proizvod</NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>navigate(RoutesNames.PROZIVODJAC_PREGLED)}>
                       Proizvodjaci
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={()=>navigate(RoutesNames.AROMA_PREGLED)}>
                       Arome</NavDropdown.Item>
                
                    
                     
                    </NavDropdown>
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}