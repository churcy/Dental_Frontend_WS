$(function(){
   $(".tableRow .tableName").on("click",function(){
       $.cookie("currentPatientName",$(this).text(),{ expires:7, path: '/'});
   })
});