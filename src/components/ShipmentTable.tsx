import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {
    makeStyles,
    createStyles,
    Chip,
    Fade,
    Slide,
    Theme,
    TextField,
    InputAdornment,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TableSortLabel,
    ChipProps,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

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

type Order = "asc" | "desc" | undefined

interface Column {
    id: keyof Shipment,
    label: keyof Shipment,
    minWidth?: number,
    align?: "right",
    order?: Order
    active: boolean
}

const useFadedIconChipStlyes = makeStyles(() => {
    return createStyles({
        root: {
            overflow: 'hidden'
        }
    })
})

interface FadedIconChipProps extends ChipProps {
    onClick: () => void
}

const FadedIconChip = (props: FadedIconChipProps) => {
    const classes = useFadedIconChipStlyes();
    const [clicked, setClicked] = useState(false);

    return (
            <Chip
                {...props}
                className={classes.root}
                icon={<Slide direction={"right"} in={clicked} mountOnEnter unmountOnExit><CheckIcon/></Slide>}
                onClick={() => {
                    setClicked(!clicked);
                    if(props.onClick) {
                        props.onClick()
                    }
                }}
            />
        )
}

const tableColumns: Column[] = [
    {
        id: "id",
        label: "id",
        minWidth: 50,
        active: false,
    },
    {
        id: "origin",
        label: "origin",
        minWidth: 50,
        active: false,
    },
    {
        id: "mode",
        label: "mode",
        minWidth: 50,
        active: false
    },
    {
        id: "destination",
        label: "destination",
        minWidth: 50,
        active: false
    },
    {
        id: "status",
        label: "status",
        minWidth: 50,
        active: false
    },
    {
        id: "type",
        label: "type",
        minWidth: 50,
        active: false
    },
    {
        id: "total",
        label: "total",
        minWidth: 50,
        align: "right",
        active: false
    }
]

const comparator = (prop: keyof Shipment, columnOrder: Order) => (a: Shipment, b: Shipment) => {
    const order = columnOrder === "desc" ? -1 : 1;
    if (a[prop] < b[prop]) {
        return -1 * order;
    }
    if (a[prop] > b[prop]) {
        return 1 * order;
    }
    return 0;
}

interface Filters {
    [key: string]: boolean,
}

const initialFilters: Filters = {
    "sea": false,
    "air": false,
    "LCL": false,
    "FCL": false,
    "NEW": false,
    "COMPLETED": false,
    "ACTIVE": false,
}

// for every shipment
// if shipment[

const ShipmentTable = () => {
    const state = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [columns, setColumns] = useState(tableColumns);
    const [rows, setRows] = useState<Shipment[]>([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(initialFilters);
    const classes = useStyles();

    useEffect(() => {
        fetch("http://localhost:3001/shipments")
            .then(response => response.json())
            .then((data: Shipment[]) => {
                dispatch(setShipments(data))
                setRows(data);
            })
    }, [])

    // onChangePage fires MouseEvent that is not React.MouseEvent
    const handleChangePage = (_event: unknown, page: number) => {
        setPage(page);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const onSortClick = (index: number) => () => {
        setColumns(
            columns.map((column, i) => {
                return {
                    ...column,
                    active: index === i,
                    order: (index === i && (column.order === "desc" ? "asc" : "desc")) || undefined
                    // if current column is active(clicked) then toggle to either asc or desc, else set to undefined
                }
            })
        )

        setRows(
            rows.slice()
                .sort(
                    comparator(
                        columns[index].label,
                        columns[index].order
                    )
                )
        )
    }

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.trim());
    }

    console.log(filters, 'filters');

    return (
        <Paper className={classes.root}>
            <TextField
                value={search}
                onChange={onSearchChange}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position={"start"}>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
            />
            <div>
                {Object.keys(filters).map(filterKey => {
                    return (
                        <FadedIconChip key={filterKey} label={filterKey} onClick={() => {
                            setFilters({
                                ...filters,
                                [filterKey] : !filters[filterKey]
                            })
                        }}/>
                    )
                })}
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => {
                                return (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        <TableSortLabel
                                            active={column.active}
                                            direction={column.order}
                                            onClick={onSortClick(index)}
                                        >
                                            {column.label}
                                        </TableSortLabel>
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows
                                .filter(shipment => shipment.id.includes(search))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(shipment => {
                                    return (
                                        <TableRow hover key={shipment.id}>
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
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default ShipmentTable;