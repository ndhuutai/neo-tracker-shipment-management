import {Chip, ChipProps, createStyles, makeStyles, Slide} from "@material-ui/core";
import React, {useState} from "react";
import CheckIcon from "@material-ui/icons/Check";

interface SlidingIconChipProps extends ChipProps {
    onClick: () => void,
}

const useSlidingIconChipStyles = makeStyles(() => {
    return createStyles({
        root: {
            overflow: 'hidden'
        }
    })
})

const SlidingIconChip = (props: SlidingIconChipProps) => {
    const classes = useSlidingIconChipStyles();
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

export default SlidingIconChip;