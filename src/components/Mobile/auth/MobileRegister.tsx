import { useState } from "react";
import { register } from "../../../managers/authManager";
import { Link, useNavigate } from "react-router-dom";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { Button } from "@mui/material";

export default function MobileRegister({ setLoggedInUser }:any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordMismatch, setPasswordMismatch] = useState<boolean>();
  const [registrationFailure, setRegistrationFailure] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
    } else {
      const newUser = {
        firstName,
        lastName,
        userName,
        email,
        address,
        password,
      };
      register(newUser).then((user) => {
        if (user) {
          setLoggedInUser(user);
          navigate("/home");
        } else {
          setRegistrationFailure(true);
        }
      });
    }
  };

  return (
    <div className="container" style={{ marginTop: "8em"}}>
      <h1 style={{fontSize: "4em", marginBottom: "0.75em", textAlign: "center", fontWeight: "700"}}>Sign Up</h1>
      {/* <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last Name</Label>
        <Input
          type="text"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
      </FormGroup> */}
      <FormGroup>
        <Label style={{fontSize: "1.75em"}}>Email</Label>
        <Input
          style={{height: "3.5em"}}
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      {/* <FormGroup>
        <Label>User Name</Label>
        <Input
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
      </FormGroup> */}
      {/* <FormGroup>
        <Label>Address</Label>
        <Input
          type="text"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        /> 
      </FormGroup> */}
      <FormGroup>
        <Label style={{fontSize: "1.75em"}}>Password</Label>
        <Input
          style={{height: "3.5em"}}
          invalid={passwordMismatch}
          type="password"
          value={password}
          onChange={(e) => {
            setPasswordMismatch(false);
            setPassword(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{fontSize: "1.75em"}}> Confirm Password</Label>
        <Input
          style={{height: "3.5em"}}
          invalid={passwordMismatch}
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setPasswordMismatch(false);
            setConfirmPassword(e.target.value);
          }}
        />
        <FormFeedback>Passwords do not match!</FormFeedback>
      </FormGroup>
      <p style={{ color: "red" }} hidden={!registrationFailure}>
        Registration Failure
      </p>
      <Button
        style={{fontSize: "1.3em", float: "right"}}
        variant="outlined"
        color="primary"
        onClick={handleSubmit}
        disabled={passwordMismatch}
      >
        Register
      </Button>
      <p style={{fontStyle: "italic", fontSize: "1.2em"}}>
        Already signed up? Log in <Link to="/login">here</Link>
      </p>
    </div>
  );
}
