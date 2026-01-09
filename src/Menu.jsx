import './css/App.css'
import Layer from './Layer.jsx'
import {useState} from "react";
import HelpPopover from "./HelpPopover.jsx";
import AddAmount from "./AddAmount.jsx";

//this component needs to track:
//layer limits
//layer balances (totals)
//aggregate stop loss
//aggregate balance
//ranking statuses

export default function Menu(){
    const LAYERS = [
        { key: 'excess', label: 'Excess' },
        { key: 'sir', label: 'SIR' },
        { key: 'ins', label: 'Insurer' },
        { key: 'agg', label: 'Aggregate' }
    ];
    const [balances, setBalances] = useState({
        excess: 0,
        sir: 0,
        ins: 0,
        agg: 0
    });
    const [limits, setLimits] = useState({
        excess: null,
        sir: null,
        ins: null,
        agg: null
    });

    const [isRanking, setIsRanking] = useState({
        excess: true,
        sir: true,
        ins: null,
        agg: null
    });

    const handleAddAmount = (amount) => {
        let remaining = amount;

        setBalances(prev => {
            const nextBal = { ...prev };

            const aggBreached =
                limits.agg !== null && nextBal.agg >= limits.agg;

            const applyToLayer = (key) => {
                if (remaining <= 0) return;
                if (limits[key] === null) return;

                const capacity = limits[key] - nextBal[key];
                if (capacity <= 0) return;

                const applied = Math.min(capacity, remaining);
                nextBal[key] += applied;

                if (isRanking[key]) {
                    nextBal.agg += applied;
                }

                remaining -= applied;
            };

            if (!aggBreached) {
                applyToLayer('excess');
                applyToLayer('sir');
            }

            if (remaining > 0) {
                nextBal.ins += remaining;
            }

            return nextBal;
        });
    };
    return (
        <>
            <div className="card">
                <HelpPopover />
                <h4>funding layers</h4>
                <div>
                    {LAYERS.map(({ key, label }) => (
                        <Layer
                            key={key}
                            layerName={key}
                            label={label}
                            balance={balances[key]}
                            limit={limits[key]}
                            isRanking={isRanking[key]}
                            onLimitChange={value =>
                                setLimits(prev => ({ ...prev, [key]: value }))
                            }
                            onRankingChange={value =>
                                setIsRanking(prev => ({ ...prev, [key]: value }))
                            }
                        />
                    ))}
                </div>
                <div>
                    <AddAmount type={"Payment"} onAddAmount={handleAddAmount}/>
                </div>

            </div>
        </>
    )
}

