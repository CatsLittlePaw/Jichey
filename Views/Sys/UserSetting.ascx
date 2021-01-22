<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="UserSetting.ascx.cs" Inherits="Jichey.Views.Sys.UserSetting" %>

<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__body ">
        <div class="container-fluid kt-portlet__content" id="DivUserSetting">
            <div class="row form-group">
                <h2 class="col-3 text-right"><i class="fas fa-user" style="margin-right: 10px"></i>基本資料</h2>
                <div class="col-9 text-right">
                    <button type="button" id="btnEdit" class="btn btn-clean btn-icon ViewMode"><i class="fas fa-pen"></i></button>
                    <button type="button" id="btnSave" class="btn btn-clean btn-icon EditMode"><i class="fas fa-save"></i></button>
                    <button type="button" id="btnCancel" class="btn btn-clean btn-icon EditMode"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">名稱</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="Name" name="UserName" />
                    <input id="Name2" name="UserName" class="form-control EditMode" placeholder="名稱" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">英文名稱</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="EngName" name="EngName" />
                    <input id="EngName2" name="EngName" class="form-control EditMode" placeholder="英文名稱" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">電話</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="Tel" name="Tel" />
                    <input id="Tel2" name="Tel" type="tel" class="form-control EditMode" placeholder="電話" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">手機</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="Phone" name="Phone" />
                    <input id="Phone2" name="Phone" type="tel" class="form-control EditMode" placeholder="手機" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">Email</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="Email" name="Email" />
                    <input id="Email2" name="Email" type="email" class="form-control EditMode" placeholder="Email" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">地址</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="AddressLine" name="AddressLine" />
                    <select id="CityId" name="CityId" class="form-control EditMode" style="width: auto; float: left" data-control-selectpicker data-width="100" data-size="5"></select>
                    <select id="AreaId" name="AreaId" class="form-control EditMode" style="width: auto; float: left" data-control-selectpicker data-width="100" data-size="5"></select>
                    <input id="Address" name="Address" class="form-control EditMode" style="width: -webkit-fill-available" placeholder="地址" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">生日</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="Birthday" name="BirthdayText" />
                    <input id="Birthday2" name="BirthdayText" class="form-control EditMode" placeholder="生日" autocomplete="off" data-control-datepicker />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">身分證字號</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="IdNo" name="IdNo" />
                    <input id="IdNo2" name="IdNo" class="form-control EditMode" placeholder="身分證字號" autocomplete="off" />
                </div>
            </div>
            <div class="row form-group">
                <label class="col-3 col-form-label text-right">性別</label>
                <div class="col-9">
                    <input class="form-control-plaintext ViewMode" id="Gender" name="Gender" />
                    <select id="Gender2" name="Gender" class="form-control EditMode" data-control-selectpicker>
                        <option value="">請選擇</option>
                        <option value="B">男</option>
                        <option value="G">女</option>
                    </select>
                </div>
            </div>
            <div class="row form-group">
                <h2 class="col-3 text-right"><i class="fas fa-image" style="margin-right: 10px"></i>大頭貼</h2>
            </div>
            <div class="row form-group">
                <div class="col-3"></div>
                <div class="col-9">
                    <div class="kt-profile">
                        <div class="kt-profile__content">
                            <div class="kt-profile__main">
                                <div class="kt-profile__main-pic">
                                    <img id="UserImage" src="" alt="" />
                                    <label id="btnUpload" class="kt-profile__main-pic-upload">
                                        <i class="fas fa-camera"></i>
                                    </label>
                                    <input id="Upload" type="file" accept="image/*" style="display: none" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
    var UserSettingModule = function () {
        var UserInfo = (localStorage.lsUserInfo) ? JSON.parse(localStorage.lsUserInfo) : [{ UserName: "Admin" }];

        var GetUserInfo = function () {
            var obj = new Object();
            obj.UserId = UserInfo.UserID;

            var objSend = { Json: JSON.stringify(obj) };
            var CodeDef = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'GetMemberData', sd: JSON.stringify(objSend) });

            if (CodeDef.Data && CodeDef.Status) {
                var Cobj = JSON.parse(CodeDef.Data);

                $('#DivUserSetting').find('input').each(function (index) {
                    var id = $(this).attr('id');
                    var name = $(this).attr('name');
                    var type = $(this).attr('type');
                    if (!id) return;
                    else if (type == "button" || type == "submit") return;

                    if (Cobj[name] == '1753-01-01T00:00:00') $(element + " #" + id).val('');
                    else $("#DivUserSetting #" + id).val(Cobj[name]);
                });
                $('#DivUserSetting').find('select').each(function (index) {
                    var id = $(this).attr('id');
                    var name = $(this).attr('name');
                    if (!name) return;

                    if (Cobj[name]) {
                        $('#DivUserSetting select[name="' + name + '"]').selectpicker('val', Cobj[name]);
                        $('#DivUserSetting select[name="' + name + '"]').selectpicker('refresh');
                    }
                });



                var Gender = $('#DivUserSetting #Gender').val();
                if (Gender == "B") $('#DivUserSetting #Gender').val("男");
                else if (Gender == "G") $('#DivUserSetting #Gender').val("女");

                Common_Area('#DivUserSetting #AreaId', $('#DivUserSetting #CityId').val());
                $('#DivUserSetting #AreaId').selectpicker('val', (Cobj.AreaId) ? Cobj.AreaId : "0101");

                $('#DivUserSetting #UserImage').attr('src', (Cobj.ImageUrl) ? Cobj.ImageUrl : '/Images/default.jpg');
            }
        }

        var SaveUserInfo = function () {
            var obj = FormSerilizeJSON('#DivUserSetting');
            obj.Birthday = obj.BirthdayText;
            obj.Name = obj.UserName;
            obj.UserId = UserInfo.UserID;
            obj.UserName = UserInfo.UserName;
            console.log(obj);

            if (!obj.Name) { Common_Notice('請填入名稱'); return false; }


            var objSend = { Json: JSON.stringify(obj) };
            var result = Common_ConvertObject_ws({ cn: 'HostSetting', sn: 'UpdateMember', sd: JSON.stringify(objSend) });

            if (result.Status) {
                toastr.success("存檔成功");
                GetUserInfo();
                $('#DivUserSetting #btnCancel').click();
            }
            else toastr.error("存檔失敗");
        }

        var MethodUpload = function () {
            var file = document.getElementById('Upload').files[0];

            var fileTypes = ['jpg', 'jpeg', 'png'];
            var extension = file.name.split('.').pop().toLowerCase();
            var fileSize = file.size;
            var isSuccess = fileTypes.indexOf(extension) > -1;

            if (!isSuccess) { Common_Notice("請選擇正確格式檔案"); return false; }
            else if (fileSize > 200 * 1024) { Common_Notice("檔案不可超過200KB"); return false;}

            var fileData = new FormData();
            fileData.append(file.name, file);

            var Upfile = Common_UploadFile(fileData, 'UserImage');
            if (Upfile) {
                var Ulist = JSON.parse(Upfile);
                if (Ulist.Status) {
                    var img = '/TempImages/UserImage/' + Ulist.Guid + Ulist.Type;

                    UpdateUserImage(img);
                }
                else if (Ulist.Message) { Common_Notice(Ulist.Message); return false; }
            } else {
                Common_Notice("存圖失敗");
            }
        }

        var UpdateUserImage = function(url){
            var obj = new Object();
            obj.UserID = UserInfo.UserID;
            obj.ImagePath = url;
            obj.ImageUrl = url;

            var objSend = { Json: JSON.stringify(obj) };
            var result = Common_ConvertObject_ws({ cn: 'Account', sn: 'UpdateUserImage', sd: JSON.stringify(objSend) });

            if (result.Status) {
                $('#DivUserSetting #UserImage').attr('src', url);
            }
            else {
                Common_Notice("存圖失敗");
            }
        }

        return {
            SetElement: function () {
                $('#DivUserSetting #btnEdit').click(function () { $('.EditMode').show(); $('.ViewMode').hide(); });
                $('#DivUserSetting #btnCancel').click(function () { $('.EditMode').hide(); $('.ViewMode').show(); });
                $('#DivUserSetting #btnSave').click(function () { SaveUserInfo(); })
                $('#DivUserSetting #btnUpload').click(function () { $('#DivUserSetting #Upload').click(); })
                $('#DivUserSetting #Upload').change(function () { MethodUpload(); })

                Common_City('#DivUserSetting #CityId');
                Common_Area('#DivUserSetting #AreaId', $('#DivUserSetting #CityId').val());
                $('#DivUserSetting #CityId').change(function () {
                    Common_Area('#DivUserSetting #AreaId', $('#DivUserSetting #CityId').val());
                })

                GetUserInfo();
                Common_initContol('#DivUserSetting');

                $('.EditMode').hide();
                $('.ViewMode').attr('readonly', true);


            },
        };
    }();

</script>

