function aSubmit() {
    $(":submit", this).attr("disabled", "disabled");
    var f = this;
    $.ajax({
        url: "/api/send",
        data: $(this).serialize(),
        type: "POST",
        error: function() {
            $('#panel').text("send failure\n");
            $(":submit", f).attr("disabled", false);
        },
        success: function() {
            $('#panel').text("send Success\n");
            $(":submit", f).attr("disabled", false);
        }
    });
};