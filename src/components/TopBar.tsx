import React from "react";

import {AppBar,Button, Typography, Toolbar, Hidden, IconButton  , makeStyles, createStyles, Theme} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
        },
    }),
);

interface TopBarProps {
    setNavOpen: () => void
}

const TopBar = ({setNavOpen} : TopBarProps) => {
    const classes = useStyles();

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Neo Tracker SM
                </Typography>
                <Hidden mdUp>
                    <IconButton onClick={setNavOpen}>
                        <MenuIcon/>
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    )
}

export default TopBar;