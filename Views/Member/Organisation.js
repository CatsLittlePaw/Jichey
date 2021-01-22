var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };

    var MethodSearch = function () {

        // $.alert({ theme: 'Modern', type: 'orange', icon: 'fa fa-exclamation-circle', title: '標題', content: '內容', defbtn: { text: '確定' } });


        var obj = new Object();
        obj.ID = $('#SearchID').val();
        obj.Name = $('#SearchName').val();

        if (!obj.ID && !obj.Name) { obj.ID = UserInfo.UserID; obj.Name = UserInfo.UserName; }
        else { if ((!obj.Name && obj.ID) || (obj.Name && !obj.ID)) { Common_Notice('請輸入名稱及編號'); return false; } }

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetMemberByNameIdWithOnline', sd: JSON.stringify(objSend) });

        $('#organisation').empty();

        if (CodeDef.Data && CodeDef.Status) {
            var DCobj = JSON.parse(CodeDef.Data);
            var Cobj = DCobj.dt;
            var pid = DCobj.pid;

            //console.log(Cobj);

            var parent = '';
            var son = '';

            if (Cobj.length <= 0) {
                Common_Notice('查無資料');
                $('#main').empty();
                return false;
            }

            //沒有上線
            if (!pid) {
                for (var i = 0; i < Cobj.length; i++) {
                    var CCobj = Cobj[i];

                    var Gender = (CCobj.Gender == '1') ? '男' : '女';

                    var Rank = (CCobj.Rank) ? CCobj.Rank : "";


                    if (CCobj.ID == obj.ID) {
                        var strtemp = '<li>\
                                          編號: '+ CCobj.ID + '<br />\
                                          名稱: '+ CCobj.Name + '<br />\
                                          身份: '+ Rank + '\
                                          <ul id="son"></ul>\
                                       </li>';
                        parent = strtemp;
                    }
                    else {
                        var strtemp = '<li>\
                                          編號: '+ CCobj.ID + '<br />\
                                          名稱: '+ CCobj.Name + '<br />\
                                          身份: '+ Rank + '\
                                          <ul>';

                        strtemp += getMember(CCobj.ID, CCobj.Name);

                        strtemp += '</ul>\
                               </li>';
                        son += strtemp;
                    }
                }

                $('#organisation').append(parent);
                $('#organisation #son').append(son);
            }
            //有上線
            else {
                for (var i = 0; i < Cobj.length; i++) {
                    var CCobj = Cobj[i];

                    var Gender = (CCobj.Gender == '1') ? '男' : '女';

                    var Rank = (CCobj.Rank) ? CCobj.Rank : "";


                    if (CCobj.ID == pid) {
                        var strtemp = '<li>\
                                          編號: '+ CCobj.ID + '<br />\
                                          名稱: '+ CCobj.Name + '<br />\
                                          身分: '+ Rank + '\
                                          <ul id="son"></ul>\
                                       </li>';
                        parent = strtemp;
                    }
                    else if (CCobj.ID == obj.ID) {
                        var strtemp = '<li>\
                                          編號 :'+ CCobj.ID + '<br />\
                                          名稱 :'+ CCobj.Name + '<br />\
                                          身分 :'+ Rank + '\
                                          <ul>';

                        strtemp += getMember(CCobj.ID, CCobj.Name);

                        strtemp += '</ul>\
                               </li>';
                        son += strtemp;
                    }
                }

                $('#organisation').append(parent);
                $('#organisation #son').append(son);
            }

        }


        $("#organisation").orgChart({ container: $("#main") });
    };

    var MethodReset = function () {
        $('#main').empty();
        $('#SearchID').val('');
        $('#SearchName').val('');
        MethodSearch();
    }

    return {
        SetElement: function () {
            $('#btnSearch').click(function () { MethodSearch(); });
            $('#btnClear').click(function () { MethodReset(); });

            MethodSearch();
        },
    };
}();

function SetElement() {
    Module.SetElement();
}


//by 浚傑
function getMember(ID, Name) {
    var obj = new Object();
    obj.ID = ID;
    obj.Name = Name;


    var objSend = { Json: JSON.stringify(obj) };
    var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetMemberByNameId', sd: JSON.stringify(objSend) });

    var str = "";
    if (CodeDef.Data && CodeDef.Status) {
        var Cobj = JSON.parse(CodeDef.Data);
        for (var i = 0; i < Cobj.length; i++) {
            var CCobj = Cobj[i];

            var Gender = (CCobj.Gender == '1') ? '男' : '女';

            var Rank = (CCobj.Rank) ? CCobj.Rank : "";


            if (CCobj.ID == ID) { continue; }

            str += '<li>\
            編號 :'+ CCobj.ID + '<br />\
            名稱 :'+ CCobj.Name + '<br />\
            身分 :'+ Rank + '\
             <ul>';

            str += getMember(CCobj.ID, CCobj.Name);

            str += '</ul>\
               </li>';

        }
    }
    return str;

}

