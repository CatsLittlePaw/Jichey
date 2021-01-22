<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SubHeader.ascx.cs" Inherits="Jichey.Views.Sys.SubHeader" %>

<div class="kt-subheader   kt-grid__item" id="kt_subheader">
    <div class="kt-container  kt-container--fluid ">
        <div class="kt-subheader__main">
            <asp:Literal ID="lit_Title" runat="server"></asp:Literal>
            <span class="kt-subheader__separator kt-hidden"></span>
            <div class="kt-subheader__breadcrumbs">
                <a href="#" class="kt-subheader__breadcrumbs-home"><i class="flaticon2-shelter"></i></a>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <asp:Literal ID="lit_Parent" runat="server"></asp:Literal>
                <span class="kt-subheader__breadcrumbs-separator"></span>
                <asp:Literal ID="lit_Page" runat="server"></asp:Literal>
            </div>
        </div>
    </div>
</div>
