import React, {useState} from "react";
import Layout from "./components/Layout";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import ShipmentTable from "./components/ShipmentTable";

function App() {
  const [open, setOpen] = useState(false);

  return <Layout>
    <TopBar setNavOpen={() => setOpen(true)}/>
    <ShipmentTable/>
    <NavBar isOpen={open} setOpen={setOpen}/>
  </Layout>;
}

export default App;
