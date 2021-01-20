import React, {useEffect, useState} from "react";
import {FormControl, Input, InputLabel, Button, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {useParams} from "react-router";

import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../store/configureStore";
import {push} from "connected-react-router";

import {Shipment, updateShipment} from "../reducers/shipment";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
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
    const {shipments} = useSelector((state: RootState) => state)
    const [name, setName] = useState('');
    const [shipment, setShipment] = useState<Shipment | undefined>(undefined);

    useEffect(() => {
        const selectedShipment = shipments.find(shipment => shipment.id === params.id)
        setShipment(selectedShipment);
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(shipment) {
            dispatch(updateShipment({id: shipment.id, name: name}))
            dispatch(push(`/details/${shipment.id}`))
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        <div>
            <Typography variant={"h5"}>Edit Shipment</Typography>
            <form onSubmit={handleSubmit} className={classes.form}>
                <FormControl>
                    <InputLabel htmlFor="name-input">Shipment name</InputLabel>
                    <Input id="name-input" aria-describedby="name-input" onChange={handleChange} multiline defaultValue={shipment?.name}/>
                </FormControl>
                <Button type={"submit"} className={classes.button} color={"primary"} variant={"contained"}>Save</Button>
            </form>
        </div>
    )
}

export default ShipmentEdit