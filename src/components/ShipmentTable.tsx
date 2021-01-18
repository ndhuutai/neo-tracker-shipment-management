import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import {Paper, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from "@material-ui/core";

import {RootState} from "../store/configureStore";
import {Shipment} from "../reducers/shipment";
import {setShipments} from "../reducers/shipments";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            paddingTop: theme.spacing(8),
            width: "100%"
        },
        container: {
            maxHeight: 440
        }
    })
})

interface Column {
    id: keyof Shipment,
    label: string,
    minWidth?: number,
    align?: "right",
}

const columns: Column[] = [
    {
        id: "id",
        label: "ID",
        minWidth: 50
    },
    {
        id: "origin",
        label: "Origin",
        minWidth: 50
    },
    {
        id: "mode",
        label: "Mode",
        minWidth: 50
    },
    {
        id: "destination",
        label: "Destination",
        minWidth: 50
    },
    {
        id: "status",
        label: "Status",
        minWidth: 50
    },
    {
        id: "type",
        label: "Type",
        minWidth: 50
    },
    {
        id: "total",
        label: "Total",
        minWidth: 50,
        align: "right"
    }
]

const ShipmentTable = () => {
    const classes = useStyles();
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://localhost:3001/shipments")
            .then(response => response.json())
            .then((data : Shipment[]) => {
                console.log(data);
                dispatch(setShipments(data))
            })
    },[])

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns. map(column => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            state.shipments.map(shipment => {
                                return (
                                    <TableRow hover>
                                        {
                                            columns.map(column => {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {shipment[column.id]}
                                                    </TableCell>
                                                )
                                            })
                                        }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default ShipmentTable;