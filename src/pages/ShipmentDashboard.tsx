import React, {useEffect, useState} from "react";
import {push} from "connected-react-router";

import {useDispatch, useSelector} from "react-redux";
import {
    makeStyles,
    createStyles,
    Button,
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
    useTheme, Typography
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import {RootState} from "../store/configureStore";
import SlidingIconChip from "../components/SlidingIconChip";
import {Column, Filters} from "../types/table";
import { comparator } from "../utils/table";
import {Shipment} from "../types/shipment";


const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            width: "100%"
        },
        container: {
            maxHeight: 678
        },
        chipsContainer: {
            padding: theme.spacing(2, 1),
            "& > :not(:first-child)": {
                marginLeft: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }
        },
        showActionBtn: {
            display: "flex",
            justifyContent: "flex-end"
        },
        searchField: {
            padding: theme.spacing(2)
        }
    })
})

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
        id: "name",
        label: "name",
        minWidth: 30,
        active: false,
        hiddenAtSm: false,
    },
    {
        id: "origin",
        label: "origin",
        minWidth: 20,
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
        hiddenAtSm: true,
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



const initialFilters: Filters = {
    "sea": false,
    "air": false,
    "LCL": false,
    "FCL": false,
    "NEW": false,
    "COMPLETED": false,
    "ACTIVE": false,
}


const ShipmentDashboard = () => {
    const classes = useStyles();
    const theme = useTheme();
    const smBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));

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

    useEffect(() => {
        setRows(shipments)
    }, [shipments])


    // onChangePage fires MouseEvent that is not React.MouseEvent
    const handleChangePage = (_event: unknown, page: number) => {
        setPage(page);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const handleSortClick = (index: number) => () => {
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value.trim());
    }

    const handleFilterClick = (index: number) => () => {
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
        e.stopPropagation();
        dispatch(push(`/edit/${id}`))
    }

    const handleRowClick = (id: string) => () => {
        dispatch(push(`/details/${id}`))
    }

    const filteredRows = rows
        .filter(shipment => shipment.id.includes(search.toUpperCase()) && (!filterCount || (filters[shipment.mode] || filters[shipment.status] || filters[shipment.type])))

    return (
        <Paper className={classes.root}>
            <TextField
                value={search}
                onChange={handleSearchChange}
                className={classes.searchField}
                placeholder={"enter id to search"}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position={"start"}>
                            <SearchIcon/>
                        </InputAdornment>
                    )
                }}
            />
            <div className={classes.chipsContainer}>
                <Typography variant={"body1"}>
                    Filters:
                </Typography>
                {Object.keys(filters).map((filterKey, index) => {
                    return (
                        <SlidingIconChip
                            key={filterKey}
                            label={filterKey}
                            onClick={handleFilterClick(index)}
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
                                let cell = <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    <TableSortLabel
                                        active={column.active}
                                        direction={column.order}
                                        onClick={handleSortClick(index)}
                                    >
                                        {column.label.charAt(0).toUpperCase() + column.label.substring(1)}
                                    </TableSortLabel>
                                </TableCell>;
                                if (column.hiddenAtSm) {
                                    if (!smBreakpoint) {
                                        return null;
                                    }
                                }
                                return cell;
                            })}
                            {!isActionsHidden &&
                            <TableCell
                                align={"right"}
                            >
                                Actions
                            </TableCell>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(shipment => {
                                    return (
                                        <TableRow hover key={shipment.id} onClick={handleRowClick(shipment.id)}>
                                            {
                                                columns.map(column => {
                                                    let cell =
                                                        <TableCell key={column.id} align={column.align}>
                                                            {shipment[column.id]}
                                                        </TableCell>
                                                    ;
                                                    if (column.hiddenAtSm) {
                                                        if (!smBreakpoint) {
                                                            return null;
                                                        }
                                                    }
                                                    return cell;
                                                })
                                            }
                                            {!isActionsHidden &&
                                            <TableCell
                                                align={"right"}
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
                count={filteredRows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default ShipmentDashboard;