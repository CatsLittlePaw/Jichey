<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ProductList.ascx.cs" Inherits="Jichey.Views.Products.ProductList" %>

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
        <div class="container-fluid kt-portlet__content">
            <div class="row form-group">
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">產品編號</label>
                    <input id="SearchID" name="ID" class="form-control" placeholder="編號" autocomplete="off" />
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">產品名稱</label>
                    <input id="SearchName" name="Name" class="form-control" placeholder="名稱" autocomplete="off" />
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">進貨規格</label>
                    <select id="SearchPurchaseUnitID" name="PurchaseUnitID" class="form-control" data-control-selectpicker data-live-search="true" data-size="5"></select>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <label class="col-form-label">銷售規格</label>
                    <select id="SearchSaleUnitID" name="SaleUnitID" class="form-control" data-control-selectpicker data-live-search="true" data-size="5"></select>
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
                    <button type="button" id="btnExcel" class="btn btn-outline-success float-right" style="margin-right: 30px"><i class="fa fa-file-excel"></i>下載</button>
                    <button type="button" id="btnUpload" class="btn btn-outline-focus float-right" style="margin-right: 10px"><i class="fa fa-upload"></i>上傳</button>
                </div>
            </div>
            <div class="tab-content">
                <div class="row container-fluid tab-pane fade show active" id="Card" role="tabpanel">
                    <div class="col-12" id="gv_MainTable_List">
                        <div class="kt-portlet kt-widget kt-widget--general-3" style="border: 1px solid #ebedf2">
                            <div class="kt-portlet__body kt-portlet__body--fit">
                                <div class="kt-widget__top">
                                    <div class="kt-media kt-media--lg kt-media--circle">
                                        <img src="/Images/NoImage.jpg" alt="image">
                                    </div>
                                    <div class="kt-widget__wrapper">
                                        <div class="kt-widget__label">
                                            <span class="kt-widget__title">產品A</span>
                                            <span class="kt-widget__desc">ID123456789</span>
                                        </div>
                                        <div class="kt-widget__label">
                                            <span class="kt-widget__desc">單位:個</span>
                                        </div>
                                        <div class="kt-widget__label">
                                            <span class="kt-widget__desc">供應商:AA公司</span>
                                        </div>
                                        <div class="kt-widget__stats">
                                            <div class="kt-widget__stat">
                                                <span class="kt-widget__value">$246</span>
                                                <span class="kt-widget__caption">價格</span>
                                            </div>
                                            <div class="kt-widget__stat">
                                                <span class="kt-widget__value">$37</span>
                                                <span class="kt-widget__caption">成本</span>
                                            </div>
                                            <div class="kt-widget__stat">
                                                <span class="kt-widget__value">8</span>
                                                <span class="kt-widget__caption">庫存數量</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kt-widget__bottom">
                                    <div class="kt-widget__summary">
                                        <div class="kt-widget__item">
                                            <span class="btn btn-label-brand btn-sm btn-bold btn-upper">2020/08/06 05:00</span>&nbsp;<span class="kt-widget__hint">上架時間</span>
                                        </div>
                                    </div>
                                    <div class="kt-widget__toolbar">
                                        <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit"><i class="fas fa-pen"></i></button>
                                        <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="kt-portlet kt-widget kt-widget--general-3" style="border: 1px solid #ebedf2">
                            <div class="kt-portlet__body kt-portlet__body--fit">
                                <div class="kt-widget__top">
                                    <div class="kt-media kt-media--lg kt-media--circle">
                                        <img src="/Images/NoImage.jpg" alt="image">
                                    </div>
                                    <div class="kt-widget__wrapper">
                                        <div class="kt-widget__label">
                                            <span class="kt-widget__title">產品A</span>
                                            <span class="kt-widget__desc">ID123456789</span>
                                        </div>
                                        <div class="kt-widget__label">
                                            <span class="kt-widget__desc">單位:個</span>
                                        </div>
                                        <div class="kt-widget__label">
                                            <span class="kt-widget__desc">供應商:AA公司</span>
                                        </div>
                                        <div class="kt-widget__stats">
                                            <div class="kt-widget__stat">
                                                <span class="kt-widget__value">$246</span>
                                                <span class="kt-widget__caption">價格</span>
                                            </div>
                                            <div class="kt-widget__stat">
                                                <span class="kt-widget__value">$37</span>
                                                <span class="kt-widget__caption">成本</span>
                                            </div>
                                            <div class="kt-widget__stat">
                                                <span class="kt-widget__value">8</span>
                                                <span class="kt-widget__caption">庫存數量</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="kt-widget__bottom">
                                    <div class="kt-widget__summary">
                                        <div class="kt-widget__item">
                                            <span class="btn btn-label-brand btn-sm btn-bold btn-upper">2020/08/06 05:00</span>&nbsp;<span class="kt-widget__hint">上架時間</span>
                                        </div>
                                    </div>
                                    <div class="kt-widget__toolbar">
                                        <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit"><i class="fas fa-pen"></i></button>
                                        <button type="button" type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row tab-pane fade " id="List" role="tabpanel">
                    <div class="col-12">
                        <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                            <thead class="thead-dark">
                                <tr>
                                    <th>產品編號</th>
                                    <th>名稱</th>
                                    <th>進貨規格</th>
                                    <th>進貨價格</th>
                                    <th>銷售規格</th>
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
