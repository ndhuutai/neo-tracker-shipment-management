import React from "react";
import {
    SwipeableDrawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    createStyles,
    Theme
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
          backgroundColor: theme.palette.background.paper
        },
        list: {
            padding: "0"
        }
    })
})

interface NavBarProps {
    isOpen: boolean
    setOpen: (open: boolean) => void
}

const NavBar = ({isOpen, setOpen} : NavBarProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <SwipeableDrawer
                anchor={"left"}
                open={isOpen}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
            >
                <List className={classes.list}>
                    <ListItem button onClick={() => setOpen(false)}>
                        <ListItemIcon>
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Dashboard
                        </ListItemText>
                    </ListItem>
                    <ListItem button onClick={() => setOpen(false)}>
                        <ListItemIcon>
                            <SearchIcon/>
                        </ListItemIcon>
                        <ListItemText>
                            Search by ID
                        </ListItemText>
                    </ListItem>
                </List>
            </SwipeableDrawer>
        </div>
    )
}

export default NavBar;