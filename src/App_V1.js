import Footer from "./components/Footer";
import Header from "./components/Header";
import Logo from "./components/Logo";
import Sidebar from "./components/Sidebar";
import "./App.css";
import Menu from "./components/Menu";
function App() {
  return (
    <div className="logo">
      <Logo />
      <Header />
      <Footer
        title="google"
        website="www.google.com"
        postcode={10800}
        isOpen // same result as isOpen={true}
      />
      <Sidebar />
      <br />
      <Menu />
    </div>
  );
}

export default App;
