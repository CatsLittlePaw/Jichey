
var RoleModule = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : [{ UserName: "Admin" }];

    var MethodShowCreate = function () {
        var data = [{ Mode: "Append" }];
        var TmpTable1 = $.templates("#TmpHostRoleForm");
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
        var obj = FormSerilizeJSON('#RoleFormList');
        obj.UserName = UserInfo.UserName;
        obj.Mode = Mode;
        console.log(obj);

        //if (!obj.Name) { Common_Notice(''); return false; }

        var objSend = { Json: JSON.stringify(obj) };
        var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'CreateRole', sd: JSON.stringify(objSend) });

        if (result.Status) {
            toastr.success("存檔成功");
            MethodSearch();
        }
        else toastr.error("存檔失敗");
    }

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#roleSetting');

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRoles', sd: JSON.stringify(objSend) });

        $('#roleSetting #gv_MainTable > tbody').empty();
        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var strtemp = '<tr>\
                               <td>'+ CCobj.Id + '</td>\
                               <td>'+ CCobj.Name + '</td>\
                               <td>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Pages" data-id="' + CCobj.Id + '" data-name="' + CCobj.Name + '" title="頁面" ><i class="fas fa-th-large"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Members" data-id="' + CCobj.Id + '" data-name="' + CCobj.Name + '" title="會員"><i class="fas fa-users"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.Id + '"><i class="fas fa-pen"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.Id + '"><i class="fas fa-trash-alt"></i></button>\
                               </td>\
                           </tr> ';

                var str = $(strtemp);
                $('#roleSetting #gv_MainTable > tbody').append(str);
            }
            $('#roleSetting #gv_MainTable > tbody .Pages').click(function () {
                var ID = $(this).data('id');
                var Name = $(this).data('name');

                MethodShow_Pages(ID, Name);
            });

            $('#roleSetting #gv_MainTable > tbody .Members').click(function () {
                var ID = $(this).data('id');
                var Name = $(this).data('name');

                MethodShow_Members(ID, Name);
            });

            $('#roleSetting #gv_MainTable > tbody .Edit').click(function () {
                var ID = $(this).data('id');

                MethodShowUpdate(ID);
            });

            $('#roleSetting #gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            if (Cobj.length == 0) $('#roleSetting #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#roleSetting #Com_ResultCount').text(CodeDef.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#roleSetting #DivPageIndex", "#roleSetting #hidPageIndex", function () { MethodSearch(); });

        }
        else $('#roleSetting #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

    }

    var MethodShowUpdate = function (ID) {
        var data = [{ Mode: "Edit" }];
        var TmpTable1 = $.templates("#TmpHostRoleForm");
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

    var MethodUpdateData = function (ID) {
        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRoleData', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            AutoBind('#RoleFormList', Cobj);

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
                    var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'DeleteRole', sd: JSON.stringify(objSend) });


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
        $('#roleSetting #SearchID').val('');
        $('#roleSetting #SearchName').val('');
        MethodSearch();
    }

    //==========================
    var MethodShow_Pages = function (ID, Name) {
        var data = [{ Role: Name }];
        var TmpTable1 = $.templates("#TmpHostRolePage");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "purple";
        Aobj.icon = "fas fa-th-large";
        Aobj.title = "查看權限擁有頁面";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "xlarge";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            $('#RoleFormList #btnCreate').click(function () { MethodShowCreate_Pages(ID); });
            $('#RoleFormList #btnSearch').click(function () { MethodSearch_Pages(ID); });
            $('#RoleFormList #btnReset').click(function () { MethodReset_Pages(ID); });

            MethodSearch_Pages(ID);
        };
        Common_Confirm(Aobj);
    }

    var MethodShowCreate_Pages = function (RID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostRolePageCreate");
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
                    var data = $('#RolePageFormList #PageTree').jstree().get_selected(true);
                    var saveData = [];
                    for (var i = 0; i<data.length; i++) { saveData.push({ RoleID: RID, PageID: data[i].id }); }

                    var obj = new Object();
                    obj.RolePageList = saveData;
                    obj.RoleID = RID;

                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'CreateRolePage', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        MethodSearch_Pages(RID);
                    }
                    else toastr.error("存檔失敗");
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            Common_initContol('#RolePageFormList');

            var TreeData = Common_GetPageTree(RID);
            $('#RolePageFormList #PageTree').jstree({
                'plugins': ["wholerow", "checkbox", "types"],
                'core': {
                    "themes": {
                        "responsive": false
                    },
                    data: TreeData
                },
                "types": {
                    "default": {
                        "icon": "fa fa-folder kt-font-warning"
                    }
                }
            });
            $('#RolePageFormList #PageTree').bind('loaded.jstree', function (e, data) {
                var Robj = new Object();
                Robj.RoleID = RID;
                Robj.PageIndex = 1;
                Robj.PageSize = 10000;

                var RobjSend = { Json: JSON.stringify(Robj) };
                var RolePageData = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRolePages', sd: JSON.stringify(RobjSend) });
                var RRobj = (RolePageData.Data) ? JSON.parse(RolePageData.Data) : [];
                console.log(RolePageData);

                for (var i = 0; i < RRobj.length; i++) {
                    var Tobj = RRobj[i];

                    $('#RolePageFormList #PageTree').jstree().select_node(Tobj.Id);
                }
            });
        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodSearch_Pages = function (RID) {
        var obj = SearchSerilizeJSON('#RoleFormList');
        obj.RoleID = RID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRolePages', sd: JSON.stringify(objSend) });

        $('#RoleFormList #gv_MainTable > tbody').empty();
        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var strtemp = '<tr>\
                                   <td>'+ CCobj.Name + '</td>\
                                   <td>'+ CCobj.Remark + '</td>\
                                   <td>\
                                       <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.Id + '"><i class="fas fa-trash-alt"></i></button>\
                                   </td>\
                               </tr> ';

                var str = $(strtemp);
                $('#RoleFormList #gv_MainTable > tbody').append(str);
            }

            $('#RoleFormList #gv_MainTable > tbody .Delete').click(function () {
                var PID = $(this).data('id');

                MethodDelete_Pages(RID, PID);
            });

            if (Cobj.length == 0) $('#RoleFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#RoleFormList #Com_ResultCount').text(CodeDef.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#RoleFormList #DivPageIndex", "#RoleFormList #hidPageIndex", function () { MethodSearch(); });

        }
        else $('#RoleFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

    }

    var MethodDelete_Pages = function (RID, PID) {
        var Aobj = new Object();
        Aobj.title = "刪除";
        Aobj.content = "確定刪除嗎?";
        Aobj.buttons = {
            Save: {
                text: "確定",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.RoleID = RID;
                    obj.PageID = PID;

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'DeleteRolePage', sd: JSON.stringify(objSend) });


                    if (CodeDef.Status) {
                        toastr.success("刪除成功");
                        MethodSearch_Pages();
                    }
                    else toastr.error("刪除失敗");

                }
            },
            關閉: { text: "取消" }
        };
        Aobj = DeleteDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodReset_Pages = function (RID) {
        $('#RoleFormList #SearchID').val('');
        $('#RoleFormList #SearchName').val('');
        MethodSearch_Pages(RID);
    }
    //==========================
    var MethodShow_Members = function (ID, Name) {
        var data = [{ Role: Name }];
        var TmpTable1 = $.templates("#TmpHostRoleAccount");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "purple";
        Aobj.icon = "fas fa-users";
        Aobj.title = "查看擁有此權限的使用者";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "xlarge";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            $('#RoleAccountFormList #btnCreate').click(function () { MethodShowCreate_Members(ID); });
            $('#RoleAccountFormList #btnSearch').click(function () { MethodSearch_Members(ID); });
            $('#RoleAccountFormList #btnReset').click(function () { MethodReset_Members(ID); });

            MethodSearch_Members(ID);
        };
        Common_Confirm(Aobj);
    }

    var MethodShowCreate_Members = function (RID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostRoleAccountCreate");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "新增";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge";
        Aobj.buttons = {
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            Common_initContol('#AccountFormList');

            $('#AccountFormList #btnSearch').click(function () { MethodCreateSearch_Members(RID); });
            $('#AccountFormList #btnReset').click(function () { MethodCreateReset_Members(RID); });
        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodSearch_Members = function (RID) {
        var obj = SearchSerilizeJSON('#RoleAccountFormList');
        obj.RoleID = RID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRoleAccount', sd: JSON.stringify(objSend) });

        $('#RoleAccountFormList #gv_MainTable > tbody').empty();
        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var Status = (CCobj.Status == '1') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--primary">啟用</span>'
                    : (CCobj.Status == '2') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">審核中</span>'
                        : '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">停用</span>';

                var strtemp = '<tr>\
                                   <td>'+ CCobj.UserId + '</td>\
                                   <td>'+ CCobj.UserName + '</td>\
                                   <td>'+ Status+ '</td>\
                                   <td>\
                                       <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.UserId + '"><i class="fas fa-trash-alt"></i></button>\
                                   </td>\
                               </tr> ';

                var str = $(strtemp);
                $('#RoleAccountFormList #gv_MainTable > tbody').append(str);
            }

            $('#RoleAccountFormList #gv_MainTable > tbody .Delete').click(function () {
                var PID = $(this).data('id');

                MethodDelete_Members(RID, PID);
            });

            if (Cobj.length == 0) $('#RoleAccountFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#RoleAccountFormList #Com_ResultCount').text(CodeDef.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#RoleAccountFormList #DivPageIndex", "#RoleAccountFormList #hidPageIndex", function () { MethodSearch(); });

        }
        else $('#RoleAccountFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

    }

    /**
     * 新增時的搜尋
     * @param {any} RID
     */
    var MethodCreateSearch_Members = function (RID) {
        var obj = SearchSerilizeJSON('#AccountFormList');

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetAccountForRole', sd: JSON.stringify(objSend) });

        $('#AccountFormList #gv_MainTable > tbody').empty();
        $('#AccountFormList #SearchDiv').show();
        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var Status = (CCobj.Status == '1') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--primary">啟用</span>'
                    : (CCobj.Status == '2') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">審核中</span>'
                        : '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">停用</span>';

                var strtemp = '<tr>\
                                   <td>'+ CCobj.UserId + '</td>\
                                   <td>'+ CCobj.UserName + '</td>\
                                   <td>'+ Status + '</td>\
                                   <td>\
                                       <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Add" data-id="' + CCobj.UserId + '" data-rid="' + CCobj.RoleID + '"><i class="fas fa-plus"></i></button>\
                                   </td>\
                               </tr> ';

                var str = $(strtemp);
                $('#AccountFormList #gv_MainTable > tbody').append(str);
            }

            $('#AccountFormList #gv_MainTable > tbody .Add').click(function () {
                var UserId = $(this).data('id');
                var roleId = $(this).data('rid');
                if (roleId == RID) {
                    toastr.success("此會員已是該權限");
                    return false;
                }

                var obj = new Object();
                obj.UserId = UserId;
                obj.RoleID = RID;

                var objSend = { Json: JSON.stringify(obj) };
                var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'CreateRoleAccount', sd: JSON.stringify(objSend) });

                if (result.Status) {
                    toastr.success("存檔成功");
                    MethodSearch_Members(RID);
                }
                else toastr.error("存檔失敗");
            });

            if (Cobj.length == 0) $('#AccountFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#AccountFormList #Com_ResultCount').text(CodeDef.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#AccountFormList #DivPageIndex", "#RoleAccountFormList #hidPageIndex", function () { MethodSearch(); });

        }
        else $('#AccountFormList #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

    }

    var MethodReset_Members = function (RID) {
        $('#RoleAccountFormList #SearchID').val('');
        $('#RoleAccountFormList #SearchName').val('');
        MethodSearch_Members(RID);
    }

    var MethodCreateReset_Members = function (RID) {
        $('#AccountFormList #SearchID').val('');
        $('#AccountFormList #SearchName').val('');
        $('#AccountFormList #SearchDiv').hide();
    }

    return {
        SetElement: function () {
            $('#roleSetting #btnCreate').click(function () { MethodShowCreate(); });
            $('#roleSetting #btnSearch').click(function () { MethodSearch(); });
            $('#roleSetting #btnReset').click(function () { MethodReset(); });


            Common_initContol('#roleSetting');


            $('#roleSetting #hidPageSize').val(10);
            $('#roleSetting #Com_PageSize').change(function () {
                $('#roleSetting #hidPageSize').val($(this).val());
                $('#roleSetting #hidPageIndex').val(1);
                console.log("PageSize :" + $('#roleSetting #hidPageSize').val());
                MethodSearch();
            });
            MethodSearch();
        },
    };
}();

