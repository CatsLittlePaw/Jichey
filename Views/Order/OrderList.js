
var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var recordid = '';

    var MethodAppend = function () {
        var obj = FormSerilizeJSON('#FormList');
        obj.UserName = UserInfo.UserName;
        obj.PersonData = Tab1Data;
        console.log(obj);

        if (!obj.Name) { Common_Notice('請輸入供應商名稱'); return false; }

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Supplier', sn: 'Create', sd: JSON.stringify(objSend) });

        if (CodeDef.Status) {
            toastr.success("存檔成功");
            MethodSearch();
        }
        else toastr.error("存檔失敗");
    }

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#TableView');

        obj.Permission = UserInfo.Permissions;
        obj.CompanyID = UserInfo.UserID;


        if (obj.OrderID == "" && obj.Status == "" && obj.UserName == "" && (obj.StartDate == "" && obj.EndDate == "") && obj.SearchProductName == "") { Common_Notice('請至少輸入某一條件'); return false; }
        $('#MainTable').show();

        var objSend = { Json: JSON.stringify(obj) };
        var Clist = Common_ConvertObject_ws({ cn: 'Order', sn: 'GetOrder', sd: JSON.stringify(objSend) });

        $('#gv_MainTable > tbody').empty();

        if (Clist.Data && Clist.Status) {
            var Cobj = JSON.parse(Clist.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];


                if (obj.Permission == 'Admin' || obj.Permission == 'Administrator') {
                    //未付P 已付W 無效C 已出貨T 會員收貨確認K 退貨B 換貨R 需退款Z
                    var Status = (CCobj.Status == 'P') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">未付款</span>'
                        : (CCobj.Status == 'W') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">已付款</span>'
                            : (CCobj.Status == 'T') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">已出貨</span>'
                                  : '';

                }


                var strtemp = '<tr>\
                               <td>'+ CCobj.OrderID + '</td>\
                               <td>'+ CCobj.sys_createdate.substr(0, 10) + '</td>\
                               <td>'+ CCobj.sys_createuser + '</td>\
                               <td>'+ CCobj.UserName + '</td>\
                               <td>'+ CCobj.BuyUserName + '</td>\
                               <td>'+ Status + '</td>\
                               <td>\
                                   <button type="button" type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.OrderID + '" data-productid="' + CCobj.ProductID + '"><i class="fas fa-cog"></i></button>\
                               </td>\
                           </tr> ';

                var str = $(strtemp);
                $('#gv_MainTable > tbody').append(str);
            }

            $('#gv_MainTable > tbody .Edit').click(function () {
                var ID = $(this).data('id');

                var obj = $(this).data('productid');    //方法1

                MethodShowView(ID, obj);
            });

            $('#gv_MainTable > tbody .View').click(function () {
                var ID = $(this).data('id');
                var obj = new Object();
                obj.product = $(this).data('product');
                obj.category = $(this).data('category');
                obj.saleunit = $(this).data('saleunit');
                obj.saleplace = $(this).data('saleplace');
                obj.price = $(this).data('price');
                obj.count = $(this).data('count');

                MethodShowView(ID, obj);
            });


            $('#gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            if (Cobj.length == 0) $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#Com_ResultCount').text(Clist.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(Clist.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#DivPageIndex", "#hidPageIndex", function () { MethodSearch(); });

        }
        else {
            Common_Notice(Clist.Message);
            $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');
        }
    }

    var MethodShowUpdate = function (ID) {
        var data = [{ Mode: "Edit" }];
        var TmpTable1 = $.templates("#Tmp_Supplier");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "編輯";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var result = MethodAppend()
                    return result;
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            MethodSetDialog(this, ID)

            MethodUpdateData(ID)
        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }


    var MethodDelete = function (ID) {
        var Aobj = new Object();
        Aobj.title = "刪除";
        Aobj.content = "確定刪除嗎?";
        Aobj.buttons = {
            Save: {
                text: "確定",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.ID = ID;
                    obj.UserName = UserInfo.UserName;

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'DeleteOrders', sd: JSON.stringify(objSend) });

                    if (CodeDef.Status) {
                        toastr.success("刪除成功");
                        MethodSearch();
                    }
                    else toastr.error("刪除失敗");

                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () { };
        Aobj = DeleteDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodSetDialog = function (obj, Id) {
        Tab1Data = [];

        $('#City').change(function () { Common_Area('#Area', $(this).val()); });
        Common_City('#City');
        Common_Area('#Area', $('#City').val());

        Common_initContol('#FormList');

        $('#btnCreate_Person').click(function () { MethodShowCreate_Person() });
    }

    var MethodReset = function () {
        $('#SearchID').val('');
        $('#SearchUserName').val('');
        $('#SearchStatus').val('');
        $('#SearchStatus').selectpicker('refresh');
        $('#SearchStartDate').val('');
        $('#SearchEndDate').val('');
        $('#SearchProductName').val('');

        $('#MainTable').hide();
    }

    var MethodShowView = function (ID, obj) {
        var data = [{ Mode: "Edit", LoginName: UserInfo.UserName }];
        var TmpTable1 = $.templates("#TmpOrder_View");
        var strtemp = TmpTable1.render(data);


        var Aobj = new Object();
        Aobj.title = "編輯";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var objj = new Object();
                    objj.Status = $('#Status').val();
                    objj.ID = ID;
                    objj.FreightName = $('#FreightName').val();
                    objj.FreightNo = $('#FreightNo').val()
                    objj.SupplierID = UserInfo.UserID;
                    objj.ProductID = obj;    //方法1

                    var objSend = { Json: JSON.stringify(objj) };


                    /*
                    if ($('#Status').val() == 'T')
                        if ($('#FreightName').val().toString().replace(/(^s*)|(s*$)/g, "").length == 0 || $('#FreightNo').val().toString().replace(/(^s*)|(s*$)/g, "").length == 0) {
                            Common_Notice("請填入貨運資訊");
                            return false;
                        }
                    */

                    //這裡要改  同一家供應商 同一筆訂單 就算有兩個商品也只能設定一次FreightNo和FreightName
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'SetFreightData', sd: JSON.stringify(objSend) });



                    if (CodeDef.Status) {
                        if ($('#Status').val() == 'T')
                            toastr.success("出貨設定完成");
                        else if ($('#Status').val() == 'Y')
                            toastr.success("退貨設定完成");
                        else
                            toastr.success("設定成功");
                        MethodSearch();
                    }
                    else toastr.error("設定失敗");

                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            var obj = new Object();
            obj.ID = ID;
            var Send = { Json: JSON.stringify(obj) };
            var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'BuyListGetOrder', sd: JSON.stringify(Send) });

            if (CodeDef.Status && CodeDef.Data) {
                var Cobj = JSON.parse(CodeDef.Data);
                AutoBind('#FormList', Cobj);
            }

            $('#Status').selectpicker(Cobj.Status);    //清單預設目前狀態
            $('#Status').val(Cobj.Status);

            var objj = new Object();
            objj.ID = ID;
            objj.SupplierID = UserInfo.UserID;
            objj.Permission = UserInfo.Permissions;

            objj.ProductID = obj;   //方法1

            var objSend = { Json: JSON.stringify(objj) };

            var CodeDef2 = Common_ConvertObject_ws({ cn: 'Order', sn: 'BuyListGetOrder_Details', sd: JSON.stringify(objSend) });
            if (CodeDef2.Data && CodeDef2.Status) {
                var Cobj2 = JSON.parse(CodeDef2.Data);
                var strtemp = '';

                for (var i = 0; i < Cobj2.length; ++i) {
                    var CCobj2 = Cobj2[i];


                    strtemp += '<div class="row form-group">\
                <label class=" col-3 col-form-label text-right" > 產品名稱 </label >\
                    <div class="col-md-3 col-9">\
                        <input id="ProductName' + i + '" name="ProductName' + i + '" class="form-control" autocomplete="off" value="' + CCobj2.ProductName + '" disabled />\
                    </div>\
                    <label class=" col-3 col-form-label text-right">類別	 </label>\
                    <div class="col-md-3 col-9">\
                        <input id="Category' + i + '" name="Category' + i + '" class="form-control" autocomplete="off" value="' + CCobj2.Category + '" disabled />\
                    </div>\
            </div >\
    <div class="row form-group">\
        <label class=" col-3 col-form-label text-right">單價 </label>\
        <div class="col-md-3 col-9">\
            <input id="Price' + i + '" name="Price' + i + '" class="form-control" autocomplete="off" value="' + CCobj2.Price / CCobj2.Count + '" disabled />\
        </div>\
        <label class=" col-3 col-form-label text-right">數量 </label>\
        <div class="col-md-3 col-9">\
            <input id="Count' + i + '" name="Count' + i + '" class="form-control" autocomplete="off" value="' + CCobj2.Count + '" disabled />\
        </div>\
    </div>\
    <div class="row form-group">\
        <label class=" col-9 col-form-label text-right">小計： ' + CCobj2.Price + '</label>\
    </div>\
     <hr />';
                }
            }

            var str = $(strtemp);
            $('#ProductsArea').append(str);


            var objj2 = new Object();
            objj2.ID = ID;
            objj2.SupplierID = UserInfo.UserID;
            var FreightInfo = Common_ConvertObject_ws({ cn: 'Order', sn: 'GetFreightData', sd: JSON.stringify(objSend) });
            var Freight = JSON.parse(FreightInfo.Data);
            $('#FreightName').val(Freight.FreightName);
            $('#FreightNo').val(Freight.FreightNo);



            //下面這段好像用不到

            $('#ProductName').val(obj.product)
            $('#Category').val(obj.category)
            $('#SaleUnit').val(obj.saleunit)
            $('#SalePlace').val(obj.saleplace)
            $('#Price2').val(obj.price)
            $('#Count').val(obj.count)
            //$('#FreightName').val(obj.FreightName);
            //$('#FreightNo').val(obj.FreightNo);
        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodExcel = function () {
        var obj = SearchSerilizeJSON('#TableView');
        obj.Permission = UserInfo.Permissions;
        obj.CompanyID = UserInfo.UserID;

        var objSend = JSON.stringify(obj);
        window.open('/WebService/ExcelDownload/ExcelCreate.ashx?Data=' + objSend);
    }

    //浚傑
    var MethodExcelUpdate = function () {
        var file = document.getElementById('UploadFiles').files[0];


        var fileTypes = ['xls', 'xlsx'];
        var extension = file.name.split('.').pop().toLowerCase();
        var fileSize = file.size;
        var isSuccess = fileTypes.indexOf(extension) > -1;

        if (!isSuccess) { Common_Notice("請選擇xls,xlsx檔案"); return false; }

        var fileData = new FormData();
        fileData.append(file.name, file);



        var Aobj = new Object();
        Aobj.title = "檔案上傳";
        Aobj.content = "確認上傳嗎?";
        Aobj.buttons = {
            Save: {
                text: "確定",
                btnClass: "btn-primary",   //啥顏色好咧
                action: function () {
                    var CodeDef = JSON.parse(Common_UploadExcel(fileData)); //上傳檔案

                    var obj = new Object();
                    obj.Permission = UserInfo.Permissions;
                    obj.CompanyID = UserInfo.UserID;
                    obj.Extension = extension;
                    obj.FileName = CodeDef.FileName;



                    var objSend = { Json: JSON.stringify(obj) };


                    var Codedef = Common_ConvertObject_ws({ cn: 'Order', sn: 'UploadExcel', sd: JSON.stringify(objSend) });

                    if (Codedef.Status) {
                        var excelid = JSON.parse(Codedef.Data);
                        recordid = excelid.message;

                        toastr.success("成功上傳");

                        //刷新頁面
                        var obj = SearchSerilizeJSON('#TableView');
                        if (obj.OrderID || obj.Status || obj.UserName || obj.StartDate || obj.EndDate) {
                            MethodSearch();
                        }
                    }
                    else {
                        Common_Error(Codedef.Message);

                        toastr.error("上傳失敗");
                    }

                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () { };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);

    }

    var MethodHistoryRecord = function () {
        var data = {};
        var TmpTable1 = $.templates("#ExcelRecord_View");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "上傳紀錄";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            關閉: { text: "返回" }
        };
        Aobj.ContentReady = function () {
            var obj = new Object();
            obj.ID = recordid;


            var objSend = { Json: JSON.stringify(obj) };

            var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'ExcelRecord', sd: JSON.stringify(objSend) });

            if (CodeDef.Status && CodeDef.Data) {
                $('#gv_MainTable_c > tbody').empty();

                var Cobj = JSON.parse(CodeDef.Data);
                var strtemp = '';
                if (Cobj.length == 0)
                    strtemp += '<tr><td colspan="100">無資料</td></tr>';

                for (var i = 0; i < Cobj.length; ++i) {
                    var CCobj = Cobj[i];

                    strtemp += '<tr>\
                               <td>' + CCobj.OrderID + '</td >\
                               <td>' + CCobj.VMAccount + '</td>\
                               <td>' + CCobj.Date.substr(0, 10) + '</td>\
                               <td>' + CCobj.Description + '</td>\
                               <td>' + CCobj.Description2 + '</td>\
                               <td> $ ' + CCobj.Credit + '</td>\
                               </tr>';
                }

                var str = $(strtemp);
                $('#gv_MainTable_c > tbody').append(str);
            }

        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }


    return {
        SetElement: function () {

            $('#btnSearch').click(function () { MethodSearch(); });
            $('#btnReset').click(function () { MethodReset(); });
            $('#btnExcel').click(function () { MethodExcel(); });
            $('#btnRecord').click(function () { MethodHistoryRecord(); });


            $('#btnExcelUpdate').click(function () { $('#UploadFiles').click(); });
            $('#UploadFiles').change(function () { MethodExcelUpdate(); });

            Common_initContol('#TableView');

            $('#hidPageSize').val(10);
            $('#Com_PageSize').change(function () {
                $('#hidPageSize').val($(this).val());
                $('#hidPageIndex').val(1);
                console.log("PageSize :" + $('#hidPageSize').val());
                MethodSearch();
            });
        },
    };
}();

function SetElement() {
    Module.SetElement();
}

