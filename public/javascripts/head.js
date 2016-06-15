$(function(){
    toUserInfo();
    toSet();
    toAddUser();
});

function toUserInfo(){
    $(".toUserInfo").click(function(){
        window.location.href="/user?statu=userInfo";
    });
}

function toSet(){
    $(".toSet").click(function(){
        window.location.href="/user?statu=set";
    });
}
function toAddUser(){
    $(".toAddUser").click(function(){
        window.location.href="/user?statu=addUser";
    });
}




















