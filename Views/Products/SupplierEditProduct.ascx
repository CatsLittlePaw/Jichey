<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="SupplierEditProduct.ascx.cs" Inherits="Jichey.Views.Products.SupplierEditProduct" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">
                <asp:Literal ID="lblMode" runat="server"></asp:Literal>產品資料
            </h3>
        </div>
    </div>
    <div class="kt-portlet__body ">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <input id="Status" name="Status" style="display:none" />
            <input id="GroupID" name="GroupID" style="display:none" />
            <div class="row form-group">
                <button id="btnSave" type="button" class="btn btn-primary btn-sm" style="margin-right: 5px"><i class="fas fa-save"></i>存檔</button>
                <button id="btnCancel" type="button" class="btn btn-secondary btn-sm"><i class="fas fa-undo"></i>返回</button>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">提交系統編號</label>
                <div class="col-9">
                    <asp:Literal ID="lblID" runat="server"></asp:Literal>
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">產品編號</label>
                <div class="col-9">
                    <input id="No" name="No" class="form-control" placeholder="(ERP或自定義，不輸入會自動帶入系統產品編號)" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">產品名稱</label>
                <div class="col-9">
                    <input id="Name" name="Name" class="form-control" placeholder="產品名稱" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">英文名稱</label>
                <div class="col-9">
                    <input id="EngName" name="EngName" class="form-control" placeholder="英文名稱" autocomplete="off" />
                </div>
            </div>
            <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <a class="nav-item nav-link active" id="navMasterTab" data-toggle="tab" href="#navMaster" role="tab">基本資料</a>
                    <a class="nav-item nav-link" id="navImageTab" data-toggle="tab" href="#navImage" role="tab">圖片</a>
                    <a class="nav-item nav-link" id="navVideoTab" data-toggle="tab" href="#navVideo" role="tab">影片</a>
                </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="navMaster" role="tabpanel">
                    <div class="row form-group">
                        <div class="col-3"></div>
                        <div class="col-9">
                            <h3>基本資料</h3>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right required">類別</label>
                        <div class="col-9">
                            <select id="CategoryID" name="CategoryID" class="form-control" data-control-selectpicker data-size="5"></select>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right required">成本</label>
                        <div class="col-3">
                            <input id="Cost" name="Cost" type="number" class="form-control" placeholder="成本" autocomplete="off" value="0" />
                        </div>
                        <label class="col-3 col-form-label text-right required">價格</label>
                        <div class="col-3">
                            <input id="Price" name="Price" type="number" class="form-control" placeholder="價格" autocomplete="off" value="0" />
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right required">上架時間</label>
                        <div class="col-3">
                            <input id="StartTimeText" name="StartTime" class="form-control" data-control-datetimepicker placeholder="上架時間" autocomplete="off" />
                        </div>
                        <label class="col-3 col-form-label text-right required">下架時間</label>
                        <div class="col-3">
                            <input id="CloseTimeText" name="CloseTime" class="form-control" data-control-datetimepicker placeholder="下架時間" autocomplete="off" value="2099/12/31 23:59" />
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right">介紹人</label>
                        <div class="col-9">
                            <input id="IntroducerID" name="IntroducerID" class="form-control" placeholder="介紹人" autocomplete="off" />
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right required">限量('0'代表不限量)</label>
                        <div class="col-9">
                            <input id="LimitCount" name="LimitCount" class="form-control" placeholder="限量" autocomplete="off" value="0" />
                        </div>
                    </div>

                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right">產品說明</label>
                        <div class="col-9">
                            <textarea id="Slogan" name="Slogan" data-control-editor></textarea>
                        </div>
                    </div>
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right">推薦產品說明</label>
                        <div class="col-9">
                            <textarea id="Description" name="Description" data-control-editor></textarea>
                        </div>
                    </div>
                    <div class="row form-group" style="display:none;">
                        <label class="col-3 col-form-label text-right">拒絕原因</label>
                        <div class="col-9">
                            <input id="StatusDescript" name="StatusDescript" class="form-control" disabled/>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="navImage" role="tabpanel">
                    <div class="row">
                        <div class="col-md-12 col-12 form-group">
                            <button type="button" id="btnUpload" class="btn btn-primary btn-sm"><i class="fas fa-plus"></i>上傳</button>
                        </div>
                        <input id="btnRealUpload" type="file" style="display: none" />
                    </div>
                    <div class="row">
                        <div class="col-md-2 col-3">
                            <label class="form-control-label"></label>
                        </div>
                        <div class="col-6 form-group">
                            <ul class="list-group" id="ProductImage">
                                <li class="list-group-item d-flex justify-content-between align-items-center">無圖片</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="navVideo" role="tabpanel">
                    <div class="row form-group">
                        <label class="col-3 col-form-label text-right">Youtube網址</label>
                        <div class="col-9">
                            <input id="YoutubeUrl" name="YoutubeUrl" class="form-control" placeholder="Youtube網址" autocomplete="off" />
                            <div id="DivYoutube" style="border: 1px solid #ccc; text-align: center; margin: 20px 0px; padding: 20px 0px; display: none">
                                <iframe id="YoutubePre" width="560" height="315" src="https://www.youtube.com/embed/" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row form-group">
                <button id="btnSave2" type="button" class="btn btn-primary btn-sm" style="margin-right: 5px"><i class="fas fa-save"></i>存檔</button>
                <button id="btnCancel2" type="button" class="btn btn-secondary btn-sm"><i class="fas fa-undo"></i>返回</button>
            </div>
        </div>
    </div>
</div>
<asp:HiddenField ID="hidProductID" runat="server" ClientIDMode="Static" />

<script src="/Views/Products/SupplierEditProduct.js"></script>

