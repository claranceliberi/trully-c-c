import { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/home';
import Nav from './components/nav';
import ArticlePage from './pages/article';

function App() {
  const links = [
    { text: 'Home', url: '/' },
    { text: 'About', url: '/about' },
    { text: 'Users', url: '/users' },
  ]

  return (
    <div className="App">
      <Router>
          <div>
            <Nav title="Truly" links={links} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/article/:id" element={<ArticlePage />} />
            </Routes>
          </div>
        </Router>
    </div>
  )
}

export default App
