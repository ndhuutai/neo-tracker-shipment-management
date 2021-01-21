import React from "react";

import {AppBar, Typography, Toolbar, Hidden, IconButton  , makeStyles, createStyles, Theme} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import {useDispatch} from "react-redux";
import {push} from "connected-react-router";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        title: {
            flexGrow: 1,
            cursor: "pointer"
        },
    }),
);

interface TopBarProps {
    setNavOpen: () => void
}

const TopBar = ({setNavOpen} : TopBarProps) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" className={classes.title} onClick={() => dispatch(push("/"))}>
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