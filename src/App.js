
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import './css/main.css'


// Views
import Home from "./views/Home";
import Library from "./views/Library";
import Users from "./views/Users";
import About from "./views/About";

import Header from "./components/Header";
import FlashMsg from "./components/FlashMsg";
import Footer from "./components/Footer";
import MoreBookInfo from "./views/MoreBookInfo";


function App() {
 
  // Determines flash message
  // obj { message : 'Message to user', type : 'success or fail' } 
  const [flash, setFlash] = useState(false); // False or Obj


  return (
    <Router>

    <div className="App container">

      <Header />

      {
        flash && <FlashMsg flash={flash} setFlash={setFlash} />
      }

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/library" element={<Library flash={ flash } setFlash={ setFlash } />} />

        <Route path="/library/:isbn" element={<MoreBookInfo />} />

        <Route path="Users" element={<Users />} />

        <Route path="About" element={<About />} />

      </Routes>

      <Footer />

    </div>
    </Router>
  );
}

export default App;
