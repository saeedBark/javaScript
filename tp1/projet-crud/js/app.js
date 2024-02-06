 form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    firstName = document.getElementById("firstName"),
    lastName = document.getElementById("lastName"),
    genderM = document.getElementById("genderM"),
    genderF = document.getElementById("genderF"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title");

let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : [];

let isEdit = false, editId;

showInfo();

document.querySelector(".newUser").addEventListener('click', () => {
    submitBtn.innerText = 'Submit';
    modalTitle.innerText = "Fill the Form";
    isEdit = false;
    imgInput.src = "../image/Profile Icon.webp";
    form.reset();
});

file.onchange = function () {
    if (file.files[0].size < 1000000) {  
        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };

        fileReader.readAsDataURL(file.files[0]);
    } else {
        alert("This file is too large!");
    }
};

function showInfo() {
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove());

    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index + 1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeName}</td>
            <td>${element.employeelastName}</td>
            <td>${element.employeegender}</td>
            <td>${element.startDate}</td>
            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeName}', '${element.employeelastName}', '${element.employeegender}','${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeName}', '${element.employeelastName}', '${element.employeegender}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
            </td>
        </tr>`;

        userInfo.innerHTML += createElement;
    });
}

showInfo();

function readInfo(pic, firstName, lastName, gender, sDate) {
    document.querySelector('.showImg').src = pic;
    document.querySelector('#showFirstName').value = firstName;
    document.querySelector("#showLastName").value = lastName;
    document.querySelector("#showGenderM").checked = (gender === "M");
    document.querySelector("#showGenderF").checked = (gender === "F");
    document.querySelector("#showsDate").value = sDate;
}

function editInfo(index, pic, first_Name, last_Name, gender_, Sdate_) {
    isEdit = true;
    editId = index;
    imgInput.src = pic;
    firstName.value = first_Name;
    lastName.value = last_Name;
    sDate.value = Sdate_;
    genderM.checked = (gender_ === "M");
    genderF.checked = (gender_ === "F");
    submitBtn.innerText = "Update";
    modalTitle.innerText = "Update The Form";
}

function deleteInfo(index) {
    if (confirm("Are you sure want to delete?")) {
        getData.splice(index, 1);
        localStorage.setItem("userProfile", JSON.stringify(getData));
        showInfo();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const information = {
        picture: imgInput.src || "../image/Profile Icon.webp",
        employeeName: firstName.value,
        employeelastName: lastName.value,
        employeegender: genderM.checked ? "M" : "F",
        startDate: sDate.value
    };

    if (!isEdit) {
        getData.push(information);
    } else {
        isEdit = false;
        getData[editId] = information;
    }

    localStorage.setItem('userProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Fill The Form";
    showInfo();
    form.reset();
    imgInput.src = "../image/Profile Icon.webp";
    
    $('#userForm').modal('hide');
});

$(document).ready(function() {
    $('#myDataTable').DataTable({
        paging: true,
        dom: 'lrtip',
        columnDefs: [
            { targets: -1, orderable: false } 
        ],
    });

    $('#customSearchInput').on('keyup', function() {
        $('#myDataTable').DataTable().search($(this).val()).draw();
    });
});

