import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "../auth/AuthorizedRoute";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { HomePage } from "../components/Home/HomePage";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }:any) {
  return (
    <Routes>
      <Route path="/">

        <Route index element={<HomePage />}/>

        <Route path="route1">

        </Route>

        
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
