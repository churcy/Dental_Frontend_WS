//给新建和修改模板添加控件

var editerAction={
    modifyTeplate:function(){
        editerAction.getTextMenu();
        editerAction.analysisTemplate();
    },
    analysisTemplate:function(){

    },
    getTextMenu:function(){
        var menu="";
        menu+="<div class='editerActionMenu'>";
        menu+="<div class='editerActionMenuCtnFc'>";
        menu+="<div class='editerActionMenuItemFc' data-son='true' data-number='1'>下拉框</div>";
        menu+="</div>";
        menu+="<div class='editerActionMenuCtnSc'>";
        menu+="<div class='editerActionMenuItemSc toothPos' data-number='1'>牙位</div>";
        menu+="<div class='editerActionMenuItemSc toothDir' data-number='1'>方向</div>";
        menu+="<div class='editerActionMenuItemSc degree' data-number='1'>程度</div>";
        menu+="<div class='editerActionMenuItemSc type' data-number='1'>类型</div>";
        menu+="<div class='editerActionMenuItemSc sym' data-number='1'>对称</div>";
        menu+="</div>";
        menu+="</div>";

        $(".block  .item_input ").each(function(){
            var self=$(this);
            self.append(menu);
            editerAction.textMenuCtr(self);
        });
    },
    textMenuCtr:function(obj){
        var self=obj;
        var menu=self.find(".editerActionMenu");
        var pos=self.find(".toothPos");
        var toothDir=self.find(".toothDir");
        var degree=self.find(".degree");
        var type=self.find(".type");
        var sym=self.find(".sym");

        self.mousedown(function(e){
            e.stopPropagation();
            if(e.which == 3){
                var x= e.pageX - self.offset().left;
                var y= e.pageY - self.offset().top;
                menu.css({
                    "left":x+"px",
                    "top":y+"px"
                });
                menu.show();
            }else if(e.which == 1){
                menu.hide();
            }
        }).bind('contextmenu',function(e){
            e.preventDefault();
            return false;
        }).mouseleave(function(){
            menu.hide();
        });
        menu.mousedown(function(e){
            e.stopPropagation();
        });
        self.find(".editerActionMenuItemFc").each(function(){
            var item=$(this);
            var number=item.data("number");
            item.mouseover(function(){
                if(item.data("son")){
                    menu.find(".editerActionMenuCtnSc").show();
                    $(".editerActionMenuItemSc").hide();
                    menu.find(".editerActionMenuItemSc").each(function(){
                        if($(this).data("number") == number){
                            $(this).show();
                        }
                    });
                }
            });
        });
        menu.mouseleave(function(){
            menu.find(".editerActionMenuCtnSc").hide();
        });
        pos.mousedown(function(e){
            e.stopPropagation();
            if(e.which == 1){
                menu.hide();
                editerAction.insetPos(self);
            }
        });

        toothDir.mousedown(function(e){
            e.stopPropagation();
            if(e.which == 1){
                menu.hide();
                editerAction.insetToothDir(self);
            }
        });

        degree.mousedown(function(e){
            e.stopPropagation();
            if(e.which == 1){
                menu.hide();
                editerAction.insetDegree(self);
            }
        });

        type.mousedown(function(e){
            e.stopPropagation();
            if(e.which == 1){
                menu.hide();
                editerAction.insetType(self);
            }
        });

        sym.mousedown(function(e){
            e.stopPropagation();
            if(e.which == 1){
                menu.hide();
                editerAction.insetSym(self);
            }
        });



    },
    insetPos:function(obj){
        var self=obj;
        var text=self.find("text")[0];
        var selection=window.getSelection?window.getSelection():document.selection;
        var range=selection.createRange?selection.createRange():selection.getRangeAt(0);
        var node=document.createElement('div');
        node.setAttribute('class','kfselect action');
        node.setAttribute('contenteditable','false');
        node.setAttribute('data-ide','{{0,0}}');
        node.innerHTML="<div class='kfselectValue'>左上</div><div class='kfselectCtn'><div class='kfselectItem'>左上</div><div class='kfselectItem'>右上</div><div class='kfselectItem'>左下</div><div class='kfselectItem'>右下</div></div>";
        range.insertNode(node);
        selection.addRange(range);
        kfselect();
        editerAction.actionCtr(self);

    },
    insetToothDir:function(obj){
        var self=obj;
        var text=self.find("text")[0];
        var selection=window.getSelection?window.getSelection():document.selection;
        var range=selection.createRange?selection.createRange():selection.getRangeAt(0);
        var node=document.createElement('div');
        node.setAttribute('class','kfselect action');
        node.setAttribute('contenteditable','false');
        node.setAttribute('data-ide','{{0,1}}');
        node.innerHTML="<div class='kfselectValue'>左</div><div class='kfselectCtn'><div class='kfselectItem'>左</div><div class='kfselectItem'>右</div><div class='kfselectItem'>前</div><div class='kfselectItem'>后</div><div class='kfselectItem'>上</div><div class='kfselectItem'>下</div></div>";
        range.insertNode(node);
        selection.addRange(range);
        kfselect();
        editerAction.actionCtr(self);

    },
    insetDegree:function(obj){
        var self=obj;
        var text=self.find("text")[0];
        var selection=window.getSelection?window.getSelection():document.selection;
        var range=selection.createRange?selection.createRange():selection.getRangeAt(0);
        var node=document.createElement('div');
        node.setAttribute('class','kfselect action');
        node.setAttribute('contenteditable','false');
        node.setAttribute('data-ide','{{0,2}}');
        node.innerHTML="<div class='kfselectValue'>（-）</div><div class='kfselectCtn'><div class='kfselectItem'>（-）</div><div class='kfselectItem'>（+）</div><div class='kfselectItem'>（++）</div><div class='kfselectItem'>（+++）</div></div>";
        range.insertNode(node);
        selection.addRange(range);
        kfselect();
        editerAction.actionCtr(self);

    },
    insetType:function(obj){
        var self=obj;
        var text=self.find("text")[0];
        var selection=window.getSelection?window.getSelection():document.selection;
        var range=selection.createRange?selection.createRange():selection.getRangeAt(0);
        var node=document.createElement('div');
        node.setAttribute('class','kfselect action');
        node.setAttribute('contenteditable','false');
        node.setAttribute('data-ide','{{0,4}}');
        node.innerHTML="<div class='kfselectValue'>（Ⅰ）</div><div class='kfselectCtn'><div class='kfselectItem'>（Ⅰ）</div><div class='kfselectItem'>（Ⅱ）</div><div class='kfselectItem'>（Ⅲ）</div></div>";
        range.insertNode(node);
        selection.addRange(range);
        kfselect();
        editerAction.actionCtr(self);

    },
    insetSym:function(obj){
        var self=obj;
        var text=self.find("text")[0];
        var selection=window.getSelection?window.getSelection():document.selection;
        var range=selection.createRange?selection.createRange():selection.getRangeAt(0);
        var node=document.createElement('div');
        node.setAttribute('class','kfselect action');
        node.setAttribute('contenteditable','false');
        node.setAttribute('data-ide','{{0,3}}');
        node.innerHTML="<div class='kfselectValue'>对称</div><div class='kfselectCtn'><div class='kfselectItem'>对称</div><div class='kfselectItem'>不对称</div></div>";
        range.insertNode(node);
        selection.addRange(range);
        kfselect();
        editerAction.actionCtr(self);

    },
    actionCtr:function(obj){
        var self=obj.find(".text");
        var div=self.children(".action");
        div.each(function(){
            var del=$(this).data("del");
            var action=$(this);
            if(!del){
                $(this).data("del",1);
                $(this).append("<div class='deleteAction' contenteditable='false'>删除控件</div>");
                $(this).find(".deleteAction").css("left",$(this).width());
                var dom=$(this)[0];
                if(dom.all){
                    dom.onselectstart= function(){return false;};
                }else{
                    dom.onmousedown= function(){return false;};
                    dom.onmouseup= function(){return true;};
                }
                dom.onselectstart = new Function('event.returnValue=false;');
                $(this).mousedown(function(e){
                    e.stopPropagation();
                    if(e.which == 3){
                        $(this).find(".deleteAction").show();
                    }
                }).mouseleave(function(){
                    $(this).find(".deleteAction").hide();
                });

                $(this).find(".deleteAction").mousedown(function(e){
                    if(e.which == 1){
                        action.remove();
                    }
                });


            }
        });
    }
};

