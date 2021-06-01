import React from 'react';
import './App.css';

const Balance = () => {

    var history = JSON.parse(localStorage.getItem('history'));
    if (history === null){
        localStorage.setItem('history', '[]');
    }
    var values = JSON.parse(localStorage.getItem('balance')), balance = values.balance , income = 0 , expense = 0;

    for(var i = (history.length-1); i>=0; i--){
        income = income + parseInt(history[i].income);
    }
    for(i = (history.length-1); i>=0; i--){
        expense = expense - parseInt(history[i].expense);
    }
    return(
        <div className="balance">
            <div>
                <h1>YOUR BALANCE</h1>
                <p className="amount">$ {balance}</p>
            </div>
            <div className="display">
                <div class="row">
                    <div class="column">
                        <h2>INCOME</h2>
                        <p className="amount" style={{color:"green", marginTop:"-25px"}}>$ +{income}</p>
                    </div>
                    <div class="column">
                        <h2>EXPENSE</h2>
                        <p className="amount" style={{color:"red", marginTop:"-25px"}}>$ {expense}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Balance;