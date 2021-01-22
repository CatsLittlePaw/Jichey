<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Tmp_Member.ascx.cs" Inherits="Jichey.Views.ModalTemplate.Tmp_Member" %>

<<!--by浚傑-->
<script type="text/x-jsrender" id="Tmp_MemberList">


     <div class="card">
        <div class="card-header">會員資料</div>
        <div class="card-body" id="FormList">
            <!--
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">會員編號</label>
                <div class="col-md-4 col-9 ">
                    {{if Mode=="Append"}}
                        <label class="form-control-plaintext">系統自動帶入</label>
                    <input type="hidden" id="ID" name="Id" value="">
                    {{else}}
                        <input class="form-control-plaintext" id="ID" name="Id" />
                    {{/if}}
                </div>
            </div>
            -->
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">會員名稱</label>
                <div class="col-9">
                    <input id="Name" name="Name" class="form-control" placeholder="" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">帳號</label>
                <div class="col-9">
                    <input id="Account" name="Account" class="form-control" placeholder="" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">密碼</label>
                <div class="col-9">
                    <input type="password" id="Password" name="Password" class="form-control" placeholder="" autocomplete="off" />
                </div>
            </div>     
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">確認密碼</label>
                <div class="col-9">
                    <input type="password" id="cPwd" name="cPwd" class="form-control" placeholder="" autocomplete="off" />
                </div>
            </div>   
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">所屬公司</label>
                <div class="col-9">
                    <input type="text" id="BelongCompany" name="BelongCompany" class="form-control" placeholder="" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">邀請碼</label>
                <div class="col-9">
                    <input type="text" id="RecommendCode" name="RecommendCode" class="form-control" placeholder="" autocomplete="off" />
                </div>
            </div>
        </div>
    </div>


</script>




<script type="text/x-jsrender" id="Tmp_MemberEnabled">
     <div class="card">
        <div class="card-header">變更會員狀態</div>
        <div class="card-body" id="FormList">
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
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">會員等級</label>
                <div class="col-9">
                    <select id="Rank" name="Rank" class="form-control" data-control-selectpicker>

                    </select>
                </div>
            </div>
            <hr />
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">邀請碼</label>
                <div class="col-9">
                    <label class="col-form-label text-right" id="RecommendCode" name="RecommendCode"></label>
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">邀請人名稱</label>
                <div class="col-9">
                    <label class="col-form-label text-right" id="Name" name="Name"></label>
                </div>
            </div>           
        </div>
     </div>
</script>





<script type="text/x-jsrender" id="Tmp_MemberList_Edit">
    <div class="card">
        <div class="card-header">會員資料</div>
        <div class="card-body" id="FormList" style="text-align:left">
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">會員編號</label>
                <div class="col-md-4 col-9 ">
                    {{if Mode=="Append"}}
                        <label class="form-control-plaintext">系統自動帶入</label>
                    <input type="hidden" id="ID" name="ID" value="">
                    {{else}}
                        <input class="form-control-plaintext" id="ID" name="ID" />
                    {{/if}}
                </div>
                <label class="col-md-2 col-3 col-form-label text-right">電子信箱</label>
                <div class="col-md-4 col-9 ">
                    <input id="Email" name="Email" class="form-control" placeholder="電子信箱" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right required">會員名稱</label>
                <div class="col-md-4 col-9 ">
                    <input id="Name" name="Name" class="form-control" placeholder="會員名稱" /></div>
                <label class="col-md-2 col-3 col-form-label text-right">英文名稱</label>
                <div class="col-md-4 col-9 ">
                    <input id="EngName" name="EngName" class="form-control" placeholder="英文名稱" /></div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">電話</label>
                <div class="col-md-4 col-9 ">
                    <input id="Tel" name="Tel" class="form-control" placeholder="電話" />                    
                </div>
                <label class="col-md-2 col-3 col-form-label text-right">手機</label>
                <div class="col-md-4 col-9 ">                    
                    <input id="Phone" name="Phone" class="form-control" placeholder="手機" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">生日</label>
                <div class="col-md-10 col-9 ">
                    <input id="Birthday" name="Birthday" class="form-control" placeholder="生日" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">性別</label>
                <div class="col-md-10 col-9 ">
                     <select id="Gender" class="js-example-basic-single form-control" name="Gender" style="width: 100%!important; z-index: 90!important">
                        <option value="" selected>請選擇</option>
                        <option value="B">男</option>
                        <option value="G">女</option>
                     </select>
                </div>
            </div>
            <div class="row form-group" style="display:none;">
                <label class="col-3 col-form-label text-right">郵遞區號</label>
                <div class="col-9 ">
                    <input id="ZipCode" name="ZipCode" class="form-control" placeholder="郵遞區號" /></div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">地址</label>
                <div class="col-md-10 col-9">
                    <select id="CityId" name="CityId" class="form-control" data-control-selectpicker data-width="150" data-size="5"></select>
                    <select id="AreaId" name="AreaId" class="form-control" data-control-selectpicker data-width="150" data-size="5"></select>
                    <input id="Address" name="Address" class="form-control" style="width: -webkit-fill-available" placeholder="地址" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-md-2 col-3 col-form-label text-right">身分證字號</label>
                <div class="col-md-10 col-9 ">
                    <input id="IdNo" name="IdNo" class="form-control" placeholder="身分證字號" /></div>
            </div>
        </div>
    </div>
