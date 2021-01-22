var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };

    var MethodShowCreate = function () {
        var ProjectName = $('#hidProjectName').val();
        location.href = "/" + ProjectName + "/Products/SupplierEditProduct";
    }

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#TableView');

        var objSend = { Json: JSON.stringify(obj) };
        var Clist = Common_ConvertObject_ws({ cn: 'Products', sn: 'ProductManage_GetProducts', sd: JSON.stringify(objSend) });

        $('#gv_MainTable > tbody').empty();
        $('#gv_MainTable_Card').empty();

        MethodSearchList(Clist, obj);
        MethodSearchCard(Clist);
    }

    var MethodSearchList = function (Clist, obj) {

        if (Clist.Data && Clist.Status) {
            var Cobj = JSON.parse(Clist.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var Status = (CCobj.Status == '1') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--success">上架中</span>'
                    : Status = (CCobj.Status == 'D') ? '<span class="kt-badge kt-badge--inline kt-font-bold">已刪除</span>'
                        : '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">下架中</span>';      
                /*
                var Status = (CCobj.Status == 'P') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--primary">提交中</span>'
                    : (CCobj.Status == 'S') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--success">審核成功</span>'
                        : (CCobj.Status == 'R') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">審核失敗</span>'
                            : '';
                */
                var strtemp = '<tr>\
                                   <td>'+ CCobj.StartTimeText + '</td>\
                                   <td>'+ CCobj.CloseTimeText + '</td>\
                                   <td>'+ CCobj.Name + '</td>\
                                   <td>'+ CCobj.Category + '</td>\
                                   <td>'+ CCobj.Cost + '</td>\
                                   <td>$'+ CCobj.Price + '</td>\
                                   <td>'+ CCobj.LimitCount + '</td>\
                                   <td>'+ Status + '</td>\
                                   <td>\
                                       <button type="button" type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.ID + '"><i class="fas fa-pen"></i></button>\
                                       <button type="button" type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.ID + '"><i class="fas fa-trash-alt"></i></button>\
                                   </td>\
                               </tr> ';

                var str = $(strtemp);
                $('#gv_MainTable > tbody').append(str);
            }
            $('#gv_MainTable > tbody .Edit').click(function () {
                var ID = $(this).data('id');

                MethodShowEdit(ID);
            });

            $('#gv_MainTable > tbody .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            $('#gv_MainTable > tbody .History').click(function () {
                var ID = $(this).data('id');

                MethodSearchHistory(ID);
            });

            if (Cobj.length == 0) $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

            $('#Com_ResultCount').text(Clist.ResultCount);
            var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(Clist.ResultCount) / Number(obj.PageSize));
            var Iobj = new Object();
            Iobj.NowPage = obj.PageIndex;
            Iobj.Page = Page;
            Com_PageIndex(Iobj, "#DivPageIndex", "#hidPageIndex", function () { MethodSearch(); });

        }
        else $('#gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');
    }
    var MethodSearchCard = function (Clist) {

        if (Clist.Data && Clist.Status) {
            var Cobj = JSON.parse(Clist.Data);

            for (var i = 0; i < Cobj.length; i++) {
                var CCobj = Cobj[i];

                var ImageUrl = (CCobj.ImageUrl) ? CCobj.ImageUrl : "/Images/NoImage.jpg";

                var Status = (CCobj.Status == '1') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--success">上架中</span>'
                    : Status = (CCobj.Status == 'D') ? '<span class="kt-badge kt-badge--inline kt-font-bold">已刪除</span>'
                        : '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">下架中</span>';  
                /*
                var Status = (CCobj.Status == 'P') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--primary">提交中</span>'
                    : (CCobj.Status == 'S') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--success">審核成功</span>'
                        : (CCobj.Status == 'R') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">審核失敗</span>'
                            : '';
                */
               // var RejectText = (CCobj.StatusDescript.toString().replace(/(^s*)|(s*$)/g, "").length != 0) ? '</span><span class="kt-widget__hint">拒絕原因</span>&nbsp;<span class="btn btn-label-danger btn-sm btn-bold btn-upper">' + CCobj.StatusDescript + '</span>' : '';


                var strtemp = '<div class="kt-portlet kt-widget kt-widget--general-3" style="border: 1px solid #ebedf2">\
                                   <div class="kt-portlet__body kt-portlet__body--fit">\
                                       <div class="kt-widget__top">\
                                           <div class="kt-media kt-media--lg kt-media--circle"><img src="'+ ImageUrl + '" alt="image"></div>\
                                           <div class="kt-widget__wrapper">\
                                               <div class="kt-widget__label">\
                                                   <span class="kt-widget__title">'+ CCobj.Name + '</span>\
                                                   <span class="kt-widget__desc">'+ CCobj.No + '</span>\
                                               </div>\
                                               <div class="kt-widget__label"><span class="kt-widget__desc">類別:'+ CCobj.Category + '</span></div>\
                                               <div class="kt-widget__stats">\
                                                   <div class="kt-widget__stat">\
                                                       <span class="kt-widget__value">$'+ CCobj.Price + '</span>\
                                                       <span class="kt-widget__caption">價格</span>\
                                                   </div>\
                                                   <div class="kt-widget__stat">\
                                                       <span class="kt-widget__value">$'+ CCobj.Cost + '</span>\
                                                       <span class="kt-widget__caption">成本</span>\
                                                   </div>\
                                                   <div class="kt-widget__stat">\
                                                       <span class="kt-widget__value">'+ CCobj.LimitCount + '</span>\
                                                       <span class="kt-widget__caption">限量</span>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                       </div>\
                                       <div class="kt-widget__bottom">\
                                           <div class="kt-widget__summary">\
                                               <div class="kt-widget__item">\
                                                   </span><span class="kt-widget__hint">上架時間</span>&nbsp;<span class="btn btn-label-brand btn-sm btn-bold btn-upper">'+ CCobj.StartTimeText + '\
                                                   </span><span class="kt-widget__hint">下架時間</span>&nbsp;<span class="btn btn-label-brand btn-sm btn-bold btn-upper">'+ CCobj.CloseTimeText + '\
                                                   </span><span class="kt-widget__hint">狀態</span>&nbsp;<span class="btn btn-label-brand btn-sm btn-bold btn-upper">'+ Status + '</span>\
                                               </div>\
                                           </div>\
                                           <div class="kt-widget__toolbar">\
                                               <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="'+ CCobj.ID + '"><i class="fas fa-pen"></i></button>\
                                               <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="'+ CCobj.ID + '"><i class="fas fa-trash-alt"></i></button>\
                                           </div>\
                                       </div>\
                                   </div>\
                               </div>';

                var str = $(strtemp);
                $('#gv_MainTable_Card').append(str);
            }
            $('#gv_MainTable_Card .Edit').click(function () {
                var ID = $(this).data('id');

                MethodShowEdit(ID);
            });

            $('#gv_MainTable_Card .Delete').click(function () {
                var ID = $(this).data('id');

                MethodDelete(ID);
            });

            $('#gv_MainTable_Card .History').click(function () {
                var ID = $(this).data('id');

                MethodSearchHistory(ID);
            });

            if (Cobj.length == 0) $('#gv_MainTable_Card').append('<div style="border: 1px solid #ebedf2; width: 100%; text-align: center;margin:20px"><h4>無資料</h4></div>');
        }
        else $('#gv_MainTable_Card').append('<div style="border: 1px solid #ebedf2; width: 100%; text-align: center;margin:20px"><h4>無資料</h4></div>');
    }


    var MethodShowEdit = function (ID) {
        var ProjectName = $('#hidProjectName').val();
        location.href = "/" + ProjectName + "/Products/SupplierEditProduct?ID=" + ID;
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
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Products', sn: 'DeleteProducts', sd: JSON.stringify(objSend) });

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


    var MethodReset = function () {
        $('#SearchID').val('');
        $('#SearchName').val('');
        $('#SearchStatus').selectpicker('val', '');
        $('#SearchStatus').selectpicker('refresh');
        $('#SearchStartDate').val('');
        $('#SearchCloseTime').val('');

        MethodSearch();
    }

    //浚傑
    var MethodSearchHistory = function (ID) {
        var data = {};
        var TmpTable1 = $.templates("#Tmp_ProductHistory");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "紀錄";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            MethodGetHistoryData(ID);

        };
        Aobj = HistoryDialogOption(Aobj);
        Common_Confirm(Aobj);
    }

    var MethodGetHistoryData = function (ID) {
        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Products_History', sn: 'GetHistoryDataByGroupID', sd: JSON.stringify(objSend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);
            var strtemp = '';

            if (Cobj.length == 0) {
                strtemp += '<tr><td> 無資料 </td></tr>';
            }
            else {
                for (var i = 0; i < Cobj.length; ++i) {
                    var CCobj = Cobj[i];

                    strtemp += '<tr>\
                                    <td>' + (i + 1) + '</td>\
                                    <td>' + CCobj.sys_createdate.substr(0, 10) + ' ' + CCobj.sys_createdate.substr(11, 8) + '</td>\
                                    <td>' + CCobj.sys_createuser + '</td>\
                                    <td>' + CCobj.Name + '</td>\
                                    <td>' + CCobj.Category + '</td>\
                                    <td>' + CCobj.Company + '</td>\
                                   </tr>';
                }
            }

            var str = $(strtemp);
            $('#FormList').append(str);
        }
    }


    return {
        SetElement: function () {
 
            $('#btnCreate').click(function () { MethodShowCreate(); });
            $('#btnSearch').click(function () { MethodSearch(); });
            $('#btnReset').click(function () { MethodReset(); });


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