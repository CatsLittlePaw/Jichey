<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Calendar.ascx.cs" Inherits="Jichey.Views.Jichey.Calendar" %>
<div class="kt-portlet kt-portlet--mobile">
    <div class="kt-portlet__head kt-portlet__head--lg">
        <div class="kt-portlet__head-label">
            <h3 class="kt-portlet__head-title">行程日曆</h3>
        </div>
        <div class="kt-portlet__head-toolbar">
            <div class="kt-portlet__head-wrapper">
                <button type="button" id="btnCreate" class="btn btn-outline-primary"><i class="fa fa-plus"></i>新增</button>
            </div>
        </div>
    </div>
    <div class="kt-portlet__body">
        <div class="container-fluid kt-portlet__content" id="TableView">
            <div class="row">
                <div class="col-md-3 col-12">
                    <div id='external-events'>
                        <div class="fc-event" style="background-color: #24BFF0; margin: 5px" data-color="#24BFF0" data-textcolor="#fff" data-id="1">Test1</div>
                        <div class="fc-event" style="background-color: #24BFF0; margin: 5px" data-color="#24BFF0" data-textcolor="#fff" data-id="2">Test2</div>
                        <div class="fc-event" style="background-color: #24BFF0; margin: 5px" data-color="#24BFF0" data-textcolor="#fff" data-id="3">Test3</div>
                    </div>
                </div>
                <div class="col-md-9 col-12">
                    <div id='calendar'></div>
                </div>
            </div>


        </div>
    </div>
</div>
<script src="/Views/Demo/Calendar.js"></script>
