$(function () {
    console.log("coucou les enfants!")

    function loadFestival() {
        $.getJSON("/api/festival/", function (festival) {
            console.log(festival)
            var message = festival.name + " " + festival.place
            $("#header").text(message)
        })
    }
    loadFestival()
    setInterval(loadFestival, 2000)
});