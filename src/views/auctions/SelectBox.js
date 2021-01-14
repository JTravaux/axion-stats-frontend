
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { InputBase, Select, MenuItem, Typography } from '@material-ui/core';

const StyledSelect = withStyles((theme) => ({
    input: {
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        '&:focus': { borderRadius: 4, borderColor: '#FFFFFF', borderWidth: "1.5px" }
    }
}))(InputBase);

const SelectBox =  ({ data, onChange, style, variant, value, fullWidth, textVariant, disabled }) => {
    const [open, setOpen] = useState(false);

    return (
        <Select
            open={open}
            value={value}
            margin="dense"
            variant={variant}
            style={{...style}}
            onChange={onChange}
            disabled={disabled}
            fullWidth={fullWidth}
            input={<StyledSelect />}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
        >
            {data.map(d => (
                <MenuItem key={"select_option_" + d.value} value={d.value} disabled={d.disabled} className={value === d.value ? "select_item_selected" : "select_item"}>
                    <Typography variant={textVariant ? textVariant : "subtitle2"} style={{color: "#FFF"}}>{d.title}</Typography>
                </MenuItem>
            ))}
        </Select>
    )
}

export default SelectBox;