
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// import { Form } from "react-router-dom";
import Form from './components/Form'

function App() {

  return (
    <Router>


      <Layout>

        <Routes>
          <Route path="/" element={<h2>jjdjd</h2>} />
          <Route path="/register" element={<Form/>}/>
          <Route />


        </Routes>
      </Layout>
    </Router>


  )

}

export default App;

