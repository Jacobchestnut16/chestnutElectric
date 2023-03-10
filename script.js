

let invoiceData = [];
let total = 0;
let name;
let date;
let invNum;

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
    actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button><button onclick="updateRow(this)">Update</button>';
    actionCell.classList.add('form');

    total += dataAmount;
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
            let amount = document.getElementById("amount").value;
            let dataAmount = 1 * amount;

            let tableBody = document.querySelector("#invoiceTable tbody");
            let row = tableBody.insertRow();
            let descriptionCell = row.insertCell(0);
            let amountCell = row.insertCell(1);
            let actionCell = row.insertCell(2);

            descriptionCell.innerHTML = description;
            amountCell.innerHTML = dataAmount;
            actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button><button onclick="updateRow(this)">Update</button>';
            actionCell.classList.add('form');

            total += dataAmount;
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


var fileWasRead = false;

function readFile() {
    // get the file input element
    const fileInput = document.getElementById("fileUpload");

    // get the file object from the file input element
    const file = fileInput.files[0];

    // create a FileReader object
    const reader = new FileReader();
        // set the onload function for the FileReader object
        reader.onload = function (event) {
            // get the contents of the file
            const fileContents = event.target.result;

            const lines = reader.result.split("\n")


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

                    invNumCell.innerHTML = lines[2];
                    invNumCell.id = "inv"
                    dateCell.innerHTML = lines[1];
                    dateCell.id = "dat"
                    nameCell.innerHTML = lines[0];
                    nameCell.id = "nam"

                    document.getElementById("name").value = lines[0];
                    document.getElementById("date").value = lines[1];
                    document.getElementById("invNum").value = lines[2];

                } else {
                    document.getElementById("inv").innerHTML = lines[2];
                    document.getElementById("dat").innerHTML = lines[1];
                    document.getElementById("nam").innerHTML = lines[0];
                    document.getElementById("name").value = lines[0];
                    document.getElementById("date").value = lines[1];
                    document.getElementById("invNum").value = lines[2];
                }




                for (let i = 3; i < lines.length; i += 2) {

                    let dataAmount = 1 * lines[i + 1];
                    let data = lines[i];

                    invoiceData.push({data, dataAmount})

                    let tableBody = document.querySelector("#invoiceTable tbody");
                    let row = tableBody.insertRow();
                    let descriptionCell = row.insertCell(0);
                    let amountCell = row.insertCell(1);
                    let actionCell = row.insertCell(2);

                    descriptionCell.innerHTML = lines[i];
                    amountCell.innerHTML = lines[i + 1];
                    actionCell.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';
                    actionCell.classList.add('form');

                    total += dataAmount;
                    document.getElementById("total").innerHTML = total;

                }
                reader.DONE




            // read the file as text

        }
    reader.readAsText(file);

    // read the file as text
    reader.readAsText(file);
}
