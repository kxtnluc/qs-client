import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { tryGetLoggedInUser } from "./managers/authManager";
import { Spinner } from "reactstrap";
import ApplicationViews from "./views/ApplicationViews";
import NavBar from "./components/nav/NavBar";

function App() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    // user will be null if not authenticated
    tryGetLoggedInUser().then((user) => {
      setLoggedInUser(user);
    });
  }, []);

  // wait to get a definite logged-in state before rendering
  if (loggedInUser === undefined) {
    return <Spinner />;
  }

  function isMobile() {
    const userAgent = navigator.userAgent;
    
    // Check for mobile devices
    if (/android/i.test(userAgent)) {
      return true;
    }
    
    if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return true;
    }
    
    if (/windows phone/i.test(userAgent)) {
      return true;
    }
    
    // If none of the above conditions match, it's likely a desktop device
    return false;
  }
  
  if (isMobile()) {
    console.log("This is a mobile device.");
  } else {
    console.log("This is a desktop device.");
  }
  

  return (
    <>
      <NavBar isMobile={isMobile()} loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
      <ApplicationViews
        isMobile={isMobile()}
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
      />
    </>
  );
}

export default App;
