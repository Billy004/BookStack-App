
import { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LibraryModel from './model/LibraryModel'
import UserModel from './model/UserModel'

import './css/main.css'


// Views
import Home from "./views/Home";
import Library from "./views/Library";
import About from "./views/About";
import MustLogin from "./views/MustLogin";

import Header from "./components/Header";
import FlashMsg from "./components/FlashMsg";
import Footer from "./components/Footer";
import MoreBookInfo from "./views/MoreBookInfo";
import SignUp from "./views/SignUp";


function App() {
 
  // Determine User Logged in or Default to log out
  // obj { email, id } or false
  const [user, setUser] = useState(false)
  
  // Determines flash message
  // obj { message : 'Message to user', type : 'success or fail' } 
  const [flash, setFlash] = useState(false); // False or Obj

  const LIBRARYMODEL = useMemo( () => new LibraryModel(), [] ) 
  const USERMODEL = useMemo( () => new UserModel(), [] ) 


  return (
    <Router>

    <div className="App container">

      <Header user={ user } setUser={ setUser } />


      {
        flash && <FlashMsg flash={flash} setFlash={setFlash} />
      }

      <Routes>

        <Route path="/" element={
          <Home 
            user={ user } 
            setUser={ setUser } 
            setFlash={ setFlash } 
          />
        } />

        <Route path="/library" element={
          user !== false 
          ? <Library 
              LIBRARYMODEL={ LIBRARYMODEL }
              USERMODEL={ USERMODEL }
              setFlash={ setFlash } 
              user={ user } />
          : <MustLogin />
        } 
        />

        <Route 
          path="/library/:isbn" 
          element={
            <MoreBookInfo 
              LIBRARYMODEL={ LIBRARYMODEL }
              user={ user }
              setFlash={ setFlash }
            />
          } 
        />

        <Route 
          path="/about" 
          element={<About />} 
        />

        <Route 
          path="/sign-up" 
          element={<SignUp setFlash={ setFlash } />} 
        />

      </Routes>

      <Footer />

    </div>
    </Router>
  );
}

export default App;
