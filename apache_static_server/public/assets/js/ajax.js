$(function () {
    console.log("script loaded !")

    function loadFun() {
        $.getJSON("/api/fun/", function (fun) {
            console.log(fun)
            $("div.sentence").append(fun.sentence)
            $("div.number").append(fun.number.toString())
            $("div.hashtag").append(fun.hashtag)
        })
    }
    loadFun()
    //setInterval(loadFun, 2000)
});
