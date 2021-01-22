<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="LoginRecord.ascx.cs" Inherits="Jichey.Views.Sys.LoginRecord" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__body ">
        <div class="container-fluid kt-portlet__content" id="DivLoginRecord">
            <div class="row">
                <div class="col-12">
                    <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                        <thead class="thead-dark">
                            <tr>
                                <th>類型</th>
                                <th>登入時間</th>
                                <th>登入IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colspan="100">無資料</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 form-group">
                    <nav aria-label="Page navigation example">
                        <div style="float: left">
                            <span class="pagesize-Text">一次顯示</span>
                            <select id="Com_PageSize" class="form-control" style="float: left; width: auto">
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                            </select>
                            <span class="pagesize-Text">筆，總筆數:</span>
                            <span id="Com_ResultCount" class="pagesize-Text">0</span>
                            <span class="pagesize-Text">筆</span>
                        </div>
                        <ul class="pagination pull-right" id="DivPageIndex" style="margin: 0px; font-size: 1.3rem"></ul>
                    </nav>
                </div>
            </div>
            <input type="hidden" id="hidPageSize" value="10" />
            <input type="hidden" id="hidPageIndex" value="1" />
        </div>
    </div>
</div>

<script type="text/javascript">
    var LoginRecordModule = function () {
        var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : [{ UserName: "Admin" }];

        var MethodSearch = function () {
            var obj = SearchSerilizeJSON('#DivLoginRecord');
            obj.Account = UserInfo.Account;

            var objSend = { Json: JSON.stringify(obj) };
            var CodeDef = Common_ConvertObject_ws({ cn: 'Account', sn: 'GetLoginLog', sd: JSON.stringify(objSend) });

            $('#DivLoginRecord #gv_MainTable > tbody').empty();
            if (CodeDef.Data && CodeDef.Status) {
                var Cobj = JSON.parse(CodeDef.Data);

                for (var i = 0; i < Cobj.length; i++) {
                    var CCobj = Cobj[i];

                    var strtemp = '<tr>\
                                       <td>'+ CCobj.Type + '</td>\
                                       <td>'+ CCobj.TimeText + '</td>\
                                       <td>'+ CCobj.IpAddress + '</td>\
                                   </tr> ';

                    var str = $(strtemp);
                    $('#DivLoginRecord #gv_MainTable > tbody').append(str);
                }

                if (Cobj.length == 0) $('#DivLoginRecord #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');

                $('#DivLoginRecord #Com_ResultCount').text(CodeDef.ResultCount);
                var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(CodeDef.ResultCount) / Number(obj.PageSize));
                var Iobj = new Object();
                Iobj.NowPage = obj.PageIndex;
                Iobj.Page = Page;
                Com_PageIndex(Iobj, "#DivLoginRecord #DivPageIndex", "#DivLoginRecord #hidPageIndex", function () { MethodSearch(); });
            }
            else $('#DivLoginRecord #gv_MainTable > tbody').append('<tr><td colspan="100">無資料</td></tr>');
        }

        return {
            SetElement: function () {
                MethodSearch();
            },
        };
    }();

</script>
