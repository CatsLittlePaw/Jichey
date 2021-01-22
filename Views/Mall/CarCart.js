var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var CartList = (localStorage.lsCartList) ? JSON.parse(localStorage.lsCartList) : [];
    var TotalPrice = 0;

    var GetCartList = function () {
        $('#CartList').empty();
        TotalPrice = 0;
        $('#btnSend').attr('disabled', false);
        if (CartList.length == 0) {
            $('#CartList').append('<span style="margin:0px auto;font-size:1.3rem;color:#999">目前沒有選購</span>');
            $('#btnSend').attr('disabled', true);
        }

        for (var i = 0; i < CartList.length; i++) {
            var Cobj = CartList[i];
            var ProductInfo = GetProductInfo(Cobj.ProductID);

            var ProductImage = (ProductInfo.ImageList.length == 0) ? "/Images/NoImage.jpg" : ProductInfo.ImageList[0].ImageUrl;
            var ProductPrice = ProductInfo.Price;

            var Price = Number(ProductPrice) * Number(Cobj.Count);
            TotalPrice += Price;

            var strtemp = '<div class="card col-12">\
                                <div class="row no-gutters">\
                                    <div class="col-4" style="text-align: center">\
                                        <img src="'+ ProductImage + '" class="card-img" style="max-width:200px">\
                                    </div>\
                                    <div class="col-8">\
                                        <div class="card-body">\
                                            <h3 class="card-title" style="font-weight: bold;--font-family-monospace: auto">'+ ProductInfo.Name + '</h3>\
                                            <p class="card-text " style="font-size: 1.4rem;width:300px">數量:<input class="buyCount" style="width:auto" value="'+ Cobj.Count + '" data-id="' + Cobj.ProductID + '" data-price="' + ProductPrice + '" /></p>\
                                            <p class="card-text" style="font-size: 1.4rem">價格: <span style="font-size: 1.4rem; color: orange;">$'+ Price + '</span></p>\
                                        </div>\
                                        <div style="float:right;margin:5px">\
                                            <button type="button" class="btn btn-icon btn-clean Delete" data-id="'+ Cobj.ProductID + '"><i class="fas fa-trash"></i></button>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>';
            var str = $(strtemp);
            $('#CartList').append(str);
        }
        $('#Total').text(TotalPrice);

        $('#CartList .card img').on('error', function () { $(this).attr('src', '/Images/NoImage.jpg') });


        $('#CartList .Delete').click(function () {
            var ID = $(this).data('id');
            DeleteCarCart(ID);
            GetCartList();
        });

        $('.buyCount').change(function () {
            var ProductID = $(this).data('id');
            var Price = $(this).data('price');
            var Count = $(this).val();

            AddCarCart(ProductID, Count, Price);
            GetCartList();
        })
        $('.buyCount').TouchSpin({
            buttondown_class: "btn btn-success btn-sm",
            buttonup_class: "btn btn-success btn-sm",
            min: 1,
            max: 1000,
            step: 1,
        });
    }

    var GetProductInfo = function (PID) {
        var obj = new Object();
        obj.ID = PID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Products', sn: 'GetProductsData', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            return Cobj;
        }
        return [];
    }

    //這裡的訂購人姓名的id與收貨人姓名的id為了不動到資料庫而變成這樣
    var PrepareSend = function () {
        var Aobj = new Object();
        Aobj.type = "blue";
        Aobj.icon = "fas fa-list-alt";
        Aobj.theme = "material"; //material
        Aobj.title = "訂購資訊";
        Aobj.content = '<div>\
                            <div class="form-group">\
                                <label>訂購人姓名</label>\
                                <input type="text" class="form-control" id="UserName" >\
                            </div>\
                            <div class="form-group">\
                                <label>訂購人手機</label>\
                                <input type="text" class="form-control" id="Phone2" >\
                            </div>\
                            <div class="form-group">\
                                <label>訂購人電話</label>\
                                <input type="text" class="form-control" id="Tel2" >\
                            </div>\
                            <hr />\
                            <div class="form-group">\
                            <!-- Default unchecked -->\
                            <div class="custom-control custom-checkbox" >\
                            <input type="checkbox" class="custom-control-input" id="sameinfo">\
                             <label class="custom-control-label" for="sameinfo"> 收貨人資訊同訂購人資訊</label>\
                            </div>\
                            <div>\
                                <label>收貨人姓名</label>\
                                <input type="text" class="form-control" id="BuyUserName">\
                            </div>\
                            <div class="form-group">\
                                <label>收貨人手機</label>\
                                <input type="text" class="form-control" id="Phone" placeholder="手機1">\
                                <input type="text" class="form-control" id="Phone3" placeholder="手機2(可不填)">\
                            </div>\
                            <div class="form-group">\
                                <label>收貨人電話</label>\
                                <input type="text" class="form-control" id="Tel">\
                            </div>\
                            <div class="form-group">\
                                <label>收貨人地址</label><br />\
                                <select id="City" name="City" class="form-control" style="float:left;width:auto" data-width="150"></select>\
                                <select id="Area" name="Area" class="form-control" style="float:left;width:auto"  data-width="150"></select>\
                                <input id="Address" name="Address" class="form-control" placeholder="地址" />\
                            </div>\
                            <div id="hidval" style="display:none;"></div>\
                        </div>';
        Aobj.useBootstrap = true;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.closeIcon = true;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    Send();
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            $('#City').change(function () { Common_Area('#Area', $(this).val()); });
            $('#sameinfo').change(function () {
                if ($('#sameinfo').prop('checked') == true) {
                    $('#BuyUserName').val($('#UserName').val());
                    $('#Phone').val($('#Phone2').val());
                    $('#Tel').val($('#Tel2').val());


                    /* 真是的 為什麼一定要包成這樣才能真正同步咧 */
                    $('#UserName').focus(function () {
                        $('#UserName').keyup(function () {
                            $('#BuyUserName').val($('#UserName').val());
                        });
                    });
                    $('#Phone2').focus(function () {
                        $('#Phone2').keyup(function () {
                            $('#Phone').val($('#Phone2').val());
                        });
                    });
                    $('#Tel2').focus(function () {
                        $('#Tel2').keyup(function () {
                            $('#Tel').val($('#Tel2').val());
                        });
                    });
                }
                else {
                    $('#BuyUserName').val('');
                    $('#Phone').val('');
                    $('#Tel').val('');
                }
            });
            Common_City('#City');
            Common_Area('#Area', $('#City').val());
        };
        Common_Confirm(Aobj);
    }

    var Send = function () {
        var obj = new Object();
        obj.Name = $('#UserName').val();
        obj.UserID = UserInfo.UserID;
        obj.UserName = UserInfo.UserName;
        obj.BuyUserName = $('#BuyUserName').val();
        obj.Phone2 = $('#Phone2').val();
        obj.Tel2 = $('#Tel2').val();
        obj.City = $('#City').val();
        obj.Area = $('#Area').val();
        obj.Address = $('#Address').val();
        obj.Phone = $('#Phone').val();
        obj.Phone3 = $('#Phone3').val();
        obj.Tel = $('#Tel').val();
        obj.Price = TotalPrice;

        var DetailList = [];

        for (var i = 0; i < CartList.length; i++) {
            var Cobj = CartList[i];
            var ProductInfo = GetProductInfo(Cobj.ProductID);

            var ProductPrice = ProductInfo.Price;
            var Price = Number(ProductPrice) * Number(Cobj.Count);

            DetailList.push({
                ProductID: ProductInfo.ID,
                ProductName: ProductInfo.Name,
                Count: Cobj.Count,
                Price: Price,
                Category: ProductInfo.Category,
                CompanyID: ProductInfo.CompanyID,
                //Company: ProductInfo.Company,
                PurchaseUnit: "",
                PurchasePrice: "0",
                SaleUnit: "",
                SalePlace: 'CM',
                Status: 'P'
            });
        }

        obj.DetailList = DetailList;



        
        //送往綠界
        
        var testobj = new Object();

        var hashkey = 'HashKey=5294y06JbISpM5x9';
        var hashiv = 'HashIV=v77hoKGq4kWxNNIS';

        var rnd = Common_Guid_ECPAY();

        testobj.MerchantID = '2000132';
        testobj.MerchantTradeNo = rnd;
        testobj.MerchantTradeDate = '2020/10/12 15:30:23';
        testobj.PaymentType = 'aio';
        testobj.TotalAmount = 1999;
        testobj.TradeDesc = '促銷大使';
        testobj.ItemName = 'Apple 7 手機殼';
        testobj.ReturnURL = 'https://130.211.241.28/Jichey/Mall/RtnPage';
        testobj.ChoosePayment = 'Credit';
        testobj.EncryptType = 1;

        var tobj = new Object();
        tobj.encstring = hashkey + '&ChoosePayment=' + testobj.ChoosePayment + '&EncryptType=1&ItemName=' + testobj.ItemName + '&MerchantID=2000132&MerchantTradeDate=2020/10/12 15:30:23&MerchantTradeNo=' + testobj.MerchantTradeNo + '&PaymentType=aio&ReturnURL=' + testobj.ReturnURL + '&TotalAmount=1999&TradeDesc=促銷大使&' + hashiv;
        var ttobj = { Json: JSON.stringify(tobj) };
        var encstring = Common_ConvertObject_ws({ cn: 'Order', sn: 'GetShaString', sd: JSON.stringify(ttobj) });

        testobj.CheckMacValue = encstring;

        

        $.ajax({
            url: 'https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5',
            type: 'POST',
            contentType: 'application/x-www-form-urlencoded',
            data: JSON.stringify(testobj),
            success: function (data) {
                console.log(data);
            }
        });
        
        
        
        
        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'Create', sd: JSON.stringify(objSend) });


        if (CodeDef.Status) {
            MethodShowSuccess(CodeDef.Data);

        //計算獎金的部分，暫時先塞在這
        //
        //
        //
            var price = 0;
            for (var i = 0; i < DetailList.length; ++i) {
                price += DetailList[i].Price;
            }

            var obj = new Object();
            obj.ID = UserInfo.UserID;
            obj.Price = price;
            var objSend = { Json: JSON.stringify(obj) };

            var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'CalcPointsTable', sd: JSON.stringify(objSend) });

        //
        //
        //


        }
        else {
            Common_Notice(CodeDef.Message);
        }
        
    }

    var DeleteCarCart = function (ID) {
        var index = -1;
        var newobj = CartList.find(function (item, i) { if (item.ProductID == ID) { index = i; return item; } });

        TotalPrice = 0;

        CartList.splice(index, 1);

        console.log(CartList);
        localStorage.lsCartList = JSON.stringify(CartList);
    }

    var AddCarCart = function (ID, Count, Price) {
        var index = -1;
        var newobj = (CartList.length > 0) ? CartList.find(function (item, i) { if (item.ProductID == ID) { index = i; return item; } }) : -1;

        if (index != -1) {
            CartList[index].Count = Number(Count);
        }
        else {
            CartList.push({
                ProductID: ID,
                Count: Count,
                Price: Price,
            });
        }

        localStorage.lsCartList = JSON.stringify(CartList);
    }

    var MethodShowSuccess = function (VmID) {
        var VmAccount = VmID.replace(/"/g, '');

        var Aobj = new Object();
        Aobj.type = "green";
        Aobj.icon = "fa fa-check";
        Aobj.title = '下單成功';
        Aobj.content = '<div>\
                             <p>您的虛擬帳戶:' + VmAccount + '</p>\
                             <p>您的訂單編號:' + VmAccount.substr(0, VmAccount.length - 1) + '</p>\
                             <p>感謝您的支持與愛護，請您盡速完成匯款流程！\
                                我們將會盡快處理您的訂單，若有任何訂單上處理的問題，您可至會員消費紀錄的訂單客服區發表您的建議，我們會盡快回應您的需求！</p>\
                        </div>';
        Aobj.buttons = {
            確定: {
                text: "確定",
                btnClass: "btn-primary",
                action: function () {
                    localStorage.lsCartList = "";
                    var ProjectName = $('#hidProjectName').val();
                    location.href = "/" + ProjectName + "/Mall/HomePage";
                },
            }
        }
        Common_Alert(Aobj);
    }

    return {
        SetElement: function () {
            GetCartList();
            $('#btnSend').click(function () {
                PrepareSend();
            })
        },
    };
}();

function SetElement() {
    Module.SetElement();
}