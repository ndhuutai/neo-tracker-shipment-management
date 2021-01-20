import React, {useEffect, useState} from "react";
import { Switch, Route } from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";


import Layout from "./components/Layout";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import ShipmentTable from "./components/ShipmentTable";
import ShipmentEdit from "./components/ShipmentEdit";
import {browserHistory, RootState} from "./store/configureStore";
import {Shipment} from "./reducers/shipment";
import {setShipments} from "./reducers/shipments";

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    container: {
      paddingTop: theme.spacing(8)
    }
  })
})

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {shipments} = useSelector((state: RootState) => state);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/shipments")
        .then(response => response.json())
        .then((data: Shipment[]) => {
          dispatch(setShipments(data))
        })
  }, [])

  return <Layout>
    <TopBar setNavOpen={() => setOpen(true)}/>
    <NavBar isOpen={open} setOpen={setOpen}/>
    <div className={classes.container}>
      <ConnectedRouter history={browserHistory}>
        <Switch>
          <Route exact path={"/edit"} component={ShipmentEdit}>
          </Route>
          <Route path={"/"}>
            <ShipmentTable shipments={shipments}/>
          </Route>
        </Switch>
      </ConnectedRouter>
    </div>
  </Layout>;
}

export default App;
