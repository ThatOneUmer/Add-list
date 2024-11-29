var cardDiv = document.getElementsByClassName("make-cards")[0];
var pName = document.getElementById("nameInp");
var pComp = document.getElementById("companyInp");
var pCode = document.getElementById("codeInp");
var err = document.getElementById("eR");
var dB = document.getElementsByClassName("head2")[0];

function addProduct() {
  if (pName.value === "" && pComp.value === "" && pCode.value === "") {
    err.innerText = "please input these fields";
    err.style.color = "red";
    return;
  }

  err.innerText = "Add your product";
  err.style.color = "black";
  dB.style.display = "block";



  var proDuct = document.createElement("div");
  proDuct.setAttribute("class", "p-div");
  cardDiv.appendChild(proDuct);

  var proName = document.createElement("h4");
  proName.setAttribute("class", "heading");
  proName.innerText = `Product Name : ${pName.value}`;
  var proComp = document.createElement("h4");
  proComp.setAttribute("class", "heading");
  proComp.innerText = `Product Company : ${pComp.value}`;
  var proCode = document.createElement("h4");
  proCode.setAttribute("class", "heading");
  proCode.innerText = `Product Code : ${pCode.value}`;

  proDuct.appendChild(proName);
  proDuct.appendChild(proComp);
  proDuct.appendChild(proCode);

  var editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  proDuct.appendChild(editBtn);

  var deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("onclick", "deleteCard(event)");
  deleteBtn.innerText = "Delete";
  proDuct.appendChild(deleteBtn);
}

function deleteCard(proDuct) {
  proDuct.target.parentElement.remove();
  return;
}
