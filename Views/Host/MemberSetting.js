
var MemberModule = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : [{ UserName: "Admin" }];

    var MethodShowCreate = function () {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostMemberForm");
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
                    var obj = FormSerilizeJSON('#MemberFormList');
                    console.log(obj);

                    if (!obj.Account) { Common_Notice('請填入帳號'); return false; }
                    else if (!obj.Password || obj.Password.length < 8) { Common_Notice('密碼至少8位數'); return false; }
                    else if (obj.Password != obj.Password2) { Common_Notice('密碼與確認密碼不符'); return false; }
                    else if (!CheckHaveAccount(obj.Account)) { Common_Notice('已有此帳號'); return false; }


                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'CreateMember', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        MethodSearch();
                    }
                    else toastr.error("存檔失敗");
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            $('#MemberFormList #Account').keyup(function () { OnlyEnglishNum($(this)); });

        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#memberSetting');

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetMember', sd: JSON.stringify(objSend) });

        $('#memberSetting #gv_MainTable > tbody').empty();
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
                               <td>'+ CCobj.Permissions + '</td>\
                               <td>'+ Status + '</td>\
                               <td>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm PassWord" data-id="' + CCobj.UserId + '" title="修改密碼" ><i class="fas fa-lock"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm MemberEnabled" data-id="' + CCobj.UserId + '" title="狀態"><i class="fas fa-user-check"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm ChangeRole" data-id="' + CCobj.UserId + '" title="改權限"><i class="fas fa-user-shield"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.UserId + '"><i class="fas fa-pen"></i></button>\
                                   <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.UserId + '"><i class="fas fa-trash-alt"></i></button>\
                               </td>\
                           </tr> ';

                var str = $(strtemp);
                $('#memberSetting #gv_MainTable > tbody').append(str);
            }
            $('#memberSetting #gv_MainTable > tbody .PassWord').click(function () {
                var ID = $(this).data('id');

                MethodShow_ChangePassword(ID);
            });

            $('#memberSetting #gv_MainTable > tbody .MemberEnabled').click(function () {
                var ID = $(this).data('id');

                MethodShow_MemberEnabled(ID);
            });

            $('#memberSetting #gv_MainTable > tbody .ChangeRole').click(function () {
                var ID = $(this).data('id');

                MethodShow_ChangeRole(ID);
            });

            $('#memberSetting #gv_MainTable > tbody .Edit').click(function () {
                var ID = $(this).data('id');

                MethodShowUpdate(ID);
            });

            $('#memberSetting #gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            if (Cobj.length == 0) $('#memberSetting #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#memberSetting #Com_ResultCount').text(CodeDef.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#memberSetting #DivPageIndex", "#memberSetting #hidPageIndex", function () { MethodSearch(); });

        }
        else $('#memberSetting #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

    }

    var MethodShowUpdate = function (ID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostMemberUpdate");
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
                    var obj = FormSerilizeJSON('#MemberBasicFormList');
                    obj.UserId = ID;
                    obj.UserName = UserInfo.UserName;
                    console.log(obj);

                    if (!obj.Name) { Common_Notice('請填入名稱'); return false; }


                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'UpdateMember', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        MethodSearch();
                    }
                    else toastr.error("存檔失敗");
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            Common_initContol('#MemberBasicFormList');
            Common_City('#MemberBasicFormList #CityId');
            MethodUpdateData(ID);
            $('#MemberBasicFormList #CityId').change(function () {
                Common_Area('#MemberBasicFormList #AreaId', $(this).val());
                $('#MemberBasicFormList #AreaId').selectpicker('troggle');
            });
        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodUpdateData = function (ID) {
        var obj = new Object();
        obj.UserId = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetMemberData', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            
            AutoBind('#MemberBasicFormList', Cobj);
            Common_Area('#MemberBasicFormList #AreaId', (Cobj.CityId) ? Cobj.CityId:"01");
            $('#MemberBasicFormList #AreaId').selectpicker('val', Cobj.AreaId);

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
                    obj.UserId = ID;
                    obj.UserName = UserInfo.UserName;

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'DeleteMember', sd: JSON.stringify(objSend) });


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

    var MethodReset = function () {
        $('#memberSetting #SearchID').val('');
        $('#memberSetting #SearchName').val('');
        MethodSearch();
    }

    var MethodShow_ChangePassword = function (ID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostChangePassword");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "green";
        Aobj.icon = "fas fa-lock";
        Aobj.title = "修改密碼";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "large";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.UserId = ID;
                    obj.Password = $('#PasswordFormList #Password').val();
                    obj.Password2 = $('#PasswordFormList #Password2').val();
                    obj.UserName = UserInfo.UserName;

                    if (!obj.Password) { Common_Notice('請輸入密碼'); return false; }
                    else if (!obj.Password || obj.Password.length < 8) { Common_Notice('密碼至少8位數'); return false; }
                    else if (obj.Password != obj.Password2) { Common_Notice('兩者密碼不相符'); return false; }

                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'ChangePassword', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                    }
                    else toastr.error("存檔失敗");
                }
            },
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () { };
        Common_Confirm(Aobj);
    }

    var MethodShow_MemberEnabled = function (ID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostMemberEnabled");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "green";
        Aobj.icon = "fas fa-user-check";
        Aobj.title = "變更使用者狀態";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "large";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.UserId = ID;
                    obj.Status = $('#StatusFormList #Status').val();
                    obj.UserName = UserInfo.UserName;

                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'ChangeMemberEnabled', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        MethodSearch();
                    }
                    else toastr.error("存檔失敗");
                }
            },
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            GetAccountStatus(ID);
        };
        Common_Confirm(Aobj);
    }

    var MethodShow_ChangeRole = function (ID) {
        var data = {};
        var TmpTable1 = $.templates("#TmpHostChangeRole");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "green";
        Aobj.icon = "fas fa-user-shield";
        Aobj.title = "變更使用者權限";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "large";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.UserId = ID;
                    obj.RoleID = $('#RoleIDFormList #RoleID').val();
                    obj.UserName = UserInfo.UserName;

                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'ChangeRole', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        MethodSearch();
                    }
                    else toastr.error("存檔失敗");
                }
            },
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            //todo Role下拉選單資料
            GetRoleData('#RoleIDFormList #RoleID');
            GetAccountRole(ID);
        };
        Common_Confirm(Aobj);
    }

    var GetAccountRole = function (UID) {
        var obj = new Object();
        obj.UserId = UID;

        var objSend = { Json: JSON.stringify(obj) };
        var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetRoleByMember', sd: JSON.stringify(objSend) });

        if (result.Data && result.Status) {
            var Robj = JSON.parse(result.Data);
            $('#RoleIDFormList #RoleID').val(Robj);
        }
    };

    var GetAccountStatus = function (UID) {
        var obj = new Object();
        obj.UserId = UID;

        var objSend = { Json: JSON.stringify(obj) };
        var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetStatusByMember', sd: JSON.stringify(objSend) });

        if (result.Data && result.Status) {
            var Robj = JSON.parse(result.Data);
            $('#StatusFormList #Status').val(Robj);
        }
    };

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

    var CheckHaveAccount = function (Account) {
        var obj = new Object();
        obj.Account = Account;

        var objSend = { Json: JSON.stringify(obj) };
        var Register = Common_ConvertObject_ws({ cn: 'Account', sn: 'CheckHaveAccount', sd: JSON.stringify(objSend) });

        if (Register.Status == false) { return true; }//無此帳號

        return false;
    };

    return {
        SetElement: function () {
            $('#memberSetting #btnCreate').click(function () { MethodShowCreate(); });
            $('#memberSetting #btnSearch').click(function () { MethodSearch(); });
            $('#memberSetting #btnReset').click(function () { MethodReset(); });


            Common_initContol('#memberSetting');


            $('#memberSetting #hidPageSize').val(10);
            $('#memberSetting #Com_PageSize').change(function () {
                $('#memberSetting #hidPageSize').val($(this).val());
                $('#memberSetting #hidPageIndex').val(1);
                console.log("PageSize :" + $('#memberSetting #hidPageSize').val());
                MethodSearch();
            });
            MethodSearch();
        },
    };
}();

