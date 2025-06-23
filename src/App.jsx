import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Ethernet from './pages/Ethernet';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ethernet" element={<Ethernet />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;