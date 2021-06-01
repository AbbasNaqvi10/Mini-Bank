import React, {useState} from 'react';
import './App.css';

const Transaction = () => {
    if (localStorage.getItem("history") === null){
        localStorage.setItem('history', '[]');
    }
    if (localStorage.getItem("balance") === null){
        localStorage.setItem('balance', '[]');
    }
    var balance = JSON.parse(localStorage.getItem("balance"));
    var history_old_data = [];
    history_old_data = (JSON.parse(localStorage.getItem('history')));

    let history = {
        title : "",
        balance : 0,
        income : 0,
        expense : 0,
      }

    const [showResults, setShowResults] = useState(false);
    const onClick = () => setShowResults(true)

    const transfer = () => {
        if (Object.keys(errors).length === 0){
            if(balance.balance === 0 || balance === null){
                alert("Not Enough Amount!");
                return false;
            }
            else if (parseInt(values.amount)<= parseInt(balance.balance)){
                history.title = "Transaction " + values.title;
                balance.balance = parseInt(balance.balance) - parseInt(values.amount);
                history.balance = balance.balance;
                history.expense = parseInt(values.amount);
                history_old_data.push(history);
                localStorage.setItem('history', JSON.stringify(history_old_data));
                localStorage.setItem('balance', JSON.stringify(balance));
                window.location.reload();
            }
            else{
                alert("Not Enough Amount in Income!");
                return;
            }
        }
    }

    const Results = () => (
        <div id="results" className="search-results">
          <div className='account-form' id="myDive">
                <form onSubmit={handleSubmit}>
                    <div className="title">
                        <label>Title</label><br/>
                        <input placeholder="Enter title..."
                        type='text'
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        >
                        </input>
                        {errors.title && <p>{errors.title}</p>}
                    </div>
                    <br/>
                    <div className="title">
                    <label>Amount</label><br/>
                    <input placeholder="Enter account number..."
                    type='number'
                    name='account'
                    min="0"
                    value={values.account}
                    onChange={handleChange}
                    ></input>
                    {errors.account && <p>{errors.account}</p>}
                </div>
                <div className="title">
                    <label>Amount</label><br/>
                    <input placeholder="Enter amount..."
                    type='number'
                    name='amount'
                    min="0"
                    value={values.amount}
                    onChange={handleChange}
                    ></input>
                    {errors.amount && <p>{errors.amount}</p>}
                </div>
                    <br />
                    <button className="form-btn" style={{marginLeft:"10px"}} onClick={transfer}>Transaction</button>
                </form>
            </div>
        </div>
      )

    const [values, setValues] = useState({
        title: '',
        account: '',
        amount: '',
    });
    var length = values.account;
    var amlength = values.amount;

    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validateInfo(values));
        if(values.amount>parseInt(balance.balance)){
            alert("Not Enough Amount");
            return false;
        }
    };

    function validateInfo(values) {
        let errors = {};
        
        if (!values.title.trim()) {
          errors.title = 'title required';
        } else if (!/^[A-Za-z]+$/.test(values.title)) {
          errors.title = 'title is invalid! Enter Alphabets only with no spaces';
        } 
        if (!values.account) {
            errors.account = 'account is required';
        } else if (!/^[0-9]+$/.test(values.account) && values.account.value<0) {
            errors.account = 'amount is invalid! Enter Numbers only';
        }
        else if(length.length>16 || length.length<16 ){
            errors.account = 'enter 16 digits only';
        }
        else if(length < 0){
            errors.account = 'enter positive digits only';
        }
        if (!values.amount) {
          errors.amount = 'amount is required';
        } else if (!/^[0-9]+$/.test(values.amount) && values.amount.value<0) {
          errors.amount = 'amount is invalid! Enter Numbers only';
        }else if(amlength < 0){
            errors.amount = 'enter positive digits only';
        }
      
        return errors;
    }


    return(
        <div>
            <h1><button class="btn" onClick={onClick}>Add New Transaction</button></h1>
            { showResults ? <Results /> : null }
        </div>
    )
}

export default Transaction;