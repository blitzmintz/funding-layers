import {useState} from "react";
import HelpIcon from '@mui/icons-material/Help';
import {Dialog, DialogContent, DialogContentText, DialogTitle, Tooltip} from "@mui/material";
import './css/App.css'


export default function HelpPopover() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);


    return (
        <div className="help-box">
            <Tooltip title="Click for help!" placement="bottom" slotProps={{popper: {modifiers: [{name: 'offset', options: {offset: [0, -14],},},],},}}>
                <HelpIcon id="help-icon" onClick={handleClick}></HelpIcon>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle id="dialog-title">
                    {"how to use"}
                </DialogTitle>
                <DialogContent id="dialog-text">
                    <DialogContentText>
                        enter the limits of the excess and/or SIR accounts (or leave blank to default to 0) - payments
                        will be assigned to these accounts up to the limit specified
                        <br/><br/>untick "ranking" on a layer if you dont want the layer to contribute to the aggregate balance
                        <br/><br/>enter an aggregate stop loss amount - once this is met, all payments come from the
                        insurer account which is unlimited
                        <br/><br/>payment amounts will add to the excess (if the limit is more than 0) balance, then SIR (if the limit is more than 0), then insurer
                        <br/><br/> recovery amounts will deduct from the insurer balance, then SIR, then excess
                        <br/><br/>most importantly, have fun
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}