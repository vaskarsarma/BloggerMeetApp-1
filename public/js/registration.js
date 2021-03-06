$(function() {

    var servicePath = $("#spnServicePath").text();
    $("#inputUserName").on("blur", () => {
        run_waitMe("userName");
        checkUserName(servicePath);
    });

    $(".signup").on("click", () => {
        run_waitMe("signUp");
        signUp();
    });

});

let checkUserName = (servicePath) => {
    servicePath = servicePath != null ? servicePath : "http://localhost:3000";
    var url = servicePath + "/checkUserName/" + $("#inputUserName").val();
    $.ajax({
        url: url, // "https://www.emirates.com/api/fares/featured/uk/english/LHR",   
        dataType: 'json',
        success: function(data) {
            if (data != null && data.result != null && data.result == true) {
                $("#inputUserName").focus().parent().addClass("has-error");
                $(".ErrorPanel").html(showMessage(" <strong>Warning!</strong> user-name already taken"));
                showErrorPanal();
            } else {
                $(".ErrorPanel").addClass("hidden");
                $("#inputUserName").parent().removeClass("has-error");
                $(".successPanel").html(showMessage(" <strong>Good!</strong> you are on right way ."));
                showSuccessPanal();
            }

            stop_waitMe("userName");
        },
        error: function(err) {
            console.log("Error API :" + JSON.stringify(err));
            $(".ErrorPanel").html(showMessage(" <strong>Oh sanp!</strong> there some technical error"));
            showErrorPanal();
            $("#inputUserName").focus();
            stop_waitMe("userName");
        }
    });
}

let showMessage = ($message) => {
    return $("<div></div>").append($message);
};

let signUp = (data) => {
    clearControlClass();
    if (signUPValidation()) {
        hideAllPanel();
        var result = {
            "username": $("#inputUserName").val(),
            "name": $("#inputName").val(),
            "email": $("#inputEmail").val(),
            "password": $("#inputPassword").val()
        }

        $.ajax({
                method: "Post",
                url: "/commonAPI/data/signUp",
                data: { data: result }
            })
            .done(function(jsonResult) {

            })
            .fail(function(err) {
                showErrorPanal();
            })
            .always(function() {});
    }
}

let signUPValidation = () => {
    var isValid = true;
    var errorPanel = $("<div></div>");
    var _userName = $("#inputUserName").val();
    var _name = $("#inputName").val();
    var _email = $("#inputEmail").val();
    var _pwd = $("#inputPassword").val();
    var _cpwd = $("#inputCPassword").val();
    // var errorMessage = null;
    if (_userName == "" || _userName == undefined) {
        isValid = false;
        $("#inputUserName").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter user name."));
    }

    if (_name == "" || _name == undefined) {
        isValid = false;
        $("#inputName").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter name."));
    } else if (!validateName(_name)) {
        isValid = false;
        $("#inputName").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter valid Name."));
    }

    if (_email == "" || _email == undefined) {
        isValid = false;
        $("#inputEmail").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter email."));
    } else if (!validateEmail(_email)) {
        isValid = false;
        $("#inputEmail").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter valid email."));
    }

    if (_pwd == "" || _pwd == undefined) {
        isValid = false;
        $("#inputPassword").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter password."));
    }

    if (_cpwd == "" || _cpwd == undefined) {
        isValid = false;
        $("#inputCPassword").parent().addClass("has-error");
        errorPanel.append(showMessage("Please enter confirm password."));
    }

    if (_pwd != _cpwd) {
        isValid = false;
        $("#inputCPassword").parent().addClass("has-error");
        errorPanel.append(showMessage("Password are not matching"));
    }
    if (!isValid) {
        $(".ErrorPanel").html(errorPanel);
        showErrorPanal();
        stop_waitMe("signUp");
    }
    return isValid;
};

let showErrorPanal = () => {
    $(".ErrorPanel").removeClass("hidden");
    $(".successPanel").addClass("hidden");
};

let showSuccessPanal = () => {
    $(".ErrorPanel").addClass("hidden");
    $(".successPanel").removeClass("hidden");
};

let hideAllPanel = () => {
    $(".ErrorPanel").addClass("hidden");
    $(".successPanel").addClass("hidden");
};

let clearControlClass = () => {

    $("input").each(function(index) {
        $("#" + $(this).attr("id")).parent().removeClass("has-error");
        console.log(index + ": " + $(this).attr("id"));
    });
};