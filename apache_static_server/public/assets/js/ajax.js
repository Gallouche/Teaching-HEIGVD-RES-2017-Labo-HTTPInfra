$(function () {
	function fetch(){
        $.getJSON("/api/fun/", function (fun) {
            console.log(fun)
            $("div.sentence > strong").html(fun.sentence)
            $("div.number > strong").html(fun.number.toString())
            $("div.hashtag > strong").html(fun.hashtag)
        })
    }
    fetch()
    setInterval(fetch, 5000)
});
