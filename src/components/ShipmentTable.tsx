import React, {useEffect, useState, MouseEvent} from "react";
import {useSelector, useDispatch} from "react-redux";
import {makeStyles, createStyles, Theme} from "@material-ui/core";
import {Paper, Table, TableContainer, TableHead, TableBody, TableCell, TablePagination,TableRow} from "@material-ui/core";

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
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const classes = useStyles();

    useEffect(() => {
        fetch("http://localhost:3001/shipments")
            .then(response => response.json())
            .then((data : Shipment[]) => {
                console.log(data);
                dispatch(setShipments(data))
            })
    },[])

    // onChangePage fires MouseEvent that is not React.MouseEvent
    const handleChangePage = ( _event: unknown, page: number) => {
        setPage(page);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }


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
                            state.shipments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(shipment => {
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
            <TablePagination
                rowsPerPageOptions={[10, 20, 30]}
                component="div"
                count={state.shipments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default ShipmentTable;