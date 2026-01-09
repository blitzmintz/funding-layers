import {useState} from "react";
import {Box, Button, FormLabel, OutlinedInput} from "@mui/material";

export default function AddAmount({type, onAddAmount}) {
    const [amount, setAmount] = useState("");

    const handleAddAmount = () => {
        const cleanAmount = parseFloat(amount);
        if (!isNaN(cleanAmount) && cleanAmount > 0) {
            onAddAmount(cleanAmount);
        }
    };

    return (
        <Box sx={{display: 'flex', alignItems: 'center'}}>
            <Box className="add-buttons">
                <FormLabel>
                    {`Add ${type}`}
                </FormLabel>
                <OutlinedInput
                    id={type}
                    placeholder="0.00"
                    size="small"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    color={"secondary"}
                />
                <Button variant="contained"
                id="Payment"
                onClick={() => {handleAddAmount()}}
                >Add
                </Button>
        </Box>
        </Box>
    )
}