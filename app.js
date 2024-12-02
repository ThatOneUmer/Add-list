var cardDiv = document.getElementsByClassName("make-cards")[0];
var err = document.getElementById("eR");
var dB = document.getElementsByClassName("head2")[0];

var addToData = readData() ? [...readData()] : [];

function addtoCard(e) {
  e.preventDefault();

  var pName = document.getElementById("nameInp").value;
  if (pName.value === "") {
    err.innerText = "please input this field";
    err.style.color = "red";
    return;
  }
  err.innerText = "Add To List";
  err.style.color = "black";
  dB.style.display = "block";

  var userData = new ListData(pName);
  addToData = [...addToData, userData];
  addedItems(addToData);
}

function ListData(itemValue) {
  this.listText = itemValue;
  this.id = Math.floor(
    Math.random() * 1000 + Number(new Date().getTime().toString().slice(-4))
  );
}

function addedItems(data) {
  localStorage.setItem("Added User", JSON.stringify(data));
  cardDiv.innerHTML = "";
  renderListItems();
}

function readData() {
  return JSON.parse(localStorage.getItem("Added User"));
}


function renderListItems() {
  for (let i = 0; i < addToData.length; i++) {
    cardDiv.innerHTML += `<div class = "p-div" style='display:flex;'>
      <input type='text' value='${addToData[i].listText}' class='hide'/>
      <p>User Name : ${addToData[i].listText}</p>
      <button onClick='editItem(event,${addToData[i].id})'>Edit</button>
      <button id="btnHide" onClick='deleteCard(event,${addToData[i].id})'>Delete</button>
      <button id="btnHide2" style="display: none;" onClick='deleteCard(event,${addToData[i].id})'>cancel</button>
      </div>`;
  }
}
renderListItems();

function editItem(e, id) {
  document.getElementById('btnHide').style.display = 'none';
  document.getElementById("btnHide2").style.display = "block";

  e.target.previousElementSibling.style.display = "none";
  e.target.previousElementSibling.style.display = "none";
  e.target.previousElementSibling.previousElementSibling.style.display =
    "block";
  e.target.innerText = "save";
  var editInpValue =
    e.target.previousElementSibling.previousElementSibling.value;
  console.log(editInpValue);
  e.target.setAttribute("onClick", `updatedItem(${id}, ${editInpValue})`);
}

function updatedItem(id, inptValue) {
  for (let i = 0; i < addToData.length; i++) {
    if (addToData[i].id === id) {
      addToData[i] = { ...addToData[i], listText: inptValue };
      addedItems(addToData);
      return;
    }
  }
}

function deleteCard(e, id) {
  e.target.parentElement.remove();
  for (let i = 0; i < addToData.length; i++) {
    if (addToData[i].id === id) {
      localStorage.removeItem("Added User", addToData[i]);
    }
  }
  return;
}