import React, {useEffect, useState} from "react";
import {push} from "connected-react-router";

import {useSelector, useDispatch} from "react-redux";
import {
    makeStyles,
    createStyles,
    Button,
    Chip,
    ChipProps,
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
    useMediaQuery,
    useTheme
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import CheckIcon from "@material-ui/icons/Check";

import {Shipment} from "../reducers/shipment";
import {RootState} from "../store/configureStore";

import {setShipments} from "../reducers/shipments";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            width: "100%"
        },
        container: {
            maxHeight: 678
        },
        showActionBtn: {
            display: 'flex',
            justifyContent: 'flex-end'
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
    active: boolean,
    hiddenAtSm?: boolean
}

const useFadedIconChipStlyes = makeStyles(() => {
    return createStyles({
        root: {
            overflow: 'hidden'
        }
    })
})

interface FadedIconChipProps extends ChipProps {
    onClick: () => void,
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
                props.onClick()
            }}
        />
    )
}

// configurations
const tableColumns: Column[] = [
    {
        id: "id",
        label: "id",
        minWidth: 20,
        active: false,
        hiddenAtSm: false,
    },
    {
        id: "origin",
        label: "origin",
        minWidth: 50,
        active: false,
        hiddenAtSm: true
    },
    {
        id: "mode",
        label: "mode",
        minWidth: 10,
        active: false,
        hiddenAtSm: true
    },
    {
        id: "destination",
        label: "destination",
        minWidth: 50,
        active: false,
        hiddenAtSm: true
    },
    {
        id: "status",
        label: "status",
        minWidth: 10,
        active: false,
        hiddenAtSm: false,
    },
    {
        id: "type",
        label: "type",
        minWidth: 10,
        active: false,
        hiddenAtSm: true
    },
    {
        id: "total",
        label: "total",
        minWidth: 20,
        align: "right",
        active: false,
        hiddenAtSm: false
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

interface ShipmentTableProps {
    shipments: Shipment[]
}

const ShipmentTable = (props: ShipmentTableProps) => {
    const {shipments} = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [columns, setColumns] = useState(tableColumns);
    const [rows, setRows] = useState<Shipment[]>([]);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState(initialFilters);
    const [filterCount, setFilterCount] = useState(0);
    const [isActionsHidden, setIsActionsHidden] = useState(true);
    const classes = useStyles();
    const theme = useTheme();
    const smBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));


    // useEffect(() => {
    //     fetch("http://localhost:3001/shipments")
    //         .then(response => response.json())
    //         .then((data: Shipment[]) => {
    //             dispatch(setShipments(data))
    //             setRows(data);
    //         })
    // }, [])

    useEffect(() => {
        setRows(shipments)
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

    const onFilterClick = (index: number) => () => {
        const newFilters: Filters = {
            ...filters
        };

        Object.keys(filters).reduce((acc, curVal, curIndex) => {
            if (index === curIndex) {
                if (filters[curVal]) {
                    setFilterCount((prevCount: number) => prevCount - 1);
                    acc[curVal] = false;
                } else {
                    setFilterCount((prevCount: number) => prevCount + 1);
                    acc[curVal] = true
                }
            }
            return acc;
        }, newFilters)

        setFilters(newFilters);
    }

    const handleEditClick = (id: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(push(`/edit?id=${id}`))
    }

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
                {Object.keys(filters).map((filterKey, index) => {
                    return (
                        <FadedIconChip
                            key={filterKey}
                            label={filterKey}
                            onClick={onFilterClick(index)}
                        />
                    )
                })}
            </div>
            <div className={classes.showActionBtn}>
                <Button onClick={() => setIsActionsHidden(!isActionsHidden)}>
                    Show Actions
                </Button>
            </div>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => {
                                // if hiddenAtSm is true
                                //   if smBreakpoint is true
                                let cell = <TableCell
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
                                </TableCell>;
                                if (column.hiddenAtSm) {
                                    if (!smBreakpoint) {
                                        cell = <></>;
                                    }
                                }
                                return cell;
                            })}
                            {!isActionsHidden &&
                            <TableCell
                                align={"right"}
                                style={{minWidth: 50}}
                            >
                                Actions
                            </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows
                                .filter(shipment => shipment.id.includes(search) && (!filterCount || (filters[shipment.mode] || filters[shipment.status] || filters[shipment.type])))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(shipment => {
                                    return (
                                        <TableRow hover key={shipment.id}>
                                            {
                                                columns.map(column => {
                                                    let cell =
                                                        <TableCell key={column.id} align={column.align}>
                                                            {shipment[column.id]}
                                                        </TableCell>
                                                    ;
                                                    if (column.hiddenAtSm) {
                                                        if (!smBreakpoint) {
                                                            cell = <></>;
                                                        }
                                                    }
                                                    return cell;
                                                })
                                            }
                                            {!isActionsHidden &&
                                            <TableCell
                                                align={"right"}
                                                style={{minWidth: 50}}
                                            >
                                                <Button onClick={handleEditClick(shipment.id)}>
                                                    Edit
                                                </Button>
                                            </TableCell>
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