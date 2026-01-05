import './css/App.css'
import {Box, Button, FormLabel, OutlinedInput, TextField} from '@mui/material';
import {useState} from "react";


export default function Layer({ layerName, balance }) {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    function hasLimit(layerName) {
        return layerName === "Excess" || layerName === "SIR";
    }

    const fieldId = layerName.toString().length;

    return (
        <Box sx={{display: 'flex', alignItems: 'center', mb: 2, mr: 20, gap:5}} className="layer-box">
            <FormLabel sx={{minWidth: 120, color: 'text.primary', textAlign: 'right'}}>
                {layerName}
            </FormLabel>
            <TextField
                id={layerName}
                label={hasLimit(layerName) ? "Enter limit" : "Limit not applicable"}
                value={inputValue}
                onChange={handleChange}
                disabled={!hasLimit(layerName)}
                color={"secondary"}
            />
            <TextField disabled
            value={balance ?? 0}
            label="Balance"
            id={fieldId.toString()}

            />
        </Box>

    )
}


