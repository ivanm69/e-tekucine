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
            <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand 
          className='kursor'
          onClick={() => navigate(RoutesNames.HOME)}
        >
          <img src="\logo.svg" alt="Logo" className="d-inline-block align-middle  w-20 text-yellow-50" />
          E-tekućineAPP
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link 
            href="https://plax69-001-site1.itempurl.com/swagger/index.html"
            target='_blank' 
            className="text-yellow-50 font-medium no-underline hover:underline decoration-green-500"
          >
            API
          </Nav.Link>
          <Nav.Link 
            onClick={() => navigate(RoutesNames.PROZIVOD_PREGLED)}
          >
            Proizvod
          </Nav.Link>
          <Nav.Link 
            onClick={() => navigate(RoutesNames.PROZIVODJAC_PREGLED)}
          >
            Proizvodjaci
          </Nav.Link>
          <Nav.Link 
            onClick={() => navigate(RoutesNames.AROMA_PREGLED)}
          >
            Arome
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  </>
);
}