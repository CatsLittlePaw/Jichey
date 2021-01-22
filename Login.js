
    localStorage.lsdebug = 1;
function SetElement() {
    $('#btnLogin').click(function () {
        var obj = FormSerilizeJSON('#FormList');

        if (!obj.Account) { Common_Notice('請填入帳號'); return false; }
        else if (!obj.Password) { Common_Notice('請填入密碼'); return false; }

        var objSend = { Json: JSON.stringify(obj) };
        var Login = Common_ConvertObject_ws({ cn: 'Account', sn: 'Login', sd: JSON.stringify(objSend) });

        if (Login.Data && Login.Status) {
            var Llist = JSON.parse(Login.Data);

            var obj = new Object();
            obj.UserID = Llist.UserId;
            obj.UserName = Llist.UserName;
            obj.Account = Llist.Account;
            obj.Permissions = Llist.Permissions;

            localStorage.lsUserInfo = JSON.stringify(obj);
            $('#txtAccount_C').val(obj.Account);
            $('#btnLogin_C').click();
        }
        else {
            Common_Notice('錯誤代碼:' + Login.Code + ',' + Login.Message);
        }

    });

    $('#btnRegister').click(function () { $('#btnRegister_C').click(); });

    $('#Account').keyup(function () { OnlyEnglishNum($(this)); });
    $("#Password").bind("keypress", {}, keypressInBox);
}
function keypressInBox(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode 
        e.preventDefault();
        
        $('#btnLogin').click();
    }
}