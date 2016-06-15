$(function(){
    caseTemplate.init();
});


var caseTemplate= {
    init: function () {
        caseTemplate.medicalList();
        caseTemplate.getRootNodes();
        caseTemplate.tab();
    },
    tab: function () {
        $("#systemTemplate").click(function () {
            if (!$(this).hasClass("caseManageListCtrItemChecked")) {
                caseTemplate.clearTab($(this));
                caseTemplate.getRootNodes();
            }
        });

        $("#personalTemplate").click(function () {
            if (!$(this).hasClass("caseManageListCtrItemChecked")) {
                caseTemplate.clearTab($(this));
                caseTemplate.getPersonalRootNodes();
            }
        })
    },
    clearTab: function (obj) {
        $(".caseManageListCtrItem").removeClass("caseManageListCtrItemChecked");
        obj.addClass("caseManageListCtrItemChecked");
        $(".caseManageListCtn").empty();
    },
    getPersonalRootNodes: function () {
        var obj = {};
        $.ajax({
            url: "/users/getPersonalRootNodes",
            type: "POST",
            data: obj,
            success: function (data) {
                var a = eval("(" + data + ")");
                var str = "";
                for (var i = 0; i < a.rootNodesList.length; i++) {
                    str += "<div class='caseManageListCtnPakage caseManageListCtnPakageFirst' data-id='" + a.rootNodesList[i].nodeId + "' data-type='" + a.rootNodesList[i].nodeType + "' data-statu='close'>";
                    str += "<div class='caseManageListCtnPakageTt'>";
                    str += "<div class='close'></div>";
                    str += "<div>" + a.rootNodesList[i].nodeName + "</div>";
                    str += "<div class='caseManageListCtnPakageMenu'>";
                    str += "<div class='caseManageListCtnPakageMenuItem createMedicalNode'>创建子节点</div>";
                    str += "<div class='caseManageListCtnPakageMenuItem creatTemplate'>创建病例模板</div>";
                    str += "<div class='caseManageListCtnPakageMenuItem deleteNode'>删除节点</div>";
                    str += "</div>";
                    str += "</div>";
                    str += "</div>";
                }
                str += "<div class='caseManageListCtnMenu'><div class='caseManageListCtnMenuItem'>增加根节点</div></div>";
                $(".caseManageListCtn").append(str);
                caseTemplate.menuCtr();
                caseTemplate.getChildNodes();
            }
        });
    },
    medicalList: function () {
        var str = "";
        str += "<div class='block scrollWith'>";
        str += "<div class='block_ctr'>";
        str += "<div class='block_btn block_btn02 cancel_record'>取消</div><div class='block_btn store_record'>保存</div>";
        str += "</div>";
        str += "</div>";
        str += "<div class='block'>";
        str += "<div class='block_form'>";
        str += "<div class='block_form_tt'><div class='basicInfo'>患者基本信息</div></div>";
        str += "<div class='block_form_ctn'>";
        if (!window.urlData.id) {
            str += "<div class='item_half'><div class='item_tt'>患者姓名：</div><div class='item_input' ><div id='realName' class='text' contenteditable='true' data-nuValue='患者姓名不能为空'></div></div></div>";
            str += "<div class='item_half'><div class='item_tt red'>*&nbsp;过敏史：</div><div class='item_input'><div id='allergy' class='text' contenteditable='true' data-nuValue='过敏史不能为空'></div></div></div>";
            str += "<div class='item_half'><div class='item_tt'>出生日期：</div><div class='item_input'><div id='birthday' class='kfTimePicker' data-dir='before' data-nuValue='请选择出生日期'></div></div></div>";
            str += "<div class='item_half'><div class='item_tt'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><div id='gender'  class='item_input kfselect'>";
            str += "<div class='kfselectValue'>男</div>";
            str += "<div class='kfselectCtn'>";
            str += "<div class='kfselectItem'>男</div>";
            str += "<div class='kfselectItem'>女</div>";
            str += "</div></div></div>";
            str += "<div class='item_half'><div class='item_tt'>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div><div  class='item_input' ><div id='age' class='text' contenteditable='true' data-nuValue='年龄不能为空'></div></div></div>";
            str += "<div class='item_half'><div class='item_tt'>联系方式：</div><div class='item_input' ><div id='mobile' class='text' contenteditable='true' data-nuValue='请输入手机号'></div></div></div>";
            str += "<div class='block'>";
            str += "<div class='block_form'>";
            str += "<div class='block_form_tt pt10'><div>患者病例模板</div></div>";
            str += "<div class='block_form_ctn'>";
            str += "<div class='item'><div class='item_tt'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</div><div class='item_input'><div id='complaint' contenteditable='true' class='text row2' data-nuValue='主诉不能为空'  ></div></div></div>";
            str += "<div class='item'><div class='item_tt'>现&nbsp;病&nbsp;史：</div><div class='item_input'><div contenteditable='true' id='historyPresentIllness' class='text row3' data-nuValue='现病史不能为空'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>既往病史：</div><div class='item_input'><div contenteditable='true' id='historyPastIllness' class='text row2' data-nuValue='既往病史不能为空'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查：</div><div class='item_input'><div id='inspectNo' class='img'><div class='lt' contenteditable='true' ></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='检查不能为空' contenteditable='true' id='inspect' class='text row3 w80'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>辅助检查：</div><div class='item_input'><div id='assistantInspectNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='辅助检查不能为空'  contenteditable='true' id='assistantInspect' class='text row3 w80'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断：</div><div  class='item_input'><div id='diagnosisNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='诊断不能为空' contenteditable='true' id='diagnosis' class='text row3 w80'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>治疗计划：</div><div class='item_input'><div id='treatmentPlanNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='治疗计划不能为空' contenteditable='true' id='treatmentPlan' class='text row3 w80'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗：</div><div class='item_input'><div id='treatmentNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='治疗不能为空' contenteditable='true' id='treatment' class='text row3 w80'></div></div></div>";
            str += "<div class='item'><div class='item_tt'>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;嘱：</div><div class='item_input'><div data-nuValue='医嘱不能为空' contenteditable='true' id='orders' class='text row3'></div></div></div>";
            str += "</div>";
            str += "</div>";
            str += "</div>";
            str += "<div class='revisit'>";
            str += "加入待回访列表：<input type='radio' checked='checked' name='revisit' value='1' />是<input type='radio' name='revisit' value='0' />否";
            str += "</div>";
            str += "<div class='orderRevisit rebackDate'>";
            str += "<div class='fl'>预定回访时间：</div><div class='kfTimePicker' data-nuValue='请选择预定回访时间'></div>";
            str += "</div>";
            str += "<div class='orderRevisit nextVisitDate'>";
            str += "<div class='fl'>下次就诊时间：</div><div class='kfTimePicker'></div>";
            str += "</div>";
            $.ajax({
                url: "/users/getGroupList",
                type: "POST",
                data: obj,
                success: function (data) {
                    var b = eval('( ' + data + ' )');
                    str += "<div class='allocationGroup orderRevisit nextVisitDate'>";
                    str += "<div class='fl'>分配好友分组：</div>";
                    str += "<div class='kfselect' data-itemmax='5'>";
                    str += "<div class='kfselectValue' data-groupid='" + b.groupList[0].groupId + "'>" + b.groupList[0].groupName + "</div>";
                    str += "<div class='kfselectCtn'>";
                    for (var i = 0; i < b.groupList.length; i++) {
                        str += "<div data-groupid='" + b.groupList[i].groupId + "' class='kfselectItem'>" + b.groupList[i].groupName + "</div>";
                    }
                    str += "</div>";
                    str += "</div>";
                    str += "</div>";
                    str += "<div class='doc'>";
                    str += "主治医生：<img src='../images/common/sign.png' />";
                    str += "</div>";
                    $(".work").append(str);
                    tools.scrollWith();
                    kfTimePicker();

                    $(".allocationGroup").find(".kfselectItem").click(function () {
                        $(".allocationGroup").find(".kfselectValue").data("groupid", $(this).data("groupid"))
                    });
                    $(".work .revisit input[value='1']").click(function () {
                        $(".rebackDate").show();
                        if(!$(".rebackDate .kfTimePicker").data("nuvalue")){
                            $(".rebackDate .kfTimePicker").data("nuvalue","请选择预定回访时间")
                        }
                    });
                    $(".work .revisit input[value='0']").click(function () {
                        $(".rebackDate").hide();
                        $(".rebackDate .kfTimePicker").data("nuvalue","")
                    });
                    $(".store_record").click(function () {
                        var pass=caseTemplate.checkData();
                        if(pass){
                            var obj = {};
                            obj.revisit = $('.revisit input[name="revisit"]:checked ').val();
                            if (obj.revisit == 1) {
                                obj.revisitDate = tools.addZero($(".rebackDate .kfTimePicker").data("year"), 2) + tools.addZero($(".rebackDate .kfTimePicker").data("month"), 2) + tools.addZero($(".rebackDate .kfTimePicker").data("date"), 2);
                            }
                            obj.name = $("#realName").text();
                            obj.allergy = $("#allergy").text();
                            obj.birthday = $("#birthday").data("year") + tools.addZero($("#birthday").data("month"), 2) + tools.addZero($("#birthday").data("date"), 2);
                            if ($("#gender").find(".kfselectValue").text() == "男") {
                                obj.gender = 0;
                            } else if ($("#gender").find(".kfselectValue").text() == "女") {
                                obj.gender = 1;
                            }
                            obj.age = $("#age").text();
                            obj.mobile = $("#mobile").text();
                            obj.complaint = caseTemplate.translateTemplate($("#complaint"));
                            obj.historyPresentIllness = caseTemplate.translateTemplate($("#historyPresentIllness"));
                            obj.historyPastIllness = caseTemplate.translateTemplate($("#historyPastIllness"));
                            obj.inspect = caseTemplate.translateTemplate($("#inspect"));
                            obj.assistantInspect = caseTemplate.translateTemplate($("#assistantInspect"));
                            obj.diagnosis = caseTemplate.translateTemplate($("#diagnosis"));
                            obj.treatmentPlan = caseTemplate.translateTemplate($("#treatmentPlan"));
                            obj.treatment = caseTemplate.translateTemplate($("#treatment"));
                            obj.orders = caseTemplate.translateTemplate($("#orders"));
                            obj.inspectNo = pakageNo($("#inspectNo"));
                            obj.assistantInspectNo = pakageNo($("#assistantInspectNo"));
                            obj.diagnosisNo = pakageNo($("#diagnosisNo"));
                            obj.treatmentPlanNo = pakageNo($("#treatmentPlanNo"));
                            obj.treatmentNo = pakageNo($("#treatmentNo"));
                            obj.groupId = $(".allocationGroup").find(".kfselectValue").data("groupid");
                            $.ajax({
                                url: "/users/createMedicalTmp",
                                type: "POST",
                                data: obj,
                                success: function (data) {
                                    var a = eval('( ' + data + ' )');
                                    if (a.status == "000") {
                                        window.location.href = "/index";
                                    }
                                }
                            })
                        }
                    });
                }
            });
        } else {
            var obj = {};
            obj.id = window.urlData.id;
            $.ajax({
                url: "/users/getPatientInfo",
                type: "POST",
                data: obj,
                success: function (data) {
                    var a = eval("(" + data + ")");
                    str += "<div class='item_half'><div class='item_tt'>患者姓名：</div><div style='background:transparent;border:0 none;' class='item_input' >" + a.userInfo.realName + "</div></div>";
                    str += "<div class='item_half'><div class='item_tt red'>*&nbsp;过敏史：</div><div class='item_input'><div data-nuValue='过敏史不能为空' id='allergy' class='text' contenteditable='true'></div></div></div>";
                    str += "<div class='item_half'><div class='item_tt'>出生日期：</div><div style='background:transparent;border:0 none;' class='item_input'>" + a.userInfo.birthday + "</div></div>";
                    if (a.userInfo.gender == 0) {
                        str += "<div class='item_half'><div class='item_tt'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><div style='background:transparent;border:0 none;' class='item_input' >男</div></div>";
                    } else if (a.userInfo.gender == 1) {
                        str += "<div class='item_half'><div class='item_tt'>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：</div><div style='background:transparent;border:0 none;' class='item_input' >女</div></div>";
                    }
                    str += "<div class='item_half'><div class='item_tt'>年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;龄：</div><div style='background:transparent;border:0 none;' class='item_input' >" + a.userInfo.age + "</div></div>";
                    str += "<div class='item_half'><div class='item_tt'>联系方式：</div><div style='background:transparent;border:0 none;' class='item_input' >" + a.userInfo.mobile + "</div></div>";
                    str += "</div>";
                    str += "</div>";
                    str += "</div>";
                    str += "<div class='block'>";
                    str += "<div class='block_form'>";
                    str += "<div class='block_form_tt pt10'><div>患者病例模板</div></div>";
                    str += "<div class='block_form_ctn'>";
                    str += "<div class='item'><div class='item_tt'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</div><div class='item_input'><div id='complaint' contenteditable='true' class='text row2' data-nuValue='主诉不能为空'  ></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>现&nbsp;病&nbsp;史：</div><div class='item_input'><div contenteditable='true' id='historyPresentIllness' class='text row3' data-nuValue='现病史不能为空'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>既往病史：</div><div class='item_input'><div contenteditable='true' id='historyPastIllness' class='text row2' data-nuValue='既往病史不能为空'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查：</div><div class='item_input'><div id='inspectNo' class='img'><div class='lt' contenteditable='true' ></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='检查不能为空' contenteditable='true' id='inspect' class='text row3 w80'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>辅助检查：</div><div class='item_input'><div id='assistantInspectNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='辅助检查不能为空'  contenteditable='true' id='assistantInspect' class='text row3 w80'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断：</div><div  class='item_input'><div id='diagnosisNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='诊断不能为空' contenteditable='true' id='diagnosis' class='text row3 w80'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>治疗计划：</div><div class='item_input'><div id='treatmentPlanNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='治疗计划不能为空' contenteditable='true' id='treatmentPlan' class='text row3 w80'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗：</div><div class='item_input'><div id='treatmentNo' class='img'><div class='lt' contenteditable='true'></div><div class='rt' contenteditable='true'></div><div class='lb' contenteditable='true'></div><div contenteditable='true' class='rb'></div></div><div data-nuValue='治疗不能为空' contenteditable='true' id='treatment' class='text row3 w80'></div></div></div>";
                    str += "<div class='item'><div class='item_tt'>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;嘱：</div><div class='item_input'><div data-nuValue='医嘱不能为空' contenteditable='true' id='orders' class='text row3'></div></div></div>";
                    str += "</div>";
                    str += "</div>";
                    str += "</div>";
                    str += "<div class='revisit'>";
                    str += "加入待回访列表：<input type='radio' checked='checked' name='revisit' value='1' />是<input type='radio' name='revisit' value='0' />否"
                    str += "</div>";
                    str += "<div class='orderRevisit rebackDate'>";
                    str += "<div class='fl'>预定回访时间：</div><div class='kfTimePicker' data-nuValue='请选择预定回访时间'></div>";
                    str += "</div>";
                    str += "<div class='orderRevisit nextVisitDate'>";
                    str += "<div class='fl'>下次就诊时间：</div><div class='kfTimePicker'></div>";
                    str += "</div>";
                    str += "<div class='doc'>";
                    str += "主治医生：<img src='../images/common/sign.png' />";
                    str += "</div>";
                    $(".work").append(str);
                    tools.scrollWith();
                    kfTimePicker();

                    $(".work .revisit input[value='1']").click(function () {
                        $(".rebackDate").show();
                        if(!$(".rebackDate .kfTimePicker").data("nuvalue")){
                            $(".rebackDate .kfTimePicker").data("nuvalue","请选择预定回访时间")
                        }
                    });
                    $(".work .revisit input[value='0']").click(function () {
                        $(".rebackDate").hide();
                        $(".rebackDate .kfTimePicker").data("nuvalue","")
                    });
                    $(".store_record").click(function () {
                        var pass=caseTemplate.checkData();
                        if(pass){
                            var obj = {};
                            obj.id = window.urlData.id;
                            obj.allergy = $("#allergy").text();
                            obj.complaint = caseTemplate.pakageText($("#complaint"));
                            obj.historyPresentIllness = caseTemplate.pakageText($("#historyPresentIllness"));
                            obj.historyPastIllness = caseTemplate.pakageText($("#historyPastIllness"));
                            obj.inspect = caseTemplate.pakageText($("#inspect"));
                            obj.assistantInspect = caseTemplate.pakageText($("#assistantInspect"));
                            obj.diagnosis = caseTemplate.pakageText($("#diagnosis"));
                            obj.treatmentPlan = caseTemplate.pakageText($("#treatmentPlan"));
                            obj.treatment = caseTemplate.pakageText($("#treatment"));
                            obj.orders = caseTemplate.pakageText($("#orders"));
                            obj.inspectNo = pakageNo($("#inspectNo"));
                            obj.assistantInspectNo = pakageNo($("#assistantInspectNo"));
                            obj.diagnosisNo = pakageNo($("#diagnosisNo"));
                            obj.treatmentPlanNo = pakageNo($("#treatmentPlanNo"));
                            obj.treatmentNo = pakageNo($("#treatmentNo"));
                            obj.revisit = $('.revisit input[name="revisit"]:checked ').val();
                            if (obj.revisit == 1) {
                                obj.revisitDate = tools.addZero($(".rebackDate .kfTimePicker").data("year"), 2) + tools.addZero($(".rebackDate .kfTimePicker").data("month"), 2) + tools.addZero($(".rebackDate .kfTimePicker").data("date"), 2);
                            }
                            $.ajax({
                                url: "/users/createMedical",
                                type: "POST",
                                data: obj,
                                success: function (data) {
                                    var a = eval('( ' + data + ' )');
                                    if (a.status == "000") {
                                        window.location.href = "/index";
                                    }
                                }
                            })
                        }
                    });
                }
            });
        }
    },
    getRootNodes: function () {
        var obj = {};
        $.ajax({
            url: "/users/getRootNodes",
            type: "POST",
            data: obj,
            success: function (data) {
                var a = eval("(" + data + ")");
                var str = "";
                for (var i = 0; i < a.rootNodesList.length; i++) {
                    str += "<div class='caseManageListCtnPakage caseManageListCtnPakageFirst' data-id='" + a.rootNodesList[i].nodeId + "' data-type='" + a.rootNodesList[i].nodeType + "' data-statu='close'>";
                    str += "<div class='caseManageListCtnPakageTt'>";
                    str += "<div class='close'></div>";
                    str += "<div>" + a.rootNodesList[i].nodeName + "</div>";
                    str += "</div>";
                    str += "</div>";
                }
                $(".caseManageListCtn").append(str);
                caseTemplate.menuSysCtr();
                caseTemplate.getChildNodes();
            }
        });
    },
    menuCtr: function () {
        $(".caseManageListCtnPakage").each(function () {
            var self = $(this);
            if (!self.data("menu")) {
                self.data("menu", 1);
                var tt = self.children(".caseManageListCtnPakageTt");
                var menu = tt.children(".caseManageListCtnPakageMenu");
                var creatNode = menu.children(".createMedicalNode");
                var creatTemplate = menu.children(".creatTemplate");
                var modifyTemplate = menu.children(".modifyTemplate");
                var deleteTemplate = menu.children(".deleteTemplate");
                var deleteNode = menu.children(".deleteNode");
                var creatRootNode = menu.children(".createRootNode");
                tt.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 3) {
                        var x = e.pageX - tt.offset().left;
                        var y = e.pageY - tt.offset().top;
                        menu.css({
                            "left": x + "px",
                            "top": y + "px"
                        });
                        menu.show();
                    } else if (e.which == 1) {
                        menu.hide();
                    }
                }).bind('contextmenu', function (e) {
                    e.preventDefault();
                    return false;
                }).mouseleave(function () {
                    menu.hide();
                });
                creatNode.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.creatNode(self);
                    }
                });

                creatTemplate.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.newTemplate(self.data("id"));
                    }
                });
                modifyTemplate.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.modifyTemplate(self.data("id"), self.data("tid"));
                    }
                });

                deleteTemplate.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.deleteTemplate(self.data("tid"));
                    }
                });

                deleteNode.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.deleteNode(self.data("id"));
                    }
                });

                creatRootNode.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.creatRootNode(self);
                    }
                });
            }
        });
        $(".caseManageListCtn").mousedown(function (e) {
            e.stopPropagation();
            if (e.which == 3) {
                var x = e.pageX - $(this).offset().left;
                var y = e.pageY - $(this).offset().top;
                $(".caseManageListCtnMenu").css({
                    "left": x + "px",
                    "top": y + "px"
                });
                $(".caseManageListCtnMenu").show();
            } else if (e.which == 1) {
                $(".caseManageListCtnMenu").hide();
            }
        }).bind('contextmenu', function (e) {
            e.preventDefault();
            return false;
        }).mouseleave(function () {
            $(".caseManageListCtnMenu").hide();
        });


        $(".caseManageListCtnMenuItem").mousedown(function (e) {
            e.stopPropagation();
            if (e.which == 1) {
                $(".caseManageListCtnMenu").hide();
                caseTemplate.creatRootNode(self);
            }
        });
    },
    menuSysCtr:function(){
        $(".caseManageListCtnPakage").each(function () {
            var self = $(this);
            if (!self.data("menu")) {
                self.data("menu", 1);
                var tt = self.children(".caseManageListCtnPakageTt");
                var menu = tt.children(".caseManageListCtnPakageMenu");
                var creatNode = menu.children(".createMedicalNode");
                var creatTemplate = menu.children(".creatTemplate");
                var modifyTemplate = menu.children(".modifyTemplate");
                var deleteTemplate = menu.children(".deleteTemplate");
                var deleteNode = menu.children(".deleteNode");
                var creatRootNode = menu.children(".createRootNode");
                tt.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 3) {
                        var x = e.pageX - tt.offset().left;
                        var y = e.pageY - tt.offset().top;
                        menu.css({
                            "left": x + "px",
                            "top": y + "px"
                        });
                        menu.show();
                    } else if (e.which == 1) {
                        menu.hide();
                    }
                }).bind('contextmenu', function (e) {
                    e.preventDefault();
                    return false;
                }).mouseleave(function () {
                    menu.hide();
                });
                creatNode.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.creatSysNode(self);
                    }
                });

                creatTemplate.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.newTemplate(self.data("id"));
                    }
                });
                modifyTemplate.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.modifyTemplate(self.data("id"), self.data("tid"));
                    }
                });

                deleteTemplate.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.deleteTemplate(self.data("tid"));
                    }
                });

                deleteNode.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.deleteNode(self.data("id"));
                    }
                });

                creatRootNode.mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        menu.hide();
                        caseTemplate.creatRootNode(self);
                    }
                });
            }
        });
        $(".caseManageListCtn").mousedown(function (e) {
            e.stopPropagation();
            if (e.which == 3) {
                var x = e.pageX - $(this).offset().left;
                var y = e.pageY - $(this).offset().top;
                $(".caseManageListCtnMenu").css({
                    "left": x + "px",
                    "top": y + "px"
                });
                $(".caseManageListCtnMenu").show();
            } else if (e.which == 1) {
                $(".caseManageListCtnMenu").hide();
            }
        }).bind('contextmenu', function (e) {
            e.preventDefault();
            return false;
        }).mouseleave(function () {
            $(".caseManageListCtnMenu").hide();
        });


        $(".caseManageListCtnMenuItem").mousedown(function (e) {
            e.stopPropagation();
            if (e.which == 1) {
                $(".caseManageListCtnMenu").hide();
                caseTemplate.creatRootNode(self);
            }
        });
    },
    getChildNodes: function () {
        var obj = {};
        $(".caseManageListCtnPakage").each(function () {
            var self = $(this);
            if (!self.data("init")) {
                self.data("init", 1);
                self.children(".caseManageListCtnPakageTt").mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        if (self.data("statu") == "open") {
                            self.data("statu", "close");
                            self.find(".caseManageListCtnPakage").remove();
                            self.find(".caseManageListCtnFiles").remove();
                            $(this).children(".close").removeClass("open");
                        } else if (self.data("statu") == "close") {
                            self.data("statu", "open");
                            $(this).children(".close").addClass("open");
                            obj.id = self.data("id");
                            $.ajax({
                                url: "/users/getChildNodes",
                                type: "POST",
                                data: obj,
                                success: function (data) {
                                    var a = eval("(" + data + ")");
                                    var str = "";
                                    for (var i = 0; i < a.childNodes.length; i++) {
                                        if (a.childNodes[i].nodeType == 0) {
                                            str += "<div class='caseManageListCtnPakage' data-id='" + a.childNodes[i].nodeId + "' data-type='" + a.childNodes[i].nodeType + "' data-statu='close'>";
                                            str += "<div class='caseManageListCtnPakageTt'>";
                                            str += "<div class='close'></div>";
                                            str += "<div>" + a.childNodes[i].nodeName + "</div>";
                                            str += "<div class='caseManageListCtnPakageMenu'>";
                                            str += "<div class='caseManageListCtnPakageMenuItem createMedicalNode'>创建子节点</div>";
                                            str += "<div class='caseManageListCtnPakageMenuItem creatTemplate'>创建病例模板</div>";
                                            str += "<div class='caseManageListCtnPakageMenuItem deleteNode'>删除节点</div>";
                                            str += "</div>";
                                            str += "</div>";
                                            str += "</div>";
                                        }
                                    }
                                    for (var i = 0; i < a.childNodes.length; i++) {
                                        if (a.childNodes[i].nodeType == 1) {
                                            str += "<div class='caseManageListCtnPakage caseManageListCtnFiles' data-id='" + a.childNodes[i].nodeId + "' data-tid='" + a.childNodes[i].templateId + "' data-statu='close'>";
                                            str += "<div class='caseManageListCtnPakageTt'>";
                                            str += "<div class='page'></div>";
                                            str += "<div class='name'>" + a.childNodes[i].nodeName + "</div>";
                                            str += "<div class='caseManageListCtnPakageMenu'>";
                                            str += "<div class='caseManageListCtnPakageMenuItem createMedicalNode'>创建子节点</div>";
                                            str += "<div class='caseManageListCtnPakageMenuItem modifyTemplate'>修改病例模板</div>";
                                            str += "<div class='caseManageListCtnPakageMenuItem deleteTemplate'>删除病例模板</div>";
                                            str += "</div>";
                                            str += "</div>";
                                            str += "</div>";
                                        }
                                    }
                                    self.append(str);
                                    caseTemplate.getChildNodes();
                                    caseTemplate.menuSysCtr();
                                    caseTemplate.getTemplate();
                                }
                            })
                        }
                    }
                });
            }
        });
    },
    getTemplate: function () {
        $(".caseManageListCtnFiles").each(function () {
            var self = $(this);
            if (!self.data("file")) {
                self.data("file", 1);
                self.children(".caseManageListCtnPakageTt").mousedown(function (e) {
                    e.stopPropagation();
                    if (e.which == 1) {
                        var obj = {};
                        $(".caseManageCtn").empty();
                        obj.tid = self.data("tid");
                        $.ajax({
                            url: "/users/getMedicalTemplate",
                            type: "POST",
                            data: obj,
                            success: function (data) {
                                var a = eval("(" + data + ")");

                                $("#complaint").html(caseTemplate.pdf(a.medicalTemplate.complaint));
                                $("#historyPresentIllness").html(caseTemplate.pdf(a.medicalTemplate.historyPresentIllness));
                                $("#historyPastIllness").html(caseTemplate.pdf(a.medicalTemplate.historyPastIllness));
                                $("#inspect").html(caseTemplate.pdf(a.medicalTemplate.inspect));
                                $("#assistantInspect").html(caseTemplate.pdf(a.medicalTemplate.assistantInspect));
                                $("#diagnosis").html(caseTemplate.pdf(a.medicalTemplate.diagnosis));
                                $("#treatmentPlan").html(caseTemplate.pdf(a.medicalTemplate.treatmentPlan));
                                $("#treatment").html(caseTemplate.pdf(a.medicalTemplate.treatment));
                                $("#orders").html(caseTemplate.pdf(a.medicalTemplate.orders));


                                caseTemplate.stopEditer();

                                kfselect();

                                var str = "";
                                str += "<div class='caseManageCtnTt'><div class='fl ml10'>" + self.children(".caseManageListCtnPakageTt").children(".name").text() + "</div></div>";
                                str += "<div class='caseManageCtnList'>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>主诉：</span><span>" + a.medicalTemplate.complaint + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>现病史：</span><span>" + a.medicalTemplate.historyPresentIllness + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>既往病史：</span><span>" + a.medicalTemplate.historyPastIllness + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>检查：</span><span>" + a.medicalTemplate.inspect + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>辅助检查：</span><span>" + a.medicalTemplate.assistantInspect + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>诊断：</span><span>" + a.medicalTemplate.diagnosis + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>治疗计划：</span><span>" + a.medicalTemplate.treatmentPlan + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>治疗：</span><span>" + a.medicalTemplate.treatment + "</span></div>";
                                str += "<div class='caseManageCtnListItem'><span class='orange'>医嘱：</span><span>" + a.medicalTemplate.orders + "</span></div>";
                                str += "</div>";
                                $(".caseManageCtn").append(str);

                            }
                        });
                    }
                });
            }
        });
    },
    creatNode: function (self) {
        var str = "";
        str += "<div id='newNode' class='caseManageListCtnPakage'>";
        str += "<div class='caseManageListCtnPakageTt'>";
        str += "<div class='close'></div>";
        str += "<div style='width:100px;height:22px;cursor:text;' class='fl' contenteditable='true'></div>";
        str += "</div>";
        str += "</div>";
        self.append(str);
        $("#newNode").keypress(function (e) {
            if (e.which == 13) {
                var obj = {};
                obj.name = $(this).children(".caseManageListCtnPakageTt").children(".fl").text();
                obj.id = self.data("id");
                $.ajax({
                    url: "/users/createMedicalNode",
                    type: "POST",
                    data: obj,
                    success: function (data) {
                        $(".caseManageListCtn").empty();
                        caseTemplate.init();
                    }
                });
            }
        });
    },
    creatSysNode: function (self) {
        var str = "";
        str += "<div id='newNode' class='caseManageListCtnPakage'>";
        str += "<div class='caseManageListCtnPakageTt'>";
        str += "<div class='close'></div>";
        str += "<div style='width:100px;height:22px;cursor:text;' class='fl' contenteditable='true'></div>";
        str += "</div>";
        str += "</div>";
        self.append(str);
        $("#newNode").keypress(function (e) {
            if (e.which == 13) {
                var obj = {};
                obj.name = $(this).children(".caseManageListCtnPakageTt").children(".fl").text();
                obj.id = self.data("id");
                $.ajax({
                    url: "/users/createSysMedicalNode",
                    type: "POST",
                    data: obj,
                    success: function (data) {
                        var a=eval("("+data+")");
                        if(a.status == "000"){
                            location=location;
                        }
                    }
                });
            }
        });
    },
    newTemplate: function (id) {
        $(".work").empty();
        var str = "";
        str += "<div class='block scrollWith'>";
        str += "<div class='block_ctr'>";
        str += "<div class='block_btn block_btn02 cancel_record'>取消</div><div class='block_btn store_record'>保存</div>";
        str += "</div>";
        str += "</div>";
        str += "<div class='block'>";
        str += "<div class='block_form'>";
        str += "<div class='block_form_tt pt10'><div>患者病例模板</div></div>";
        str += "<div class='block_form_ctn'>";
        str += "<div class='item'><div class='item_tt'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</div><div class='item_input'><div id='complaint' contenteditable='true' class='text row2'  ></div></div></div>";
        str += "<div class='item'><div class='item_tt'>现&nbsp;病&nbsp;史：</div><div class='item_input'><div contenteditable='true' id='historyPresentIllness' class='text row3'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>既往病史：</div><div class='item_input'><div contenteditable='true' id='historyPastIllness' class='text row2'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查：</div><div class='item_input'><div contenteditable='true' id='inspect' class='text row3'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>辅助检查：</div><div class='item_input'><div contenteditable='true' id='assistantInspect' class='text row3'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断：</div><div  class='item_input'><div contenteditable='true' id='diagnosis' class='text row3'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>治疗计划：</div><div class='item_input'><div contenteditable='true' id='treatmentPlan' class='text row3'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗：</div><div class='item_input'><div contenteditable='true' id='treatment' class='text row3'></div></div></div>";
        str += "<div class='item'><div class='item_tt'>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;嘱：</div><div class='item_input'><div contenteditable='true' id='orders' class='text row3'></div></div></div>";
        str += "</div>";
        str += "</div>";
        str += "</div>";

        $(".work").append(str);

        tools.scrollWith();
        editerAction.modifyTeplate();
        $(".work .revisit input[value='1']").click(function () {
            $(".rebackDate").show();
            if(!$(".rebackDate .kfTimePicker").data("nuvalue")){
                $(".rebackDate .kfTimePicker").data("nuvalue","请选择预定回访时间")
            }
        });
        $(".work .revisit input[value='0']").click(function () {
            $(".rebackDate").hide();
            $(".rebackDate .kfTimePicker").data("nuvalue","")
        });
        var obj = {};
        $(".store_record").click(function () {
            obj.id = id;
            obj.complaint = caseTemplate.translateTemplate($("#complaint"));
            obj.historyPresentIllness = caseTemplate.translateTemplate($("#historyPresentIllness"));
            obj.historyPastIllness = caseTemplate.translateTemplate($("#historyPastIllness"));
            obj.inspect = caseTemplate.translateTemplate($("#inspect"));
            obj.assistantInspect = caseTemplate.translateTemplate($("#assistantInspect"));
            obj.diagnosis = caseTemplate.translateTemplate($("#diagnosis"));
            obj.treatmentPlan = caseTemplate.translateTemplate($("#treatmentPlan"));
            obj.treatment = caseTemplate.translateTemplate($("#treatment"));
            obj.orders = caseTemplate.translateTemplate($("#orders"));
            $.ajax({
                url: "/users/createMedicalTemplate",
                type: "POST",
                data: obj,
                success: function (data) {
                    var a = eval("(" + data + ")");
                    if (a.status == "000") {
                        location = location;
                    }
                }
            })
        });
    },
    modifyTemplate: function (id, tid) {
        $(".work").empty();
        var obj = {};
        obj.id = id;
        obj.tid = tid;
        $.ajax({
            url: "/users/getMedicalTemplate",
            type: "POST",
            data: obj,
            success: function (data) {
                var str = "";
                var a = eval("(" + data + ")");
                str += "<div class='block scrollWith'>";
                str += "<div class='block_ctr'>";
                str += "<div class='block_btn block_btn02 cancel_record'>取消</div><div class='block_btn store_record'>保存</div>";
                str += "</div>";
                str += "</div>";
                str += "<div class='block'>";
                str += "<div class='block_form'>";
                str += "<div class='block_form_tt pt10'><div>患者病例模板</div></div>";
                str += "<div class='block_form_ctn'>";
                str += "<div class='item'><div class='item_tt'>主&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;诉：</div><div class='item_input'><div contenteditable='true'  id='complaint' class='text row2'>" + caseTemplate.pdf(a.medicalTemplate.complaint) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>现&nbsp;病&nbsp;史：</div><div class='item_input'><div contenteditable='true' id='historyPresentIllness' class='text row3'>" + caseTemplate.pdf(a.medicalTemplate.historyPresentIllness) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>既往病史：</div><div class='item_input'><div contenteditable='true' id='historyPastIllness' class='text row2'>" + caseTemplate.pdf(a.medicalTemplate.historyPastIllness) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>检&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;查：</div><div class='item_input'><div contenteditable='true' id='inspect' class='text row3'>" + caseTemplate.pdf(a.medicalTemplate.inspect) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>辅助检查：</div><div class='item_input'><div contenteditable='true' id='assistantInspect' class='text row3'>" + caseTemplate.pdf(a.medicalTemplate.assistantInspect) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>诊&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;断：</div><div class='item_input'><div contenteditable='true' id='diagnosis' class='text row3' >" + caseTemplate.pdf(a.medicalTemplate.diagnosis) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>治疗计划：</div><div class='item_input'><div contenteditable='true' id='treatmentPlan' class='text row3'>" + caseTemplate.pdf(a.medicalTemplate.treatmentPlan) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>治&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;疗：</div><div class='item_input'><div contenteditable='true' id='treatment' class='text row3' >" + caseTemplate.pdf(a.medicalTemplate.treatment) + "</div></div></div>";
                str += "<div class='item'><div class='item_tt'>医&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;嘱：</div><div class='item_input'><div contenteditable='true' id='orders' class='text row3' >" + caseTemplate.pdf(a.medicalTemplate.orders) + "</div></div></div>";
                str += "</div>";
                str += "</div>";
                str += "</div>";
                $(".work").append(str);
                caseTemplate.stopEditer();
                tools.scrollWith();
                kfselect();
                editerAction.getTextMenu();

                $(".work .block .block_form .block_form_ctn .item").each(function () {
                    editerAction.actionCtr($(this));
                    $(this).find(".action").each(function () {
                        $(this).data("ide", "{" + $(this).data("ide") + "}");
                    });
                });
                $(".store_record").mousedown(function (e) {
                    if (e.which == 1) {
                        obj.complaint = caseTemplate.translateTemplate($("#complaint"));
                        obj.historyPresentIllness = caseTemplate.translateTemplate($("#historyPresentIllness"));
                        obj.historyPastIllness = caseTemplate.translateTemplate($("#historyPastIllness"));
                        obj.inspect = caseTemplate.translateTemplate($("#inspect"));
                        obj.assistantInspect = caseTemplate.translateTemplate($("#assistantInspect"));
                        obj.diagnosis = caseTemplate.translateTemplate($("#diagnosis"));
                        obj.treatmentPlan = caseTemplate.translateTemplate($("#treatmentPlan"));
                        obj.treatment = caseTemplate.translateTemplate($("#treatment"));
                        obj.orders = caseTemplate.translateTemplate($("#orders"));
                        $.ajax({
                            url: "/users/modifyMedicalTemplate",
                            type: "POST",
                            data: obj,
                            success: function (data) {
                                var a = eval("(" + data + ")");
                                if (a.status == "000") {
                                    location = location;
                                }
                            }
                        })
                    }
                });
            }
        })
    },
    deleteTemplate: function (tid) {
        var obj = {};
        obj.tid = tid;
        $.ajax({
            url: "/users/deleteMedicalTemplate",
            type: "POST",
            data: obj,
            success: function (data) {
                var a = eval("(" + data + ")");
                if (a.status == "000") {
                    location = location;
                }
            }
        })
    },
    deleteNode: function (id) {
        var obj = {};
        obj.id = id;
        $.ajax({
            url: "/users/deleteMedicalNode",
            type: "POST",
            data: obj,
            success: function (data) {
                var a = eval("(" + data + ")");
                if (a.status == "02028") {
                    alert("有子节点无法删除");
                }
                if (a.status == "000") {
                    location = location;
                }
            }
        })
    },
    creatRootNode: function () {
        var str = "";
        str += "<div id='newNode' class='caseManageListCtnPakage caseManageListCtnPakageFirst'>";
        str += "<div class='caseManageListCtnPakageTt'>";
        str += "<div class='close'></div>";
        str += "<div style='width:100px;height:22px;cursor:text;' class='fl' contenteditable='true'></div>";
        str += "</div>";
        str += "</div>";
        $(".caseManageListCtn").append(str);

        $("#newNode").keypress(function (e) {
            if (e.which == 13) {
                var obj = {};
                obj.name = $(this).children(".caseManageListCtnPakageTt").children(".fl").text();
                $.ajax({
                    url: "/users/createPersonalMedicalNode",
                    type: "POST",
                    data: obj,
                    success: function (data) {
                        var a = eval("(" + data + ")");
                        if (a.status == "000") {
                            location = location;
                        }
                    }
                });
            }
        });
    },
    pdf: function (data) {
        var a = data;
        var dict = caseTemplate.actionDict;
        for (var key in dict) {
            while (a.indexOf(key) > -1) {
                a = a.replace(key, dict[key]);
            }
        }
        return a;

    },
    pakageText: function (obj) {
        return obj.clone().find(".kfselectCtn").remove().end().text();
    },
    translateTemplate: function (obj) {
        var self = obj;
        var ctn = self.html();
        if(ctn.indexOf("div") > -1){
            ctn=ctn.replaceAll("<div>","<br>");
            ctn=ctn.replaceAll("</div>","");
        }
        if (ctn.indexOf("action") > 0) {
            self.find(".action").each(function () {
                $(this).html($(this).data("ide"));
            });
            return self.text()
        } else if (!ctn) {
            return "无"
        } else {
            return ctn
        }
    },
    stopEditer: function () {
        $(".work .block .block_form .block_form_ctn .item").each(function () {
            $(this).find(".text").each(function () {
                $(this).find(".kfselect").each(function () {
                    var self = $(this)[0];
                    if (self.all) {
                        self.onselectstart = function () {
                            return false;
                        };
                    } else {
                        self.onmousedown = function () {
                            return false;
                        };
                        self.onmouseup = function () {
                            return true;
                        };
                    }

                });
            });
        });
    },
    checkData:function(){
        var pass=true;
        var check=false;

        $(".block_form_ctn .text").each(function(){
            if(!$(this).text() && !check){
                var txt=$(this).data("nuvalue");
                alert(txt);
                pass=false;
                check=true;
            }
        });

        $(".kfTimePicker").each(function(){
            if($(this).data("nuvalue") && !$(this).data("year") && !check){
                var txt=$(this).data("nuvalue");
                alert(txt)
                pass=false;
                check=true;
            }
        });

        return pass
    },
    actionDict: {
        "{{0,0}}": "<div class='kfselect action' contenteditable='false' data-ide='{0,0}'  ><div class='kfselectValue'>左上</div><div class='kfselectCtn'><div class='kfselectItem'>左上</div><div class='kfselectItem'>右上</div><div class='kfselectItem'>左下</div><div class='kfselectItem'>右下</div></div></div>",
        "{{0,1}}": "<div class='kfselect action' contenteditable='false' data-ide='{0,1}'  ><div class='kfselectValue'>左</div><div class='kfselectCtn'><div class='kfselectItem'>左</div><div class='kfselectItem'>右</div><div class='kfselectItem'>前</div><div class='kfselectItem'>后</div><div class='kfselectItem'>上</div><div class='kfselectItem'>下</div></div></div>",
        "{{0,2}}": "<div class='kfselect action' contenteditable='false' data-ide='{0,2}'  ><div class='kfselectValue'>（-）</div><div class='kfselectCtn'><div class='kfselectItem'>（-）</div><div class='kfselectItem'>（+）</div><div class='kfselectItem'>（++）</div><div class='kfselectItem'>（+++）</div></div></div>",
        "{{0,3}}": "<div class='kfselect action' contenteditable='false' data-ide='{0,3}'  ><div class='kfselectValue'>对称</div><div class='kfselectCtn'><div class='kfselectItem'>对称</div><div class='kfselectItem'>不对称</div></div></div>",
        "{{0,4}}": "<div class='kfselect action' contenteditable='false' data-ide='{0,3}'  ><div class='kfselectValue'>（Ⅰ）</div><div class='kfselectCtn'><div class='kfselectItem'>（Ⅰ）</div><div class='kfselectItem'>（Ⅱ）</div><div class='kfselectItem'>（Ⅲ）</div></div></div>"
    }
};























