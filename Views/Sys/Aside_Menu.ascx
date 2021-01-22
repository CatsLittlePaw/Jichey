<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Aside_Menu.ascx.cs" Inherits="Jichey.Views.Sys.Aside_Menu" %>

<div class="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper" style="overflow-y: auto; height: 100%">
    <div id="kt_aside_menu" class="kt-aside-menu kt-scroll ps ps--active-y">
        <ul class="kt-menu__nav ">
            <asp:Literal ID="lit_Menu" runat="server"></asp:Literal>
            <!--<li class="kt-menu__section ">
            <h4 class="kt-menu__section-text">Custom</h4>
            <i class="kt-menu__section-icon flaticon-more-v2"></i>
        </li>-->
        </ul>
        <div class="ps__rail-x" style="left: 0px; bottom: -532px;">
            <div class="ps__thumb-x" tabindex="0" style="left: 0px; width: 0px;"></div>
        </div>
        <div class="ps__rail-y">
            <div class="ps__thumb-y" tabindex="0" style="top: 174px; height: 146px;"></div>
        </div>
    </div>

</div>
