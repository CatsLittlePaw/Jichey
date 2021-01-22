<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="OrderList.ascx.cs" Inherits="Jichey.Views.Order.OrderList" %>


<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">訂單管理</h3>
        </div>
    </div>
    <div class="kt-portlet__body ">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">訂單編號</label>
                <div class="col-9">
                    <input id="SearchID" name="OrderID" class="form-control" placeholder="編號" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">產品名稱</label>
                <div class="col-9">
                    <input id="SearchProductName" name="SearchProductName" class="form-control" placeholder="產品名稱" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">訂購人</label>
                <div class="col-9">
                    <input id="SearchUserName" name="UserName" class="form-control" placeholder="訂購人姓名(自填)" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">狀態</label>
                <div class="col-9">
                    <select id="SearchStatus" name="Status" class="form-control" data-size="5" data-control-selectpicker>
                        <option value="">請選擇</option>
                        <option value="P">未付款</option>
                        <option value="W">已付款</option>
                        <option value="T">已出貨</option>
                        <%--未付P 已付W 出貨T--%>
                        <!-- <asp:Literal runat="server" ID="CreateFunction"></asp:Literal>  -->                 
                    </select>
                </div>                
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">訂單有效區間</label>
                <div class="col-9">
                    <div class="input-group">
                        <input id="SearchStartDate" name="StartDate" class="form-control" placeholder="起始日" data-control-datepicker />
                        <input id="SearchEndDate" name="EndDate" class="form-control" placeholder="結束日" data-control-datepicker />
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="col-3">
                    <!-- <asp:Literal runat="server" ID="Buttons"></asp:Literal> -->
                    <input id="UploadFiles" type="file" style="display: none" />    
                </div>
                <div class="col-9 form-group">
                    <button type="button" id="btnSearch" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                    <button type="button" id="btnReset" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>

                </div>
            </div>
            <div id="MainTable" style="display: block">
                <div class="row form-group">                    
                    <div class="col-12" style="display: none;">
                        <button type="button" id="btnExcel" type="button" class="btn btn-success float-right"><i class="fas fa-file-excel"></i>下載</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                            <thead class="thead-dark">
                                <tr>
                                    <th>訂單編號</th>
                                    <th>建立日期</th>
                                    <th>會員名稱 </th>
                                    <th>訂購人姓名 </th>
                                    <th>收貨人姓名 </th>
                                    <th>狀態 </th>
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
</div>

<script src="/Views/Order/OrderList.js"></script>