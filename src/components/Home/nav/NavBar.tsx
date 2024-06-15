import { useEffect, useState } from "react";
import { NavLink as RRNavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavLink,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarText,
  NavbarToggler,
} from "reactstrap";
import { Button } from "@mui/material";
import { logout } from "../../../managers/authManager";
import "./NavBar.css";

export default function NavBar({ loggedInUser, setLoggedInUser }: any) {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const toggleNavbar = () => setOpen(!open);

  console.log(loggedInUser)

  return (
    <div>
      <Navbar color="dark" dark fixed="true" expand="lg">
        <NavbarBrand className="mr-auto" tag={RRNavLink} to="home">
          GameOverPlan
        </NavbarBrand>
        {loggedInUser ? (
          <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
              <Nav className="nav-main" navbar>
                <NavItem className="nav-item" onClick={() => setOpen(false)}>
                  <NavLink className="nav-item-link" tag={RRNavLink} to="/myhome">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem className="nav-item" onClick={() => setOpen(false)}>
                  <NavLink className="nav-item-link" tag={RRNavLink} to="/myaccount">
                    My Account
                  </NavLink>
                </NavItem>
                <NavItem className="nav-item" onClick={() => setOpen(false)}>
                  <NavLink className="nav-item-link" tag={RRNavLink} to="/membership">
                    Membership
                  </NavLink>
                </NavItem>
                {loggedInUser.roles?.includes("Admin") && (
                  <NavItem className="nav-item" onClick={() => setOpen(false)}>
                    <NavLink className="nav-item-link" tag={RRNavLink} to="/adminportal">
                      ♦ Admin ♦
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </Collapse>

            <Button
              color="primary"
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                  setLoggedInUser(null);
                  setOpen(false);
                  navigate("/home")
                });
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <Nav className="nav-main" navbar>
            <NavItem className="nav-item" onClick={() => setOpen(false)}>
              <NavLink style={{marginTop: "0.4rem"}} className="nav-item-link" tag={RRNavLink} to="/membership">
                Membership
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to="/login">
                <Button variant="contained" color="primary">Login</Button>
              </NavLink>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    </div>
  );
}
