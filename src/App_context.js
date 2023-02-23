import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import DetailPage from "./pages/DetailPage";
import HomePage from "./pages/HomePage";
import HospitalPage from "./pages/Hospital/HospitalPage";
import ProductPage from "./pages/ProductPage";
import { QueryClient, QueryClientProvider } from "react-query";
import IndexPage from "./pages/category/IndexPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import PrivateRoute from "./guard/auth";
import UserStoreProvider from "./context/UserContext";

const queryClient = new QueryClient();

function App() {
  return (
    <UserStoreProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/product">
              <ProductPage />
            </Route>
            <Route path="/detail/:id/title/:title">
              <DetailPage />
            </Route>
            <Route path="/hospital">
              <HospitalPage />
            </Route>
            <Route path="/upload">
              <UploadPage />
            </Route>

            <PrivateRoute path="/member">
              <MemberPage />
            </PrivateRoute>
            <Route path="/register">
              <RegisterPage />
            </Route>

            <Route path="/login">
              <LoginPage />
            </Route>

            <Route
              path="/category"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} exact>
                    <IndexPage />
                  </Route>
                  <Route path={`${url}/create`}>
                    <CreatePage />
                  </Route>
                  <Route path={`${url}/edit/:id`}>
                    <EditPage />
                  </Route>
                </>
              )}
            ></Route>
          </Switch>
          <Footer />
        </Router>
      </QueryClientProvider>
    </UserStoreProvider>
  );
}

export default App;
