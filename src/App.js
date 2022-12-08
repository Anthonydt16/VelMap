import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Recherche from "./pages/Recherche";
import Carte from "./pages/Carte";

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/recherche" element={<Recherche/>}/>
                <Route path="/carte" element={<Carte/>}/>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
