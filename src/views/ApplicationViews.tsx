import { Route, Routes } from "react-router-dom";
import { HomePage } from "../components/Desktop/Home/HomePage";
import { AdminPortal } from "../components/adminportal/AdminPortal";
import { CreateQG } from "../components/adminportal/create/CreateQG";
import { CreateQuestion } from "../components/adminportal/create/CreateQuestion";
import { MyHome } from "../components/Desktop/myhome/MyHome";
import { MembershipPage } from "../components/Desktop/membership/MembershipPage";
import { MobileHomePage } from "../components/Mobile/Home/MobileHomePage";
import { AccountPage } from "../components/Desktop/account/AccountPage";
import { MobileAccountPage } from "../components/Mobile/account/MobileAccountPage";
import { AuthorizedRoute } from "./AuthorizedRoute";
import MobileLogin from "../components/Mobile/auth/MobileLogin";
import MobileRegister from "../components/Mobile/auth/MobileRegister";
import Login from "../components/Desktop/auth/Login";
import Register from "../components/Desktop/auth/Register";
import { MobileMembershipPage } from "../components/Mobile/membership/MobileMembershipPage";
import { MobileMyHome } from "../components/Mobile/myhome/MobileMyHome";


export default function ApplicationViews({ isMobile, loggedInUser, setLoggedInUser }: any) {

  if(isMobile){ //MOBILE VIEWS
    return (
      <Routes>
        <Route path="/">

          <Route index element={<MobileHomePage loggedInUser={loggedInUser} />} />
  
          <Route path="myhome">
            <Route index element={<MobileMyHome loggedInUser={loggedInUser} />} />
          </Route>
  
          <Route path="home">
            <Route index element={<MobileHomePage loggedInUser={loggedInUser} />} />
          </Route>
  
          <Route path="membership">
            <Route index element={<MobileMembershipPage loggedInUser={loggedInUser} />} />
          </Route>
  
          <Route path="myaccount">
            <Route index element={<MobileAccountPage loggedInUser={loggedInUser} />} />
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
            element={<MobileLogin setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="register"
            element={<MobileRegister setLoggedInUser={setLoggedInUser} />}
          />
  
          <Route path="sitehome" element={<HomePage />} />
  
        </Route>
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Routes>
    );
  }
  else { //DESKTOP VIEWS
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
}
