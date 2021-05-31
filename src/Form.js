import React, {useState} from 'react';
import './App.css';
import MiniBank from './bank';

const Form = () => {

    var balance = JSON.parse(localStorage.getItem('balance'));
    let bank = {
        balance : balance.balance,
        income : balance.income,
        expense : balance.expense,
    }

    const [values, setValues] = useState({
        title: '',
        amount: '',
    });

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
    };

    function validateInfo(values) {
        let errors = {};
        
        if (!values.title.trim()) {
          errors.title = 'title required';
        } else if (!/^[A-Za-z]+$/.test(values.title)) {
          errors.title = 'title is invalid! Enter Alphabets only';
        }
        if (!values.amount) {
          errors.amount = 'amount is required';
        } else if (!/^[0-9]+$/.test(values.amount) && values.amount.value<0) {
          errors.amount = 'amount is invalid! Enter Numbers only';
        }
      
        return errors;
      }

    const expense = () => {
        if (Object.keys(errors).length === 0){
            if(bank.balance === 0 || balance === null){
                alert("Not Enough Amount! Add income first ");
                return false;
            }
            else if (parseInt(values.amount)<= parseInt(bank.balance) ){
                bank.balance = parseInt(bank.balance) - parseInt(values.amount);
                bank.expense = values.amount;
                localStorage.setItem('balance', JSON.stringify(bank));
            }
            else{
                alert("Not Enough Amount in Income!");
                return;
            }
        }
    }

      const income = () => {
        if (Object.keys(errors).length === 0){
          bank.balance = parseInt(bank.balance) + parseInt(values.amount);
          bank.income = values.amount;
          localStorage.setItem('balance', JSON.stringify(bank));
        }
    }

    return(
        <div className='account-form'>
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
                <button className="form-btn" onClick={income}>Add Income</button>
                <button className="form-btn" onClick={expense}>Add Expense</button>
            </form>
        </div>
    )
}

export default Form;