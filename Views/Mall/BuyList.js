var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#TableView');
        obj.Permission = UserInfo.Permissions;
        obj.UserID = UserInfo.UserID;

        if ((obj.StartDate == "" && obj.EndDate != "") || (obj.StartDate != "" && obj.EndDate == "")) { Common_Notice('請同時輸入起始日及結束日'); return false; }
        $('#MainTable').show();

        var objSend = { Json: JSON.stringify(obj) };
        var Clist = Common_ConvertObject_ws({ cn: 'Order', sn: 'GetFranchiseeOrder', sd: JSON.stringify(objSend) });

        $('#gv_MainTable > tbody').empty();

        if (Clist.Data && Clist.Status) {
            var Cobj = JSON.parse(Clist.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                //要叫做 訂單成立 還是 尚未付款
                var Status = (CCobj.Status == 'P') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--primary">尚未付款</span>'
                    : (CCobj.Status == 'W') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">等待出貨</span>'
                        : (CCobj.Status == 'T') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">出貨中</span>'
                            : (CCobj.Status == 'S') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--success">已結單</span>'
                                : '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--metal">取消訂單</span>';

                //CCobj.Count  CCobj.ProductName    CCobj.Category +CCobj.SaleUnit
                var strtemp = '<tr>\
                               <td>'+ CCobj.OrderID + '</td>\
                               <td>'+ CCobj.VMAccount + '</td>\
                               <td>'+ CCobj.sys_createdate.substr(0, 10) + ' ' + CCobj.sys_createdate.substr(11, 8) + '</td>\
                               <td>'+ CCobj.BuyUserName + '</td>\
                               <td> $ ' + CCobj.Price + '</td>\
                               <td>'+ Status + '</td>\
                               <td>\
                                   <button type="button" type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm View" data-id="' + CCobj.OrderID + '"><i class="fas fa-eye"></i></button>\
                               </td>\
                           </tr> ';

                var str = $(strtemp);
                $('#gv_MainTable > tbody').append(str);
            }


            $('#gv_MainTable > tbody .View').click(function () {
                var ID = $(this).data('id');
                var obj = new Object();

                MethodShowView(ID, obj);
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
            Common_Notice('沒有購物紀錄');
            //Common_Notice(Clist.Message);
            $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');
        }
    }

    var MethodReset = function () {
        $('#SearchID').val('');
        $('#SearchStartDate').val('');
        $('#SearchEndDate').val('');
        $('#gv_MainTable > tbody').empty();
        $('#Com_ResultCount').text('0');
        MethodSearch();
    }

    var MethodShowView = function (ID, obj) {
        var data = [{ Mode: "Edit" }];
        var TmpTable1 = $.templates("#TmpBuyList_View");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "編輯";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            關閉: {
                text: "取消",
                action: function () {
                    MethodSearch();
                }
            }
        };
        Aobj.ContentReady = function () {
            MethodUpdateData(ID);

        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
    }
    var MethodUpdateData = function (ID) {
        $('#Child_Table > tbody').text('');

        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'BuyListGetOrder', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            AutoBind('#FormList', Cobj);
        }

        var CodeDef2 = Common_ConvertObject_ws({ cn: 'Order', sn: 'BuyListGetOrder_Details', sd: JSON.stringify(objSend) });

        var strtemp = '';

        if (CodeDef2.Data && CodeDef2.Status) {
            var Cobj2 = JSON.parse(CodeDef2.Data);

            for (var i = 0; i < Cobj2.length; ++i) {
                var CCobj2 = Cobj2[i];

                var Button = (CCobj2.Status == 'K' ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--metal">已確認收貨</span>' : '<button type="button" id="btnSearch" type="button" class="btn btn-warning Check" data-detailid="' + CCobj2.ProductID + '" data-id="' + CCobj2.OrderID + '"><i class="fa fa-check-square"></i>確認收貨</button>');


                strtemp += '<tr>\
                                <td>' + CCobj2.ProductName + '</td>\
                                <td>' + CCobj2.Category + '</td>\
                                <td> $ ' + CCobj2.Price / CCobj2.Count + '</td>\
                                <td>' + CCobj2.Count + '</td>\
                                <td> $ ' + CCobj2.Price + '</td>\
                                <td>' + Button + '</td>\
                            </tr>';

                /*  舊版顯示方式
                strtemp += '\
                <div class="row form-group">\
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
                        <input id="Price' + i + '" name="Price' + i + '" class="form-control" autocomplete="off" value=" $ ' + CCobj2.Price / CCobj2.Count + '" disabled />\
                    </div>\
                    <label class=" col-3 col-form-label text-right">數量 </label>\
                    <div class="col-md-3 col-9">\
                        <input id="Count' + i + '" name="Count' + i + '" class="form-control" autocomplete="off" value="' + CCobj2.Count + '" disabled />\
                    </div>\
                </div>\
                <div class="row form-group">\
                    <label class=" col-9 col-form-label text-right">小計： $ ' + CCobj2.Price + '</label>\
                </div>\
                 <hr />';
                */


            }

            var str = $(strtemp);
            $('#Child_Table > tbody').append(str);



            $('#Child_Table > tbody .Check').click(function () {
                var ProductID = $(this).data('detailid');
                var OrderID = $(this).data('id');


                var Aobj = new Object();
                Aobj.title = "確認";
                Aobj.content = "確認收貨嗎?";
                Aobj.buttons = {
                    Save: {
                        text: "確定",
                        btnClass: "btn-primary",
                        action: function () {

                            var objj = new Object();
                            objj.ProductID = ProductID;
                            objj.OrderID = OrderID;
                            var objSend = { Json: JSON.stringify(objj) };


                            var CodeDef = Common_ConvertObject_ws({ cn: 'Order', sn: 'ClientGetProduct', sd: JSON.stringify(objSend) });


                            if (CodeDef.Status) {
                                toastr.success("收貨完成");
                                MethodUpdateData(OrderID);

                            }
                            else toastr.error("確認收貨失敗!!");

                        }
                    },
                    關閉: { text: "取消" }
                };
                Aobj.ContentReady = function () { };
                Aobj = ReviewPassDialogOption(Aobj);
                Common_Alert(Aobj);

            });

        }
    }

    return {
        SetElement: function () {
            $('#btnSearch').click(function () { MethodSearch(); });
            $('#btnReset').click(function () { MethodReset(); });
            $('#btnExcel').click(function () { MethodExcel(); });

            Common_initContol('#TableView');

            $('#hidPageSize').val(10);
            $('#Com_PageSize').change(function () {
                $('#hidPageSize').val($(this).val());
                $('#hidPageIndex').val(1);
                console.log("PageSize :" + $('#hidPageSize').val());
                MethodSearch();
            });

            MethodSearch();
        },
    };
}();

function SetElement() {
    Module.SetElement();
}