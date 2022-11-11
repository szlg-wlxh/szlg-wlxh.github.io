/*if (sessionStorage.getItem("student") != null && JSON.parse(sessionStorage.getItem("student")).hasOwnProperty("id")) {
    if (sessionStorage.getItem("interview")) {
        location.href = "./Su.html";
    }
    else {
        if (history.length > 1) {
            history.go(-1);
        }
        else {
            // location.replace("./index.html#Information");
            document.getElementById("Information").autofocus();
        }
    }
}*/
var response = /** @class */ (function () {
    function response() {
        this.status = "";
        this.ServerType = "";
        this.html = "";
    }
    return response;
}());
var loginButton = document.getElementById("normalSubmit");
/*var changeToStudentApplyOrLogin = document.getElementById("leftButton");
var changeToAdminLogin = document.getElementById("rightButton");*/
var studentForm = document.forms[0];
var adminForm = document.forms[1];
/*var loginOrApply = document.getElementById("showApplyButton");
var extraForm = document.getElementById("otherInformation");
loginOrApply['isClick'] = false;*/
var isClickStudent = false;
var isClickAdmin = false;
/*loginOrApply.addEventListener("click", function () {
    loginOrApply['isClick'] = true;
    loginOrApply.classList.add("close");
    extraForm.style.display = "flex";
    document.getElementById("formatChange").querySelector('input').setAttribute("required", "on");
    document.getElementById("formatChange").style.display = "flex";
    Array.apply(void 0, extraForm.querySelectorAll("input")).forEach(function (item) {
        item.setAttribute("required", "on");
    });
});
if (/\?q=login/g.test(location.href)) {
    document.getElementById("showApplyButton").click();
}*/
var pro = "login";
/*studentForm.addEventListener("submit", function (formEvent) {
    formEvent.preventDefault();
    if (isClickStudent) {
        return;
    }
    else {
        isClickStudent = true;
        if (!loginOrApply['isClick']) {
            login();
        }
        else {
            apply();
        }
    }
});
adminForm.addEventListener("submit", function (formEvent) {
    formEvent.preventDefault();
    if (isClickAdmin) {
        return;
    }
    else {
        adminLogin();
    }
});
changeToAdminLogin.addEventListener("click", function () {
    changeToAdminLogin.classList.add("on");
    changeToStudentApplyOrLogin.classList.remove("on");
    closeForm(studentForm);
    showForm(adminForm);
});
changeToStudentApplyOrLogin.addEventListener("click", function () {
    changeToAdminLogin.classList.remove("on");
    changeToStudentApplyOrLogin.classList.add("on");
    showForm(studentForm);
    closeForm(adminForm);
});*/
var _a = TW_Login(), login = _a.login, apply = _a.apply, adminLogin = _a.adminLogin, closeForm = _a.closeForm, showForm = _a.showForm;
function TW_Login() {
    var packInformation = function (form) {
        var allInformation = {};
        Array.apply(void 0, form.elements).forEach(function (item) {
            item.name != "" ? allInformation[item.name] = item.value : 0;
        });
        return JSON.stringify(allInformation);
    };
    var sendInformation = function (json, place, thenAction) {
        waitingResponse();
        var newAjax = new XMLHttpRequest();
        newAjax.open("post", place, true);
        // newAjax.setRequestHeader("content-type", "application/json; charset=UTF-8");
        newAjax.addEventListener("readystatechange", function () {
            if (newAjax.readyState == 4 && newAjax.status == 200) {
                isClickStudent = false;
                document.getElementById("waiting").style.display = "none";
                thenAction(newAjax.response);
            }
            else {
                waitingResponse();
            }
        });
        newAjax.send(json);
    };
    var closeForm = function (formElement) {
        formElement.classList.add("close");
    };
    var showForm = function (formElement) {
        formElement.classList.remove("close");
    };
    // const url :string = "http://176.122.165.147:3000/"
    var url = "/";
    var login = function () {
        var formInformation = JSON.parse(packInformation(studentForm));
        sendInformation(JSON.stringify(formInformation), url + "studentLogin", loginCheckAction);
    };
    var apply = function () {
        var formInformation = JSON.parse(packInformation(studentForm));
        sendInformation(JSON.stringify(formInformation), url + "studentApply", loginCheckAction);
    };
    var adminLogin = function () {
        sendInformation(packInformation(adminForm), url + "adminLogin", adminSuccessAction);
    };
    var loginCheckAction = function (response) {
        var res = JSON.parse(response);
        var status = res.status;
        if (status == "success") {
            showStatus(status, function () {
                sessionStorage.setItem("student", response);
                location.replace('../HTML/index.html#Information');
                // document.getElementById("Information").autofocus();
            });
        }
        else {
            showStatus(status);
        }
    };
    // let applySuccessAction = (response: string): void => {
    //     loginCheckAction(response)
    // }
    var adminSuccessAction = function (response) {
        var res = JSON.parse(response);
        var status = res.status;
        if (status == "success") {
            showStatus(status, function () {
                sessionStorage.setItem("interview", response);
                location.replace('../HTML/Su.html');
            });
        }
        else {
            showStatus(status);
        }
    };
    var waitingResponse = function () {
        document.getElementById("waiting").style.display = "flex";
        document.getElementById("waiting").querySelector('div').style.top = "40px";
        // document.getElementById("waiting").onclick = () => { document.getElementById("waiting").style.display = "none" }
    };
    var showStatus = function (status, next) {
        if (next === void 0) {
            next = function () {
                document.getElementById('password').value = '';
                var reload = setTimeout(function () {
                    clearTimeout(reload);
                    document.getElementById(status).style.display = "none";
                    document.getElementById(status).querySelector('div').style.top = "-180px";
                }, 3000);
            };
        }
        if (status) {
            document.getElementById(status).style.display = "flex";
            document.getElementById(status).querySelector('div').style.top = "40px";
            next();
        }
        else {
            showStatus("error");
        }
    };
    return { login: login, apply: apply, adminLogin: adminLogin, closeForm: closeForm, showForm: showForm };
}
