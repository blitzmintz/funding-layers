import './css/App.css'
import {Box, FormLabel, TextField} from '@mui/material';
import {useState} from "react";


export default function Aggregate({ layerName, balance }) {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };
    const fieldId = layerName.toString().length;

    return (
        <Box sx={{mb: 2}} className="layer-box">
            <FormLabel sx={{minWidth: 120, color: 'text.primary', textAlign: 'right'}}>
                {layerName}
            </FormLabel>
            <TextField
                id={layerName}
                label="Aggregate Stop Loss"
                value={inputValue}
                onChange={handleChange}
                color={"secondary"}
                type="number"
            />
            <TextField disabled
                       value={balance ?? 0}
                       label="Aggregate Balance"
                       id={fieldId.toString()}

            />
        </Box>

    )
}
