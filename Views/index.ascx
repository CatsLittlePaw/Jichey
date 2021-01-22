<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="index.ascx.cs" Inherits="Jichey.Views.index" %>

<div class="kt-portlet kt-profile">
    <div class="kt-profile__content">
        <div class="row">
            <div class="col-md-12 col-lg-5 col-xl-4">
                <div class="kt-profile__main">
                    <div class="kt-profile__main-pic">
                        <asp:Image ID="UserImage" runat="server" />
                        <%--<img src="/lib/keen/assets/media/users/300_21.jpg" alt="" />--%>
                        <%--<label class="kt-profile__main-pic-upload">
                            <i class="fas fa-camera"></i>
                        </label>--%>
                    </div>
                    <div class="kt-profile__main-info">
                        <div class="kt-profile__main-info-name"><asp:Label ID="UserName" runat="server" Text=""></asp:Label></div>
                        <div class="kt-profile__main-info-position"><asp:Label ID="Permissions" runat="server" Text=""></asp:Label></div>
                    </div>
                </div>
            </div>
            <div class="col-md-12 col-lg-4 col-xl-4">
                <div class="kt-profile__contact">
                    <a href="#" class="kt-profile__contact-item">
                        <span class="kt-profile__contact-item-icon kt-profile__contact-item-icon-whatsup"><i class="flaticon-whatsapp"></i></span>
                        <span class="kt-profile__contact-item-text"><asp:Label ID="Phone" runat="server" Text=""></asp:Label></span>
                    </a>
                    <a href="#" class="kt-profile__contact-item">
                        <span class="kt-profile__contact-item-icon"><i class="flaticon-email-black-circular-button kt-font-danger"></i></span>
                        <span class="kt-profile__contact-item-text"><asp:Label ID="Email" runat="server" Text=""></asp:Label></span>
                    </a>
                    <a href="#" class="kt-profile__contact-item">
                        <span class="kt-profile__contact-item-icon kt-profile__contact-item-icon-twitter" style="width:20px;height:20px;background-color: #18c1f8;border-radius: 100%;color: #fff;text-align: center;"><i class="fas fa-map-marker-alt" style="font-size:1rem"></i></span>
                        <span class="kt-profile__contact-item-text"><asp:Label ID="Address" runat="server" Text=""></asp:Label></span>
                    </a>
                </div>
            </div>
            <div class="col-md-12 col-lg-3 col-xl-4">
                <%--<div class="kt-profile__stats">
                    <div class="kt-profile__stats-item">
                        <div class="kt-profile__stats-item-label">Sales</div>
                        <div class="kt-profile__stats-item-chart">
                            <span>USP: +23%</span>
                            <canvas id="kt_profile_mini_chart_1" width="100" height="40" style="display: block;"></canvas>
                        </div>
                    </div>
                    <div class="kt-profile__stats-item">
                        <div class="kt-profile__stats-item-label">Reports</div>
                        <div class="kt-profile__stats-item-chart">
                            <span>RNP: +30%</span>
                            <canvas id="kt_profile_mini_chart_2" width="100" height="40" style="display: block;"></canvas>
                        </div>
                    </div>
                </div>--%>
            </div>
        </div>
    </div>
    <div class="kt-profile__nav">
        <ul class="nav nav-tabs nav-tabs-line" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-toggle="tab" href="#tabs_DashBoard" role="tab">通知面板</a>
            </li>
            <li class="nav-item">
                <a class="nav-link " data-toggle="tab" href="#tabs_Setting" role="tab">設定個人資料</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#tabs_Login" role="tab">登入紀錄</a>
            </li>
            <%--<li class="nav-item">
                <a class="nav-link" data-toggle="tab" href="#kt_tabs_1_4" role="tab">Tasks</a>
            </li>--%>
        </ul>
    </div>
</div>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="tabs_DashBoard" role="tabpanel">
         <asp:PlaceHolder ID="PH_DashBoard" runat="server"></asp:PlaceHolder>
    </div>
    <div class="tab-pane fade" id="tabs_Setting" role="tabpanel">
         <asp:PlaceHolder ID="PH_UserSetting" runat="server"></asp:PlaceHolder>
    </div>
    <div class="tab-pane fade" id="tabs_Login" role="tabpanel">
        <asp:PlaceHolder ID="PH_LoginRecord" runat="server"></asp:PlaceHolder>
    </div>
</div>


<script src="/Views/index.js"></script>
