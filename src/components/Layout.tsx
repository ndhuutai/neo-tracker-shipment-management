import React, {PropsWithChildren} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {createStyles, makeStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            height: '100vh',
            width: '100vw'
        }
    })
})

export default ({children} : PropsWithChildren<{}>) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline/>
            {children}
        </div>
    )
}