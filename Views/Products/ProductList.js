
var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };

    var MethodShowCreate = function () {
        var ProjectName = $('#hidProjectName').val();
        location.href = "/" + ProjectName + "/Products/EditProduct";
    }

    var MethodSearch = function () {
        var obj = SearchSerilizeJSON('#TableView');

        var objSend = { Json: JSON.stringify(obj) };
        var Clist = Common_ConvertObject_ws({ cn: 'Products', sn: 'GetProducts', sd: JSON.stringify(objSend) });

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

                var strtemp = '<tr>\
                               <td>'+ CCobj.No + '</td>\
                               <td>'+ CCobj.Name + '</td>\
                               <td>'+ CCobj.Unit + '</td>\
                               <td>'+ CCobj.Category + '</td>\
                               <td>'+ CCobj.Supplier + '</td>\
                               <td>'+ CCobj.Cost + '</td>\
                               <td>$'+ CCobj.SalePrice + '</td>\
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
                var strtemp = '<div class="kt-portlet kt-widget kt-widget--general-3" style="border: 1px solid #ebedf2">\
                                   <div class="kt-portlet__body kt-portlet__body--fit">\
                                       <div class="kt-widget__top">\
                                           <div class="kt-media kt-media--lg kt-media--circle"><img src="'+ ImageUrl + '" alt="image"></div>\
                                           <div class="kt-widget__wrapper">\
                                               <div class="kt-widget__label">\
                                                   <span class="kt-widget__title">'+ CCobj.Name + '</span>\
                                                   <span class="kt-widget__desc">'+ CCobj.No + '</span>\
                                               </div>\
                                               <div class="kt-widget__label"><span class="kt-widget__desc">單位:'+ CCobj.Unit + '</span></div>\
                                               <div class="kt-widget__label"><span class="kt-widget__desc">類別:'+ CCobj.Category + '</span></div>\
                                               <div class="kt-widget__label"><span class="kt-widget__desc">供應商:'+ CCobj.Supplier + '</span></div>\
                                               <div class="kt-widget__stats">\
                                                   <div class="kt-widget__stat">\
                                                       <span class="kt-widget__value">$'+ CCobj.SalePrice + '</span>\
                                                       <span class="kt-widget__caption">價格</span>\
                                                   </div>\
                                                   <div class="kt-widget__stat">\
                                                       <span class="kt-widget__value">$'+ CCobj.Cost + '</span>\
                                                       <span class="kt-widget__caption">成本</span>\
                                                   </div>\
                                                   <div class="kt-widget__stat">\
                                                       <span class="kt-widget__value">0</span>\
                                                       <span class="kt-widget__caption">庫存數量</span>\
                                                   </div>\
                                               </div>\
                                           </div>\
                                       </div>\
                                       <div class="kt-widget__bottom">\
                                           <div class="kt-widget__summary">\
                                               <div class="kt-widget__item">\
                                                   <span class="btn btn-label-brand btn-sm btn-bold btn-upper">'+ CCobj.sys_createdateText + '</span>&nbsp;<span class="kt-widget__hint">上架時間</span>\
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

            if (Cobj.length == 0) $('#gv_MainTable_Card').append('<div style="border: 1px solid #ebedf2; width: 100%; text-align: center;margin:20px"><h4>無資料</h4></div>');
        }
        else $('#gv_MainTable_Card').append('<div style="border: 1px solid #ebedf2; width: 100%; text-align: center;margin:20px"><h4>無資料</h4></div>');
    }


    var MethodShowEdit = function (ID) {
        var ProjectName = $('#hidProjectName').val();
        location.href = "/" + ProjectName + "/Products/EditProduct?ID=" + ID;
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
            //MethodSearch();
        },
    };
}();

function SetElement() {
    Module.SetElement();
}