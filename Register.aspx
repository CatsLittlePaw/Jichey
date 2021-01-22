<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="Jichey.Register" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="icon" href="/Images/Login/LoginTitle.png" type="image/png" />
    <link href="Css/bootstrap4.min.css" rel="stylesheet" />
    <link href="Css/Login/main.css" rel="stylesheet" />
    <link href="Css/Login/util.css" rel="stylesheet" />
    <link href="Css/all.min.css" rel="stylesheet" />
    <link href="Css/jquery-confirm.min.css" rel="stylesheet" />
    <link href="Css/jquery-ui.min.css" rel="stylesheet" />
    <link href="Css/myStyle.css" rel="stylesheet" />

</head>
<body>
    <div class="container-login100 MyLoginBackground" >
        <div class="wrap-login100">
            <form class="login100-form validate-form" runat="server" id="FormList">
                <span class="login100-form-title p-b-26">註冊</span>

                <div class="wrap-input100 validate-input">
                    <input id="Name" name="Name" class="input100" type="text" autocomplete="off" placeholder="名稱" />
                </div>
                <div class="wrap-input100 validate-input">
                    <input id="Account" name="Account" class="input100" type="text" autocomplete="off" placeholder="帳號" />
                </div>
                <div class="wrap-input100 validate-input">
                    <input id="Password" name="Password" class="input100" type="password" placeholder="密碼" />
                </div>

                <div class="wrap-input100 validate-input">
                    <input id="Password2" name="Password2" class="input100" type="password" placeholder="確認密碼" />
                </div>

                <div class="container-login100-form-btn">
                    <div class="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn"></div>
                        <button id="btnRegister" type="button" class="login100-form-btn">申請註冊</button>
                    </div>
                </div>

                <div class="text-center p-t-50">
                    <span class="txt1">返回</span>
                    <a class="txt2" href="#" id="btnLogin">登入</a>
                </div>
                <asp:Button ID="btnLogin_C" runat="server" Text="" OnClick="btnLogin_C_Click" style="display:none" />
            </form>
        </div>
    </div>
    

    <script src="Scripts/jquery-3.1.1.min.js"></script>
    <script src="Scripts/bootstrap4.min.js"></script>
    <script src="Scripts/Common/Common.js"></script>
    <script src="Scripts/jquery-confirm.min.js"></script>
    <script src="Scripts/jsrender.min.js"></script>
    <script src="Scripts/moment.js"></script>
    <script src="Register.js"></script>
</body>
</html>

