$(function(){
    tools. kfselect();
    regTab();
});

function regTab(){
    $(".functionBlockradio").on("click",function(){
        $(".functionBlockradio").removeClass("functionBlockradioAcitve");
        $(this).addClass("functionBlockradioAcitve");
    })
}