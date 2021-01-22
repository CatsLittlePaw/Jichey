var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var Tab1Data = [], Tab2Data = [];

    var MethodGetData = function (ID)
    {
        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Products', sn: 'GetProductsData', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            AutoBind('#TableView', Cobj);

            Tab1Data = Cobj.ImageList;
            Tab2Data = Cobj.VideoList;

            MethodSearch_Images();
            MethodSearch_Videos();
        }
    }
    var MethodSearch_Images = function () {
        $('#ProductImage').empty();
        for (var i = 0; i < Tab1Data.length; i++) {
            var Uobj = Tab1Data[i];
            var strtemp = '<li class="list-group-item d-flex justify-content-between align-items-center" >\
                               <a style="max-width:150px;max-height:150px" data-fancybox="images" href="'+ Uobj.ImageUrl + '">\
                                   <img class="img-fluid" src="'+ Uobj.ImageUrl + '">\
                               </a>\
                               <a href="#" class="DeleteImage" data-id="' + Uobj.sys_id + '">\
                                   <span class="badge badge-primary badge-pill"><i class="fas fa-times"></i></span>\
                               </a>\
                           </li>';

            var str = $(strtemp);
            $('#ProductImage').append(str);
        }
        $('#ProductImage .DeleteImage').click(function () {
            var ID = $(this).data('id');

            var index = -1;
            var newDobj = Tab1Data.find(function (item, i) { if (item.sys_id == ID) { index = i; return item; } });
            Tab1Data.splice(index, 1);
            $(this).closest('li').empty();
            console.log(Tab1Data);
        })



        if ($('[data-fancybox="images"]').length > 0) {
            try { $('[data-fancybox="images"]').update(); } catch (ex) { }
        }

        if (Tab1Data.length == 0) $('#ProductImage').append('<li class="list-group-item d-flex justify-content-between align-items-center">無圖片</li>');
    }
    var MethodSearch_Videos = function () {
        for (var i = 0; i < Tab2Data.length; i++) {
            var Dobj = Tab2Data[i];
            $('#YoutubeUrl').val(Dobj.YoutubeUrl);
            var url = (Dobj.YoutubeUrl.split('v=').length > 1) ? Dobj.YoutubeUrl.split('v=')[1] : Dobj.YoutubeUrl;
            url = url.split('&list=').length > 1 ? url.split('&list=')[0] : url;
            $('#YoutubePre').attr('src', 'https://www.youtube.com/embed/' + url);

            if (url.length > 0)
                $('#DivYoutube').show();
        }
    }


    var MethodSave = function () {
        var obj = FormSerilizeJSON('#TableView');
        Tab2Data = [];
        Tab2Data.push({
            YoutubeUrl: obj.YoutubeUrl
        })
        obj.Description = tinymce.get("Description").getContent();
        obj.Slogan = tinymce.get("Slogan").getContent();
        obj.UserName = UserInfo.UserName;
        obj.CompanyID = UserInfo.UserID;
        obj.ImageList = Tab1Data;
        obj.VideoList = Tab2Data;

        obj.StatusDescript = "";  //這是我自己認為較好的做法，可以砍掉這行

        console.log(obj);

        if (!obj.Name) { Common_Notice('請輸入產品名稱'); return false; }
        if (!obj.CategoryID) { Common_Notice('請選擇類別'); return false; }
        if (!obj.Cost) { Common_Notice('請輸入成本'); return false; }
        if (!obj.Price) { Common_Notice('請輸入價格'); return false; }
        if (!obj.StartTime) { Common_Notice('請選擇上架時間'); return false; }
        if (!obj.CloseTime) { Common_Notice('請選擇下架時間'); return false; }

        if (!obj.LimitCount) { Common_Notice('請輸入限量數目'); return false; }
        if (obj.LimitCount == 0) obj.LimitCount = -1;


        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Products', sn: 'Create', sd: JSON.stringify(objSend) });

        if (CodeDef.Status) {
            Common_Success('儲存成功', function () {
                var ProjectName = $('#hidProjectName').val();
                location.href = "/" + ProjectName + "/Products/SupplierProductList";
            })
        }
        else toastr.error("存檔失敗");
    };

    var MethodCancel = function () {
        var ProjectName = $('#hidProjectName').val();
        location.href = "/" + ProjectName + "/Products/SupplierProductList";
    }

    var MethodImageUpload = function () {
        var file = document.getElementById('btnRealUpload').files[0];

        var fileTypes = ['jpg', 'jpeg', 'png'];
        var extension = file.name.split('.').pop().toLowerCase();
        var fileSize = file.size;
        var isSuccess = fileTypes.indexOf(extension) > -1;

        if (!isSuccess) { Common_Notice("請選擇jpg,png檔案"); return false; }
        else if (fileSize > 200 * 1024) { Common_Notice("檔案不可超過200KB"); return false; }


        var fileData = new FormData();
        fileData.append(file.name, file);

        var Upfile = Common_UploadFile(fileData, "UserImage");
        if (Upfile) {
            var Ulist = JSON.parse(Upfile);
            if (Ulist.Status) {
                Tab1Data.push({
                    sys_id: Common_Guid(1),
                    ImageUrl: '/TempImages/UserImage/' + Ulist.Guid + Ulist.Type,
                    ImagePath: '',
                });

                MethodSearch_Images();
            }
            else if (Ulist.Message) { Common_Notice(Ulist.Message); return false; }
        } else {
            Common_Notice("存圖失敗");
        }
    }

    var GetCategory = function (element) {
        var obj = new Object();
        obj.CodeType = 'ProductCategory';
        obj.PageIndex = 1;
        obj.PageSize = 10000;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Common', sn: 'GetCodeDef', sd: JSON.stringify(objSend) });

        $(element).empty();
        $(element).append('<option value="">請選擇</option>');

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);
            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var strtemp = '<option value="' + CCobj.CodeID + '">' + CCobj.CodeText + '</option>';

                var str = $(strtemp);
                $(element).append(str);
            }
        }
    }

    return {
        SetElement: function () {
            GetCategory('#CategoryID');  
           
            var ProductID = $('#hidProductID').val();
            if (ProductID != "") {
                
                MethodGetData(ProductID);
            }

            Common_initContol('#TableView'); 


            $('#btnSave').click(function () { MethodSave(); });
            $('#btnSave2').click(function () { MethodSave(); });
            $('#btnCancel').click(function () { MethodCancel(); });
            $('#btnCancel2').click(function () { MethodCancel(); });
            //ImagePage
            $('#btnUpload').click(function () { $('#btnRealUpload').click(); });
            $('#btnRealUpload').change(function () { MethodImageUpload(); });

            //VideoPage
            $('#YoutubeUrl').change(function () {         
                var url = ($(this).val().split('v=').length > 1) ? $(this).val().split('v=')[1] : $(this).val();
                url = url.split('&list=').length > 1 ? url.split('&list=')[0] : url;
                $('#YoutubePre').attr('src', 'https://www.youtube.com/embed/' + url);
                $('#DivYoutube').show();
            });

           

        },
    };
}();

function SetElement() {
    Module.SetElement();

    $(document).on('focusin', function (e) {
        if ($(e.target).closest(".tox-tinymce-aux, .moxman-window, .tam-assetmanager-root").length) {
            e.stopImmediatePropagation();
        }
    });
}