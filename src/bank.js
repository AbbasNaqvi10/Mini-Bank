import React from 'react';
import './App.css';
import Balance from './Balance';
import History from './History';
import Transaction from './Transaction';
import Form from './Form';

const Bank = () => {

    var balance = JSON.parse(localStorage.getItem('balance'));
    var history = JSON.parse(localStorage.getItem('history'));
    if (balance === null && history === null){
        const amount = {
            balance : 0,
            income : 0,
            expense : 0,
        }
        localStorage.setItem('balance', JSON.stringify(amount));
        localStorage.setItem('history', '[]');
     }
    return(
        <div className="mini-bank">
            <hr></hr>
            <Balance />
            <History />
            <hr />
            <Transaction />
            <hr />
            <Form />
            <br />

        </div>
    )
}

export default Bank;