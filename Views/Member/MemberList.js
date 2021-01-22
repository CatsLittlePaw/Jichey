//by 浚傑
var Module = function () {
    var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : { UserName: "Admin" };
    var PersonalID = '';
    var checkedtypes = []; //(不要此功能可移除)


    var MeridianIndex = -1;
    var TimeGroup = []; //時間組
    var DataGroup = []; //數值組

    var NewMeridianTest = {};

    var MethodShowCreate = function () {
        var data = {};
        var TmpTable1 = $.templates("#Tmp_MemberList");
        var strtemp = TmpTable1.render(data);


        var Aobj = new Object();
        Aobj.title = "新增會員";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var obj = FormSerilizeJSON('#FormList');
                    return MethodAppend(obj);   //return false可以避免關閉modal
                }
            },
            關閉: { text: "關閉" }
        };


        Aobj.ContentReady = function () {
            /*
            Common_City('#FormList #City');
            Common_City('#FormList #City2');
            MethodUpdateData(ID);
            $('#FormList #City').change(function () {
                Common_Area('#FormList #Area', $(this).val());
            });
            $('#FormList #City2').change(function () {
                Common_Area('#FormList #Area2', $(this).val());
            });
            */
            Common_initContol('#FormList');
            
        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);

    }

    //by 浚傑
    var MethodSearch = function () {
        //var obj = SearchSerilizeJSON('#TableView');
        $('#btnList').click();
        var obj = new Object();

        obj.ID = $('#SearchID').val();
        obj.Name = $('#SearchName').val();
        obj.PageIndex = $('#hidPageIndex').val();
        obj.PageSize = $('#hidPageSize').val();
  

            var objSend = { Json: JSON.stringify(obj) };
            var Clist = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetMemberDetailByNameId', sd: JSON.stringify(objSend) });

            $('#gv_MainTable > tbody').empty();
            


            if (Clist.Data && Clist.Status) {
                var Cobj = JSON.parse(Clist.Data);

                if (Cobj.length <= 0) {
                    Common_Notice('查無資料');
                    $('#gv_MainTable > tbody').append('<tr>\
                    <td colspan = "100"> 無資料</td>\
                    </tr>');
                    $('#MemList_ResultCount').text("0");
                    return false;
                }


                for (var i = 0; i < Cobj.length; ++i) {
                    var CCobj = Cobj[i];
                    var status = (CCobj.Status == '1') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--primary">啟用</span>'
                        : (CCobj.Status == '2') ? '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--warning">審核中</span>'
                            : '<span class="kt-badge kt-badge--inline kt-font-bold kt-badge--danger">停用</span>';

                    //格式化時間
                    var createdate = CCobj.sys_createdate.replace(/T/, " ");
                    //createdate = createdate.slice(0, (createdate.indexOf('.') == -1 ? createdate.length : createdate.indexOf('.')));
                    createdate = createdate.split('.')[0];
                    var updatedate = CCobj.sys_updatedate.replace(/T/, " ");
                    //updatedate = updatedate.slice(0, (updatedate.indexOf('.') == -1 ? updatedate.length : updatedate.indexOf('.')));
                    updatedate = updatedate.split('.')[0];


                    var strtemp = '<tr>\
                <td> ' + CCobj.UserId + '</td>\
                <td>' + CCobj.Account + '</td>\
                <td>' + createdate + '</td>\
                <td>' + updatedate + '</td>\
                <td>' + status + '</td>\
                <td nowrap="nowrap"><button type = "button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Survey" data-id="' + CCobj.UserId + '" title="檢視"><i class="fas fa-search"></i></button>\
                    <button type = "button" class="btn btn-sm btn-clean btn-icon btn-icon-sm PassWord" data - id="' + CCobj.UserId + '" title = "修改密碼" > <i class="fas fa-lock"></i></button >\
                    <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm MemberEnabled" data-id="' + CCobj.UserId + '" title="會員狀態"><i class="fas fa-user-check"></i></button>\
                    <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Edit" data-id="' + CCobj.UserId + '"><i class="fas fa-pen"></i></button>\
                    <button type="button" class="btn btn-sm btn-clean btn-icon btn-icon-sm Delete" data-id="' + CCobj.UserId + '"><i class="fas fa-trash-alt"></i></button>\
                </td>\
                </tr>';

                    var str = $(strtemp);
                    $('#gv_MainTable > tbody').append(str);
                }


                //這段沒跟上面插入的前端程式碼在同一個if block內會失效
                $('#gv_MainTable > tbody .Survey').click(function () {
                    var ID = $(this).data('id');
                    SurveyReset();                   

                    //清空表格
                    $('#gv_MainTable_Card #InsertMeridian .InsertMeridianTable #leftrow').find('td').each(function () {
                        $(this).text('');
                    });
                    $('#gv_MainTable_Card #InsertMeridian .InsertMeridianTable #rightrow').find('td').each(function () {
                        $(this).text('');
                    });
                    //清除checkbox列
                    $('#CheckboxList').empty();


                    MethodSurvey(ID);
                });          
                $('#gv_MainTable > tbody .Edit').click(function () {
                    var ID = $(this).data('id');
                    
                    MethodShowEdit(ID);
                });            
                $('#gv_MainTable > tbody .MemberEnabled').click(function () {
                    var ID = $(this).data('id');

                    MethodEditMemberEnabled(ID);
                });
                $('#gv_MainTable > tbody .PassWord').click(function () {
                    var ID = $(this).data('id');

                    MethodChangePwd(ID);
                });

                $('#gv_MainTable > tbody .Delete').click(function () {
                    var ID = $(this).data('id');
                    
                    MethodDelete(ID);
                });

                
                $('#MemList_ResultCount').text(Clist.ResultCount);

                var Page = (Cobj.length == 0) ? 1 : Math.ceil(Number(Clist.ResultCount) / Number(obj.PageSize));
                var Iobj = new Object();
                Iobj.NowPage = obj.PageIndex;
                Iobj.Page = Page;
                Com_PageIndex(Iobj, "#DivPageIndex", "#hidPageIndex", function () { MethodSearch(); });
                
            }

        
    }


    var MethodSurvey = function (ID) {
        var ProjectName = $('#hidProjectName').val();
        //location.href = "/" + ProjectName + "/Member/MemberListPersonal?ID=" + ID;

        //document.getElementById('gv_MainTable_Card').scrollIntoView();
        PersonalID = ID;

        var obj = new Object();
        obj.ID = ID;

        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetMemberData', sd: JSON.stringify(objSend) });


        if (CodeDef.Status && CodeDef.Data) {
            var Cobj = JSON.parse(CodeDef.Data);

            $('#PersonalSurveyList').text('');
            $('#PersonalSurveyList').text('會員 ' + Cobj.Name + ' 測量紀錄表');
        }

        
        $('#btnCard').click();  
        htmlControllerInit();
        //SurveyReset();
    }


    var MethodShowEdit = function (ID) {
        //htmlControllerInit();
        var data = {};
        var TmpTable1 = $.templates("#Tmp_MemberList_Edit");
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
                    var obj = FormSerilizeJSON('#FormList');
                    console.log(obj);
                    
                    if (!obj.Name) { Common_Notice('請填入名稱'); return false; }

                    obj.ID = ID;
                    obj.AddressLine = obj.CityId + obj.AreaId + obj.Address;

                    {
                        MethodUpdateData(obj);
                        return false;
                    }

                        //MethodSearch();
                    
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {
            MethodSetDialog(this, ID)
            MethodShowUpdateData(ID);

          
            
            Common_initContol('#FormList');
        };
        Aobj = EditDialogOption(Aobj);
        Common_Confirm(Aobj);
        

    }

    var MethodShowUpdateData = function (ID) {
       
        var obj = new Object();
        obj.ID = ID;

        var objsend = { Json: JSON.stringify(obj) };
 
        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetMemberData', sd: JSON.stringify(objsend) });


        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);
            //Cobj.Birthday = Cobj.Birthday.slice(0, Cobj.Birthday.indexOf('T'));
            Cobj.Birthday = Cobj.Birthday.split('T')[0];

            AutoBind('#FormList', Cobj);
        }
        
    }

    var GetMemberRecommendUser = function (ID) {
        var obj = new Object();
        obj.ID = ID;

        var objsend = { Json: JSON.stringify(obj) };

        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetMemberRecommendUser', sd: JSON.stringify(objsend) });

        if (CodeDef.Data && CodeDef.Status) {
            var Cobj = JSON.parse(CodeDef.Data);

            AutoBind('#FormList', Cobj);
        }
        
    }

    //設為停用然後保存在資料庫
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
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'DeleteMember', sd: JSON.stringify(objSend) });

                    if (CodeDef.Status) {                        
                        MethodSearch();
                        toastr.success("刪除成功");
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
        SurveyReset();
        $('#GraphContainer').text('');
        $('#CheckboxList').text('');

        $('#SearchName').val('');
        $('#SearchID').val('');



        $('#InsertMeridian').css('display', 'none');

        //圖表重置
        Highcharts.chart('Meridian', {
            chart: {
                type: 'column'
            },
            title: {
                text: '十二經絡虛實圖'
            },
            xAxis: {
                categories: ['肺經', '心包經', '心經', '小腸經', '三焦經', '大腸經', '脾經', '肝經', '腎經', '膀胱經', '膽經', '胃經']
            },
            yAxis: {
                tickPositions: [-10, -3, -2, 0, 3, 4, 10]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }]
        });

        $('#Meridian').find('text').each(function (index) {
            if ($(this).text() == 0 && $(this).attr('x') == 60) {
                $(this).text('6');
            }
            if ($(this).text() == 3) {
                $(this).text('+3');
            }
            if ($(this).text() == 4) {
                $(this).text('+4');
            }
            if ($(this).text() == 10) {
                $(this).text('+10');
            }
        });

        //圖片重置
        $('#meridianimg0').attr('src', '/Images/Survey/002.png');
        $('#meridianimg6').attr('src', '/Images/Survey/601.png');
        $('#meridianimg1').attr('src', '/Images/Survey/101.png');
        $('#meridianimg7').attr('src', '/Images/Survey/701.png');
        $('#meridianimg2').attr('src', '/Images/Survey/203.png');
        $('#meridianimg8').attr('src', '/Images/Survey/802.png');
        $('#meridianimg3').attr('src', '/Images/Survey/302.png');
        $('#meridianimg9').attr('src', '/Images/Survey/901.png');
        $('#meridianimg4').attr('src', '/Images/Survey/401.png');
        $('#meridianimg10').attr('src', '/Images/Survey/1003.png');
        $('#meridianimg5').attr('src', '/Images/Survey/503.png');
        $('#meridianimg11').attr('src', '/Images/Survey/1101.png');

        //前表重置
        $('#inLeftLUf').text('');
        $('#inLeftPCf').text('');
        $('#inLeftHTf').text('');
        $('#inLeftSIf').text('');
        $('#inLeftTEf').text('');
        $('#inLeftLIf').text('');
        $('#inLeftSPf').text('');
        $('#inLeftLRf').text('');
        $('#inLeftKIf').text('');
        $('#inLeftBLf').text('');
        $('#inLeftGBf').text('');
        $('#inLeftSTf').text('');
        $('#inRightLUf').text('');
        $('#inRightPCf').text('');
        $('#inRightHTf').text('');
        $('#inRightSIf').text('');
        $('#inRightTEf').text('');
        $('#inRightLIf').text('');
        $('#inRightSPf').text('');
        $('#inRightLRf').text('');
        $('#inRightKIf').text('');
        $('#inRightBLf').text('');
        $('#inRightGBf').text('');
        $('#inRightSTf').text('');


        MethodSearch();
    }

  
    var MethodAppend = function (obj) {
        if (!obj.Name) {
            Common_Notice('請輸入會員名稱');
            return false;
        } else if (!obj.Account) {
            Common_Notice('請輸入帳號');
            return false;
        } else if (!obj.Password) {
            Common_Notice('請輸入密碼');
            return false;
        } else if (!obj.cPwd || (obj.Password != obj.cPwd)) {
            Common_Notice('確認密碼不符');
            return false;
        }

        if (obj.Name.length > 50) {
            Common_Notice('會員名稱不可超過50字元');
            return false;
        } else if (obj.Account.length > 50) {
            Common_Notice('帳號不可超過50字元');
            return false;
        } else if (obj.Password.length > 50) {
            Common_Notice('密碼不可超過50字元');
            return false;
        }

        /*
        if (obj.ParentUserId) {
            var objj = new Object();
            objj.ID = obj.ParentUserId;
            var objjSend = { Json: JSON.stringify(objj) };
            var CodeDef2 = Common_ConvertObject_ws({ cn: 'Member', sn: 'ChkParentUserId', sd: JSON.stringify(objjSend) });

            if (!CodeDef2.Status) {
                Common_Notice('上線不存在，錯誤的上線UserID');
                return false;
            }
        }
        */
        
        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'SetCreateMemberList', sd: JSON.stringify(objSend) });

        if (CodeDef.Status) {           
            MethodSearch();
            toastr.success("新增成功");
            return true;            
        }
        else {
            toastr.error("新增失敗");
            return false;
        }
    }

    var MethodUpdateData = function (obj) {
        if (!obj.Name) {
            Common_Notice('請輸入會員名稱');
            return false;
        }
        if (!/\d{4}-\d{2}-\d{2}/.test(obj.Birthday)) {
            Common_Notice('生日格式錯誤(格式為YYYY-MM-DD)');
            return false;
        }

        
       

        var objsend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'UpdateMemberDetail', sd: JSON.stringify(objsend) });

        if (CodeDef.Status) {
            //toastr.success("存檔成功");
            return true;
        } else {
            //toastr.error("存檔失敗");
            return false;
        }

    }


    

    var MethodEditMemberEnabled = function (ID) {

        var data = {};
        var TmpTable1 = $.templates("#Tmp_MemberEnabled");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "green";
        Aobj.icon = "fas fa-user-check";
        Aobj.title = "變更會員狀態";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "large";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    
                    var obj = new Object();
                    obj.ID = ID;
                    obj.Status = $('#FormList #Status').val();
                    obj.UserName = UserInfo.UserName;           //UserName在MemberService.ChangeMemberEnabled裡面的model中沒有包含
                    obj.Rank = $('#FormList #Rank').val();


                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'Member', sn: 'ChangeMemberEnabled', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        toastr.success("存檔成功");
                        Aobj.ContentReady();
                        MethodSearch();
                    }
                    else {
                        toastr.error("存檔失敗");
                        return false;
                    }
                    
                }
            },
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () {
            var getAuth = new Object();
            getAuth.ID = ID;
            var getAuthSend = { Json: JSON.stringify(getAuth) };

            var AuthList = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetAuth', sd: JSON.stringify(getAuthSend) });

            if (AuthList.Status && AuthList.Data) {
                var DeAuth = JSON.parse(AuthList.Data);
                var DeAuthList = DeAuth.datatable;
                //這邊該如何讓網頁下拉式選單照順序咧...
                for (var i = 0; i < DeAuthList.length; ++i) {
                    var DeObj = DeAuthList[i];

                    $('#Rank').append('<option value="' + DeObj.DisplayName + '">' + DeObj.DisplayName + '</option>');       
                    if (DeObj.DisplayName == DeAuth.self) $('#Rank').val(DeObj.DisplayName);
                }
            }


            var obj = new Object();
            obj.ID = ID;           

            var objsend = { Json: JSON.stringify(obj) };

            var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetStatus', sd: JSON.stringify(objsend) });

            if (CodeDef.Data && CodeDef.Status) {
                var Cobj = JSON.parse(CodeDef.Data);

                AutoBind('#FormList', Cobj);
            }


            GetMemberRecommendUser(ID);


        };
        Common_Confirm(Aobj);
          
    }


    //沒有驗證舊密碼
    var MethodChangePwd = function (ID) {
        var data = {};
        var TmpTable1 = $.templates("#Tmp_ChangePwd");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.type = "green";
        Aobj.icon = "fas fa-lock";
        Aobj.title = "修改密碼";
        Aobj.content = strtemp;
        Aobj.useBootstrap = true;
        Aobj.columnClass = "large";
        Aobj.closeIcon = true;
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {
                    var obj = new Object();
                    obj.ID = ID;
                    obj.Pwd = $('#FormList #Pwd').val();
                    obj.cPwd = $('#FormList #cPwd').val();
                    obj.UserName = UserInfo.UserName;

                    if (obj.Pwd != obj.cPwd) { Common_Notice('兩者密碼不相符'); return false; }

                    var objSend = { Json: JSON.stringify(obj) };
                    var result = Common_ConvertObject_ws({ cn: 'Member', sn: 'ChangePwd', sd: JSON.stringify(objSend) });

                    if (result.Status) {
                        //toastr.success("存檔成功");
                    }
                    else; //toastr.error("存檔失敗");
                }
            },
            關閉: { text: "關閉" }
        };
        Aobj.ContentReady = function () { };
        Common_Confirm(Aobj);
    }

    var MethodSetDialog = function (obj, Id) {
        Tab1Data = [];

        $('#CityId').change(function () { Common_Area('#AreaId', $(this).val()); });
        Common_City('#CityId');
        Common_Area('#AreaId', $('#CityId').val());

        Common_initContol('#FormList');

        //$('#btnCreate_Person').click(function () { MethodShowCreate_Person() });
    }

    /*============================
     * 
     *    以下Jichey新建函數
     * 
     * ===========================
     */


    // 如果在選了Category後 尚未選擇Type的時候要顯示含無資料的所有圖表，就把Category對應的所有Type都做圖表即可
    var MethodSurveySearch = function () {      

        $('#GraphContainer').text('');

        //同一使用者的資料重複搜尋時避免重複堆疊圖片資料
        NewMeridianTest = {};
        MeridianIndex = -1;
        TimeGroup = [];
        DataGroup = []; 


        var obj = new Object();
        obj = FormSerilizeJSON('#gv_MainTable_Card');
        obj.ID = PersonalID;
        obj.TypeList = $("input[name='TypeList']:checked").map(function () { return $(this).val(); }).get();


        var objSend = { Json: JSON.stringify(obj) };
        var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetPersonalSurvey', sd: JSON.stringify(objSend) });
        if (obj.SurveyType != 'Meridian') {
            var sortArray;
            if (CodeDef.Status && CodeDef.Data) {
                var Cobj = JSON.parse(CodeDef.Data);
                rtntype = [];
                rtndata = [];               
                tmp_typeset = new Set();

                //存最大最小值用
                var bwsAttentionMinMax = [];    
                var bwsMeditationMinMax = [];

                for (var i = 0; i < Cobj.length; ++i) {
                    var CCobj = Cobj[i];
                    tmp_typeset.add(CCobj.Type);

                    rtntype.push(CCobj.Type);
                    rtndata.push(CCobj.Value);

                    if (CCobj.Type == 'Attention')
                        bwsAttentionMinMax.push(parseFloat(CCobj.Value));
                    else if (CCobj.Type == 'Meditation')
                        bwsMeditationMinMax.push(parseFloat(CCobj.Value));
                }

                //修改最大最小值
                if (bwsAttentionMinMax.length > 0 && bwsMeditationMinMax.length > 0) {
                    $('#focusHigh').text(Math.max(...bwsAttentionMinMax));
                    $('#focusLow').text(Math.min(...bwsAttentionMinMax));
                    $('#pressureHigh').text(Math.max(...bwsMeditationMinMax));
                    $('#pressureLow').text(Math.min(...bwsMeditationMinMax));
                }
                


                if (tmp_typeset.size > 0) {
                    sortArray = Array.from(tmp_typeset).sort();     //新增Array帶入Set資料，利用Array來sort圖片type顯示的順序

                    $('#GraphContainer').append('<figure class="highcharts-figure">');

                    sortArray.forEach(function (element, sameElement, set) {

                        $('#GraphContainer').append('<hr /><div id="' + element + '" ></div>');

                        var graphdata = [];
                        for (var i = 0; i < rtntype.length; ++i) {
                            if (rtntype[i] == element) {
                                graphdata.push(rtndata[i]);
                            }
                        }

                        var elementCHN = element2CHN(element);

                        //如果不同數據要不同圖形，可以在這裡if判斷Type然後裡面造不同的圖                                            
                        Highcharts.chart(element, {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: elementCHN + ' 數值紀錄表'
                            },
                            /*
                            subtitle: {
                                text: 'Source: WorldClimate.com'
                            },
                            */
                            xAxis: {
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            },
                            yAxis: {

                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }
                            },
                            series: [{
                                name: 'Tokyo',
                                data: graphdata
                            }]
                        });

                    });

                    /* 下面這段是為了顯示沒資料的圖表 (不要此功能可移除) */
                    checkedtypes.sort();

                    let result = checkedtypes.filter((e) => { return sortArray.indexOf(e) === -1; });

                    result.forEach(function (element, sameElement, set) {

                        $('#GraphContainer').append('<hr /><div id="' + element + '" ></div>');

                        var elementCHN = element2CHN(element);

                        Highcharts.chart(element, {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: elementCHN + ' 數值紀錄表'
                            },
                            /*
                             subtitle: {
                                 text: 'Source: WorldClimate.com'
                             },
                             */
                            xAxis: {
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            },
                            yAxis: {

                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }
                            },
                            series: [{
                                name: 'Tokyo',
                                data: []
                            }]
                        });
                    });
                    /* 到此 */

                    $('#GraphContainer').append('</figure>');
                }
                //下面這段是為了顯示沒資料的圖表  (不要此功能可移除)
                else {
                    checkedtypes.sort();
                    sortArray = [''];
                    let result = checkedtypes.filter((e) => { return sortArray.indexOf(e) === -1; });

                    $('#GraphContainer').append('<figure class="highcharts-figure">');

                    result.forEach(function (element, sameElement, set) {

                        $('#GraphContainer').append('<hr /><div id="' + element + '" ></div>');
                        var elementCHN = element2CHN(element);

                        Highcharts.chart(elementCHN, {
                            chart: {
                                type: 'line'
                            },
                            title: {
                                text: element + ' 數值紀錄表'
                            },
                            /*
                            subtitle: {
                                text: 'Source: WorldClimate.com'
                            },
                            */
                            xAxis: {
                                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                            },
                            yAxis: {
                
                            },
                            plotOptions: {
                                line: {
                                    dataLabels: {
                                        enabled: true
                                    },
                                    enableMouseTracking: false
                                }
                            },
                            series: [{
                                name: 'Tokyo',
                                data: []
                            }]
                        });
                    });

                    $('#GraphContainer').append('</figure>');
                }
            }
        }
        else {
            var objj = new Object();
            objj = FormSerilizeJSON('#gv_MainTable_Card');
            objj.ID = PersonalID;
            objj.SurveyType = 'Meridian';
            objj.TypeList = [];
            var objjSend = { Json: JSON.stringify(objj) };


            //將數值以時間分組，時間組及數值組透過Index來對應
            var MeridianTimeGroup = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetPersonalSurveyTimeGroup', sd: JSON.stringify(objjSend) });
            if (MeridianTimeGroup.Data && MeridianTimeGroup.Status && CodeDef.Data && CodeDef.Status) {
                var TimeGroupDe = JSON.parse(MeridianTimeGroup.Data);

                               
                for (var i = 0; i < TimeGroupDe.length; ++i) {
                    TimeGroup.push(TimeGroupDe[i].sys_createdate);
                    DataGroup.push(new Array());
                }

                var CodeList = JSON.parse(CodeDef.Data);
                

                for (var i = 0; i < CodeList.length; ++i) {
                    var CCobj = CodeList[i];
                    for (var j = 0; j < TimeGroup.length; ++j) {
                        if (CCobj.sys_createdate == TimeGroup[j]) {
                            DataGroup[j].push(CCobj.Value);
                        }
                    }
                }
                                               

                if (DataGroup.length > 0) {
                    $('#NewMeridianGraphContainer').text('');
                    $('#NewMeridianGraphContainer').append('<figure class="highcharts-figure">\
                                                            <hr />\
                                                            <div id="Meridian"></div>\
                                                            </figure>');
                    

                    MeridianIndex = DataGroup.length - 1;   //紀錄最後一筆資料的Index                                      
                    $('#next').css('visibility', 'hidden');
                    $('#MeridianRecordGroup').text(TimeGroup[MeridianIndex].split('T')[0] + ' ' + TimeGroup[MeridianIndex].split('T')[1]);
                    DrawMeridian(MeridianIndex);
                    //Common_initContol('#gv_MainTable_Card');
                }                 
            }
        
        }    

    }

    var DrawMeridian = function (index) {  
        if (index == 0) {
            $('#previous').css('visibility', 'hidden');
            $('#next').css('visibility', 'visible');
        } else if (index == DataGroup.length - 1) {
            $('#previous').css('visibility', 'visible');
            $('#next').css('visibility', 'hidden');
        } else {
            $('#previous').css('visibility', 'visible');
            $('#next').css('visibility', 'visible');
        }

        var leftList = [];
        var rightList = [];

        //看過資料回傳的順序及規律後，決定照順序塞入資料，但若哪天回傳會有變，這裡就會出事了
        for (var j = 0; j < 12; ++j) {
            leftList.push(DataGroup[index][j]);
        }
        for (var j = 12; j < 24; ++j) {
            rightList.push(DataGroup[index][j]);
        }   


        var negleftList = [];
        var negrightList = [];
        var imageColor = [];
        for (var i = 0; i < leftList.length; ++i) {
            var l = leftList[i] - 6 == 0 ? 1 : leftList[i] - 6;
            var r = rightList[i] - 6 == 0 ? 1 : rightList[i] - 6;
            negleftList.push(l);
            negrightList.push(r);

            //嚴重異常為3 輕微異常2 正常1
            if (negleftList[i] >= 4 || negleftList[i] <= -3 || negrightList[i] >= 4 || negrightList[i] <= -3)
                imageColor.push('3');
            else if (negleftList[i] >= 3 || negleftList[i] <= -2 || negrightList[i] >= 3 || negrightList[i] <= -2)
                imageColor.push('2');
            else
                imageColor.push('1');
        }

        //根據狀態修改圖片
        for (var i = 0; i < imageColor.length; ++i) {
            $('#meridianimg' + i).attr('src', '/Images/Survey/' + i + '0' + imageColor[i] + '.png');            
        }
        //根據狀態修改文字
        for (var i = 0; i < negleftList.length; ++i) {            
            var textStatus = 1; //1正常 2偏低 3偏高
                        
            if (negleftList[i] <= -2 || negrightList[i] <= -2)
                textStatus = 2;
            else if (negleftList[i] >= 3 || negrightList[i] >= 3)
                textStatus = 3;

            MeridianTextChange(i, textStatus);
        }        

        
        //畫圖                          
        Highcharts.chart('Meridian', {
            chart: {
                type: 'column'
            },
            title: {
                text: '十二經絡虛實圖'
            },
            xAxis: {
                categories: ['肺經', '心包經', '心經', '小腸經', '三焦經', '大腸經', '脾經', '肝經', '腎經', '膀胱經', '膽經', '胃經']
            },
            yAxis: {
                tickPositions: [-10, -3, -2, 0, 3, 4, 10]
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    zones: [{
                        value: -2.99999999999999,
                        color: '#ff0000'
                    }, {
                        value: -1.99999999999999,
                        color: '#ffce00'
                    }, {
                        value: 3,
                        color: '#00f4d6'
                    }, {
                        value: 4,
                        color: '#ffce00'
                    }, {
                        color: '#ff0000'
                    }]
                }
            },
            series: [{
                name: '左側',
                data: negleftList
            }, {
                name: '右側',
                data: negrightList
            }]
        });

        $('#Meridian').find('text').each(function (index) {
            if ($(this).text() == 0 && $(this).attr('x') == 60) {
                $(this).text('6');
            }
            if ($(this).text() == 3) {
                $(this).text('+3');
            }
            if ($(this).text() == 4) {
                $(this).text('+4');
            }
            if ($(this).text() == 10) {
                $(this).text('+10');
            }
        });
        
    }

    //把文字狀態存在資料庫，這邊去資料庫抓，程式碼會簡潔很多
    var MeridianTextChange = function (i, status) {        
        $('#meridiantext' + i).text('');

        var str = '';

        switch (i) {
            case 0:
                if (status == 2) str = '易引發呼吸困難、弱、咳嗽、手足冷痹、肩背塞痛之症狀';
                else if (status == 3) str = '易引發氣喘、咳嗽、扁桃腺炎、頭脹痛、肩痛、痔之症狀';
                else str = '正常狀態';
                break;
            case 1:
                if (status == 2) str = '易引發心悸、胸悶、手心熱、低血壓之症狀';
                else if (status == 3) str = '易引發心痛、面赤、心臟病、胸協苦悶、肩臂手痠之症狀';
                else str = '正常狀態';
                break;
            case 2:
                if (status == 2) str = '易引發心煩不安、心悸、失語、失眠之症狀';
                else if (status == 3) str = '易引發心痛、胸滿痛、掌心熱、口乾渴、便祕之症狀';
                else str = '正常狀態';
                break;
            case 3:
                if (status == 2) str = '易引發下腹脹、溏泄、身寒、頭痛、耳聲鳴之症狀';
                else if (status == 3) str = '易引發下腹脹痛、口瘡、便祕風痛、風濕痛之症狀';
                else str = '正常狀態';
                break;
            case 4:
                if (status == 2) str = '易引發體虛易倦、四肢無力、虛汗之症狀';
                else if (status == 3) str = '易引發耳鳴、重聽、出汗、面赤、關節痠痛之症狀';
                else str = '正常狀態';
                break;
            case 5:
                if (status == 2) str = '易引發下痢、腸鳴、皮膚異常、肩背痠痛之症狀';
                else if (status == 3) str = '易引發便祕、痔瘡、肩臂痠痛、皮膚異常、牙痛之症狀';
                else str = '正常狀態';
                break;
            case 6:
                if (status == 2) str = '易引發食慾不振、噯氣、倦怠不眠、溏泄之症狀';
                else if (status == 3) str = '易引發反胃嘔吐、便祕、腹脹、失眠之症狀';
                else str = '正常狀態';
                break;
            case 7:
                if (status == 2) str = '易引發頭暈目眠、腹脹滿、性慾減退之症狀';
                else if (status == 3) str = '易引發眩暈、眼痛、易怒、腰痛、痛經、滿胸之症狀';
                else str = '正常狀態';
                break;
            case 8:
                if (status == 2) str = '易引發腰虛痛、四肢無力、手足冷、耳鳴聾、易倦之症狀';
                else if (status == 3) str = '易引發生殖器病、煩躁、驚恐、足熱、耳鳴之症狀';
                else str = '正常狀態';
                break;
            case 9:
                if (status == 2) str = '易引發腰痛、坐骨神經痛、小便多、發背痠痛之症狀';
                else if (status == 3) str = '易引發腰背痛、坐骨神經痛、頭痛之症狀';
                else str = '正常狀態';
                break;
            case 10:
                if (status == 2) str = '易引發眩暈、下肢厥冷、嘔吐、少食慾之症狀';
                else if (status == 3) str = '易引發食慾不振、嘔逆、嘔吐、易怒、偏頭痛之症狀';
                else str = '正常狀態';
                break;
            case 11:
                if (status == 2) str = '易引發食慾減弱、哈欠、呻吟、腹脹鳴、口乾之症狀';
                else if (status == 3) str = '易引發腹痛、唇乾、易饑、打嗝、胸脹悶之症狀';
                else str = '正常狀態';
                break;
            default:
                break;
        }

        $('#meridiantext' + i).text(str);
    }

    var SurveyReset = function () {
        $('#SurveyType').val('');
        $('#SurveyType').selectpicker('refresh');
        $('#SurveyYear').val('');
        $('#SurveyYear').selectpicker('refresh');
        $('#SurveyQuarter').val('');
        $('#SurverQuarter').selectpicker('refresh');
        $('#SurveyMonth').val('');
        $('#SurveyMonth').selectpicker('refresh');
        $('#SurveyDay').val('');
        $('#SurveyDay').selectpicker('refresh');
        $('#MeridianRecordGroup').text('');
        $('#previous').css('visibility','visible');
        $('#next').css('visibility', 'visible');

        NewMeridianTest = {};

        MeridianIndex = -1;
        TimeGroup = [];
        DataGroup = []; 
    }

    var htmlControllerInit = function () {                    

        $('#GraphContainer').text('');      //經絡以外的數據圖初始化

        $('#NewMeridianGraphContainer').text('');
        $('#NewMeridianGraphContainer').append('<figure class="highcharts-figure">\
                                                            <hr />\
                                                            <div id="Meridian"></div>\
                                                            </figure>');

        Highcharts.chart('Meridian', {      //經絡數據圖初始化
            chart: {
                type: 'column'
            },
            title: {
                text: '十二經絡虛實圖'
            },
            xAxis: {
                categories: ['肺經', '心包經', '心經', '小腸經', '三焦經', '大腸經', '脾經', '肝經', '腎經', '膀胱經', '膽經', '胃經']
            },
            yAxis: {
                tickPositions: [-10, -3, -2, 0, 3, 4, 10]
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }]
        });

        $('#Meridian').find('text').each(function (index) {
            if ($(this).text() == 0 && $(this).attr('x') == 60) {
                $(this).text('6');
            }
            if ($(this).text() == 3) {
                $(this).text('+3');
            }
            if ($(this).text() == 4) {
                $(this).text('+4');
            }
            if ($(this).text() == 10) {
                $(this).text('+10');
            }
        });
      
    }

    var MethodShowMeridianData = function () {
        var data = {};
        var TmpTable1 = $.templates("#Tmp_InsertMeridianData");
        var strtemp = TmpTable1.render(data);

        var Aobj = new Object();
        Aobj.title = "新增數據";
        Aobj.content = strtemp;
        Aobj.columnClass = "xlarge"; //xsmall,medium,large,xlarge
        Aobj.buttons = {
            Save: {
                text: "儲存",
                btnClass: "btn-primary",
                action: function () {         
                    if (!ChkInputText('#FormList')) { Common_Notice('請填寫完整資料'); return false; }

                    NewMeridianTest = DataMappingToFrontier('#FormList');     //將 $templates 的資料映射到前端顯示用表格  ex: inLeftLU -> inLeftLUf ，最後回傳dictionary


                    var objj = new Object()
                    objj.UserId = PersonalID;       //原本是用UserInfo.UserID
                    objj.Category = 'Meridian';
                    objj.DataList = DictionaryData('#FormList');


                    
                    var objSend = { Json: JSON.stringify(objj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'CreateMeridianData', sd: JSON.stringify(objSend) });
                    if (CodeDef.Status) {
                        //toastr('儲存成功');
                        MethodSurveySearch();
                    }
                    
                    

                    /*
                    obj.ID = ID;
                    obj.AddressLine = obj.CityId + obj.AreaId + obj.Address;

                    {
                        MethodUpdateData(obj);
                        return false;
                    }

                    //MethodSearch();
                    */
                }
            },
            關閉: { text: "取消" }
        };
        Aobj.ContentReady = function () {          
            Common_initContol('#FormList');

        };
        Aobj = CreateDialogOption(Aobj);
        Common_Confirm(Aobj);

    }

    var element2CHN = function (element) {
        switch (element) {
            case 'Bodyweight':
                return '體重';
                break;
            case 'Bmi':
                return '身高體重指數';
                break;
            case 'Bmr':
                return '基礎代謝率';
                break;
            case 'Bodyfat':
                return '體脂肪率';
                break;
            case 'Bonemass':
                return '骨質密度';
                break;
            case 'Musclerate':
                return '肌肉量';
                break;
            case 'Totalbodywater':
                return '身體總含水量百分比';
                break;
            case 'Visceralfat':
                return '內臟脂肪';
                break;
            default:
                return element;
                break;
        }
    };

    return {
        SetElement: function () {
            $('#btnCreate').click(function () { MethodShowCreate(); });
            $('#btnSearch').click(function () { MethodSearch(); });
            $('#btnReset').click(function () { MethodReset(); });

            $('#back').click(function () {
                //MethodReset();
                $('#btnList').click(); 
            });

            $('.InsertMeridianTable').click(function () {
                MethodShowMeridianData();
            });

            // 原在htmlControlInit
            var sy = document.getElementById('SurveyYear');
            var sq = document.getElementById('SurveyQuarter');
            var sm = document.getElementById('SurveyMonth');
            var sd = document.getElementById('SurveyDay');     

            for (var i = 2020; i < 2100; ++i) {
                if (i == 2020) {
                    var opt = new Option();
                    opt.value = '';
                    opt.text = '請選擇';
                    sy.add(opt);
                }

                var opt = new Option();
                opt.value = i.toString();
                opt.text = i + ' 年';

                sy.add(opt);
            }

            for (var i = 1; i < 5; ++i) {
                if (i == 1) {
                    var opt = new Option();
                    opt.value = '';
                    opt.text = '請選擇';
                    sq.add(opt);
                }

                var opt = new Option();
                opt.value = i < 10 ? '0' + i.toString() : i.toString();
                opt.text = '0' + i + '季';

                sq.add(opt);
            }

            for (var i = 1; i < 13; ++i) {
                if (i == 1) {
                    var opt = new Option();
                    opt.value = '';
                    opt.text = '請選擇';
                    sm.add(opt);
                }

                var opt = new Option();
                opt.value = i < 10 ? '0' + i.toString() : i.toString();
                opt.text = i >= 10 ? i + '月' : '0' + i + '月';

                sm.add(opt);
            }

            for (var i = 1; i < 32; ++i) {
                if (i == 1) {
                    var opt = new Option();
                    opt.value = '';
                    opt.text = '請選擇';
                    sd.add(opt);
                }

                var opt = new Option();
                opt.value = i < 10 ? '0' + i.toString() : i.toString();
                opt.text = i >= 10 ? i + '日' : '0' + i + '日';

                sd.add(opt);
            }

            //

            
            //Common_initContol('#TableView');

            $('#hidPageSize').val(10);
            $('#Com_PageSize').change(function () {
                $('#hidPageSize').val($(this).val());
                $('#hidPageIndex').val(1);
                console.log("PageSize :" + $('#hidPageSize').val());
                MethodSearch();
            });


            //抓各個Type的checkbox
            $('#SurveyType').change(function () {
                /* 清空checkedtypes內元素 */
                while (checkedtypes.length) {
                    checkedtypes.pop();
                }

                if ($('#SurveyType').val() != '') {
                    

                    var obj = new Object();
                    obj.Category = $('#SurveyType').val();

                    var objSend = { Json: JSON.stringify(obj) };
                    var CodeDef = Common_ConvertObject_ws({ cn: 'Member', sn: 'GetCategoryTypes', sd: JSON.stringify(objSend) });
                  

                    if (CodeDef.Status && CodeDef.Data) {
                        $('#CheckboxList').text('');
                        var Cobj = JSON.parse(CodeDef.Data);
                        for (var i = 0; i < Cobj.length; ++i) {
                            var CCobj = Cobj[i];

                            var label = CCobj.Type.length > 1 ? CCobj.Type.substr(0, 1) + CCobj.Type.substr(1, CCobj.Type.length - 1).toLowerCase() : CCobj.Type;
                            label = element2CHN(label);

                            if (obj.Category == 'Meridian') {
                                $('#CheckboxList').append('<div class="custom-control custom-checkbox" style="display:none">\
                                        <input type="checkbox" class="custom-control-input typecheckbox" value="' + CCobj.Type + '" id="' + CCobj.Type + '" name="TypeList" data-id="' + CCobj.Type + '">\
                                        <label class="custom-control-label " for="' + CCobj.Type + '">' + label + '</label>\
                                   </div>');
                                //$('#InsertMeridian').css('display', 'block');

                            }
                            else {
                                $('#CheckboxList').append('<div class="custom-control custom-checkbox">\
                                        <input type="checkbox" class="custom-control-input typecheckbox" value="' + CCobj.Type + '" id="' + CCobj.Type + '" name="TypeList" data-id="' + CCobj.Type + '">\
                                        <label class="custom-control-label " for="' + CCobj.Type + '">' + label + '</label>\
                                   </div>');
                                //$('#InsertMeridian').css('display', 'none');
                            }


                            //隨SurveyType隱藏、顯示
                            if (obj.Category == 'BrainWaves') {
                                 $('#BrainWavesStatusTab').css('display', 'block');
                                $('#InsertMeridian').css('display', 'none');
                            }
                            else if (obj.Category == 'Meridian') {
                                $('#BrainWavesStatusTab').css('display', 'none');
                                $('#InsertMeridian').css('display', 'block');
                            }
                            else
                            {
                                $('#BrainWavesStatusTab').css('display', 'none');
                                $('#InsertMeridian').css('display', 'none');
                            }                               
                                                       
                        }

                        $('.typecheckbox').change(function () {
                            /* 下面的if else為了顯示沒資料的圖表 (不要此功能可移除)*/
                            
                            if ($(this).is(':checked')) {
                                var str = $(this).data('id').substr(0, 1).toUpperCase() + ($(this).data('id').length > 1 ? $(this).data('id').substr(1).toLowerCase() : '');
                                checkedtypes.push(str);
                            }
                            else
                            {
                                var index = checkedtypes.indexOf($(this).data('id'));
                                checkedtypes.splice(index, 1);
                            }
                            /* 到此 */
                           
                            if ($('#SurveyYear').val() != '')
                                MethodSurveySearch();
                                
                        });

                    }

                    
                    if ($('#SurveyYear').val() != '')
                        MethodSurveySearch();
                    
                }
                else
                {
                    Common_Notice('檢測類型為必選欄位');
                    $('#GraphContainer').text('');
                    $('#CheckboxList').text('');
                }                
              
            });

            //$('#ssearch').click(function () { MethodSurveySearch(); });

            $('#SurveyYear').change(function () {
                if ($('#SurveyYear').val() == '') {
                    Common_Notice('年份為必選欄位');
                    $('#GraphContainer').text('');

                    $('#SurveyQuarter').val('');
                    $('#SurverQuarter').selectpicker('refresh');
                    $('#SurveyMonth').val('');
                    $('#SurveyMonth').selectpicker('refresh');
                    $('#SurveyDay').val('');
                    $('#SurveyDay').selectpicker('refresh');
                }
                else
                {
                    if ($('#SurveyType').val() != '')
                        MethodSurveySearch();
                }
            });

            $('#SurveyQuarter').change(function () {
                if ($('#SurveyYear').val() == '') {
                    Common_Notice('請先選擇年份');
                    $('#SurveyQuarter').val('');
                    $('#SurveyQuarter').selectpicker('refresh');
                }
                else
                {
                    $('#SurveyMonth').val('');
                    $('#SurveyMonth').selectpicker('refresh');
                    $('#SurveyDay').val('');
                    $('#SurveyDay').selectpicker('refresh');

                    if($('#SurveyType').val() != '')
                        MethodSurveySearch();
                }
            });

            $('#SurveyMonth').change(function () {
                if ($('#SurveyYear').val() == '') {
                    Common_Notice('請先選擇年份');
                    $('#SurveyMonth').val('');
                    $('#SurveyMonth').selectpicker('refresh');
                }
                else
                {
                    $('#SurveyQuarter').val('');
                    $('#SurveyQuarter').selectpicker('refresh');

                    if ($('#SurveyType').val() != '')
                        MethodSurveySearch();
                }
            });

            $('#SurveyDay').change(function () {                
                if ($('#SurveyYear').val() == '' || $('#SurveyMonth').val() == '') {
                    Common_Notice('請先選擇年月');
                    $('#SurveyDay').val('');
                    $('#SurveyDay').selectpicker('refresh');
                }
                else
                {
                    if ($('#SurveyType').val() != '')
                        MethodSurveySearch();
                }
            });

            $('#previous').click(function () {                
                if (MeridianIndex - 1 >= 0) {
                    --MeridianIndex;
                    var timetext = TimeGroup[MeridianIndex].split('T');
                    $('#MeridianRecordGroup').text(timetext[0] + ' ' + timetext[1]);
                    DrawMeridian(MeridianIndex);
                }                   
            });

            $('#next').click(function () {                
                if (DataGroup.length > MeridianIndex + 1) {
                    ++MeridianIndex;
                    var timetext = TimeGroup[MeridianIndex].split('T');
                    $('#MeridianRecordGroup').text(timetext[0] + ' ' + timetext[1])
                    DrawMeridian(MeridianIndex);
                }                    
            });
            

            Common_initContol('#gv_MainTable_Card');
            MethodSearch();
            //htmlControllerInit();         

        },
    };
}();

function SetElement() {
    Module.SetElement();
}