import AboutMePage from "pages/AboutMePage";
import HomePage from "pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <nav>
        <a href="/">Home</a>
        {/* <a href="/about-me">About me</a> */}
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-me" element={<AboutMePage />} />
        <Route
          path="*"
          element={
            <h1
              style={{
                margin: "auto",
                fontSize: "10vh",
                position: "relative",
                top: "50vh",
              }}
            >
              Path does not exist :/
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
