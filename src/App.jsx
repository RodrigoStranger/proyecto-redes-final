import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import Footer from './layouts/Footer';
import Ethernet from './pages/Ethernet';
import NotFound from './pages/NotFound';
import Ip from './pages/Ip';
import Tcp from './pages/Tcp';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ethernet" element={<Ethernet />} />
          <Route path="/ip" element={<Ip />} />
          <Route path="/tcp" element={<Tcp />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;