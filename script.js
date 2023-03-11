

let invoiceData = [];
let total = 0;
let name;
let date;
let invNum;

function addRow() {
    let description = document.getElementById("description").value;
    let pageAmount = document.getElementById("amount").value;
    let amount = 1 * pageAmount;

    invoiceData.push({description, amount});

    let tableBody = document.querySelector("#invoiceTable tbody");
    let row = tableBody.insertRow();
    let descriptionCell = row.insertCell(0);
    let amountCell = row.insertCell(1);
    let actionCell = row.insertCell(2);

    descriptionCell.innerHTML = description;
    amountCell.innerHTML = amount;
    actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button><button onclick="updateRow(this)">Update</button>';
    actionCell.classList.add('form');

    total += amount;
    document.getElementById("total").innerHTML = total;
}

function updateRow(button){
    let rowIndex = button.parentNode.parentNode.rowIndex - 1;
    let tAmount = invoiceData[rowIndex].amount;
    let tDescription = invoiceData[rowIndex].description;

    document.getElementById('description').value = tDescription;
    document.getElementById('amount').value = tAmount;

    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "unset";

    document.getElementById("updateBtn").addEventListener("click", function() {
            document.getElementById("addBtn").style.display = "unset";
            document.getElementById("updateBtn").style.display = "none";


            let rowIndex = button.parentNode.parentNode.rowIndex - 1;
            button.parentNode.parentNode.parentNode.removeChild(button.parentNode.parentNode);

            total -= tAmount;
            document.getElementById("total").innerHTML = total;


            invoiceData[rowIndex].amount = document.getElementById('amount').value;
            invoiceData[rowIndex].description = document.getElementById('description').value;


            let description = document.getElementById("description").value;
            let pageAmount = document.getElementById("amount").value;
            let amount = 1 * pageAmount;

            let tableBody = document.querySelector("#invoiceTable tbody");
            let row = tableBody.insertRow();
            let descriptionCell = row.insertCell(0);
            let amountCell = row.insertCell(1);
            let actionCell = row.insertCell(2);

            descriptionCell.innerHTML = description;
            amountCell.innerHTML = amount;
            actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button><button onclick="updateRow(this)">Update</button>';
            actionCell.classList.add('form');

            total += amount;
            document.getElementById("total").innerHTML = total;

    }
    );
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
    setheaderstuff();
};

function setheaderstuff(){
    name = document.getElementById("name").value;
    date = document.getElementById("date").value;
    invNum = document.getElementById("invNum").value;

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
}
