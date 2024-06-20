import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../managers/authManager";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { Button } from "@mui/material";

export default function MobileLogin({ setLoggedInUser }:any) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
    login(email, password).then((user:any) => {
      if (!user) {
        setFailedLogin(true);
      } else {
        setLoggedInUser(user);
        navigate("/");
      }
    });
  };

  return (
    <div className="container" style={{ marginTop: "8em"}}>
      <h1 style={{fontSize: "4em", marginBottom: "0.75em", textAlign: "center", fontWeight: "700"}}>Login</h1>
      <FormGroup>
        <Label style={{fontSize: "1.75em"}}>Email</Label>
        <Input
          style={{height: "3.5em"}}
          invalid={failedLogin}
          type="text"
          value={email}
          onChange={(e:any) => {
            setFailedLogin(false);
            setEmail(e.target.value);
          }}
        />
      </FormGroup>
      <FormGroup>
        <Label style={{fontSize: "1.75em"}}>Password</Label>
        <Input
          style={{height: "3.5em" }}
          invalid={failedLogin}
          type="password"
          value={password}
          onChange={(e:any) => {
            setFailedLogin(false);
            setPassword(e.target.value);
          }}
        />
        <FormFeedback>Login failed.</FormFeedback>
      </FormGroup>

      <Button style={{fontSize: "1.3em", float: "right"}} variant="outlined" color="primary" onClick={handleSubmit}>
        Sign In
      </Button>
      <p style={{fontStyle: "italic", fontSize: "1.2em"}}>
        Not signed up? Register <Link to="/register" style={{fontSize: "1.15em"}}>here</Link>
      </p>
    </div>
  );
}
