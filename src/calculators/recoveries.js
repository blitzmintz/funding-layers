export default function distributeRecoveries(amount) {
    const excessLimit = parseFloat((document.getElementById('Excess')).value);
    const sirLimit = parseFloat((document.getElementById('SIR')).value);

    //the craziest id strategy
    let excessBalance = parseFloat((document.getElementById('6')).value);
    let sirBalance = parseFloat((document.getElementById('3')).value);
    let insrBalance = parseFloat((document.getElementById('7')).value);
    let aggregateBalance = parseFloat((document.getElementById('9')).value)


    amount = parseFloat(amount);

    if (insrBalance > 0) {
        if (amount <= insrBalance) {
            insrBalance = insrBalance - amount;
            amount = 0;
        } else {
            amount = Math.abs(insrBalance - amount);
            insrBalance = 0;
        }
    }

    if (amount !== 0 && sirBalance > 0 && sirLimit > 0) {
        if (amount <= sirBalance) {
            sirBalance = sirBalance - amount;
            aggregateBalance = aggregateBalance - amount;
            amount = 0;
        } else {
            amount = Math.abs(sirBalance - amount);
            sirBalance = 0;
            aggregateBalance = aggregateBalance - sirBalance;

        }
    }

    if (amount !== 0 && excessBalance > 0 && excessLimit > 0) {
        if (amount <= excessBalance) {
            aggregateBalance = aggregateBalance - amount;
            excessBalance = excessBalance - amount;
            amount = 0;
        }
    }

    if (amount !== 0 && excessLimit === 0 && sirLimit === 0) {
        //last resort - just apply to the insurer even if it makes it negative, where you dont have other layers
        insrBalance = insrBalance - amount;
    }

    return [
        {name: 'Excess', balance: excessBalance},
        {name: 'SIR', balance: sirBalance},
        {name: 'Insurer', balance: insrBalance},
        {name: 'Aggregate', balance: aggregateBalance},
    ];

}