import { Link } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { useTranslation } from 'react-i18next';
import { useContext } from "react";
import { CartSumContext } from "../store/CartSumContext";
import { AuthContext } from "../store/AuthContext";

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const { cartSum } = useContext(CartSumContext);
  const { loggedIn, setLoggedIn } = useContext(AuthContext);

  const changeLangEN = () => {
    i18n.changeLanguage("en");
    localStorage.setItem("language", "en");
  }

  const changeLangEE = () => {
    i18n.changeLanguage("ee");
    localStorage.setItem("language", "ee");
  }

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to="/">Mihkel's webshop</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {loggedIn === true && <Nav.Link as={Link} to="/admin">{t("nav.admin")}</Nav.Link>}
              <Nav.Link as={Link} to="/contact">{t("nav.contact")}</Nav.Link>
              <Nav.Link as={Link} to="/shops">{t("nav.shops")}</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <img className="lang" onClick={changeLangEN} src="/english.png" alt="" />
                <img className="lang" onClick={changeLangEE} src="/estonian.png" alt="" />
              </Nav.Link>
              <div>{cartSum}</div>
              <Nav.Link as={Link} to="/cart">{t("nav.cart")}</Nav.Link>
              {loggedIn === false && <Nav.Link as={Link} to="/login">{t("nav.login")}</Nav.Link>}
              {loggedIn === false && <Nav.Link as={Link} to="/signup">{t("nav.signup")}</Nav.Link>}
              {loggedIn === true && <button onClick={[() => setLoggedIn(false), sessionStorage.removeItem("token")]}>Logout</button>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default NavigationBar