let invoiceData = [];
let total = 0;

function addRow() {
    let description = document.getElementById("description").value;
    let amount = document.getElementById("amount").value;
    let dataAmount = 1 * amount;

    invoiceData.push({description, amount});

    let tableBody = document.querySelector("#invoiceTable tbody");
    let row = tableBody.insertRow();
    let descriptionCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    let actionCell = row.insertCell(2);

    descriptionCell.innerHTML = description;
    amountCell.innerHTML = dataAmount;
    actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
    actionCell.classList.add('form');

    total += dataAmount;
    document.getElementById("total").innerHTML = total;
}

function deleteRow(button) {
    let rowIndex = button.parentNode.parentNode.rowIndex - 1;
    let amount = invoiceData[rowIndex].amount;
    invoiceData.splice(rowIndex, 1);
    button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);

    total -= amount;
    document.getElementById("total").innerHTML = total;
}

var headIsSet = false;

window.onbeforeprint = (event) => {
    let name = document.getElementById("name").value;
    let date = document.getElementById("date").value;
    let invNum = document.getElementById("invNum").value;

    let invNumCell;
    let nameCell;
    let dateCell;
    if (!headIsSet) {
        let tableBody = document.querySelector("#headOfDocument tbody");
        let row = tableBody.insertRow();
        invNumCell = row.insertCell(0);
        nameCell = row.insertCell(1);
        dateCell = row.insertCell(2);
        headIsSet = true;

        invNumCell.innerHTML = invNum;
        invNumCell.id = "inv"
        dateCell.innerHTML = date;
        dateCell.id = "dat"
        nameCell.innerHTML = name;
        nameCell.id = "nam"
    }
    else {
        document.getElementById("inv").innerHTML = invNum;
        document.getElementById("dat").innerHTML = date;
        document.getElementById("nam").innerHTML = name;
    }
};