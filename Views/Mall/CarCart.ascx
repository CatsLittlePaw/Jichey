<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="CarCart.ascx.cs" Inherits="Jichey.Views.Mall.CarCart" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">購物車</h3>
        </div>
    </div>
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row form-group" id="CartList" style="padding: 0px 40px">
                <span style="margin: 0px auto; font-size: 1.3rem; color: #999">目前沒有選購</span>
            </div>
            <hr />
            <div class="row form-group">
                <div class="col-12">
                    <span style="float: right; font-size: 1.3rem; color: #999">合計: $ <span id="Total">0</span>元</span>
                    <button type="button" id="btnSend" class="btn btn-success" disabled>送出訂單</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="/Views/Mall/CarCart.js"></script>
