// For Add Modal
var openModalBtn = document.getElementById('openModalBtn');
var AddmodalElement = document.getElementById('addEmployeeModal');
var Addmodal = new bootstrap.Modal(AddmodalElement);
// For Edit Modal
var EditIcon = document.getElementById("EditIcon");
var EditModalElement = document.getElementById('editEmployeeModal');
var Editmodal = new bootstrap.Modal(EditModalElement);
// For Delete Modal
var DeletetIcon = document.getElementById("DeleteIcon");
var DeleteModalElement = document.getElementById('deleteEmployeeModal');
var Deletemodal = new bootstrap.Modal(DeleteModalElement);
// Add Inputs
var employeeNameAdd = document.getElementById('employeeNameAdd');
var employeeDepartmentAdd = document.getElementById('employeeDepartmentAdd');
var employeePhoneAdd = document.getElementById('employeePhoneAdd');
// Edit Inputs
var employeeNameEdit = document.getElementById('employeeNameEdit');
var employeeDepartmentEdit = document.getElementById('employeeDepartmentEdit');
var employeePhoneEdit = document.getElementById('employeePhoneEdit');

let currentIndex = null;

// Restore Data From Localstorage If Available
var EmployeeList = JSON.parse(localStorage.getItem("List")) || [];
displayData();

// Open Add Window/Modal Function
function OpenAddPopUp() {
    Addmodal.show();
}
function searchItem(item) {
    List = ``;
    for (var i = 0; i < EmployeeList.length; i++) {
        if (EmployeeList[i].name.toLowerCase().includes(item.toLowerCase()) == true) {
            EmployeeList[i].newName = EmployeeList[i].name.replace(item, `<span class=" text-danger fw-bolder">${item}</span>`)
            List += ` <tr>
                <td>${i + 1}</td>
                <td>${EmployeeList[i].newName ? EmployeeList[i].newName : EmployeeList[i].name}</td>
                <td>${EmployeeList[i].department}</td>
                <td>${EmployeeList[i].phone}</td>
                <td>
                <i onclick="editData(${i})" class="EditIcon fa-solid fa-pen text-warning"></i>
                <i onclick="OpenDeletePopUp(${i})" class="DeleteIcon fa-solid fa-trash text-danger"></i>
                </td>
            </tr>`
        }
        console.log();
    }
    document.getElementById("t-body").innerHTML = List;

}
// Validation
function validateForm() {
    var name = employeeNameAdd.value;
    var department = employeeDepartmentAdd.value;
    var phone = employeePhoneAdd.value;
    var textPattern = /^[a-zA-Z\s]+$/;
    var isValid = true;

    if (name === "") {
        document.getElementById("nameError").innerText = "Name is required!";
        document.getElementById("nameError").style.display = "block";
        isValid = false;
    } else if (!textPattern.test(name)) {
        document.getElementById("nameError").innerText = "Name must contain only letters and spaces.";
        document.getElementById("nameError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("nameError").style.display = "none";
    }

    if (department === "") {
        document.getElementById("departmentError").innerText = "Department is required!";
        document.getElementById("departmentError").style.display = "block";
        isValid = false;
    } else if (!textPattern.test(department)) {
        document.getElementById("departmentError").innerText = "Department must contain only letters and spaces.";
        document.getElementById("departmentError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("departmentError").style.display = "none";
    }

    if (phone === "") {
        document.getElementById("phoneError").innerText = "Phone number is required!";
        document.getElementById("phoneError").style.display = "block";
        isValid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById("phoneError").innerText = "Please enter a valid phone number (10 digits).";
        document.getElementById("phoneError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("phoneError").style.display = "none";
    }
    if (isValid) {
        AddNew();
    }
    return isValid;
}
// AddNew Function
function AddNew() {
    var employee = {
        name: employeeNameAdd.value,
        department: employeeDepartmentAdd.value,
        phone: employeePhoneAdd.value,
    };
    EmployeeList.push(employee);
    displayData()
    localStorage.setItem("List", JSON.stringify(EmployeeList))
    Addmodal.hide();
    document.getElementById('employeeForm').reset();
}
// Display Function
function displayData() {
    List = ``;
    for (var i = 0; i < EmployeeList.length; i++) {
        List += ` <tr>
                <td>${i + 1}</td>
                <td>${EmployeeList[i].name}</td>
                <td>${EmployeeList[i].department}</td>
                <td>${EmployeeList[i].phone}</td>
                <td class="icon-cell">
                <i onclick="editData(${i})" class="EditIcon fa-solid fa-pen text-warning"></i>
                <i onclick="OpenDeletePopUp(${i})" class="DeleteIcon fa-solid fa-trash text-danger"></i>
                </td>
            </tr>`
    }
    document.getElementById("t-body").innerHTML = List;
}

// Edit Function
function editData(index) {
    currentIndex = index;
    employeeNameEdit.value = EmployeeList[index].name;
    employeeDepartmentEdit.value = EmployeeList[index].department;
    employeePhoneEdit.value = EmployeeList[index].phone;

    Editmodal.show();
}
// Save Changes Function
function saveEdit() {
    if (currentIndex !== null) {

        EmployeeList[currentIndex].name = employeeNameEdit.value;
        EmployeeList[currentIndex].department = employeeDepartmentEdit.value;
        EmployeeList[currentIndex].phone = employeePhoneEdit.value;

        localStorage.setItem("List", JSON.stringify(EmployeeList));
        Editmodal.hide();
        displayData();
    }
}
function OpenDeletePopUp(index) {
    currentIndex = index;
    Deletemodal.show();
}
var deleteEmployeeBtn = document.getElementById("deleteEmployeeBtn");
deleteEmployeeBtn.addEventListener("click", function () {
    if (currentIndex !== null) {
        deleteData(currentIndex);
    }
});

// Delete Function
function deleteData(index) {
    EmployeeList.splice(index, 1);
    displayData();
    localStorage.setItem("List", JSON.stringify(EmployeeList));
    Deletemodal.hide();
}



