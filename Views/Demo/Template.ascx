<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Template.ascx.cs" Inherits="Jichey.Views.Jichey.Template" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">[OO]管理</h3>
        </div>
    </div>
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required"></label>
                <div class="col-9">
                    <%--{{if Mode=="Append"}}--%>
                        <label class="form-control-plaintext">系統自動帶入</label>
                        <input type="hidden" id="Id" name="Id" value="">
                    <%--{{else}}--%>
                        <input class="form-control-plaintext" id="Id" name="Id" />
                    <%--{{/if}}--%>
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required"></label>
                <div class="col-9">
                    <input id="" name="" class="form-control" placeholder="" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required"></label>
                <div class="col-9">
                    <select id="" name="" class="form-control" data-control-selectpicker></select>
                </div>
            </div>
        </div>
    </div>
</div>
