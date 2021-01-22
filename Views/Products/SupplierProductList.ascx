<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SupplierProductList.ascx.cs" Inherits="Jichey.Views.Products.SupplierProductList" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">產品列表</h3>
        </div>
        <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
                <button type="button" id="btnCreate" class="btn btn-outline-primary"><i class="fa fa-plus"></i>新增</button>
            </div>
        </div>
    </div>
    <div class="kt-portlet__body ">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row form-group">
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">團購產品編號</label>
                    <input id="SearchID" name="ID" class="form-control" placeholder="編號" autocomplete="off" />
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">團購產品名稱</label>
                    <input id="SearchName" name="Name" class="form-control" placeholder="名稱" autocomplete="off" />
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">狀態</label>
                    <select id="SearchStatus" name="Status" class="form-control" data-control-selectpicker>
                        <%--P:剛產生 W:等待出貨 T:已出貨 S:已結單 D:取消訂單--%>
                        <option value="">請選擇</option>
                        <option value="1">上架中</option>
                        <!-- <option value="1">已啟用</option> -->
                        <option value="0">下架中</option>
                    </select>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">團購專案區間</label>
                    <div class="input-group">
                        <input id="SearchStartDate" name="StartDate" class="form-control " placeholder="起始日" data-control-datepicker autocomplete="off" />
                        <input id="SearchCloseTime" name="CloseTime" class="form-control " placeholder="結束日" data-control-datepicker autocomplete="off" />
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="la la-calendar-check-o glyphicon-th"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-3 form-group">
                    <div class="nav" role="tablist">
                        <a id="btnList" class="btn btn-icon btn-clean" data-toggle="tab" href="#List" role="tab"><i class="fas fa-list"></i></a>
                        <a id="btnCard" class="btn btn-icon btn-clean active" data-toggle="tab" href="#Card" role="tab"><i class="fas fa-th-large"></i></a>
                    </div>
                </div>
                <div class="col-9 form-group">
                    <button type="button" id="btnSearch" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                    <button type="button" id="btnReset" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>
                    <%--<button type="button" id="btnExcel" class="btn btn-outline-success float-right" style="margin-right: 30px"><i class="fa fa-file-excel"></i>下載</button>
                    <button type="button" id="btnUpload" class="btn btn-outline-focus float-right" style="margin-right: 10px"><i class="fa fa-upload"></i>上傳</button>--%>
                </div>
            </div>
            <div class="tab-content">
                <div class="row container-fluid tab-pane fade show active" id="Card" role="tabpanel">
                    <div class="col-12" id="gv_MainTable_Card">
                        <div style="border: 1px solid #ebedf2; width: 100%; text-align: center;margin:20px">
                            <h4>無資料</h4>
                        </div>
                    </div>
                </div>
                <div class="row tab-pane fade " id="List" role="tabpanel">
                    <div class="col-12">
                        <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                            <thead class="thead-dark">
                                <tr>
                                    <th>上架時間</th>
                                    <th>下架時間</th>
                                    <th>產品名稱</th>
                                    <th>類型</th>
                                    <th>成本</th>
                                    <th>價格</th>
                                    <th>限量</th>
                                    <th>狀態</th>
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
<script src="/Views/Products/SupplierProductList.js"></script>