import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/style.css';
import Navigation from "./components/Navigation";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Navigation />

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
