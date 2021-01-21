import React, {useEffect, useState} from "react";
import {
    FormControl,
    Input,
    InputLabel,
    Button,
    createStyles,
    makeStyles,
    Theme,
    Typography,
    Container,
    Paper
} from "@material-ui/core";
import {useParams} from "react-router";

import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/configureStore";
import {push} from "connected-react-router";

import {Shipment} from "../types/shipment";
import {startUpdateShipment} from "../actions/shipment";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            margin: "auto",
        },
        paper: {
            padding: theme.spacing(2)
        },
        form: {
            display: 'flex',
        },
        button: {
            alignSelf: "flex-end",
            marginLeft: theme.spacing(2)
        }
    });
})

interface ParamsType {
    id: string
}

const ShipmentEdit = () => {
    const classes = useStyles()
    const params = useParams<ParamsType>();
    const dispatch = useDispatch();
    const selectedShipment = useSelector((state: RootState) => state.shipments.find(shipment => shipment.id === params.id))
    const [name, setName] = useState('');
    const [shipment, setShipment] = useState<Shipment | undefined>(undefined);

    useEffect(() => {
        if (selectedShipment) {
            setShipment(selectedShipment);
        }
    }, [selectedShipment])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (shipment) {
            // dispatch(updateShipment({id: shipment.id, name: name}))
            dispatch(startUpdateShipment({id: shipment.id, name: name}));
            dispatch(push(`/details/${shipment.id}`))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        <Container className={classes.container}>
            <Paper className={classes.paper}>
                <Typography variant={"h5"}>Edit Shipment</Typography>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <FormControl>
                        <InputLabel htmlFor="name-input">Shipment name</InputLabel>
                        <Input id="name-input" aria-describedby="name-input" onChange={handleChange} multiline
                               defaultValue={shipment?.name}/>
                    </FormControl>
                    <Button type={"submit"} className={classes.button} color={"primary"}
                            variant={"contained"}>Save</Button>
                </form>
            </Paper>
        </Container>
    )
}

export default ShipmentEdit