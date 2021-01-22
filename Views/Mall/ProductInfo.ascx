<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ProductInfo.ascx.cs" Inherits="Jichey.Views.Mall.ProductInfo" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">商品資訊</h3>            
        </div>
        <div class="kt-portlet__head-label">
            <button id="rtnpage" type="button" class="btn btn-secondary btn-sm"><i class="fas fa-undo"></i>返回</button>
        </div>       
    </div>                
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="container" style="height: 70%">
                <div class="row form-group">
                    <div class="col-6">
                        <div id="DivImage" style="height: 230px; margin-top: 10px; margin-bottom: 5px">
                            <div class="swiper-container">
                                <div class="swiper-wrapper" id="DivSwiper">
                                </div>
                                <div class="swiper-pagination"></div>
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="row">
                            <div style="font-size: xx-large">商品名稱： </div>
                            <div style="font-size: xx-large; color: orange;" id="productname" data-name=""></div>
                        </div>         
                        <div class="row">
                            <div style="font-size: xx-large">　　　　　 </div>
                            <div style="font-size: xx-large; color: orange;" id="productengname" data-ename=""></div>
                        </div>                         
                        <hr />
                        <div class="row">
                            <div style="font-size: xx-large;">單價：　　 </div>
                            <div style="font-size: xx-large; color: orange;" id="SalePrice"></div>
                        </div>                            
                        <div class="row">
                            <div class="col-3" style="font-size: xx-large">數量：     </div>
                            <div><input class="col-9" id="buyCount" value="1" style="margin-bottom: 5px; text-align: center; font-size:x-large; color: orange;" /></div>
                        </div>
                        <hr />
                        <div class="row" >
                             <div class="col-9" style="font-size: xx-large; text-align:right">小計：       </div>
                             <div class="col-3" style="font-size: xx-large; color: orange; text-align:right" id="smallTotal"></div>
                        </div>
                        <hr style="opacity: 0"/>
                        <button type="button" id="btnCart" class="btn btn-success col-12 float-left"><i class="fas fa-shopping-cart"></i>加入購物車</button>
                    </div>
                </div>
            </div>


        </div>
        <input type="number" id="singleprice" style="display:none;" />
        <asp:HiddenField ID="hidProductID" runat="server" ClientIDMode="Static" />

    </div>
</div>

<script src="/Views/Mall/ProductInfo.js"></script>


<link href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/css/swiper.css" rel="stylesheet" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/css/swiper.min.css" rel="stylesheet" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.1.0/js/swiper.esm.bundle.js"></script>

