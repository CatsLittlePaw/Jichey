<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Tmp_CodeDef.ascx.cs" Inherits="Jichey.Views.ModalTemplate.Tmp_CodeDef" %>

<script type="text/x-jsrender" id="TmpCodeDef">
    <div class="card">
        <div class="card-header">{{:name}}明細</div>
        <div class="card-body" id="CodeDefForm">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">{{:name}}代碼</label>
                <div class="col-9">
                    <input id="CodeID" name="CodeID" class="form-control" placeholder="{{:name}}代碼(儲存後不可修改)" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">{{:name}}名稱</label>
                <div class="col-9">
                    <input id="CodeText" name="CodeText" class="form-control" placeholder="{{:name}}名稱" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">備註</label>
                <div class="col-9">
                    <input id="Remark" name="Remark" class="form-control" placeholder="備註" autocomplete="off" />
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpCodeDef_View">
    <div class="card">
        <div class="card-header">{{:name}}明細</div>
        <div class="card-body" id="CodeDefForm">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">{{:name}}代碼</label>
                <div class="col-9">
                    <input id="CodeID" name="CodeID" class="form-control" placeholder="{{:name}}代碼" autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">{{:name}}名稱</label>
                <div class="col-9">
                    <input id="CodeText" name="CodeText" class="form-control" placeholder="{{:name}}名稱" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">備註</label>
                <div class="col-9">
                    <input id="Remark" name="Remark" class="form-control" placeholder="備註" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">異動時間</label>
                <div class="col-3">
                    <input id="sys_updatedateText" class="form-control-plaintext" readonly />
                </div>
                <label class="col-3 col-form-label text-right">異動人員</label>
                <div class="col-3">
                    <input id="sys_updateuser" class="form-control-plaintext" readonly />
                </div>
            </div>
        </div>
    </div>
</script>