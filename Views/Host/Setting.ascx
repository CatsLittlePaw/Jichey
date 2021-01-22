<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Setting.ascx.cs" Inherits="Jichey.Views.Host.Setting1" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">高級設定</h3>
        </div>
    </div>
    <div class="kt-portlet__body ">
        <div class="container-fluid kt-portlet__content">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="home-tab" data-toggle="tab" href="#pageSetting" role="tab">頁面管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="profile-tab" data-toggle="tab" href="#roleSetting" role="tab">權限管理</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="contact-tab" data-toggle="tab" href="#memberSetting" role="tab">會員管理</a>
                </li>
            </ul>
            <div class="tab-content">
                <asp:PlaceHolder ID="Ph_Page" runat="server"></asp:PlaceHolder>
                <asp:PlaceHolder ID="Ph_Role" runat="server"></asp:PlaceHolder>
                <asp:PlaceHolder ID="Ph_Member" runat="server"></asp:PlaceHolder>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    function SetElement() {
        PageModule.SetElement();
        RoleModule.SetElement();
        MemberModule.SetElement();
    }
</script>
