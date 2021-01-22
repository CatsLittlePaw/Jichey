
var PageModule = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : [{ UserName: "Admin" }];

    var MethodShowCreate = function() {
        var data = [{Mode:"Append"}];
        var TmpTable1 = $.templates("#TmpHostPageForm");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "新增";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge";
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    MethodAppend("Append");
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () { MethodSetDialog(this, 0); };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodAppend = function (Mode) {
        var obj = FormSerilizeJSON('#PageFormList');
        obj.UserName = UserInfo.UserName;
        obj.Mode = Mode;
        console.log(obj);

        //if (!obj.Name) { Common_Notice(''); return false; }

        var objSend = { Json: JSON.stringify(obj) };
        var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'CreatePage', sd: JSON.stringify(objSend) });

        if (result.Status) {
            toastr.success("存檔成功");
            MethodSearch();
        }
        else toastr.error("存檔失敗");
    }

    var MethodSearch = function() {
        var obj = SearchSerilizeJSON('#pageSetting');

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetPages', sd: JSON.stringify(objSend) });

        $('#pageSetting #gv_MainTable > tbody').empty();
        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var strtemp = '<tr>\
                               <td>'+ CCobj.Name + '</td>\
                               <td>'+ CCobj.Kind + '</td>\
                               <td>'+ CCobj.Sort + '</td>\
                               <td>'+ CCobj.Url + '</td>\
                               <td>'+ CCobj.Remark + '</td>\
                               <td>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Pick" data-id="' + CCobj.Id + '" title="選擇" ><i class="fas fa-check-square"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Role" data-id="' + CCobj.Id + '" title="權限"><i class="fas fa-shield-alt"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.Id + '"><i class="fas fa-pen"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.Id + '"><i class="fas fa-trash-alt"></i></button>\
                               </td>\
                           </tr> ';

                var str = $(strtemp);
                $('#pageSetting #gv_MainTable > tbody').append(str);
            }
            $('#pageSetting #gv_MainTable > tbody .Pick').click(function () {
                var ID = $(this).data('id');

                $("#pageSetting #SearchParentId").selectpicker('val', ID);
                MethodSearch();
            });

            $('#pageSetting #gv_MainTable > tbody .Role').click(function () {
                var ID = $(this).data('id');

                MethodSettingRole(ID);
            });

            $('#pageSetting #gv_MainTable > tbody .Edit').click(function () {
                var ID = $(this).data('id');

                MethodShowUpdate(ID);
            });

            $('#pageSetting #gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            if (Cobj.length == 0) $('#pageSetting #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#pageSetting #Com_ResultCount').text(CodeDef.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#pageSetting #DivPageIndex","#pageSetting #hidPageIndex", function () { MethodSearch(); });

        }
        else $('#pageSetting #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

    }

    var MethodShowUpdate = function(ID) {
        var data = [{ Mode: "Edit" }];
        var TmpTable1 = $.templates("#TmpHostPageForm");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "編輯";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    MethodAppend("Edit");
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            MethodSetDialog(this, ID)

            MethodUpdateData(ID)
        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodUpdateData = function(ID) {
        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetPageData', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            AutoBind('#PageFormList', Cobj);

        }
    }

    var MethodDelete = function (ID) {
        var Aobj = new Object();
        Aobj.title = "刪除";
        Aobj.content = "確定刪除嗎?";
        Aobj.buttons = {
            Save: {
                text: "確定",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.ID = ID;
                    obj.UserName = UserInfo.UserName;

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'DeletePage', sd: JSON.stringify(objSend) });


                    if (CodeDef.Status) {
                        toastr.success("刪除成功");
                        MethodSearch();
                    }
                    else toastr.error("刪除失敗");

                }
            },
            關閉: { text: "取消" }
        };
        Aobj = DeleteDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodSetDialog = function (obj, Id) {
        Common_ParentPage("#PageFormList #ParentId");
    }

    var MethodReset = function () {
        $('#pageSetting #SearchID').val('');
        $('#pageSetting #SearchName').val('');
        $('#pageSetting #SearchParentId').selectpicker('val', '');
        MethodSearch();
    }

    var MethodSettingRole = function (PID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostPageRole");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "purple";
        Aobj.icon = "fas fa-th-large";
        Aobj.title = "查看頁面權限";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "xlarge";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            $('#PageRoleFormList #btnCreate').click(function () { MethodShowCreate_PageRole(PID); });
            $('#PageRoleFormList #btnSearch').click(function () { MethodSearch_PageRole(PID); });
            $('#PageRoleFormList #btnReset').click(function () { MethodReset_PageRole(PID); });

            MethodSearch_PageRole(PID);
        };
        Common_Confirm(Aobj);
    }

    var MethodShowCreate_PageRole = function (PID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostPageRoleCreate");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "新增";
        Aobj.content = strtemp;
        Aobj.columnClass = "large";
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.PageId = PID;
                    obj.RoleId = $('#RoleIDFormList #RoleID').val();

                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'CreatePageRole', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        MethodSearch_PageRole(PID);
                    }
                    else toastr.error("存檔失敗，" + result);
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            GetRoleData('#RoleIDFormList #RoleID');
        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodSearch_PageRole = function (PID) {
        var obj = SearchSerilizeJSON('#PageRoleFormList');
        obj.PageID = PID;

        var objSend = { Json: JSON.stringify(obj) };
        var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRoleByPage', sd: JSON.stringify(objSend) });

        $('#PageRoleFormList #gv_MainTable > tbody').empty();
        if (result.Data && result.Status) {
            var Robj = JSON.parse(result.Data);
            Robj.forEach(function (item) {
                var strtemp = '<tr>\
                                   <td>'+ item.Name + '</td>\
                                   <td>\
                                       <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + item.Id + '"><i class="fas fa-trash-alt"></i></button>\
                                   </td>\
                               </tr> ';

                var str = $(strtemp);
                $('#PageRoleFormList #gv_MainTable > tbody').append(str);
            })

            $('#PageRoleFormList #gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete_PageRole(PID,ID);
            });

            if (Robj.length == 0) $('#PageRoleFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#PageRoleFormList #Com_ResultCount').text(result.ResultCount);
            var Page = (Robj.length == 0) ? 1 : Math.ceil(Number(result.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#PageRoleFormList #DivPageIndex", "#PageRoleFormList #hidPageIndex", function () { MethodSearch(); });
        }
    }

    var GetRoleData = function (element) {
        var obj = new Object();
        obj.PageIndex = 1;
        obj.PageSize = 10000;

        var objSend = { Json: JSON.stringify(obj) };
        var Role = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRoles', sd: JSON.stringify(objSend) });

        $(element).empty();
        $(element).append('<option value="">請選擇</option>');

        if (Role.Data && Role.Status) {
            var Robj = JSON.parse(Role.Data);

            Robj.forEach(function (item) {
                $(element).append('<option value="' + item.Id + '">' + item.Name + '</option>');
            });
        }
    };

    var MethodDelete_PageRole = function (PID,RID) {
        var Aobj = new Object();
        Aobj.title = "刪除";
        Aobj.content = "確定刪除嗎?";
        Aobj.buttons = {
            Save: {
                text: "確定",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.PageId = PID;
                    obj.RoleId = RID;

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'DeletePageRole', sd: JSON.stringify(objSend) });


                    if (CodeDef.Status) {
                        toastr.success("刪除成功");
                        MethodSearch_PageRole(PID);
                    }
                    else toastr.error("刪除失敗");

                }
            },
            關閉: { text: "取消" }
        };
        Aobj = DeleteDialogOption(Aobj);
        Common_Confirm(Aobj);
    }
    return {
        SetElement: function () {
            $('#pageSetting #btnCreate').click(function () { MethodShowCreate(); });
            $('#pageSetting #btnSearch').click(function () { MethodSearch(); });
            $('#pageSetting #btnReset').click(function () { MethodReset(); });

            Common_initContol('#pageSetting');
            Common_ParentPage("#pageSetting #SearchParentId");
            

            $('#pageSetting #hidPageSize').val(10);
            $('#pageSetting #Com_PageSize').change(function () {
                $('#pageSetting #hidPageSize').val($(this).val());
                $('#pageSetting #hidPageIndex').val(1);
                console.log("PageSize :" + $('#pageSetting #hidPageSize').val());
                MethodSearch();
            });
            MethodSearch();
        },
    };
}();

