<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="HomePage.ascx.cs" Inherits="Jichey.Views.Mall.HomePage" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">購買商品</h3>
        </div>
    </div>
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row form-group" style="margin: 10px 20px">
                商品名稱：
                <div class="input-group">                    
                    <input id="txtSearch" type="text" class="form-control"  placeholder="搜尋..." />
                    <div class="input-group-append">
                        <button id="btnSearch" type="button" class="btn btn-primary btn-icon" style="color: white"><i class="fas fa-search"></i></button>
                    </div>
                </div>
                <div class="col-3 form-group">
                    <div class="nav" role="tablist">
                        <a id="btnList" class="btn btn-icon btn-clean" data-toggle="tab" href="#List" role="tab"><i class="fas fa-list"></i></a>
                        <a id="btnCard" class="btn btn-icon btn-clean active" data-toggle="tab" href="#Card" role="tab"><i class="fas fa-th-large"></i></a>
                    </div>
                </div>
            </div>
            <div class="tab-content">
                <div class="row container-fluid tab-pane fade show active" id="Card" role="tabpanel">
                    <div class="col-12" id="gv_MainTable_Card">
                        <h4>查無商品</h4>
                    </div>
                </div>
                <div class="row tab-pane fade " id="List" role="tabpanel">
                    <div class="col-12">
                        <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                            <thead class="thead-dark">
                                <tr>
                                    <th>產品名稱</th>
                                    <th>類別</th>
                                    <th>供應商</th>
                                    <th>庫存</th>
                                    <th>價格</th>
                                    <th>數量</th>
                                    <th>小計</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="100">無資料</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/Views/Mall/HomePage.js"></script>

