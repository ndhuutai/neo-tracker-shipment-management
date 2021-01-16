import React, {PropsWithChildren} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

export default ({children} : PropsWithChildren<{}>) => {
    return (
        <>
            <CssBaseline/>
            {children}
        </>
    )
}