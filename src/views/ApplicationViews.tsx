import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "../auth/AuthorizedRoute";
import Login from "../auth/Login";
import Register from "../auth/Register";
import { HomePage } from "../components/Home/HomePage";
import { MyHome } from "../components/myhome/MyHome";
import { MembershipPage } from "../components/membership/MembershipPage";
import { AccountPage } from "../components/account/AccountPage";
import { AdminPortal } from "../components/adminportal/AdminPortal";
import { CreateQG } from "../components/adminportal/create/CreateQG";
import { CreateQuestion } from "../components/adminportal/create/CreateQuestion";


export default function ApplicationViews({ loggedInUser, setLoggedInUser }: any) {


  return (
    <Routes>
      <Route path="/">

        {loggedInUser === null ?
          <Route index element={<HomePage loggedInUser={loggedInUser} />} />
          :
          <Route index element={<MyHome loggedInUser={loggedInUser} />} />
        }

        <Route path="myhome">
          <Route index element={<MyHome loggedInUser={loggedInUser} />} />
        </Route>

        <Route path="home">
          <Route index element={<HomePage loggedInUser={loggedInUser} />} />
        </Route>

        <Route path="membership">
          <Route index element={<MembershipPage loggedInUser={loggedInUser} />} />
        </Route>

        <Route path="myaccount">
          <Route index element={<AccountPage loggedInUser={loggedInUser} />} />
        </Route>

        <Route path="adminportal">
          <Route index element={

            <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
              <AdminPortal />
            </AuthorizedRoute>

          } />

          <Route path="create">
            <Route path="questiongroup" element={

              <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <CreateQG />
              </AuthorizedRoute>

            } />

            <Route path="question" element={

              <AuthorizedRoute roles={["Admin"]} loggedInUser={loggedInUser}>
                <CreateQuestion />
              </AuthorizedRoute>

            } />
            </Route>
          </Route>



        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />

        <Route path="sitehome" element={<HomePage />} />

      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
