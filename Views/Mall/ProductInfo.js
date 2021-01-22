var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var CartList = (localStorage.lsCartList) ? JSON.parse(localStorage.lsCartList) : [];


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
    }

    var GetProductInfo = function (PID) {
        var obj = new Object();
        obj.ID = PID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Products', sn: 'GetProductsData', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            var ImageList = Cobj.ImageList;
            var VideoList = Cobj.VideoList;
            //var ProductPrice = (Cobj.PriceList.length == 0) ? "0" : Cobj.PriceList.find(function (item, i) { if (item.PlaceID == 'CM') return item }).SalePrice;

            $('#productname').data('name', Cobj.Name);
            $('#productname').append(Cobj.Name);
            $('#productengname').data('ename', Cobj.EngName);
            $('#productengname').append(Cobj.EngName);
            $('#SalePrice').text('$ ' + Cobj.Price);
            $('#singleprice').val(Cobj.Price);


            $('#btnCart').data('id', Cobj.ID).data('price', Cobj.Price);

            //MethodSearch_Price();
            MethodSearch_Images(ImageList);
        }
    }

    var MethodSearch_Images = function (ImageList) {
        for (var i = 0; i < ImageList.length; i++) {
            var Iobj = ImageList[i];
            var url = Iobj.ImageUrl;

            var strtemp = '<div class="swiper-slide"><img src="' + url + '" width="100%" /></div>';

            var str = $(strtemp);
            $('#DivSwiper').append(str);
        }
        Switer();
    }
    var Switer = function () {
        var swiper = new Swiper('.swiper-container', {
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,             //這行我自己加的
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }


    return {
        SetElement: function () {
            var ProductID = $('#hidProductID').val();
            var ProjectName = $('#hidProjectName').val();
            GetProductInfo(ProductID);

            $('#btnCart').click(function () {
                var ID = $(this).data('id');
                var Price = $(this).data('price');
                var Count = $('#buyCount').val();

                AddCarCart(ID, Count, Price);
                Common_Notice('加入購物車成功');


            });

            $('#buyCount').TouchSpin({
                buttondown_class: "btn btn-success",
                buttonup_class: "btn btn-success",
                min: 1,
                max: 1000,
                step: 1,
            });

            $('#buyCount').change(function () {
                $('#smallTotal').text('$ ' + $('#buyCount').val() * $('#singleprice').val());
            });

            $('#rtnpage').click(function () {
                history.go(-1);
                return false;
            });


            $('#smallTotal').text('$ ' + $('#buyCount').val() * $('#singleprice').val());

        },
    };
}();

function SetElement() {
    Module.SetElement();
}