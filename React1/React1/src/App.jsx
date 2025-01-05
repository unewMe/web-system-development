import Header from "./components/Header";
import Footer from "./components/Footer";
import Card from "./components/Card";
import Gallery from "./components/Gallery";
import Button from "./components/Button";
import Counter from "./components/Counter";

const App = () => {
  const images = [
    "https://cms.solvro.pl/assets/a04dc2e5-2354-495d-aed4-d7db9a6d313c?key=member",
    "https://cms.solvro.pl/assets/a04dc2e5-2354-495d-aed4-d7db9a6d313c?key=member",
    "https://cms.solvro.pl/assets/a04dc2e5-2354-495d-aed4-d7db9a6d313c?key=member",
  ];

  const handleClick = () => {
    alert("Przycisk został naduszony!");
  };

  return (
    <>
      <Header />
      <main style={{ padding: "20px" }}>
        <h2>Witamy na naszej skibidi stronie!</h2>
        <Counter />
        <Card
          title="KArtEczka"
          description="To jest skibidi karta"
          image="https://via.placeholder.com/300"
        />
        <Gallery images={images} />
        <Button label="Kliknij mnie" onClick={handleClick} />
      </main>
      <Footer />
    </>
  );
};

export default App;
