import './css/App.css'
import {Box, Checkbox, FormControlLabel, FormLabel, TextField} from '@mui/material';

export default function Layer({ layerKey,
                                  label,
                                  balance,
                                  limit,
                                  isRanking,
                                  onLimitChange,
                                  onRankingChange }) {

    function hasLimit(layerName) {
        return layerName === "Excess" || layerName === "SIR" || layerName === "Aggregate";
    }

    return (
        <Box sx={{mb: 2}} className="layer-box">
                <FormLabel sx={{ color: 'text.primary'}} className="mobile-layer-name">
                    {label}
                </FormLabel>
            <TextField
                id={layerKey}
                type="number"
                label={hasLimit(label) ? "Enter limit" : "Limit not applicable"}
                value={limit ?? ''}
                onChange={e => onLimitChange(Number(e.target.value) || null)}
                disabled={(!hasLimit(label))}
                color={"secondary"}
            />
            <TextField disabled
                       value={balance ?? 0}
                       label="Balance"
            />
            {hasLimit(label) && label !== "Aggregate" && (
                <FormControlLabel labelPlacement={"end"}
                control={<Checkbox
                        onChange={e => onRankingChange(e.target.checked)}
                        checked={isRanking}></Checkbox>}
                label={"Ranking"}>
                </FormControlLabel>
                )
            }

        </Box>

    )
}


