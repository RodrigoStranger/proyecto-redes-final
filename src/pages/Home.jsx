import './Home.css';
import CardList from '../components/CardList';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Visualizador de Cabeceras de Protocolos</h1>
      <p className="home-text">Bienvenido al visualizador de cabeceras de protocolos. Aquí puedes ver las cabeceras de los protocolos que se usan en la red.</p>
      <CardList />
    </div>
  );
};

export default Home;