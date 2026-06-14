import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import { Detail } from "./components/Detail";
import { Load } from "./components/Load";

export const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/detail">
          <Route index={true} />
          <Route path=":postId" element={<Detail />}></Route>
        </Route>
      </Routes>
    </>
  );
};
