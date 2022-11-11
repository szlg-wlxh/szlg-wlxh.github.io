var inputList = Array.from(document.querySelectorAll("input"));
var showInformationList = Array.from(document.getElementsByClassName("showInformation"));
var form = document.forms[0];
var submitButton = document.getElementById("submitButton");
inputList.forEach(function (item) {
    item.addEventListener("click", function () {
        item.classList.add("inputNotEmpty");
    });
    item.addEventListener("input", function () {
        item.classList.add("inputNotEmpty");
    })
});