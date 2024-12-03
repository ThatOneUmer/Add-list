var cardDiv = document.getElementsByClassName("make-cards")[0];
var err = document.getElementById("eR");
var dB = document.getElementsByClassName("head2")[0];

var addToData = readData() ? [...readData()] : [];

function addtoCard(e) {
  e.preventDefault();

  var pName = document.getElementById("nameInp").value;
  if (pName === "") {
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
      <input type='text' id="upD" placeholder="${addToData[i].listText}" class='hide'/>
      <p id="show" >User Name : ${addToData[i].listText}</p>
      <button id="btnHide3" onClick='editItem(event,${addToData[i].id})'>Edit</button>
      <button id="btnHide" onClick='deleteCard(event,${addToData[i].id})'>Delete</button>
      <button id="btnHide2" style="display: none;" onClick='cancelItem()'>cancel</button>
      </div>`;
  }
}
renderListItems();

function editItem(e, id) {
  document.getElementById("btnHide").style.display = "none";
  document.getElementById("btnHide2").style.display = "block";

  e.target.previousElementSibling.style.display = "none";
  e.target.previousElementSibling.previousElementSibling.style.display =
    "block";
  e.target.innerText = "save";
  var editInpValue =
    e.target.previousElementSibling.previousElementSibling.value;
  e.target.setAttribute("onClick", `updatedItem(${id}, ${editInpValue})`);
}

function cancelItem() {
  for (let i = 0; i < addToData.length; i++) {
    if (document.getElementById("btnHide3").innerText === "save") {
      document.getElementById("btnHide").style.display = "block";
      document.getElementById("btnHide3").style.display = "block";
      document.getElementById("btnHide3").innerText = "Edit";
      document
        .getElementById("btnHide3")
        .setAttribute("onClick", `editItem(event, ${addToData[i].id})`);
      document.getElementById("btnHide2").style.display = "none";
      document.getElementsByClassName("hide")[0].style.display = "none";
      document.getElementById("show").style.display = "block";
      return
    }
  }
}

function updatedItem(id, inputVal) {
  for (let i = 0; i < addToData.length; i++) {
    if (addToData[i].id === id) {
      document.getElementById("btnHide").style.display = "block";
      document.getElementById("btnHide2").style.display = "none";
      document.getElementById("btnHide3").style.display = "block";
      document.getElementById("btnHide3").innerText = "Edit";
      document.getElementById("show").style.display = "block";
      addToData[i] = { ...addToData[i], listText: inputVal};
      addedItems(addToData[i]);
      return; 
    }
  }
}

function deleteCard(e, id) {
  for (let i = 0; i < addToData.length; i++) {
    document.getElementById("btnHide").parentElement.remove();
    return
  }
}
