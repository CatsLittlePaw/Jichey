<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Tmp_Order.ascx.cs" Inherits="Jichey.Views.ModalTemplate.Tmp_Order" %>

<script type="text/x-jsrender" id="TmpOrder_View">
    <div class="card">
        <div class="card-header">訂單明細</div>
        <div class="card-body" id="FormList">
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購者ID </label>
                <div class="col-md-3 col-9">
                    <input id="UserID" name="UserID" class="form-control"  autocomplete="off" disabled />
                </div>                
                <label class=" col-3 col-form-label text-right">訂單狀態 </label>
                <div class="col-md-3 col-9">
                    <select id="Status" name="Status" class="form-control" data-control-selectpicker data-size="2">
                        <option value="P">未付款</option>
                        <option value="W">已付款</option>
                        <option value="T">出貨</option>
                    </select>
                </div>  
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購使用者 </label>
                <div class="col-md-3 col-9">
                    <input id="sys_createuser" name="sys_createuser" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購人姓名(自填) </label>
                <div class="col-md-3 col-9">
                    <input id="UserName" name="UserName" class="form-control"  autocomplete="off" disabled />
                </div>                
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購者手機 </label>
                <div class="col-md-3 col-9">
                    <input id="Phone2" name="Phone2" class="form-control"  autocomplete="off" disabled />
                </div>
                <label class=" col-3 col-form-label text-right">訂購者電話 </label>
                <div class="col-md-3 col-9">
                    <input id="Tel2" name="Tel2" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">運送地址 </label>
                <div class="col-9">
                    <input id="AddressLine" name="AddressLine" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">收貨人姓名 </label>
                <div class="col-md-3 col-9">
                    <input id="BuyUserName" name="BuyUserName" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">收貨人手機 </label>
                <div class="col-md-3 col-9">
                    <input id="Phone" name="Phone" class="form-control"  autocomplete="off" disabled />
                </div>
                <div class="col-md-3 col-9">
                    <input id="Phone3" name="Phone3" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">收貨人電話 </label>
                <div class="col-md-3 col-9">
                    <input id="Tel" name="Tel" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">虛擬帳戶 </label>
                <div class="col-md-3 col-9">
                    <input id="VMAccount" name="VMAccount" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <hr />
            <div class="row form-group">
                <div class="col-6">
                    <h3>產品</h3>
                </div>
            </div>
            <div id="ProductsArea">

            </div>
            <div style="display: none;">
                <div class="row form-group">
                    <div class="col-6">
                        <h3>貨運資訊</h3>
                    </div>
                </div>
                <div class="row form-group">
                    <label class=" col-3 col-form-label text-right">貨運單位名稱 </label>
                    <div class="col-md-3 col-9">
                        <input id="FreightName" name="FreightName" class="form-control"  autocomplete="off"  />
                    </div>
                </div>
                <div class="row form-group">
                    <label class=" col-3 col-form-label text-right">貨運單編號 </label>
                    <div class="col-md-3 col-9">
                        <input id="FreightNo" name="FreightNo" class="form-control"  autocomplete="off"  />
                    </div>
                </div>
            </div>

        </div>
    </div>
</script>

<script type="text/x-jsrender" id="TmpBuyList_View">
    <div class="card">
        <div class="card-header">訂單明細</div>
        <div class="card-body" id="FormList">
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購者ID </label>
                <div class="col-md-3 col-9">
                    <input id="UserID" name="UserID" class="form-control"  autocomplete="off" disabled />
                </div>
                <label class=" col-3 col-form-label text-right">訂購使用者 </label>
                <div class="col-md-3 col-9">
                    <input id="sys_createuser" name="sys_createuser" class="form-control"  autocomplete="off" disabled />
                </div>                
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購人姓名(自填) </label>
                <div class="col-md-3 col-9">
                    <input id="UserName" name="UserName" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">訂購者手機 </label>
                <div class="col-md-3 col-9">
                    <input id="Phone2" name="Phone2" class="form-control"  autocomplete="off" disabled />
                </div>
                <label class=" col-3 col-form-label text-right">訂購者電話 </label>
                <div class="col-md-3 col-9">
                    <input id="Tel2" name="Tel2" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <hr />
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">運送地址 </label>
                <div class="col-9">
                    <input id="AddressLine" name="AddressLine" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">收貨人姓名 </label>
                <div class="col-md-3 col-9">
                    <input id="BuyUserName" name="BuyUserName" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">收貨人手機 </label>
                <div class="col-md-3 col-9">
                    <input id="Phone" name="Phone" class="form-control"  autocomplete="off" disabled />
                </div>
                <div class="col-md-3 col-9">
                    <input id="Phone3" name="Phone3" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">收貨人電話 </label>
                <div class="col-md-3 col-9">
                    <input id="Tel" name="Tel" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">總金額 </label>
                <div class="col-9">
                    <input id="Price" name="Price" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">虛擬帳戶 </label>
                <div class="col-9">
                    <input id="VMAccount" name="VMAccount" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <hr />
            <div class="row form-group">
                <div class="col-6">
                    <h3>產品</h3>
                </div>
            </div>  
            <table class="table table-bordered table-hover table-striped" style="text-align: center" id="Child_Table">
                <thead class="thead-dark">
                    <tr>
                        <th>產品名稱</th>
                        <th>類別</th>
                        <th>單價</th>
                        <th>數量</th>
                        <th>小計</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
   <!--
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">產品名稱 </label>
                <div class="col-md-3 col-9">
                    <input id="ProductName" name="ProductName" class="form-control"  autocomplete="off" disabled />
                </div>
                <label class=" col-3 col-form-label text-right">類別	 </label>
                <div class="col-md-3 col-9">
                    <input id="Category" name="Category" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">規格 </label>
                <div class="col-md-3 col-9">
                    <input id="SaleUnit" name="SaleUnit" class="form-control"  autocomplete="off" disabled />
                </div>
                <label class=" col-3 col-form-label text-right">區域 </label>
                <div class="col-md-3 col-9">
                    <input id="SalePlace" name="SalePlace" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
            <div class="row form-group">
                <label class=" col-3 col-form-label text-right">單價 </label>
                <div class="col-md-3 col-9">
                    <input id="Price2" name="Price2" class="form-control"  autocomplete="off" disabled />
                </div>
                <label class=" col-3 col-form-label text-right">數量 </label>
                <div class="col-md-3 col-9">
                    <input id="Count" name="Count" class="form-control"  autocomplete="off" disabled />
                </div>
            </div>
   -->
        </div>
    </div>
</script>


<script type="text/x-jsrender" id="ExcelRecord_View">
    <div class="row">
        <div class="col-12">
            <table id="gv_MainTable_c" class="table table-bordered table-hover table-striped" style="text-align: center">
                <thead class="thead-dark">
                    <tr>
                        <th>訂單編號</th>
                        <th>虛擬帳號</th>
                        <th>日期</th>
                        <th>交易說明 </th>
                        <th>交易說明2 </th>
                        <th>入帳金額 </th>
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
</script>