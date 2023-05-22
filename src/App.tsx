import { Route, Routes } from "react-router-dom";
import { GetApiFuncionarios } from "./Pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<GetApiFuncionarios />} path="/" />
    </Routes>
  );
}

export default App;
