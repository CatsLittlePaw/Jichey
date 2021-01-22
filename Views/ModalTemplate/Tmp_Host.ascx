<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Tmp_Host.ascx.cs" Inherits="Jichey.Views.ModalTemplate.Tmp_Host" %>

<script type="text/x-jsrender" id="TmpHostPageForm">
    <div class="card">
        <div class="card-header">頁面資料</div>
        <div class="card-body" id="PageFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">頁面代碼</label>
                <div class="col-9">
                    {{if Mode=="Append"}}
                        <label class="form-control-plaintext">系統自動帶入</label>
                    <input type="hidden" id="Id" name="Id" value="">
                    {{else}}
                        <input class="form-control-plaintext" id="Id" name="Id" />
                    {{/if}}
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">頁面名稱</label>
                <div class="col-9">
                    <input id="Name" name="Name" class="form-control" placeholder="頁面名稱" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">階層</label>
                <div class="col-9">
                    <input id="Kind" name="Kind" class="form-control" placeholder="階層" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">Icon</label>
                <div class="col-9">
                    <input id="Icon" name="Icon" class="form-control" placeholder="Icon" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">Url</label>
                <div class="col-9">
                    <input id="Url" name="Url" class="form-control" placeholder="Url" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">父親上層</label>
                <div class="col-9">
                    <select id="ParentId" name="ParentId" class="form-control" data-control-selectpicker></select>
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">排序</label>
                <div class="col-9">
                    <input id="Sort" name="Sort" class="form-control" placeholder="排序" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">備註</label>
                <div class="col-9">
                    <input id="Remark" name="Remark" class="form-control" placeholder="備註" />
                </div>
            </div>
            <%--<div class="row form-group">
                <label class="col-3 col-form-label text-right">異動時間</label>
                <div class="col-3">
                    <input id="sys_updatedateText" name="sys_updatedate" class="form-control-plaintext" readonly />
                </div>
                <label class="col-3 col-form-label text-right">異動人員</label>
                <div class="col-3">
                    <input id="sys_updateuser" name="sys_updateuser" class="form-control-plaintext" readonly />
                </div>
            </div>--%>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostPageRole">
    <div class="card" id="PageRoleFormList">
        <div class="card-header">
            頁面權限資料
            <div style="float: right">
                <button id="btnCreate" type="button" class="btn btn-outline-primary btn-sm"><i class="fa fa-plus"></i>新增</button>
            </div>
        </div>
        <div class="card-body" >
            <div class="row form-group">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">權限名稱</label>
                    <input id="SearchName" name="Name" class="form-control" placeholder="名稱" />
                </div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-9 form-group">
                    <button id="btnSearch" type="button" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                    <button id="btnReset" type="button" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table id="gv_MainTable" class="table table-sm table-bordered table-hover table-striped" style="text-align: center">
                        <thead class="thead-dark">
                            <tr>
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
                                <option value="20" selected="selected">20</option>
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
            <input type="hidden" id="hidPageSize" value="20" />
            <input type="hidden" id="hidPageIndex" value="1" />
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostPageRoleCreate">
    <div class="card">
        <div class="card-header">頁面加入該權限</div>
        <div class="card-body" id="RoleIDFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">選擇權限</label>
                <div class="col-9">
                    <select id="RoleID" name="RoleID" class="form-control" data-control-selectpicker></select>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostRoleForm">
    <div class="card">
        <div class="card-header">權限資料</div>
        <div class="card-body" id="RoleFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">權限代碼</label>
                <div class="col-9">
                    {{if Mode=="Append"}}
                        <label class="form-control-plaintext">系統自動帶入</label>
                    <input type="hidden" id="Id" name="Id" value="">
                    {{else}}
                        <input class="form-control-plaintext" id="Id" name="Id" />
                    {{/if}}
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">權限名稱</label>
                <div class="col-9">
                    <input id="DisplayName" name="DisplayName" class="form-control" placeholder="權限名稱" />
                </div>
            </div>
             <div class="row form-group">
                <label class="col-3 col-form-label text-right required">權限名稱(英文)</label>
                <div class="col-9">
                    <input id="Name" name="Name" class="form-control" placeholder="權限名稱(英文)" />
                </div>
            </div>
            <%--<div class="row form-group">
                <label class="col-3 col-form-label text-right">異動時間</label>
                <div class="col-3">
                    <input id="sys_updatedateText" name="sys_updatedate" class="form-control-plaintext" readonly />
                </div>
                <label class="col-3 col-form-label text-right">異動人員</label>
                <div class="col-3">
                    <input id="sys_updateuser" name="sys_updateuser" class="form-control-plaintext" readonly />
                </div>
            </div>--%>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostRolePage">
    <div class="card" id="RoleFormList">
        <div class="card-header">
            [{{:Role}}] 頁面
            <div style="float: right">
                <button id="btnCreate" type="button" class="btn btn-outline-primary btn-sm"><i class="fa fa-plus"></i>新增</button>
            </div>
        </div>
        <div class="card-body">
            <div class="row form-group">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">Page編號</label>
                    <input id="SearchID" name="Id" class="form-control" placeholder="編號" />
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">名稱</label>
                    <input id="SearchName" name="Name" class="form-control" placeholder="名稱" />
                </div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-9 form-group">
                    <button id="btnSearch" type="button" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                    <button id="btnReset" type="button" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table id="gv_MainTable" class="table table-sm table-bordered table-hover table-striped" style="text-align: center">
                        <thead class="thead-dark">
                            <tr>
                                <th>頁面名稱</th>
                                <th>備註 </th>
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
                                <option value="20" selected="selected">20</option>
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
            <input type="hidden" id="hidPageSize" value="20" />
            <input type="hidden" id="hidPageIndex" value="1" />
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostRolePageCreate">
    <div class="card">
        <div class="card-header">加入該權限</div>
        <div class="card-body" id="RolePageFormList">
            <div id="PageTree" class="tree-Jichey jstree jstree-3 jstree-default jstree-checkbox-selection">
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostRoleAccount">
    <div class="card" id="RoleAccountFormList">
        <div class="card-header">
            [{{:Role}}] 會員
            <div style="float: right">
                <button id="btnCreate" type="button" class="btn btn-outline-primary btn-sm"><i class="fa fa-plus"></i>新增</button>
            </div>
        </div>
        <div class="card-body">
            <div class="row form-group">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">會員編號</label>
                    <input id="SearchID" name="UserId" class="form-control" placeholder="編號" />
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">名稱</label>
                    <input id="SearchName" name="Name" class="form-control" placeholder="名稱" />
                </div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-9 form-group">
                    <button id="btnSearch" type="button" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                    <button id="btnReset" type="button" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <table id="gv_MainTable" class="table table-sm table-bordered table-hover table-striped" style="text-align: center">
                        <thead class="thead-dark">
                            <tr>
                                <th>會員ID </th>
                                <th>會員名稱</th>
                                <th>會員狀態</th>
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
                                <option value="20" selected="selected">20</option>
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
            <input type="hidden" id="hidPageSize" value="20" />
            <input type="hidden" id="hidPageIndex" value="1" />
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostRoleAccountCreate">
    <div class="card">
        <div class="card-header">會員加入該權限</div>
        <div class="card-body" id="AccountFormList">
            <div class="row form-group">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">會員編號</label>
                    <input id="SearchID" name="UserId" class="form-control" placeholder="編號" />
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                    <label class="col-form-label">名稱</label>
                    <input id="SearchName" name="Name" class="form-control" placeholder="名稱" />
                </div>
            </div>
            <div class="row">
                <div class="col-3"></div>
                <div class="col-9 form-group">
                    <button id="btnSearch" type="button" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                    <button id="btnReset" type="button" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>
                </div>
            </div>
            <div id="SearchDiv" class="row" style="display: none">
                <div class="col-12">
                    <table id="gv_MainTable" class="table table-sm table-bordered table-hover table-striped" style="text-align: center">
                        <thead class="thead-dark">
                            <tr>
                                <th>會員ID </th>
                                <th>會員名稱</th>
                                <th>會員狀態</th>
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
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostMemberForm">
    <div class="card">
        <div class="card-header">會員資料</div>
        <div class="card-body" id="MemberFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">會員名稱</label>
                <div class="col-9">
                    <input id="Name" name="Name" class="form-control" placeholder="會員名稱" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">會員帳號</label>
                <div class="col-9">
                    <input id="Account" name="Account" class="form-control" placeholder="會員帳號" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">密碼</label>
                <div class="col-9">
                    <input id="Password" name="Password" type="password" class="form-control" placeholder="密碼" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">確認密碼</label>
                <div class="col-9">
                    <input id="Password2" name="Password2" type="password" class="form-control" placeholder="確認密碼" />
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostChangePassword">
    <div class="card">
        <div class="card-header">變更密碼</div>
        <div class="card-body" id="PasswordFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">密碼</label>
                <div class="col-9">
                    <input id="Password" name="Password" type="password" class="form-control" placeholder="密碼" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">確認密碼</label>
                <div class="col-9">
                    <input id="Password2" name="Password2" type="password" class="form-control" placeholder="確認密碼" />
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostMemberEnabled">
    <div class="card">
        <div class="card-header">變更密碼</div>
        <div class="card-body" id="StatusFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">啟用/停用</label>
                <div class="col-9">
                    <select id="Status" name="Status" class="form-control" data-control-selectpicker>
                        <option value="1">啟用</option>
                        <option value="2">審核中</option>
                        <option value="3">停用</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostChangeRole">
    <div class="card">
        <div class="card-header">變更權限</div>
        <div class="card-body" id="RoleIDFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">選擇權限</label>
                <div class="col-9">
                    <select id="RoleID" name="RoleID" class="form-control" data-control-selectpicker></select>
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpHostMemberUpdate">
    <div class="card">
        <div class="card-header">變更會員基本資料</div>
        <div class="card-body" id="MemberBasicFormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">會員名稱</label>
                <div class="col-9">
                    <input id="UserName" name="Name" class="form-control" placeholder="會員名稱" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right ">英文名稱</label>
                <div class="col-9">
                    <input id="EngName" name="EngName" class="form-control" placeholder="英文名稱" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right ">電話</label>
                <div class="col-9">
                    <input id="Tel" name="Tel" class="form-control" placeholder="電話" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right ">手機</label>
                <div class="col-9">
                    <input id="Phone" name="Phone" class="form-control" placeholder="手機" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right ">Email</label>
                <div class="col-9">
                    <input id="Email" name="Email" class="form-control" placeholder="Email" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">地址</label>
                <div class="col-9">
                    <select id="CityId" name="CityId" class="form-control" style="width:auto;float:left" data-control-selectpicker data-width="100"></select>
                    <select id="AreaId" name="AreaId" class="form-control" style="width:auto;float:left" data-control-selectpicker data-width="100"></select>
                    <input id="Address" name="Address" class="form-control" style="width:-webkit-fill-available" placeholder="地址" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right ">生日</label>
                <div class="col-9">
                    <input id="BirthdayText" name="Birthday" class="form-control" placeholder="生日" data-control-datepicker />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">身分證字號</label>
                <div class="col-9">
                    <input id="IdNo" name="IdNo" class="form-control" placeholder="身分證字號" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">性別</label>
                <div class="col-9">
                    <select id="Gender" name="Gender" class="form-control" data-control-selectpicker>
                        <option value="">請選擇</option>
                        <option value="B">男</option>
                        <option value="G">女</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</script>






