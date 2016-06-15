$(function(){
    getProblemList();
});

//获取问题列表
function getProblemList(){
    var obj={};
    $.ajax({
        url:"/users/getProblemList",
        type:"POST",
        data:obj,
        success:function(data){
            $(".work").html("");
            $(".work").append(data);
            $(".question").each(function(){
                var qes=$(this);
                qes.find(".answer_item").each(function(){
                    var item=$(this);
                    var check, like;
                    item.find(".like").click(function(){
                        if($(this).data("check") == "true"){
                            like=$(this).find(".like_text").find("span").text();
                            like--;
                            $(this).find(".like_text").find("span").text(like);
                            $(this).data("check","false");

                        }else{
                            like=$(this).find(".like_text").find("span").text();
                            like++;
                            $(this).find(".like_text").find("span").text(like);
                            $(this).data("check","true");

                        }

                    });
                });
            });
        }
    })
}