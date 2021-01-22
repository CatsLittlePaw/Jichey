<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Header.ascx.cs" Inherits="Jichey.Views.Sys.Header" %>

<div id="kt_header" class="kt-header kt-grid__item  kt-header--fixed ButtyifulBackground ">
    <button type="button" class="kt-header-menu-wrapper-close" id="kt_header_menu_mobile_close_btn"><i class="la la-close"></i></button>
    <div class="kt-header-menu-wrapper" id="kt_header_menu_wrapper"></div>
    <div class="kt-header__topbar">
        <div class="kt-header__topbar-item kt-header__topbar-item--user">
            <div class="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
                <!--use "kt-rounded" class for rounded avatar style-->
                <div class="kt-header__topbar-user kt-rounded-">
                    <span class="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
                    <span class="kt-header__topbar-username kt-hidden-mobile">
                        <asp:Label ID="lblAccountName" runat="server" Text=""></asp:Label>
                    </span>
                    <asp:Image ID="UserImage" runat="server" alt="Pic" class="kt-rounded-" />
                    <%--<img alt="Pic" src="/lib/keen/assets/media/users/300_25.jpg" class="kt-rounded-" />--%>
                </div>
            </div>

            <div class="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-sm">
                <div class="kt-user-card kt-margin-b-40 kt-margin-b-30-tablet-and-mobile" style="background-image: url(/keen/themes/keen/theme/Jichey1/dist/assets/media/misc/head_bg_sm.jpg)">
                    <div class="kt-user-card__wrapper">
                        <div class="kt-user-card__pic">
                            <!--use "kt-rounded" class for rounded avatar style-->
                            <asp:Image ID="UserImage2" runat="server" alt="Pic" class="kt-rounded-" />
                            <%--<img alt="Pic" src="/lib/keen/assets/media/users/300_21.jpg" class="kt-rounded-">--%>
                        </div>
                        <div class="kt-user-card__details">
                            <div class="kt-user-card__name"> <asp:Label ID="lblAccountName2" runat="server" Text=""></asp:Label></div>
                            <div class="kt-user-card__position"><asp:Label ID="lblPremission" runat="server" Text=""></asp:Label></div>
                        </div>
                    </div>
                </div>

                <ul class="kt-nav kt-margin-b-10">
                    <li class="kt-nav__separator kt-nav__separator--fit"></li>
                    <li class="kt-nav__custom kt-space-between">
                            <asp:Button ID="btnLogOut" runat="server" class="btn btn-label-brand btn-upper btn-sm btn-bold" Text="登出" OnClick="btnLogOut_Click" />
                        <%--<a href="#" id="btnLogOut"  class="btn btn-label-brand btn-upper btn-sm btn-bold">登出</a>--%>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</div>
