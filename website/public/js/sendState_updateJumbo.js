function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
$(document).ready(function () {
    $(".radioButton").on("change", function () {
        var data = {};
        data.machine = getCookie('UserID');
        data.status = this.innerText.trim();
        data.parent_mode = $(this).parents()[2].firstChild.nextSibling.innerText.trim();
        document.getElementById("jumbotron").innerHTML = data.status;
        var col = "blue";
        if (data.parent_mode == "ON") col = "green";
        else if (data.parent_mode == "FAILED") col = "red";
        document.getElementById("jumbotron").style.color = col;
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