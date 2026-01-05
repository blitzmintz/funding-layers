import {Box, FormLabel, OutlinedInput, Button} from '@mui/material';
import {useState} from "react";
import './calculators/payments.js'
import addToLayer from "./calculators/payments.js";
export default function Transaction(excessBalance, sirBalance, insBalance) {
    const [inputValue, setInputValue] = useState('');
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    return () => (
        <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
            <FormLabel sx={{minWidth: 120, color: 'text.primary'}}>
                {'Update Totals'}
            </FormLabel>
            <OutlinedInput
                id="transaction"
                size="small"
                fullWidth
                placeholder="0.00"
                value={inputValue}
                onChange={handleChange}
            />
            <Button variant="outlined" value='add'
                onClick={() => {
                addToLayer(parseFloat(inputValue));
            }}
                >
            </Button>
        </Box>
    )
}

