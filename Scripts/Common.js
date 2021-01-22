$(document).ready(function () {
    $("#left-panel").load("/Menu.html", function () {

        Common_GetPages();
    })
    $("#Header").load("/Header.html", function () { })

})


function Common_ws_Basic(sn, sd) {
    var reData = '';

    //$.mobile.loading('show', { theme: "b", textonly: false });
    $.ajax({
        type: 'POST',
        url: '/WebService/WebService_Basic.asmx/' + sn,
        data: sd,//'{"uid":"' + u + '"}',
        contentType: 'application/json',
        async: false,
        dataType: 'json',
        success: function (data) {
            //console.log(data.d);
            reData = data.d;
            if (localStorage.lsdebug)console.log("%c" + sn + ",%c" + data.d + ",%c" + sd, "color: blue; font-size:15px;font-weight:bold", "color: black;", "color: green;font-weight:bold");
        },
        failure: function (response) {
            console.log('failure：' + response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('ERROR:' + xhr.status + ',' + thrownError.message)
        },
        complete: function () {
            //setTimeout(function () { $.mobile.loading("hide"); }, 1000);
        }
    });

    return reData;
}
function Common_ws(sn, sd) {
    var reData = '';

    //$.mobile.loading('show', { theme: "b", textonly: false });
    $.ajax({
        type: 'POST',
        url: '/WebService/WebService1.asmx/' + sn,
        data: sd,//'{"uid":"' + u + '"}',
        contentType: 'application/json',
        async: false,
        dataType: 'json',
        success: function (data) {
            //console.log(data.d);
            reData = data.d;
            if (localStorage.lsdebug) console.log("%c" + sn + ",%c" + data.d + ",%c" + sd, "color: blue; font-size:15px;font-weight:bold", "color: black;", "color: green;font-weight:bold");
        },
        failure: function (response) {
            console.log('failure：' + response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('ERROR:' + xhr.status + ',' + thrownError.message)
        },
        complete: function () {
            //setTimeout(function () { $.mobile.loading("hide"); }, 1000);
        }
    });

    return reData;
}


function Common_CreateGuid() {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function Common_Alert(obj) {
    $.alert({
        type: obj.type,//green,orange,red
        icon: obj.icon,//fa fa-check,fa fa-warning,fa fa-times
        theme: 'Modern',
        title: obj.title,
        content: obj.content,
        buttons: (obj.buttons == null ? { defbtn: { text: '確定' } } : obj.buttons),
    });
}

function Common_Confirm(obj) {
    $.confirm({
        type: obj.type,//green,orange,red
        icon: obj.icon,//fa fa-check,fa fa-warning,fa fa-times
        theme: obj.theme,
        title: obj.title,
        content: obj.content,
        boxWidth: (obj.boxWidth) ? obj.boxWidth : '50%',
        useBootstrap: (obj.useBootstrap) ? obj.useBootstrap : false,
        columnClass: (obj.columnClass) ? obj.columnClass : "small",
        containerFluid: (obj.containerFluid) ? obj.containerFluid : false,
				closeIcon: (obj.closeIcon) ? obj.closeIcon : false,
        buttons: (obj.buttons == null ? { defbtn: { text: null } } : obj.buttons),
        onContentReady: obj.ContentReady,
    });
}

function Common_Dialog(obj) {
    $.dialog({
        type: obj.type,//green,orange,red
        icon: obj.icon,//fa fa-check,fa fa-warning,fa fa-times
        theme: obj.theme,
        title: obj.title,
        content: obj.content,
        boxWidth: (obj.boxWidth) ? obj.boxWidth : '50%',
        useBootstrap: false,
        buttons: (obj.buttons == null ? { defbtn: { text: null } } : obj.buttons),
        onContentReady: obj.ContentReady,
    });
}

function Common_Loading_Start(obj) {
    if (obj.ElementName) {
        $(obj.ElementName).LoadingOverlay("show", {
            background: obj.background, // "rgba(165, 190, 100, 0.5)",
            text: obj.text, //可事後更改 $.LoadingOverlay("text", "Yep, still loading...");
            textColor: obj.textColor, // #202020

            fontawesome: obj.fontawesome,//"fa fa-cog fa-spin",
            fontawesomeColor: obj.fontColor,// #202020

            image: obj.image,
            imageAnimation: obj.imageAnimation, // 1.5s fadein
            imageColor: obj.imageColor, // #202020

            custom: obj.custom,
        });
    } else {
        $.LoadingOverlay("show", {
            background: obj.background, // "rgba(165, 190, 100, 0.5)",
            text: obj.text, //可事後更改 $.LoadingOverlay("text", "Yep, still loading...");
            textColor: obj.textColor, // #202020

            fontawesome: obj.fontawesome,//"fa fa-cog fa-spin",
            fontawesomeColor: obj.fontColor,// #202020

            image: obj.image,
            imageAnimation: obj.imageAnimation, // 1.5s fadein
            imageColor: obj.imageColor, // #202020

            custom: obj.custom,
        });

    }
}

function Common_Loading_Stop(obj) {
    if (obj.ElementName) {
        $(obj.ElementName).LoadingOverlay("hide");
    } else {
        $.LoadingOverlay("hide");
    }
}

function Common_Toast(obj) {
    iziToast.show({
        title: obj.title,//Title
        message: obj.message,//Message
        theme: obj.theme, // dark,light
        color: (obj.color) ? obj.color : '', // blue, red, green, yellow
        icon: (obj.icon) ? obj.icon : '', // fa fa-android
        image: (obj.image) ? obj.image : '',
        imageWidth: (obj.imageWidth) ? obj.imageWidth : 50,//50
        maxWidth: (obj.maxWidth) ? obj.maxWidth : null,//null
        displayMode: (obj.displayMode) ? obj.displayMode : 0, // 1:once一次一個, 2 : replace 會取代掉前一個
        position: (obj.position) ? obj.position : 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
        target: (obj.target) ? obj.target : '',//元素名稱或class
        timeout: (obj.timeout) ? obj.timeout : 5000,
        onOpened: (obj.opened) ? obj.opened : function () { },//function () { }
        onClosed: (obj.close) ? obj.close : function () { },//function () { }
    });
}

/**
 * 正則表達判斷 return bool
 * @param {String} text 
 * @param {String} common 
 */
function Common_Regex(text, common) { //
    switch (common) {
        case "OnlyNum": return /^[0-9]*$/.test(text);
        case "OnlyEng": return /^.[A-Za-z]+$/.test(text);
        case "OnlyEngNum": return /^.[A-Za-z0-9]+/.test(text);
        case "OnlyEmail": return /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/.test(text);
        case "OnlyID": return /^[A-Z]{1}[1-2]{1}[0-9]{8}$/.test(text);//台灣身分證
        case "OnlyChinese": return /^[\u0391-\uFFE5]+$/.test(text);
        case "OnlyPhone": return /^09[0-9]{8}$/.test(text);

    }
}

/**
 * 將HTML轉成文字，可放在HTML之中
 * @param {String} value
 */
function Common_HTMLtoText(value) {
    return $('<div/>').html(value).text();
}

/**
 * 日期格式 輸出為 Dobj.Datestr    :YYYY-MM-DD
 *                 Dobj.DateTimestr:YYYY-MM-DD HH:mm:ss
 *                 Dobj.Time12str  :HH:mm AM/PM
 *                 Dobj.Time24str  :HH:mm
 *@param {String} text
 */
function Common_Dateformat(text) {
    var now = '';
    if (text == '' || Date.parse(text) == 'NaN') {
        now = new Date();
    }
    else {
        text = text.replace('T', ' ').replace(/-/g, '/');
        now = new Date(text);
    }
    var Dobj = new Object();
    Dobj.Datestr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    Dobj.DateTimestr = now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + " " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    Dobj.Time12str = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    Dobj.Time24str = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: false })

    return Dobj;
}

function Common_DataTable(obj) {
    /*
        obj.ElementName
        obj.search
        obj.searching
        obj.order
        obj.lengthMenu
        obj.columnDefs
    */

    if (!obj.searching) {
        $.extend(true, $.fn.dataTable.defaults, {
            "searching": false
        });
    }

    var td_Table = $(obj.ElementName).DataTable({
        "search": (obj.search) ? obj.search : true,
        "order": (obj.order) ? obj.order : true, // [[ 3, "desc" ]],
        "lengthMenu": (obj.lengthMenu) ? obj.lengthMenu : [[10, 25, 50, -1], [10, 25, 50, "All"]],//[[10, 25, 50, -1], [10, 25, 50, "All"]]
        "columnDefs": (obj.columnDefs) ? obj.columnDefs : null,//[{ "searchable": false, "orderable": false, "targets": 0 }],
        "language": {
            "lengthMenu": "一頁顯示 _MENU_ 筆",
            "zeroRecords": "沒有資料 - 新增一筆吧!",
            "info": "目前是第 _PAGE_ 頁 共 _PAGES_ 頁",
            "infoEmpty": "沒有資料",
            "infoFiltered": "總筆數: _MAX_ ",
            "search": "搜尋:"
        },
    });

    //自動帶索引1. 2. 3....
    if (obj.columnDefs) {
        td_Table.on('order.dt search.dt', function () {
            td_Table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
    }


    $(obj.ElementName + ' tbody').on('mouseenter', 'td', function () {
        var colIdx = td_Table.cell(this).index().column;

        $(td_Table.cells().nodes()).removeClass('highlight');
        $(td_Table.column(colIdx).nodes()).addClass('highlight');
    });
}

function Common_Success(Text, BtnEvent) {
    var Aobj = new Object();
    Aobj.type = "green";
    Aobj.icon = "fa fa-check";
    Aobj.title = '成功';
    Aobj.content = Text;
    Aobj.buttons = {
        確定: {
            text: "確定",
            action: BtnEvent,
        }
    }
    Common_Alert(Aobj);
}
function Common_Notice(Text) {
    var Aobj = new Object();
    Aobj.type = "orange";
    Aobj.icon = "fa fa-exclamation-circle";
    Aobj.title = '通知';
    Aobj.content = Text;
    Common_Alert(Aobj);
}
function Common_Error(Text) {
    var Aobj = new Object();
    Aobj.type = "red";
    Aobj.icon = "fa fa-times";
    Aobj.title = '錯誤';
    Aobj.content = Text;    Common_Alert(Aobj);
}




function Common_GetPages() {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : [];

    var obj = new Object();
    obj.User = UserInfo.Account;

    var objSend = { Json: JSON.stringify(obj) };
    var Pages = Common_ws_Basic("GetAllPages", JSON.stringify(objSend));

    if (Pages) {
        var Plist = JSON.parse(Pages);
        if (Plist.Data && Plist.Status) {
            var Lobj = JSON.parse(Plist.Data);

            for (var i = 0; i < Lobj.length; i++) {
                var LLobj = Lobj[i];

                var strtemp = '';
                if (LLobj.C_ParentID == 0 && LLobj.C_PageUrl == "") {
                    strtemp = '<li class="menu-item-has-children dropdown">\
                                    <a href="#" data-url="' + LLobj.C_PageUrl + '" class="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                                        <i class="menu-icon fas '+ LLobj.C_PageIcon + '"></i>' + LLobj.C_PageName + '</a>\
                                    <ul class="sub-menu children dropdown-menu Parentul" data-parent="'+ LLobj.sys_id + '">\
                                    </ul>\
                               </li>';
                    var str = $(strtemp);
                    $('#myleftPanel').append(str);
                }
                else if (LLobj.C_ParentID == 0) {
                    strtemp = '<li><a id="btn' + LLobj.C_PageUrl + '" data-url="' + LLobj.C_PageUrl + '" class="menu-btn MenuBtn" href="#">\
                                        <i class="menu-icon fas '+ LLobj.C_PageIcon + '"></i>' + LLobj.C_PageName + '</a>\
                                    </li>';
                    var str = $(strtemp);
                    $('#myleftPanel').append(str);
                }
                else {
                    strtemp = '<li><a id="btn' + LLobj.C_PageUrl + '" data-url="' + LLobj.C_PageUrl + '" class="MenuBtn" href="#">\
                                        <i class="fas '+ LLobj.C_PageIcon + '"></i>' + LLobj.C_PageName + '</a>\
                                    </li>';
                    var str = $(strtemp);
                    $('#myleftPanel .Parentul[data-parent="' + LLobj.C_ParentID + '"]').append(str);
                }

            }
            $('#myleftPanel .MenuBtn').click(function () {
                var url = $(this).data('url');
                console.log(url);

                location.href = url;
            })
        }
    }
}

function Common_PageIndex(Iobj, Name, Success) {
    var NowPage = Number(Iobj.NowPage);
    var Page = Iobj.Page;//Number

    var Previous = "", Next = "";
    if (NowPage == 1) Previous = "disabled";
    if (NowPage == Page) Next = "disabled";

    var strtemp = '<li class="page-item ' + Previous + '" data-index="' + (NowPage - 1) + '">\
                            <a class="page-link" href="#" aria-label="Previous">\
                                <span aria-hidden="true">&laquo;</span>\
                                <span class="sr-only">Previous</span>\
                            </a>\
                        </li>';
    if (Page > 9) {
        for (var i = 0; i < 2; i++) {
            var s = (i + 1);
            if (s == NowPage) strtemp += '<li class="page-item active" data-index="' + s + '"><span class="page-link">' + s + '<span class="sr-only">(current)</span></span></li>';
            else strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
        }
        if (NowPage > 3) strtemp += "...";
        for (var i = 2; i < Page - 2; i++) {
            var s = (i + 1);
            console.log(s + "   " + NowPage)
            if (s == NowPage) strtemp += '<li class="page-item active" data-index="' + s + '"><span class="page-link">' + s + '<span class="sr-only">(current)</span></span></li>';
            else if (s == NowPage + 1) strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
            else if (s == NowPage - 1) strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
        }
        if (NowPage < Page - 3) strtemp += "...";
        for (var i = Page - 2; i < Page; i++) {
            var s = (i + 1);
            if (s == NowPage) strtemp += '<li class="page-item active" data-index="' + s + '"><span class="page-link">' + s + '<span class="sr-only">(current)</span></span></li>';
            else strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
        }
    }
    else {
        for (var i = 0; i < Page; i++) {
            var s = (i + 1);

            if (s == NowPage) strtemp += '<li class="page-item active" data-index="' + s + '"><span class="page-link">' + s + '<span class="sr-only">(current)</span></span></li>';
            else strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
        }
    }


    strtemp += '<li class="page-item ' + Next + '" data-index="' + (Number(NowPage) + 1) + '">\
                        <a class="page-link" href="#" aria-label="Next">\
                            <span aria-hidden="true">&raquo;</span>\
                            <span class="sr-only">Next</span>\
                        </a>\
                    </li>';
    var str = $(strtemp);
    $('#Div' + Name).empty();
    $('#Div' + Name).append(str);

    $('#Div' + Name + ' .page-item').click(function () {
        var index = $(this).data('index');

        if (index == 0 || index > Page) {
            return false;
        }

        $('#hid' + Name).val(index);

        Success();
    });
}

