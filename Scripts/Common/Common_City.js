function Common_City(element) {
    var CodeDef = Common_ConvertObject_ws({ cn: 'Common', sn: 'GetCity', sd: '' });

    $(element).empty();
    if (CodeDef.Data && CodeDef.Status) {
        var Cobj = JSON.parse(CodeDef.Data);
        Cobj.forEach(function (item) {
            $(element).append('<option value="' + item.Id + '">' + item.Name + '</option>');
        });
    }
    $(element).selectpicker('refresh');
}
function Common_Area(element , CityID) {
    var obj = new Object();
    obj.CityID = CityID;

    var objSend = { Json: JSON.stringify(obj) };
    var CodeDef = Common_ConvertObject_ws({ cn: 'Common', sn: 'GetArea', sd: JSON.stringify(objSend) });

    $(element).empty();
    if (CodeDef.Data && CodeDef.Status) {
        var Cobj = JSON.parse(CodeDef.Data);
        Cobj.forEach(function (item) {
            $(element).append('<option value="' + item.Id + '">' + item.Name + '</option>');
        });
    }
    $(element).selectpicker('refresh');
}