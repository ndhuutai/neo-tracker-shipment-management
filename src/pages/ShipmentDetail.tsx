import React from "react";
import {
    Button,
    Paper,
    Container,
    Typography,
    Divider,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    createStyles,
    Theme
} from "@material-ui/core";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {push} from "connected-react-router";

import {RootState} from "../store/configureStore";

interface ParamsType {
    id: string
}

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        container: {
            margin: "auto",
        },
        paper: {
            padding: theme.spacing(6),
            "& > *": {
                marginTop: theme.spacing(1)
            }
        }
    });
});


const ShipmentDetail = () => {
    const classes = useStyles();
    const {id} = useParams<ParamsType>();
    const selectedShipment = useSelector((state: RootState) => state.shipments.find(shipment => shipment.id === id))
    const dispatch = useDispatch();

    // EVENT HANDLERS
    const onBtnClick = () => {
        if (selectedShipment) {
            dispatch(push(`/edit/${selectedShipment.id}`))
        }
    }

    return <Container maxWidth="sm" className={classes.container}>
        <Paper className={classes.paper}>
            <Typography variant="h6">
                {selectedShipment?.name}
            </Typography>
            <Typography variant="subtitle1">
                {selectedShipment?.id}
            </Typography>
            <Divider/>
            <Typography variant="body1">
                Mode: {selectedShipment?.mode}
            </Typography>
            <Typography variant="body1">
                Type: {selectedShipment?.type}
            </Typography>
            <Typography variant="body1">
                Destination: {selectedShipment?.destination}
            </Typography>
            <Typography variant="body1">
                Origin: {selectedShipment?.origin}
            </Typography>
            <Typography variant="body1" color="primary">
                Status: {selectedShipment?.status}
            </Typography>
            <Divider/>
            <Typography variant="body1">
                Cargos
            </Typography>
            <List>
                {selectedShipment?.cargo.map((cargo, index) => {
                    return <ListItem key={cargo.description} divider={index !== selectedShipment.cargo.length - 1}>
                        <ListItemText
                            primary={cargo.description}
                            secondary={`${cargo.type} | Volume: ${cargo.volume}`}
                        />
                    </ListItem>
                })}
            </List>
            <Button variant="contained" color="primary" onClick={onBtnClick}>
                Edit
            </Button>
        </Paper>
    </Container>
}

export default ShipmentDetail;