import axios from "axios";
import { Navbar, NavbarBrand, Nav, Button } from 'reactstrap';

function Header (props) {
    let isLoggedIn = props.isLoggedIn;
    let setIsLoggedIn = props.setIsLoggedIn;

    const handleLogout = e => {
        axios.post("api/logout")
        localStorage.clear();
        window.location.href = '/';
        setIsLoggedIn(false);
    }

    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand className='m-auto'>Students demo</NavbarBrand>
            <Nav navbar>
              {isLoggedIn? <Button onClick={handleLogout}>Logout</Button> : null}
            </Nav>
        </Navbar>
      </div>
    );
}

export default Header;
