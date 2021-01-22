function Common_Unit(Name) {
    var obj = new Object();
    obj.PageIndex = 1;
    obj.PageSize = 10000;

    var objSend = { Json: JSON.stringify(obj) };
    var CodeDef = ConvertObject_ws("GetUnit", JSON.stringify(objSend));

    $('#' + Name).empty();
    $('#' + Name).append('<option value="">請選擇</option>');

    if (CodeDef.Data && CodeDef.Status) {
        var Cobj = JSON.parse(CodeDef.Data);
        for (var i = 0; i < Cobj.length; i++) {
            var CCobj = Cobj[i];

            var strtemp = '<option value="' + CCobj.ID + '">' + CCobj.Name + '--' + CCobj.NickName + '</option>';

            var str = $(strtemp);
            $('#' + Name).append(str);
        }
    }

}

/**
 * 取得所有底層頁面 Kind = 1 的
 * @param {any} element
 */
function Common_ParentPage(element) {
    var PageData = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetParentPage', sd: '' });

    $(element).empty();
    $(element).append('<option value="">請選擇</option>');

    if (PageData.Data && PageData.Status) {
        var Dobj = JSON.parse(PageData.Data);
        for (var i = 0; i < Dobj.length; i++) {
            var CCobj = Dobj[i];

            var strtemp = '<option value="' + CCobj.Id + '">' + CCobj.Name + '</option>';

            var str = $(strtemp);
            $(element).append(str);
        }
    }
}
function Common_SubPage(element,ParentId) {
    var obj = new Object();
    obj.ParentId = ParentId;

    var objSend = { Json: JSON.stringify(obj) };
    var PageData = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetSubPages', sd: JSON.stringify(objSend) });

    $(element).empty();
    $(element).append('<option value="">請選擇</option>');

    if (PageData.Data && PageData.Status) {
        var Dobj = JSON.parse(PageData.Data);
        for (var i = 0; i < Dobj.length; i++) {
            var CCobj = Dobj[i];

            var strtemp = '<option value="' + CCobj.Id + '">' + CCobj.Name + '</option>';

            var str = $(strtemp);
            $(element).append(str);
            $(element).selectpicker('refresh');
        }
    }
}

/**
 * 取得Page資料後，組成樹狀結構的資料型態
 * @param {any} RID
 */
function Common_GetPageTree(RID) {
    var obj = new Object();
    obj.PageIndex = 1;
    obj.PageSize = 10000;

    var objSend = { Json: JSON.stringify(obj) };
    var PageData = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetPages', sd: JSON.stringify(objSend) });
    var PPobj = (PageData.Data)?JSON.parse(PageData.Data):[];

    var TreeData = [];

    for (var i = 0; i < PPobj.length; i++) {
        var Pobj = PPobj[i];
        if (Pobj.Kind == "1") {
            TreeData.push({
                id: Pobj.Id,
                text: Pobj.Name,
                state: { opened: true, selected: false },
                children: [],
                icon: Pobj.Icon,
            });
        }
        else if (Pobj.Kind == "2") {
            var index = -1;
            var Mobj = TreeData.find(function (item, i) {
                if (item.id == Pobj.ParentId) { index = i; return item }
            });
            if (index == -1) return;
            Mobj.children.push({
                id: Pobj.Id,
                text: Pobj.Name,
                state: { opened: true, selected: false },
                children: [],
                icon: Pobj.Icon,
            });

            TreeData[index] = Mobj;
        }
    }

    return TreeData;
}

function Common_DropDownList(SData,element) {
    $(element).empty();
    $(element).append('<option value="">請選擇</option>');

    SData.forEach(function (item) {
        $(element).append('<option value="' + item.Value + '">' + item.Text + '</option>');
    });
}
