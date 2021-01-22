<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Organisation.ascx.cs" Inherits="Jichey.Views.Member.Organisation" %>

<style>
    div.orgChart {
        overflow-x: auto;
    }
    div.orgChart div.node {
        width: 220px
    }
</style>
<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">組織圖</h3>
        </div>
    </div>
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">會員編號</label>
                <div class="col-9">
                    <input id="SearchID" name="ID" class="form-control" placeholder="會員編號" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">會員名稱</label>
                <div class="col-9">
                    <input id="SearchName" name="Name" class="form-control" placeholder="會員名稱" />
                </div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-9 form-group">
                    <button id="btnSearch" type="button" class="btn btn-outline-success"><i class="fa fa-search"></i>搜尋</button>
                    <button id="btnClear" type="button" class="btn btn-outline-danger"><i class="fa fa-undo"></i>清除</button>
                </div>
            </div>
            <div class="row" id="ShowOrganisation">
                <div class="col-12">
                    <ul id="organisation" style="display:none" >
                    </ul>
                    <div id="main">
                    </div>
                </div>
            </div>                           


        </div>
    </div>
</div>


<script src="/Views/Member/Organisation.js"></script>

