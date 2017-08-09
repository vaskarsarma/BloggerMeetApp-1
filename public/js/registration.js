$(function() {

    var servicePath = $("#spnServicePath").text();
    $("#inputUserName").on("blur", () => {
        // console.log(servicePath);
        userSignUp(servicePath);
    });

});

let userSignUp = (servicePath) => {
    servicePath = servicePath != null ? servicePath : "http://localhost:3000";
    var url = servicePath + "/checkUserName/" + $("#inputUserName").val();
    $.ajax({
        url: url, // "https://www.emirates.com/api/fares/featured/uk/english/LHR",   
        dataType: 'json',
        success: function(data) {
            if (data != null && data.result != null && data.result == true)
                $(".ErrorPanel").html(ErrorMessage(" <strong>Warning!</strong> user name already available")).removeClass("hidden");
            else
                $(".ErrorPanel").addClass("hidden");
        },
        error: function(err) {
            console.log("Error API :" + JSON.stringify(err));
        }
    });


    let ErrorMessage = ($message) => {
        return $("<div></div>").append($message);
    };
}