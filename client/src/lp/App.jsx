import Navbar from "../src/components/Navbar.jsx";
import Home from "../src/components/Home.jsx";
import Features from "../src/components/Features.jsx";
import Usp from "../src/components/Usp.jsx";
import Aboutus from "../src/components/Aboutus.jsx";
import Footer from "../src/components/Footer.jsx";

function App() {

  return (
    <>
    {/* Navbar Component */}
    <Navbar />

    {/* Main Content Area */}
    <div className="bg-gray-50 mt-16">
      {/* Wrapping Routes for each page */}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/usp" element={<Usp />} />
        <Route path="/Aboutus" element={<Aboutus />} />
        <Route path="/Footer" element={<Footer />} />
      </Routes>
    </div>
    </>
  )
}

export default App
