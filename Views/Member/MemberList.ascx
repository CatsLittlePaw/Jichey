<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="MemberList.ascx.cs" Inherits="Jichey.Views.Member.MemberList" %>
<style>
    .out {
        border-top: 40px #D6D3D6 solid; /*上邊框寬度等於表格第一行行高*/
        width: 0px; /*讓容器寬度為0*/
        height: 0px; /*讓容器高度為0*/
        border-left: 80px #BDBABD solid; /*左邊框寬度等於表格第一行第一格寬度*/
        position: relative; /*讓裡面的兩個子容器絕對定位*/
    }
    .td-input{
        border-width: 0;
        text-align: center;
        width: 100%;
    }

    img.meri {
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }
</style>

<div class="kt-portlet kt-portlet--mobile">
             
    <div class="tab-content">       
        <div class="row container-fluid tab-pane fade show active" id="List" role="tabpanel">
            <div class="kt-portlet__head kt-portlet__head--lg">
                <div class="kt-portlet__head-label">
                    <h3 class="kt-portlet__head-title">會員列表</h3>
                </div>
                <div class="kt-portlet__head-toolbar">
                    <div class="kt-portlet__head-wrapper">
                        <button type="button" id="btnCreate" class="btn btn-outline-primary"><i class="fa fa-plus"></i>新增會員</button>
                    </div>
                </div>             
             </div>
             <div class="kt-portlet__body ">
                <div class="row">
                    <div class="col-lg-4 col-md-6 col-12">
                        <label class="col-form-label ">會員名稱</label>
                        <input id="SearchName" name="Name" class="form-control" placeholder="名稱" autocomplete="off" />
                    </div>
                    <div class="col-lg-4 col-md-6 col-12">
                        <label class="col-form-label">會員編號</label>
                        <input id="SearchID" name="ID" class="form-control" placeholder="編號" autocomplete="off" />
                    </div>
                </div>
                <hr />
                <div class="row">
                    <div class="col-3 form-group" style="display:none;">
                        <div class="nav" role="tablist">
                            <a id="btnList" class="btn btn-icon btn-clean active" data-toggle="tab" href="#List" role="tab"><i class="fas fa-list"></i></a>
                            <a id="btnCard" class="btn btn-icon btn-clean" data-toggle="tab" href="#Card" role="tab"><i class="fas fa-th-large"></i></a>
                        </div>
                    </div>
                    <div class="col-9 form-group">
                        <button type="button" id="btnSearch" class="btn btn-primary"><i class="fa fa-search"></i>搜尋</button>
                        <button type="button" id="btnReset" class="btn btn-secondary"><i class="fa fa-undo"></i>清除</button>

                        <%--                    <button type="button" id="btnExcel" class="btn btn-outline-success float-right" style="margin-right: 30px"><i class="fa fa-file-excel"></i>下載</button>
                        <button type="button" id="btnUpload" class="btn btn-outline-focus float-right" style="margin-right: 10px"><i class="fa fa-upload"></i>上傳</button>--%>
                    </div>
                </div>
            </div>    
            <div class="kt-portlet__body">
                <div class="container-fluid kt-portlet__content">                    
                    <div class="col-12">
                        <table id="gv_MainTable" class="table table-bordered table-hover table-striped" style="text-align: center">
                            <thead class="thead-dark">
                                <tr>
                                    <th>會員編號</th> <!--產品編號-->
                                    <th>帳號</th> <!--會員編號-->
                                    <th>創建日期</th> <!--進貨規格-->
                                    <th>最後更新</th> <!--進貨價格-->
                                    <th>狀態</th> <!--銷售規格-->
                                    <th style="width: 200px">功能</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="100">無資料</td>
                                </tr>
                            </tbody>
                        </table>
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
                                    <span id="MemList_ResultCount" class="pagesize-Text">0</span>
                                    <span class="pagesize-Text">筆</span>
                                </div>
                                <ul class="pagination pull-right" id="DivPageIndex" style="margin: 0px; font-size: 1.3rem"></ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <div class="row tab-pane" id="Card" role="tabpanel">
            <div class="col-12">
                <div class="kt-portlet__body">
                    <div id="gv_MainTable_Card" class="table table-bordered table-hover table-striped" style="text-align: center">
                        <div class="kt-portlet__head kt-portlet__head--lg">
                            <div class="kt-portlet__head-label">
                                <h3 class="kt-portlet__head-title" style="justify-content:center;" id="PersonalSurveyList"></h3>            
                            </div>
                            <div class="kt-portlet__head-label">
                                <button id="back" type="button" class="btn btn-secondary"><i class="fas fa-undo"></i>返回</button>
                            </div>
                        </div> 
                        <div class="row" style="color: #646c9a; padding: 0 8px">                            
                            <div class="col-lg-4 col-md-6 col-12">
                                <label class="col-form-label required">選擇年份</label>
                                <select id="SurveyYear" name="SurveyYear" class="form-control selectpicker" data-size="6" data-dropup-auto="false" >
                                   
                                </select>
                            </div>
                             <div class="col-lg-4 col-md-6 col-12">
                                <label class="col-form-label ">選擇月份</label>
                                <select id="SurveyMonth" name="SurveyMonth" class="form-control selectpicker" data-size="6" data-dropup-auto="false">
                                   
                                </select>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <label class="col-form-label ">選擇日期</label>
                                <select id="SurveyDay" name="SurveyDay" class="form-control selectpicker" data-size="6" data-dropup-auto="false" >
                                   
                                </select>
                            </div>
                        </div> 
                        <div class="row" style="color: #646c9a;  padding: 0 8px">
                            <div class="col-lg-4 col-md-6 col-12">
                                <label class="col-form-label ">選季</label>
                                <select id="SurveyQuarter" name="SurveyQuarter" class="form-control selectpicker" data-size="6" data-dropup-auto="false" >
                                   
                                </select>
                            </div>
                           <div class="col-lg-4 col-md-6 col-12">
                                <label class="col-form-label required">檢測類型</label>
                                <select id="SurveyType" name="SurveyType" class="form-control selectpicker" data-size="6" data-dropup-auto="false">
                                    <option value="">請選擇</option>
                                    <option value="BodyFat">體脂數據</option>
                                    <option value="Meridian">經絡數據</option>
                                    <option value="BrainWaves">腦波數據</option>
                                </select>
                            </div>                            
                        </div>
                        <div class="row" style="color: #646c9a; margin-top: 15px;">                            
                            <div class="col-12">
                                <label class="col-form-label">檢視數據</label>
                                <div class="row" style="padding: 25px;" id="CheckboxList"></div>
                            </div>
                        </div>
                        
                        <div class="row" id="BrainWavesStatusTab" style="display: none;">   
                            <label class="col-lg-2 col-md-2 col-2 text-center" style="font-size: 22px">專注力最高值</label>                                
                            <label class="text-center" style="font-size: 26px; color: #3080ff" id="focusHigh"></label>
                            <label class="col-lg-2 col-md-2 col-2 text-center" style="font-size: 22px">專注力最低值</label>
                            <label class="text-center" style="font-size: 26px; color: #f6dd14" id="focusLow"></label>
                            <label class="col-lg-2 col-md-2 col-2 text-center" style="font-size: 22px">壓力最高值</label>
                            <label class="text-center" style="font-size: 26px; color: #d031d7" id="pressureHigh"></label>
                            <label class="col-lg-2 col-md-2 col-2 text-center" style="font-size: 22px">壓力最低值</label>
                            <label class="text-center" style="font-size: 26px; color: #51ce18" id="pressureLow"></label>      
                        </div>
                                           
                        <div class="kt-portlet__head-label" id="InsertMeridian" style="display:none; padding-bottom: 25px;">
                            <div class="row" style="overflow-x: scroll;">
                                <div class="col-5">
                                    <hr />
                                    <input type="button" id="previous" value=" << " />
                                    <label id="MeridianRecordGroup"></label>
                                    <input type="button" id="next" value=" >> " />
                                    <div style="font-size: 20px;">十二經絡數值</div>
                                    <table id="InsertMeridianTable" class="table table-bordered table-hover InsertMeridianTable"style="text-align: center">
                                        <thead class="thead-dark">
                                            <tr>
                                                <th></th>
                                                <th>肺經</th>
                                                <th>心包經</th>
                                                <th>心經</th>
                                                <th>小腸經</th>
                                                <th>三焦經</th>
                                                <th>大腸經</th>
                                                <th>脾經</th>
                                                <th>肝經</th>
                                                <th>腎經</th>
                                                <th>膀胱經</th>
                                                <th>膽經</th>
                                                <th>胃經</th>
                                            </tr>
                                        </thead> 
                                        <tbody>
                                            <tr id="leftrow">
                                                <td style=" color: #fff; background-color:#343a40;">左側</td>
                                                <td id="inLeftLUf" name="inLeftLUf"></td>
                                                <td id="inLeftPCf" name="inLeftPCf" ></td>
                                                <td id="inLeftHTf" name="inLeftHTf" ></td>
                                                <td id="inLeftSIf" name="inLeftSIf" ></td>
                                                <td id="inLeftTEf" name="inLeftTEf" ></td>
                                                <td id="inLeftLIf" name="inLeftLIf" ></td>
                                                <td id="inLeftSPf" name="inLeftSPf" ></td>
                                                <td id="inLeftLRf" name="inLeftLRf" ></td>
                                                <td id="inLeftKIf" name="inLeftKIf" ></td>
                                                <td id="inLeftBLf" name="inLeftBLf" ></td>
                                                <td id="inLeftGBf" name="inLeftGBf" ></td>
                                                <td id="inLeftSTf" name="inLeftSTf" ></td>

                                            </tr>
                                            <tr id="rightrow">
                                                <th style=" color: #fff; background-color:#343a40;">右側</th>
                                                <td id="inRightLUf" name="inRightLUf" ></td>
                                                <td id="inRightPCf" name="inRightPCf" ></td>
                                                <td id="inRightHTf" name="inRightHTf" ></td>
                                                <td id="inRightSIf" name="inRightSIf" ></td>
                                                <td id="inRightTEf" name="inRightTEf" ></td>
                                                <td id="inRightLIf" name="inRightLIf" ></td>
                                                <td id="inRightSPf" name="inRightSPf" ></td>
                                                <td id="inRightLRf" name="inRightLRf" ></td>
                                                <td id="inRightKIf" name="inRightKIf" ></td>
                                                <td id="inRightBLf" name="inRightBLf" ></td>
                                                <td id="inRightGBf" name="inRightGBf" ></td>
                                                <td id="inRightSTf" name="inRightSTf" ></td>
                                            </tr>
                                        </tbody>
                                    </table> 
                                    <div class="kt-portlet__head-label">                                        
                                        <button type="button" class="btn btn-secondary InsertMeridianTable" style="background-color:cornflowerblue; color:white;"><i class="fas fa-file-medical-alt" style="color: white"></i>運算分析</button>
                                    </div>
                                    <img class="meri" src="../../Images/Survey/Body.jpg">
                                </div>
                                <div class="col-7">
                                    <div id="NewMeridianGraphContainer">
                                        
                                        <!--
                                            <figure class="highcharts-figure">
                                                <div id="container" style="display:none;"></div>  
                                                <hr />
                                                <div id="container2" style="display:none;"></div>
                                            </figure>
                                        -->                                        
                                    </div>  

                                    <div class="row">
                                        <div class="col-6">
                                            <div class="row">                                           
                                                <div class="col-6">
                                                    <img id="meridianimg0" class="meri" src="/Images/Survey/002.png">
                                                    肺經
                                                </div>
                                                <div class="col-6" id="meridiantext0">
                                                    氣喘、咳嗽、扁桃腺炎、頭脹痛、肩痛、痔
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">                                                    
                                                    <img id="meridianimg6" class="meri" src="/Images/Survey/601.png">
                                                    脾經
                                                </div>
                                                <div class="col-6" id="meridiantext6">
                                                    反胃嘔吐、便祕、腹脹、失眠
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg1" class="meri" src="/Images/Survey/101.png">
                                                    心包經
                                                </div>
                                                <div class="col-6" id="meridiantext1">
                                                    心痛、面赤、心臟病、胸協苦悶、肩臂手痠
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg7" class="meri" src="/Images/Survey/701.png">
                                                    肝經
                                                </div>
                                                <div class="col-6" id="meridiantext7">
                                                    眩暈、眼痛、易怒、腰痛、痛經、滿胸
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg2" class="meri" src="/Images/Survey/203.png">
                                                    心經
                                                </div>
                                                <div class="col-6" id="meridiantext2">
                                                    心痛、胸滿痛、掌心熱、口乾渴、便祕
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg8" class="meri" src="/Images/Survey/802.png">
                                                    腎經
                                                </div>
                                                <div class="col-6" id="meridiantext8">
                                                    生殖器病、煩躁、驚恐、足熱、耳鳴
                                                </div>
                                            </div>
                                        </div>                                        
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                             <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg3" class="meri" src="/Images/Survey/302.png">
                                                    小腸經
                                                </div>
                                                <div class="col-6" id="meridiantext3">
                                                    下腹脹痛、口瘡、便祕風痛、風濕痛
                                                </div>
                                            </div>
                                        </div>
                                       <div class="col-6">
                                           <div class="row">
                                               <div class="col-6">
                                                    <img id="meridianimg9" class="meri" src="/Images/Survey/901.png">
                                                    膀胱經
                                                </div>
                                               <div class="col-6" id="meridiantext9">
                                                   腰背痛、坐骨神經痛、頭痛
                                               </div>
                                           </div>                                            
                                       </div>                                       
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                           <div class="row">
                                               <div class="col-6">
                                                    <img id="meridianimg4" class="meri" src="/Images/Survey/401.png">
                                                    三焦經
                                               </div>
                                               <div class="col-6" id="meridiantext4">
                                                   耳鳴、重聽、出汗、面赤、關節痠痛
                                               </div>
                                           </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg10" class="meri" src="/Images/Survey/1003.png">
                                                    膽經
                                                </div>
                                                <div class="col-6" id="meridiantext10">
                                                    食慾不振、嘔逆、嘔吐、易怒、偏頭痛
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg5" class="meri" src="/Images/Survey/503.png">
                                                    大腸經
                                                </div>
                                                <div class="col-6" id="meridiantext5">
                                                    便祕、痔瘡、肩臂痠痛、皮膚異常、牙痛
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="row">
                                                <div class="col-6">
                                                    <img id="meridianimg11" class="meri" src="/Images/Survey/1101.png">
                                                    胃經
                                                </div>
                                                <div class="col-6" id="meridiantext11">
                                                    腹痛、唇乾、易饑、打嗝、胸脹悶
                                                </div>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            </div>                              
                        </div>
                        
                        
                        <div id="GraphContainer">
                                <!--
                                    <figure class="highcharts-figure">
                                        <div id="container" style="display:none;"></div>  
                                        <hr />
                                        <div id="container2" style="display:none;"></div>
                                    </figure>
                                 -->
                        </div>   
                    </div>
                </div>
            </div>
        </div>         
    </div>
    
    <input type="hidden" id="hidPageSize" value="1" />
    <input type="hidden" id="hidPageIndex" value="1" />
</div>

<script src="/Views/Member/MemberList.js"></script>
