var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var CartList = (localStorage.lsCartList) ? JSON.parse(localStorage.lsCartList) : [];

    if (!localStorage.lsF1) { CartList = []; localStorage.lsF1 = "1"; }


    var MethodSearch = function () {
        var obj = new Object();
        obj.Name = $('#txtSearch').val();
        obj.UserID = UserInfo.UserID;
        obj.PageIndex = 1;
        obj.PageSize = 10000;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Products', sn: 'BuyerGetProducts', sd: JSON.stringify(objSend) });

        $('#gv_MainTable_Card').empty();
        $('#gv_MainTable > tbody').empty();

        MethodShowCard(CodeDef);
        MethodShowList(CodeDef);


    }
    var AddCarCart = function (ID, Count, Price) {
        var index = -1;
        var newobj = (CartList.length > 0) ? CartList.find(function (item, i) { if (item.ProductID == ID) { index = i; return item; } }) : -1;

        if (index != -1) {
            CartList[index].Count = Number(CartList[index].Count) + Number(Count);
        }
        else {
            CartList.push({
                ProductID: ID,
                Count: Count,
                Price: Price,
            });
        }

        $('#CartCount').text(CartList.length);

        console.log(CartList);
        localStorage.lsCartList = JSON.stringify(CartList);

        var TPrice = 0;
        CartList.forEach(x => TPrice += (x.Price * x.Count));
        return TPrice
    }

    var GetPackageType = function () {
        var obj = new Object();
        obj.ID = UserInfo.UserID;

        var objSend = { Json: JSON.stringify(obj) };
        var FranchiseeData = Common_ConvertObject_ws({ cn: 'Franchisee', sn: 'GetFranchiseeData', sd: JSON.stringify(objSend) });

        if (FranchiseeData.Status) {
            var Fobj = JSON.parse(FranchiseeData.Data);

            return (Fobj.PackageType) ? Fobj.PackageType : "CM";
        }
    }


    //浚傑

    var MethodShowList = function (CodeDef) {

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);
            //var PackageType = GetPackageType();

            if (Cobj.length == 0)
                $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];
                var ProductImage = (CCobj.ImageList.length == 0) ? "/Images/NoImage.jpg" : CCobj.ImageList[0].ImageUrl;

                var strtemp = '<tr>\
                                 <td class="btnDetail" data-id="'+ CCobj.ID + '">' + CCobj.Name + '</td>\
                                 <td class="btnDetail" data-id="'+ CCobj.ID + '">' + CCobj.Category + '</td>\
                                 <td class="btnDetail" data-id="'+ CCobj.ID + '">' + '0' + '</td>\
                                 <td class="btnDetail" data-id="'+ CCobj.ID + '"> $ ' + CCobj.Price + '</td>\
                                 <td><input class="buyCount" value="0" style="margin-bottom:5px;text-align:center;" size="5" data-price="' + CCobj.Price + '" data-id="' + CCobj.ID + '"/></td>\
                                 <td><div class="card-text smallTotal" style="text-align:center btnDetail" data-id="' + CCobj.ID + '">小計: $ 0</div></td>\
                                 <td><button type="button" type="button" class="btn btn-primary col-12 btnPick" data-id="'+ CCobj.ID + '" data-price="' + CCobj.Price + '">選購</button></td>\
                                </tr>';



                var str = $(strtemp);
                $('#gv_MainTable > tbody').append(str);
            }

            $('#gv_MainTable > tbody .btnDetail').click(function () {
                var ID = $(this).data('id');
                var ProjectName = $('#hidProjectName').val();

                location.href = "/" + ProjectName + "/Mall/ProductInfo?PID=" + ID;
                //location.href = "/BumbleGo/Product/Review_Edit";
            })

            $('#gv_MainTable > tbody .btnPick').click(function () {
                var ID = $(this).data('id');
                var Price = $(this).data('price');
                var Count = $(this).parents('.card-body').find('.buyCount').val();
                var obj = $(this);



                if (Count == 0) {
                    Common_Notice('請選擇數量');
                    return;
                }

                var P = AddCarCart(ID, Count, Price);
                Common_Success('加入購物車成功，目前小計:' + P + '元', function () { obj.parents('.card-body').find('.buyCount').val(0) })
            })

            $('#gv_MainTable > tbody img').on('error', function () { $(this).attr('src', '/Images/NoImage.jpg') });

            $('#gv_MainTable > tbody .buyCount').change(function () {
                var count = $(this).val();
                var price = $(this).data('price');
                var id = $(this).data('id');
                $('.smallTotal[data-id="' + id + '"]').text('小計: $  ' + price * count);
            })
        }

        $('.buyCount').TouchSpin({
            buttondown_class: "btn btn-success btn-sm",
            buttonup_class: "btn btn-success btn-sm",
            min: 0,
            max: 1000,
            step: 1,
        });
        $('.buyCount').keyup(function () {
            var x = $(this).val();
            x = x.replace(/[^\d]/g, '')
            $(this).val(x);
        })

    }

    var MethodShowCard = function (CodeDef) {

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);
            //var PackageType = GetPackageType();

            var strtemp = '';
            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];
                var ProductImage = (CCobj.ImageList.length == 0) ? "/Images/NoImage.jpg" : CCobj.ImageList[0].ImageUrl;

                if (i % 6 == 0) {
                    strtemp += '<div class="row">';
                }
                strtemp += '<div class="col-xl-2 col-lg-3 col-md-4 col-6">\
                                    <div class="card" style="width: 100%">\
                                        <img src="'+ ProductImage + '" class="card-img-top">\
                                        <div class="card-body">\
                                            <h5 class="card-title">' + CCobj.Name + '</h5>\
                                            <p class="card-text">產品類別: ' + CCobj.Category + '</p>\
                                            <p class="card-text">庫存: ' + '0' + '</p>\
                                            <p class="card-text">價格: $'+ CCobj.Price + '</p>\
                                            <div class="form-group"><input class="buyCount" value="0" style="margin-bottom:5px;text-align:center" data-price="' + CCobj.Price + '" data-id="' + CCobj.ID + '"/></div>\
                                            <p class="card-text smallTotal" style="text-align:center" data-id="' + CCobj.ID + '">小計: $ 0</p>\
                                            <button type="button" type="button" style="margin-bottom:5px" class="btn btn-primary col-12 btnDetail" data-id="'+ CCobj.ID + '">詳細資料</button>\
                                            <button type="button" type="button" class="btn btn-primary col-12 btnPick" data-id="'+ CCobj.ID + '" data-price="' + CCobj.Price + '">選購</button>\
                                        </div>\
                                    </div>\
                                </div>';

                if (i % 6 == 5) {
                    strtemp += '</div>';        //這邊為啥產品總數不是6的倍數 也不會造成html異常
                }


            }
            var str = $(strtemp);
            $('#gv_MainTable_Card').append(str);

            $('#gv_MainTable_Card .btnDetail').click(function () {
                var ID = $(this).data('id');
                var ProjectName = $('#hidProjectName').val();

                location.href = "/" + ProjectName + "/Mall/ProductInfo?PID=" + ID;
                //location.href = "/BumbleGo/Product/Review_Edit";
            })

            $('#gv_MainTable_Card .btnPick').click(function () {
                var ID = $(this).data('id');
                var Price = $(this).data('price');
                var Count = $(this).parents('.card-body').find('.buyCount').val();
                var obj = $(this);



                if (Count == 0) {
                    Common_Notice('請選擇數量');
                    return;
                }

                var P = AddCarCart(ID, Count, Price);
                Common_Success('加入購物車成功，目前小計:' + P + '元', function () {
                    obj.parents('.card-body').find('.buyCount').val(0);
                    $('.smallTotal[data-id="' + ID + '"]').text('小計: $  0');
                });

            })

            $('#gv_MainTable_Card img').on('error', function () { $(this).attr('src', '/Images/NoImage.jpg') });

            $('#gv_MainTable_Card .buyCount').change(function () {
                var count = $(this).val();
                var price = $(this).data('price');
                var id = $(this).data('id');
                $('.smallTotal[data-id="' + id + '"]').text('小計: $  ' + price * count);
            })
        }

        $('.buyCount').TouchSpin({
            buttondown_class: "btn btn-success btn-sm",
            buttonup_class: "btn btn-success btn-sm",
            min: 0,
            max: 1000,
            step: 1,
        });
        $('.buyCount').keyup(function () {
            var x = $(this).val();
            x = x.replace(/[^\d]/g, '')
            $(this).val(x);
        })

    }

    return {
        SetElement: function () {
            $('#txtSearch').keypress(function (e) {
                var key = window.event ? e.keyCode : e.which;

                if (key == 13) {
                    $('#btnSearch').click();
                }
            });

            $('#btnSearch').click(function () { MethodSearch(); });
            Common_initContol('#TableView');

            MethodSearch();
        },
    };
}();

function SetElement() {
    Module.SetElement();
}