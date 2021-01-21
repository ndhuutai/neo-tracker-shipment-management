import React, {useEffect, useState} from "react";
import {Switch, Route} from "react-router-dom";
import {ConnectedRouter} from "connected-react-router";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import {useDispatch} from "react-redux";


import Layout from "./components/Layout";
import TopBar from "./components/TopBar";
import NavBar from "./components/NavBar";
import ShipmentDashboard from "./pages/ShipmentDashboard";
import ShipmentEdit from "./pages/ShipmentEdit";
import {browserHistory} from "./store/configureStore";
import ShipmentDetail from "./pages/ShipmentDetail";
import {Shipment} from "./types/shipment";
import {setShipments} from "./actions/shipments";

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
                    <Route path={"/edit/:id"} component={ShipmentEdit}/>
                    <Route path={"/details/:id"} component={ShipmentDetail}/>
                    <Route exact path={"/"} component={ShipmentDashboard}/>
                </Switch>
            </ConnectedRouter>
        </div>
    </Layout>;
}

export default App;
