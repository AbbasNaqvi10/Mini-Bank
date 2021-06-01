import React from 'react';
import './App.css';

const History = () => {

    var history = JSON.parse(localStorage.getItem('history'));

    function GenerateTable() {

        //Build an array containing Customer records.
        var i, data = [];
        data.push(["Title", "Balance", "Income", "Expense"]);

        for(i = (history.length-1); i>=0; i--){
            var title = history[i].title;
            var balance = history[i].balance;
            var income = history[i].income;
            var expense = history[i].expense;
            data.push([title, balance, income, expense]);
        }
        console.log(data);
 
        //Create a HTML Table element.
        var table = document.createElement("TABLE");
        table.border = "1";
 
        //Get the count of columns.
        var columnCount = data[0].length;
 
        //Add the header row.
        var row = table.insertRow(-1);
        for (i = 0; i < columnCount; i++) {
            var headerCell = document.createElement("TH");
            headerCell.innerHTML = data[0][i];
            row.appendChild(headerCell);
        }
 
        //Add the data rows.
        for (i = 1; i < data.length; i++) {
            row = table.insertRow(-1);
            for (var j = 0; j < columnCount; j++) {
                var cell = row.insertCell(-1);
                cell.innerHTML = data[i][j];
            }
        }
 
        var dvTable = document.getElementById("dvTable");
        dvTable.innerHTML = "";
        dvTable.appendChild(table);
    }

    return(
        <div>
            <h1><button class="btn" onClick={GenerateTable}>History</button></h1>
            <div id="dvTable"></div>
        </div>
    )
}

export default History;