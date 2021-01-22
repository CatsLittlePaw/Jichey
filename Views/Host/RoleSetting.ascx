<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="RoleSetting.ascx.cs" Inherits="Jichey.Views.Host.RoleSetting" %>

<div class="tab-pane fade" id="roleSetting" role="tabpanel" >
    <div class="row">
        <div class="col-12 form-group text-right">
            <button id="btnCreate" type="button" class="btn btn-outline-primary"><i class="fa fa-plus"></i>新增</button>
        </div>
    </div>
    <div class="row form-group">
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <label class="col-form-label">Role編號</label>
            <input id="SearchID" name="Id" class="form-control" placeholder="編號" />
        </div>
        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <label class="col-form-label">名稱</label>
            <input id="SearchName" name="Name" class="form-control" placeholder="名稱" />
        </div>
    </div>
    <hr />
    <div class="row">
        <div class="col-3"></div>
        <div class="col-9 form-group">
            <button id="btnSearch" type="button" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
            <button id="btnReset" type="button" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                <thead class="thead-dark">
                    <tr>
                        <th>權限編號</th>
                        <th>權限名稱</th>
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


<script src="/Views/Host/RoleSetting.js"></script>
