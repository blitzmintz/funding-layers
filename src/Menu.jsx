import './css/App.css'
import Layer from './Layer.jsx'
import {useState} from "react";
import {Box, Button, FormLabel, OutlinedInput} from "@mui/material";
import calculateLayers from "./calculators/payments.js";
import distributeRecoveries from "./calculators/recoveries.js";
import Aggregate from "./Aggregate.jsx";

export default function MenuBar(){
    const [balances, setBalances] = useState({
        excess: 0,
        sir: 0,
        ins: 0,
        agg: 0
    });


    const [transactionAmount, setTransactionAmount] = useState(0);
    const transactionAmountChange = (event) => {
        const value = event.target.value;
        setTransactionAmount(value === '' ? 0 : Number(value));

    };

    const [recoveryAmount, setRecoveryAmount] = useState(0);
    const recoveryAmountChange = (event) => {
        const value = event.target.value;
        setRecoveryAmount(value === '' ? 0 : Number(value));

    };


    function distributeLayers(transactionType) {
        if (transactionType === 'Payment') {
            let balances = calculateLayers(parseFloat(transactionAmount));
            console.log(balances)
            setBalances({
                excess: balances[0].balance,
                sir: balances[1].balance,
                ins: balances[2].balance,
                agg: balances[3].balance
            });
        } else if (transactionType === 'Recovery') {
            let balances = distributeRecoveries(parseFloat(recoveryAmount));
            console.log(balances)
            setBalances({
                excess: balances[0].balance,
                sir: balances[1].balance,
                ins: balances[2].balance,
                agg: balances[3].balance

            });
        }

    }
    return (
        <>
            <div className="card">
                <h4>funding layers</h4>
                <div>
                    <Layer layerName="Excess" balance={balances.excess}/>
                    <Layer layerName="SIR" balance={balances.sir}/>
                    <Layer layerName="Insurer" balance={balances.ins}/>
                </div>
                <h4>aggregate balance</h4>
                <div>
                    <Aggregate layerName="Aggregate" balance={balances.agg}/>
                </div>
                <br/>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Box className="add-buttons">
                <FormLabel>
                    {'Add Payment'}
                </FormLabel>
                <OutlinedInput
                    id="paymentTransaction"
                    placeholder="0.00"
                    size="small"
                    value={transactionAmount}
                    onChange={transactionAmountChange}
                    color={"secondary"}
                />
                <Button variant="contained"
                        id="Payment"
                        onClick={() => {
                            distributeLayers('Payment');
                        }}
                >Add
                </Button>
                </Box>
                    <Box className="add-buttons">
                <FormLabel>
                    {'Add Recovery'}
                </FormLabel>
                <OutlinedInput
                    id="recoveryTransaction"
                    placeholder="0.00"
                    size="small"
                    value={recoveryAmount}
                    onChange={recoveryAmountChange}
                    color={"secondary"}
                />
                <Button variant="contained"
                        id="Recovery"
                        onClick={() => {
                            distributeLayers('Recovery');
                        }}
                >Add
                </Button>
                    </Box>
                </Box>
            </div>

        </>
    )
}

