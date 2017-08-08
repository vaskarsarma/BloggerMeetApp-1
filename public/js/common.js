$(function() {


});

let GetCompiledTemplate = (fileName) => {
    var d = $.Deferred();
    $.ajax({
            method: "Get",
            url: "/templates/" + fileName + ".handlebars",
            dataType: "text"
        })
        .done(function(data) {
            d.resolve(data);
        })
        .fail(function() {
            d.reject;
        })
        .always(function() {});
    return d.promise();
};