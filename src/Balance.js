import React from 'react';
import './App.css';

const Balance = () => {

    var values = JSON.parse(localStorage.getItem('balance')), balance = values.balance , income = values.income , expense = values.expense;

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
                        <p className="amount" style={{color:"green", marginTop:"-25px"}}>$ {income}</p>
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