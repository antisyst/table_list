import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TablePage from "./pages/TablePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/table" element={<TablePage/>}/>
      </Routes>
    </Router>
  )
}

export default App;
