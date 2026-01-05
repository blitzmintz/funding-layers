export default function calculateLayers(amount) {
    const excessLimit = parseFloat((document.getElementById('Excess')).value);
    const sirLimit = parseFloat((document.getElementById('SIR')).value);
    const aggregateStopLoss = parseFloat((document.getElementById('Aggregate')).value);

    let excessBalance = parseFloat((document.getElementById('6')).value);
    let sirBalance = parseFloat((document.getElementById('3')).value);
    let insrBalance = parseFloat((document.getElementById('7')).value);
    let aggregateBalance = parseFloat((document.getElementById('9')).value)

    let gap;

    amount = parseFloat(amount);

    function isAggregateBreached() {
        return (aggregateBalance >= aggregateStopLoss)
    }

    function applyToInsurer(amount) {
        insrBalance = insrBalance + amount;
    }

    //if it's already breached, apply to insurer
    if (isAggregateBreached()) {
        applyToInsurer(amount);
        amount = 0;
    }

    if (amount > 0) {
        //apply to excess
        if (excessLimit > 0 && excessLimit !== excessBalance) {
            if (excessLimit - excessBalance >= amount) {
                excessBalance = excessBalance + amount;
                aggregateBalance = aggregateBalance + amount;
                amount = 0;
            } else if (amount > 0 && excessLimit >= excessBalance) {
                gap = excessLimit - excessBalance;
                amount = amount - gap;
                excessBalance = excessLimit;
                aggregateBalance = aggregateBalance + gap;
            }
        }

        if (isAggregateBreached()) {
            applyToInsurer(amount);
            amount = 0;
        } else if (sirLimit > 0 && sirLimit !== sirBalance && amount > 0) {
            if (sirLimit - sirBalance >= amount) {
                sirBalance = sirBalance + amount;
                aggregateBalance = aggregateBalance + amount;
                amount = 0

            } else if (amount > 0 && sirLimit >= sirBalance) {
                gap = sirLimit - sirBalance;
                amount = amount - gap;
                sirBalance = sirLimit;
                aggregateBalance = aggregateBalance + gap;
            }
        }
        //apply remainder to insurer
        if (amount > 0) {
            applyToInsurer(amount);
        }
    }


    return [
        {name: 'Excess', balance: excessBalance},
        {name: 'SIR', balance: sirBalance},
        {name: 'Insurer', balance: insrBalance},
        {name: 'Aggregate', balance: aggregateBalance},
    ];

}