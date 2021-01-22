<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Aside.ascx.cs" Inherits="Jichey.Views.Sys.Aside" %>

<div class="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop" id="kt_aside">
    <div class="kt-aside__brand kt-grid__item " id="kt_aside_brand" kt-hidden-height="75" style="">
        <div class="kt-aside__brand-logo">
            <a href="/Jichey/index">
                <img alt="Logo" src="/Images/Login/LoginTitle2.jpg" height="30" />
            </a>
        </div>

        <div class="kt-aside__brand-tools">
            <button type="button" class="kt-aside__brand-aside-toggler kt-aside__brand-aside-toggler--left" id="kt_aside_toggler"><span></span></button>
        </div>
    </div>
    <asp:PlaceHolder ID="Ph_Aside_Menu" runat="server"></asp:PlaceHolder>
</div>
