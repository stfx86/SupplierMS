
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { Form } from "react-router-dom";
import Form from './components/Form'
// import Plat from './components/Plat'
import Index from "./pages/Index";
import { Import } from "lucide-react";
import Marketplace from "./pages/Marketplace";

// import Form2 from './components/Form2'


function App() {

  return (
    <Router>



      <Layout>

        <Routes>
          {/* <Route path="/" element={<Plat/>} /> */}
          <Route path="/" element={<Index/>} />
          <Route path="/marketplace" element={<Marketplace/>} />

          <Route path="/register" element={<Form/>}/>
          <Route />


        </Routes>
      </Layout>
    </Router>


  )

}

export default App;

