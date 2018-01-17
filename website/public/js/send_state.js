$(document).ready(function () {
    $(".radioButton").on("change", function () {
        var data = {};
        data.machine = "Machine1";
        data.status = this.innerText.trim();
        data.parent_mode = $(this).parents()[2].firstChild.nextSibling.innerText.trim();

        $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: 'SendState',
            success: function (data) {
                console.log('success');
                console.log(JSON.stringify(data));
            }
        });
    });
});