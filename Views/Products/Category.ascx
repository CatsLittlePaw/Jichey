<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Category.ascx.cs" Inherits="Jichey.Views.Products.Category" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">產品類別</h3>
        </div>
        <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
                <button type="button" id="btnCreate" type="button" class="btn btn-outline-primary"><i class="fa fa-plus"></i>新增</button>
            </div>
        </div>
    </div>
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row">
                <div class="col-12 form-group">
                    <div class="input-group">
                        <input id="txtQuickSearch" type="text" class="form-control" placeholder="快速查詢" />
                        <span class="input-group-btn">
                            <button type="button" id="btnQuickSearch" class="btn btn-info btn-icon btn-elevate" type="button"><i class="fas fa-search" style="color: #EEE"></i></button>
                        </span>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                        <thead class="thead-dark">
                            <tr>
                                <th>類別代碼</th>
                                <th>類別名稱</th>
                                <th style="width: 200px">功能</th>
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
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group">
                    <nav aria-label="Page navigation example">
                        <div style="float: left">
                            <span class="pagesize-Text">一次顯示</span>
                            <select id="Com_PageSize" class="form-control" style="float: left; width: auto">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <span class="pagesize-Text">筆，總筆數:</span>
                            <span id="Com_ResultCount" class="pagesize-Text">0</span>
                            <span class="pagesize-Text">筆</span>
                        </div>
                        <ul class="pagination pull-right" id="DivPageIndex" style="margin: 0px; font-size: 1.3rem"></ul>
                    </nav>
                </div>
            </div>
            <input type="hidden" id="hidPageSize" value="10" />
            <input type="hidden" id="hidPageIndex" value="1" />
        </div>
    </div>
</div>
<script src="/Views/Products/Category.js"></script>
