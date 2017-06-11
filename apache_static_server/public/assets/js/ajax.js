$(function () {
    console.log("script loaded !")

    function loadFun() {
        $.getJSON("/api/fun/", function (fun) {
            console.log(fun)
            console.log(fun.sentence)
            $("div.sentence").append(fun.sentence)
        })
    }
    loadFun()
    //setInterval(loadFun, 2000)
});