</script>



<script type="text/x-jsrender" id="Tmp_ChangePwd">
    <div class="card">
        <div class="card-header">變更密碼</div>
        <div class="card-body" id="FormList">
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">密碼</label>
                <div class="col-9">
                    <input id="Pwd" name="Pwd" type="password" class="form-control" placeholder="密碼" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right required">確認密碼</label>
                <div class="col-9">
                    <input id="cPwd" name="cPwd" type="password" class="form-control" placeholder="確認密碼" />
                </div>
            </div>
        </div>
    </div>
</script>

<script type="text/x-jsrender" id="Tmp_InsertMeridianData">
    <style>
        .out {
            border-top: 40px #D6D3D6 solid; /*上邊框寬度等於表格第一行行高*/
            width: 0px; /*讓容器寬度為0*/
            height: 0px; /*讓容器高度為0*/
            border-left: 80px #BDBABD solid; /*左邊框寬度等於表格第一行第一格寬度*/
            position: relative; /*讓裡面的兩個子容器絕對定位*/
        }
        .td-input{
            border-width: 0;
            text-align: center;
            width: 100%;
        }
    </style>
    <div class="row">
        <div class="col-12" id="FormList">
            <div>十二經絡數值</div>
            <table class="table table-bordered table-hover " style="text-align: center">
                <thead class="thead-dark">
                    <tr>
                        <th></th>
                        <th>肺經</th>
                        <th>心包經</th>
                        <th>心經</th>
                        <th>小腸經</th>
                        <th>三焦經</th>
                        <th>大腸經</th>
                        <th>脾經</th>
                        <th>肝經</th>
                        <th>腎經</th>
                        <th>膀胱經</th>
                        <th>膽經</th>
                        <th>胃經</th>
                    </tr>
                </thead> 
                <tbody>
                    <tr id="leftrow">
                        <td style=" color: #fff; background-color:#343a40;">左側</td>
                        <td><input id="inLeftLU" name="inLeftLU" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftPC" name="inLeftPC" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftHT" name="inLeftHT" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftSI" name="inLeftSI" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftTE" name="inLeftTE" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftLI" name="inLeftLI" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftSP" name="inLeftSP" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftLR" name="inLeftLR" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftKI" name="inLeftKI" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftBL" name="inLeftBL" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftGB" name="inLeftGB" type="number" class="td-input" size="3"/></td>
                        <td><input id="inLeftST" name="inLeftST" type="number" class="td-input" size="3"/></td>

                    </tr>
                    <tr id="rightrow">
                        <th style=" color: #fff; background-color:#343a40;">右側</th>
                        <td><input id="inRightLU" name="inRightLU" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightPC" name="inRightPC" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightHT" name="inRightHT" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightSI" name="inRightSI" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightTE" name="inRightTE" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightLI" name="inRightLI" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightSP" name="inRightSP" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightLR" name="inRightLR" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightKI" name="inRightKI" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightBL" name="inRightBL" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightGB" name="inRightGB" type="number" class="td-input" size="3"/></td>
                        <td><input id="inRightST" name="inRightST" type="number" class="td-input" size="3"/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</script>



