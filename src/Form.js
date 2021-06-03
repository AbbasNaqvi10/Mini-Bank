import React, {useState} from 'react';
import './App.css';

const Form = () => {

  if (localStorage.getItem("history") === null){
    localStorage.setItem('history', '[]');
  }

  var history_old_data = [];

  history_old_data = (JSON.parse(localStorage.getItem('history')));
  var balance = JSON.parse(localStorage.getItem('balance'));
  let history = {
    title : "",
    balance : 0,
    income : 0,
    expense : 0,
  }
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

  function myFunction() {
    var x = document.getElementById("myForm");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
  }

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
        
        if (!values.title) {
          errors.title = 'title required';
        }else if (!/^[A-Za-z]+$/.test(values.title)) {
          errors.title = 'title is invalid! Enter Alphabets only with no spaces';
        }
        if (!values.amount) {
          errors.amount = 'amount is required';
        } else if (!/^[0-9]+$/.test(values.amount) && values.amount.value<0) {
          errors.amount = 'amount is invalid! Enter Numbers only';
        }
      
        return errors;
   }
    const expenseCheck = () => {
      if (Object.keys(errors).length === 0){
        if(bank.balance === 0 || balance === null){
            alert("Not Enough Amount! Add income first ");
            return false;
        }
        if (parseInt(values.amount)<= parseInt(bank.balance) && Object.keys(errors).length === 0 && /^[A-Za-z]+$/.test(values.title)){
          bank.balance = parseInt(bank.balance) - parseInt(values.amount);
          bank.expense = values.amount;
          localStorage.setItem('balance', JSON.stringify(bank));
          history.title = values.title;
          history.balance = bank.balance;
          history.expense = parseInt(bank.expense);
          history_old_data.push(history);
          localStorage.setItem('history', JSON.stringify(history_old_data));
          return true;
        }
        else{
          alert("Not Enough Amount in Income!");
          return false;
        }
      }
    }

    const incomeCheck = () =>{
      if (Object.keys(errors).length === 0){
        if(values.amount.length===0 || values.amount===null){
          return false;
        }
        if(Object.keys(errors).length === 0 && values.amount.length!==0 && values.title.length!==0 && /^[A-Za-z]+$/.test(values.title)){
          bank.balance = parseInt(bank.balance) + parseInt(values.amount);
          bank.income = values.amount;
          history.title = values.title;
          history.balance = bank.balance;
          history.income = parseInt(bank.income);
          history_old_data.push(history);
          localStorage.setItem('history', JSON.stringify(history_old_data));
          localStorage.setItem('balance', JSON.stringify(bank));
          return true;
        }
      }
    }

    const expense = () => {
      if(expenseCheck()===true){
        window.location.reload();
      }
    }

      const income = () => {
      if(incomeCheck()===true){
        window.location.reload();
      }
    }

    return(
      <div>
        <h1><button class="btn" onClick={myFunction} >Add New Transaction</button></h1>
        <hr />
          <div className='account-form'>
              <form onSubmit={handleSubmit} style={{display:"none"}} id="myForm">
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
      </div>
    )
}

export default Form;