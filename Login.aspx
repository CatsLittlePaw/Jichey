<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="Jichey.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <link rel="icon" href="~/Images/Login/LoginTitle.png" type="image/png" />
    <link href="Css/bootstrap4.min.css" rel="stylesheet" />
    <link href="Css/Login/main.css" rel="stylesheet" />
    <link href="Css/Login/util.css" rel="stylesheet" />
    <link href="Css/all.min.css" rel="stylesheet" />
    <link href="Css/jquery-confirm.min.css" rel="stylesheet" />
    <link href="Css/jquery-ui.min.css" rel="stylesheet" />
    <link href="Css/myStyle.css" rel="stylesheet" />
</head>
<body>
    <div class="container-login100 MyLoginBackground">
        <div class="wrap-login100">
            <form class="login100-form validate-form" runat="server" id="FormList">
                <span id="lblTitle" class="login100-form-title p-b-26"><%=CompanyName %></span>
                <span id="lblLogo" class="login100-form-title p-b-48 text-center">
                    <img src="Images/Login/LoginTitle.jpg" width="50%" />
                </span>

                <div class="wrap-input100 validate-input">
                    <input id="Account" name="Account" class="input100" type="text" autocomplete="off" placeholder="帳號" />
                </div>

                <div class="wrap-input100 validate-input" data-validate="Enter password">
                    <input id="Password" name="Password" class="input100" type="password" placeholder="密碼" />
                </div>

                <div class="container-login100-form-btn">
                    <div class="wrap-login100-form-btn">
                        <div class="login100-form-bgbtn"></div>
                        <button id="btnLogin" type="button" class="login100-form-btn">登入</button>
                    </div>
                </div>
                <div style="display: none">
                    <asp:TextBox ID="txtAccount_C" runat="server"></asp:TextBox>
                    <asp:Button ID="btnLogin_C" runat="server" Text="" OnClick="btnLogin_C_Click" />
                    <asp:Button ID="btnRegister_C" runat="server" Text="" OnClick="btnRegister_C_Click" />
                </div>

                <div class="text-center p-t-50">
                    <span class="txt1">沒有帳號?</span>
                    <a class="txt2" href="#" id="btnRegister">註冊</a>
                </div>
            </form>
        </div>
    </div>


    <script src="Scripts/jquery-3.1.1.min.js"></script>
    <script src="Scripts/bootstrap4.min.js"></script>
    <script src="Scripts/Common/Common.js"></script>
    <script src="Scripts/jquery-confirm.min.js"></script>
    <script src="Scripts/jsrender.min.js"></script>
    <script src="Scripts/moment.js"></script>
    <script src="Login.js"></script>
</body>
</html>


