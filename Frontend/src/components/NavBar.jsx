import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { App, RoutesNames } from '../constants';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


export default function NavBar(){

    const navigate = useNavigate();
    const { logout, isLoggedIn } = useAuth();

    return(
        <>
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand  
               
                className='kursor'
                onClick={()=>navigate(RoutesNames.HOME)}
                ><img src="\logo.svg" alt="Logo" className="d-inline-block align-left  w-20 text-yellow-50" />E-tekućine APP</Navbar.Brand>
               
          
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {isLoggedIn ? (
                      <>
                      <Nav.Link onClick={()=>navigate(RoutesNames.NADZORNA_PLOCA)}>Nadzorna ploča</Nav.Link>
                    
                    <Nav.Link 
                        href={App.URL + '/swagger/index.html'}
                        target='_blank'>API</Nav.Link>
                        
                        <NavDropdown title="Izbornik" id="collapsible-nav-dropdown">
                        <NavDropdown.Item 
                        onClick={()=>navigate(RoutesNames.PROZIVOD_PREGLED)}
                        >Proizvodi</NavDropdown.Item>
                        <NavDropdown.Item 
                      onClick={()=>navigate(RoutesNames.PROZIVODJAC_PREGLED)}
                      >
                        Proizvodjaci
                      </NavDropdown.Item>
                      <NavDropdown.Item 
                      onClick={()=>navigate(RoutesNames.AROMA_PREGLED)}
                      >
                        Arome
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      
                        </NavDropdown>
                        <Nav.Link onClick={logout}>Odjava</Nav.Link>
                        </>
                  ) : (
                <Nav.Link onClick={() => navigate(RoutesNames.LOGIN)}>
                  Prijava
                </Nav.Link>
                  )}
                  
                </Nav>
                
                </Navbar.Collapse>
            </Container>
        </Navbar>
        </>
    );
}