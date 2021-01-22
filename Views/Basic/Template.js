
var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var CodeType = "Template";
    var TextCode = "[00]";

    var MethodShowCreate = function () {
        var data = [{ name: TextCode }];
        var TmpTable1 = $.templates("#TmpCodeDef");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "新增";
        Aobj.content = strtemp;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    MethodAppend('0');
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            $('#CodeDefForm #CodeID').keyup(function () { OnlyEnglishNum($(this)); });
        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodAppend = function (ID) {
        var obj = FormSerilizeJSON('#CodeDefForm');
        obj.UserName = UserInfo.UserName;
        obj.CodeType = CodeType;
        obj.sys_id = ID;

        if (!obj.CodeID) { Common_Notice('請輸入' + TextCode + '代碼'); return false; }
        else if (!obj.CodeText) { Common_Notice('請輸入' + TextCode + '名稱'); return false; }

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Common', sn: 'CreateCodeDef', sd: JSON.stringify(objSend) });

        if (CodeDef.Status) {
            toastr.success("存檔成功");
            MethodSearch();
        }
        else toastr.error("存檔失敗");
    }

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#TableView');
        obj.CodeType = CodeType;

        var objSend = { Json: JSON.stringify(obj) };
        var Clist = Common_ConvertObject_ws({ cn: 'Common', sn: 'GetCodeDef', sd: JSON.stringify(objSend) });

        $('#gv_MainTable > tbody').empty();

        if (Clist.Data && Clist.Status) {
            var Cobj = JSON.parse(Clist.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var strtemp = '<tr>\
                                   <td>'+ CCobj.CodeID + '</td>\
                                   <td>'+ CCobj.CodeText + '</td>\
                                   <td style="text-align:center">\
                                       <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.sys_id + '"><i class="fas fa-pen"></i></button>\
                                       <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.sys_id + '"><i class="fas fa-trash-alt"></i></button>\
                                   </td>\
                               </tr> ';

                var str = $(strtemp);
                $('#gv_MainTable > tbody').append(str);
            }
            $('#gv_MainTable > tbody .Edit').click(function () {
                var ID = $(this).data('id');

                MethodShowUpdate(ID);
            });
            $('#gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            if (Cobj.length == 0) $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#Com_ResultCount').text(Clist.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(Clist.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#DivPageIndex", "#hidPageIndex", function () { MethodSearch(); });

        }
        else $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');
    }

    var MethodShowUpdate = function (ID) {
        var data = [{ name: TextCode }];
        var TmpTable1 = $.templates("#TmpCodeDef_View");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "編輯";
        Aobj.content = strtemp;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    MethodAppend(ID);
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            MethodUpdateData(ID)
        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodUpdateData = function (ID) {
        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var Clist = Common_ConvertObject_ws({ cn: 'Common', sn: 'GetCodeDefData', sd: JSON.stringify(objSend) });

        if (Clist.Data && Clist.Status) {
            var Cobj = JSON.parse(Clist.Data);
            if (Cobj.length > 0) {
                var CCobj = Cobj[0];

                AutoBind("#CodeDefForm", CCobj);
            }
        }
    }

    var MethodDelete = function (ID) {
        var Aobj = new Object();
        Aobj.title = "刪除";
        Aobj.content = "確定刪除嗎?會影響到目前已使用到的資料。";
        Aobj.buttons = {
            Save: {
                text: "確定",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.ID = ID;
                    obj.UserName = UserInfo.UserName;

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Common', sn: 'DeleteCodeDef', sd: JSON.stringify(objSend) });

                    if (CodeDef.Status) {
                        toastr.success("刪除成功");
                        MethodSearch();
                    }
                    else toastr.error("刪除失敗");

                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () { };
        Aobj = DeleteDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    return {
        SetElement: function () {
            $('#btnCreate').click(function () { MethodShowCreate(); });
            $('#btnQuickSearch').click(function () { MethodSearch(); });

            $('#hidPageSize').val(10);
            $('#Com_PageSize').change(function () {
                $('#hidPageSize').val($(this).val());
                $('#hidPageIndex').val(1);
                console.log("PageSize :" + $('#hidPageSize').val());
                MethodSearch();
            });
            MethodSearch();
        },
    };
}();

function SetElement() {
    Module.SetElement();
}