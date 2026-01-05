import './css/App.css'
import {Box, FormLabel, TextField} from '@mui/material';
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
        <Box sx={{mb: 2}} className="layer-box">
            <FormLabel sx={{ color: 'text.primary'}} className="mobile-layer-name">
                {layerName}
            </FormLabel>
            <TextField
                id={layerName}
                type="number"
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


