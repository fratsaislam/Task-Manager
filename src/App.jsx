import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Done from "./pages/Done";

function App() {

  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<Tasks />} />
        <Route path="/Done" element={<Done />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
