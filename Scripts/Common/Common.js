
$(document).ready(function () { SetElement(); });

/**
 * Ajax
 * @param {any} option
 * cn: Contoller Name
 * sn: Method Name
 * sd: Data
 * be: Block UI Element
 */
function Common_ws(option) {
    var reData = '';

    //$.mobile.loading('show', { theme: "b", textonly: false });
    $.ajax({
        type: 'POST',
        url: '/WebService/' + option.cn + 'Service.asmx/' + option.sn,
        data: option.sd,//'{"uid":"' + u + '"}',
        contentType: 'application/json',
        async: false,
        dataType: 'json',
        success: function (data) {
            //console.log(data.d);
            reData = data.d;
            if (localStorage.lsdebug && localStorage.lsdebug == 1) console.log("%c" + option.sn + ",%c" + data.d + ",%c" + option.sd, "color: blue; font-size:15px;font-weight:bold", "color: black;", "color: green;font-weight:bold");
        },
        failure: function (response) {
            console.log('failure：' + response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log('ERROR:' + xhr.status + ',' + thrownError.message)
        },
        beforeSend: function (jqXHR) {
            if (option.be) {
                blockPage(options.be);
            }
        },
        complete: function () {
            if (option.be) {
                unblockPage(option.be)
            }
        }
    });

    return reData;
}
function Common_ConvertObject_ws(option) {
    var data = Common_ws(option);
    if (data) {
        var obj = JSON.parse(data);
        return obj;
    }
    var dobj = new Object();
    dobj.Status = false;
    console.log(option.sn + " 500 Error");
    return dobj;
}
/**
 * 上傳檔案Ajax
 * @param {any} sd Data
 * @param {any} sn 使用哪個upload
 */
function Common_UploadFile(sd,sn) {
    var reData = '';

    $.ajax({
        type: 'POST',
        url: '/WebService/Upload/' + sn + 'Upload.ashx',
        data: sd,//'{"uid":"' + u + '"}',
        contentType: false,
        processData: false,
        async: false,
        success: function (data) {
            //console.log(data.d);
            reData = data;
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
/**
 * 產生GUID亂數，mode 1 去掉-
 * @param {any} mode
 */
function Common_Guid(mode) {
    var d = Date.now();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    if (mode == 1) {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    else
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
}
/**
 * 抓取Element底下的輸入元件(input、select、checkbox…等)，透過各元件name屬性
 * @param {any} element
 */
function FormSerilizeJSON(element) {
    var data = new Object();
    $(element).find('input').each(function (index) {
        var name = $(this).attr('name');
        var value = $(this).val();
        var type = $(this).attr('type');
        if (!name) return;
        else if (type == "button" || type == "submit") return;

        if (type == "checkbox") data[name] = $(this).is(":checked");
        else if (type == "radio") data[name] = $("input[name='" + name + "']:checked").val();
        else data[name] = value;
    });
    $(element).find('select').each(function (index) {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (!name) return;
        data[name] = value;
    });
    return data;
}
/**
 * 抓取Element底下的輸入元件，並加上QuickSearch、PageIndex、PageSize三個屬性，做後端資料分頁，透過各元件name屬性
 * @param {any} element
 */
function SearchSerilizeJSON(element) {
    var data = new Object();
    $(element).find('input').each(function (index) {
        var name = $(this).attr('name');
        var value = $(this).val();
        var type = $(this).attr('type');
        if (!name) return;
        else if (type == "button" || type == "submit") return;

        if (type == "checkbox") data[name] = $(this).is(":checked");
        else if (type == "radio") data[name] = $("input[name='" + name + "']:checked").val();
        else data[name] = value;
    });
    $(element).find('select').each(function (index) {
        var name = $(this).attr('name');
        var value = $(this).val();
        if (!name) return;
        data[name] = value;
    });

    data.QuickSearch = $(element + ' #txtQuickSearch').val();
    data.PageIndex = $(element + ' #hidPageIndex').val();
    data.PageSize = $(element + ' #hidPageSize').val();

    return data;
}
/**
 * 將data自動塞入Element底下中的輸入元件，透過各元件的id屬性去BIND
 * @param {any} element
 * @param {any} data
 */
function AutoBind(element, data) {
    $(element).find('input').each(function (index) {
        var id = $(this).attr('id');
        var name = $(this).attr('name');
        var type = $(this).attr('type');
        if (!id) return;
        else if (type == "button" || type == "submit") return;

        if (type == "checkbox") {
            if (data[id] == true) $(element + " #" + id).prop("checked", true);
            else $(element + " #" + id).prop("checked", false);
        }
        else if (type == "radio") $(element + ' input[name="' + name + '"][value="' + data[id] + '"]').prop("checked", true);
        else {
            if (data[id] == '1753-01-01T00:00:00') $(element + " #" + id).val('');
            else $(element + " #" + id).val(data[id]);
        }
    });
    $(element).find('label').each(function (index) {
        var id = $(this).attr('id');
        var name = $(this).attr('name');
        if (!name) return;

        if (data[id]) $(element + ' label[name="' + name + '"]').text(data[id]);
    });
    $(element).find('select').each(function (index) {
        var id = $(this).attr('id');
        var name = $(this).attr('name');
        if (!name) return;

        if (data[id])
            $(element + ' select[name="' + name + '"]').selectpicker('val', data[id]);
    });
}
/**
 * 將HTML轉成文字，可放在HTML之中
 * @param {String} value
 */
function Common_HTMLtoText(value) {
    return $('<div/>').html(value).text();
}

/**
 * 分頁功能
 * @param {any} Iobj 分頁資料
 * @param {any} Name 分頁DIV
 * @param {any} hidName hidden分頁值
 * @param {any} Success click event
 */
function Com_PageIndex(Iobj, Name, hidName, Success) {
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
        if (NowPage > 3) strtemp += '<li class=""><a class="page-link">...</a></li>';
        for (var i = 2; i < Page - 2; i++) {
            var s = (i + 1);

            if (s == NowPage) strtemp += '<li class="page-item active" data-index="' + s + '"><span class="page-link">' + s + '<span class="sr-only">(current)</span></span></li>';
            else if (s == NowPage + 1) strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
            else if (s == NowPage - 1) strtemp += '<li class="page-item" data-index="' + s + '"><a class="page-link" href="#">' + s + '</a></li>';
        }
        if (NowPage < Page - 3) strtemp += '<li class=""><a class="page-link">...</a></li>';
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
    $(Name).empty();
    $(Name).append(str);

    $(Name + ' .page-item').click(function () {
        var index = $(this).data('index');

        if (index == 0 || index > Page) {
            return false;
        }

        $(hidName).val(index);

        Success();
    });
}

/**
 * 初始化element底下的元件
 * @param {any} element
 */
function Common_initContol(element) {
    Common_SetinitUnit();
    $(element + ' [data-control-selectpicker]').selectpicker();

    $(element + ' [data-control-datetimepicker]').each(function (index) {
        var f = $(this).data('format');
        var or = $(this).data('direction');
        if (typeof f !== 'string') {
            f = "yyyy/mm/dd hh:ii"
        }
        $(this).datetimepicker({
            todayHighlight: true,
            autoclose: true,
            language: 'zh-TW',
            format: f,
            orientation: or,
        });
        $(this).attr('autocomplete', 'off');
    });

    $(element + ' [data-control-datepicker]').each(function (index) {
        var f = $(this).data('format');
        var or = $(this).data('direction');
        if (typeof f !== 'string') {
            f = "yyyy/mm/dd"
        }
        $(this).datepicker({
            todayHighlight: true,
            autoclose: true,
            language: 'zh-TW',
            format: f,
            orientation: or,
            zIndexOffset: 9999
        });
        $(this).attr('autocomplete', 'off');
    });

    $(element + ' [show-maxlength]').each(function (index) {
        $(this).maxlength({
            appendToParent: true,
            alwaysShow: true,
            warningClass: "kt-badge kt-badge--warning kt-badge--rounded kt-badge--inline",
            limitReachedClass: "kt-badge kt-badge--success kt-badge--rounded kt-badge--inline"
        });
    });

    $(element + ' [data-control-editor]').each(function (index) {
        var obj = $(this);
        var height = ($(this).data('height')) ? $(this).data('height') : 300;

        tinymce.init({
            selector: '#' + obj.attr('id'),
            menubar: false,
            toolbar: [
                'styleselect fontselect fontsizeselect | preview |  code',
                'undo redo | cut copy paste | bold italic | link image | alignleft aligncenter alignright alignjustify'],
            plugins: 'advlist autolink link image lists charmap print preview code paste',
            height: height,
            paste_data_images: true
        });
    });

    $('form').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
}

/** 工具初始化 */
function Common_SetinitUnit() {
    $.fn.selectpicker.Constructor.DEFAULTS.noneSelectedText = "請選擇";
    $.fn.selectpicker.Constructor.DEFAULTS.selectAllText = "全選";
    $.fn.selectpicker.Constructor.DEFAULTS.deselectAllText = "全不選";

    $.fn.datetimepicker.dates['zh-TW'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        today: "今天",
        suffix: [],
        meridiem: ["上午", "下午"]
    };

    $.fn.datepicker.dates['zh-TW'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        daysShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        today: "今天",
        format: "yyyy年mm月dd日",
        weekStart: 1,
        clear: "清除"
    };
    $.extend($.validator.messages, {
        required: "請輸入必填欄位",
        remote: "請修正此欄位",
        email: "請輸入有效的電子郵件",
        url: "請輸入有效的網址",
        date: "請輸入有效的日期",
        dateISO: "請輸入有效的日期 (YYYY/MM/DD)",
        number: "請輸入正確的數值",
        digits: "只可輸入數字",
        creditcard: "請輸入有效的信用卡號碼",
        equalTo: "請重複輸入一次",
        extension: "請輸入有效的後綴",
        maxlength: $.validator.format("最多 {0} 個字"),
        minlength: $.validator.format("最少 {0} 個字"),
        rangelength: $.validator.format("請輸入長度為 {0} 至 {1} 之間的字串"),
        range: $.validator.format("請輸入 {0} 至 {1} 之間的數值"),
        max: $.validator.format("請輸入不大於 {0} 的數值"),
        min: $.validator.format("請輸入不小於 {0} 的數值")
    });
    $.validator.addMethod("dateTime", function (value, element) {
        var stamp = value.split(" ");
        var validDateTime = !isNaN(Date.parse(value));
        var validTime = /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(stamp[1]);
        return (validDateTime && validTime);
    }, "日期時間格式錯誤");

    $.validator.addMethod("date", function (value, element) {
        return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
    }, "日期時間格式錯誤");
}

/* ================================================
 * block ui
 * ================================================ */
function blockPage(element) {
    if (element) {
        KTApp.block(element, {
            overlayColor: '#000000',
            state: 'primary'
        });
    }
    else {
        KTApp.blockPage();
    }
}
function unblockPage(element) {
    if (element) {
        KTApp.unblock(element);
    }
    else {
        KTApp.unblockPage();
    }
}

/* ================================================
 * Comform.js
 * ================================================ */
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
    var jc = $.confirm({
        type: obj.type,//green,orange,red
        icon: obj.icon,//fa fa-check,fa fa-warning,fa fa-times
        theme: obj.theme,
        title: obj.title,
        content: obj.content,
        boxWidth: (obj.boxWidth) ? obj.boxWidth : '50%',
        useBootstrap: (obj.useBootstrap) ? obj.useBootstrap : false,
        columnClass: (obj.columnClass) ? obj.columnClass : "small",
        closeIcon: (obj.closeIcon) ? obj.closeIcon : false,
        containerFluid: (obj.containerFluid) ? obj.containerFluid : false,
        buttons: (obj.buttons == null ? { defbtn: { text: null } } : obj.buttons),
        onContentReady: obj.ContentReady,
    });
    return jc;
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
    Aobj.content = Text;
    Common_Alert(Aobj);
}

function CreateDialogOption(options) {
    return $.extend(true, {
        type: "blue",
        icon: "fa fa-plus",
        theme: 'material',
        title: '',
        useBootstrap: true,
        columnClass: "large",//xsmall,medium,large,xlarge
        containerFluid: false,
        closeIcon: true,
        buttons: {},
        ContentReady: function () { },
    }, options);
}
function EditDialogOption(options) {
    return $.extend(true, {
        type: "orange",
        icon: "fa fa-edit",
        theme: 'material',
        title: '',
        useBootstrap: true,
        columnClass: "large",//xsmall,medium,large,xlarge
        containerFluid: false,
        closeIcon: true,
        buttons: {},
        ContentReady: function () { },
    }, options);
}
function DeleteDialogOption(options) {
    return $.extend(true, {
        type: "red",
        icon: "fa fa-ban",
        theme: 'Modern',
        title: '',
        useBootstrap: true,
        buttons: {},
    }, options);
}

function ReviewPassDialogOption(options) {
    return $.extend(true, {
        type: "green",
        icon: "fa fa-check",
        theme: 'material',
        title: '',
        useBootstrap: true,
        columnClass: "large",//xsmall,medium,large,xlarge
        containerFluid: false,
        closeIcon: true,
        buttons: {},
        ContentReady: function () { },
    }, options);
}
//防呆
function AntiPoorOption(Text, Event) {
    var Aobj = new Object();
    Aobj.type = "blue";
    Aobj.icon = "fa fa-exclamation-circle";
    Aobj.theme = "Modern";
    Aobj.useBootstrap = true;
    Aobj.title = '通知';
    Aobj.content = Text;
    Aobj.buttons = {
        Save: {
            text: "確定",
            btnClass: "btn-primary",
            action: Event,
        },
        關閉: { text: "取消" }
    };
    Common_Confirm(Aobj);
}

/* ================================================
 * Text limit
 * ================================================ */
function OnlyEnglishNum(obj) {
    var x = obj.val();
    x = x.replace(/[^0-9a-zA-Z]+$/g, "");
    obj.val(x);
}



/*=================
 * 
 *      浚傑
 * 
 * ================
 */

function ChkInputText(element) {
    var sign = true;
     $(element).find('input').each(function (index) {
        var name = $(this).attr('name');

        var value = $(this).val();
        var type = $(this).attr('type');
        if (value == '' || !value) {
            sign = false;
            return false;
        }
    });

     return sign;
}

function DictionaryData(element) {
    var data = {};
    $(element).find('input').each(function (index) {
        var name = $(this).attr('name');
        var value = $(this).val();
        var type = $(this).attr('type');

        data[name] = value;
    });

    return data;
}


function DataMappingToFrontier(element) {
    var data = {};
    $(element).find('input').each(function (index) {
        var name = $(this).attr('name');
        var value = $(this).val();
        var fname = name + 'f';

        if (value.length > 1) {
            if (value.substr(0, 1) == '0')
                value = value.substr(1, value.length - 1);
        }

        $('#' + fname).text(value);

        data[name] = value;
    });
    return data;
}
