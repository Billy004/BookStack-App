

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './css/main.css'


// Views
import Home from "./views/Home";
import Library from "./views/Library";
import Users from "./views/Users";
import About from "./views/About";

import Navbar from "./components/Navbar";
import FlashMsg from "./components/FlashMsg";
import Footer from "./components/Footer";


function App() {
 



  return (
    <Router>

    <div className="App container">

      <Navbar />

      <FlashMsg />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/library" element={<Library />} />

        <Route path="Users" element={<Users />} />

        <Route path="About" element={<About />} />
      </Routes>

      <Footer />

    </div>
    </Router>
  );
}

export default App;
