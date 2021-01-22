$(function () {
    SetElement_Register();
})

function SetElement_Register() {
    $('#btnLogin').click(function () { $('#btnLogin_C').click(); });

    $('#btnRegister').click(function () {
        var obj = FormSerilizeJSON('#FormList');

        if (!obj.Account) { Common_Notice('請填入帳號'); return false; }
        else if (!obj.Password || obj.Password.length < 8) { Common_Notice('密碼至少8位數'); return false; }
        else if (obj.Password != obj.Password2) { Common_Notice('密碼與確認密碼不符'); return false; }
        else if (!CheckHaveAccount()) { Common_Notice('已有此帳號'); return false; }

        var objSend = { Json: JSON.stringify(obj) };
        var Register = Common_ConvertObject_ws({ cn: 'Account', sn: 'Register', sd: JSON.stringify(objSend) });


        if (Register.Status) {
            Common_Success('成功，請等待管理員審核通過', function () {
                $('#btnLogin_C').click();
            });
        }
        else {
            Common_Error('註冊錯誤');
        }

    });

    $('#Account').keyup(function () { OnlyEnglishNum($(this)); });
}

function CheckHaveAccount() {
    var obj = new Object();
    obj.Account = $('#Account').val();

    var objSend = { Json: JSON.stringify(obj) };
    var Register = Common_ConvertObject_ws({ cn: 'Account', sn: 'CheckHaveAccount', sd: JSON.stringify(objSend) });

    if (Register.Status == false) { return true; }//無此帳號

    return false;
}
function InitThis() {
    var Register = Common_ConvertObject_ws({ cn: 'Account', sn: 'InitAccount', sd: '' });
    console.log(Register);
}