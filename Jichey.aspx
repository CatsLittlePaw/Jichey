<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Jichey.aspx.cs" Inherits="Jichey.Jichey" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>個人面板</title>
    <link rel="icon" href="/Images/Login/LoginTitle.png" type="image/png" />
    <link href="/lib/keen/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/style.bundle.css" rel="stylesheet" />

    <link href="/lib/keen/assets/css/skins/header/base/light.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/skins/header/menu/light.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/skins/brand/navy.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/skins/aside/navy.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/plugins/custom/jstree/jstree.bundle.css" rel="stylesheet" />

    <link href="/Css/all.min.css" rel="stylesheet" />
    <link href="/Css/jquery-confirm.min.css" rel="stylesheet" />
    <link href="/Css/jquery.fancybox.min.css" rel="stylesheet" />
    <link href="/Css/fullcalendar5.min.css" rel="stylesheet" />
    <link href="/Css/jquery-ui.min.css" rel="stylesheet" />
    <link href="/Css/myStyle.css" rel="stylesheet" />
    <link href="/Css/jquery.orgchart.css" rel="stylesheet" />


</head>
<body class="kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed kt-page--loading">
    <form runat="server">
        <asp:PlaceHolder ID="Ph_header_mobile" runat="server"></asp:PlaceHolder>
        <div class="kt-grid kt-grid--hor kt-grid--root">
            <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
                <button type="button" class="kt-aside-close " id="kt_aside_close_btn"><i class="la la-close"></i></button>

                <asp:PlaceHolder ID="Ph_Aside" runat="server"></asp:PlaceHolder>

                <div class="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
                    <asp:PlaceHolder ID="Ph_Header" runat="server"></asp:PlaceHolder>
                    <!-- end:: Header -->
                    <div class="kt-content  kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor ButtyifulBackground" id="kt_content">
                        <asp:PlaceHolder ID="Ph_SubHeader" runat="server"></asp:PlaceHolder>

                        <div class="kt-container--fluid  kt-grid__item kt-grid__item--fluid">
                            <asp:PlaceHolder ID="Ph_Body" runat="server"></asp:PlaceHolder>
                            <div class="kt-portlet kt-portlet--mobile">
                            </div>
                        </div>
                    </div>

                    <asp:PlaceHolder ID="Ph_Footer" runat="server"></asp:PlaceHolder>
                </div>
            </div>
        </div>
        <asp:PlaceHolder ID="TMP_Panel" runat="server"></asp:PlaceHolder>
        <asp:HiddenField ID="hidProjectName" runat="server" ClientIDMode="Static" />
    </form>

    <script src="/Scripts/jquery-3.1.1.min.js"></script>
    <script src="/Scripts/Common/Common.js"></script>
    <script src="/Scripts/Common/Common_Basic.js"></script>
    <script src="/Scripts/Common/Common_City.js"></script>
    <script src="/lib/keen/assets/plugins/global/plugins.bundle.js" type="text/javascript"></script>
    <script src="/lib/keen/assets/js/scripts.bundle.js"></script>
    <script src="/Scripts/jquery.orgchart.min.js"></script>

    <script src="/lib/keen/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js" type="text/javascript"></script>
    <script src="/lib/keen/assets/js/pages/dashboard.js" type="text/javascript"></script>
    <script src="/lib/keen/assets/js/pages/components/forms/widgets/input-mask.js"></script>
    <script src="/lib/keen/assets/plugins/custom/jstree/jstree.bundle.js"></script>
    <script src="/lib/keen/assets/plugins/custom/tinymce/tinymce.bundle.js"></script>
    <script src="/Scripts/jquery.orgchart.min.js"></script>



    <!-- highcharts -->
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>

    <!-- Font Awesome -->
    <script src="https://kit.fontawesome.com/fb177421c9.js" crossorigin="anonymous"></script>


    <script type="text/javascript">
        var KTAppOptions = {
            "colors": {
                "state": {
                    "brand": "#5d78ff",
                    "metal": "#c4c5d6",
                    "light": "#ffffff",
                    "accent": "#00c5dc",
                    "primary": "#5867dd",
                    "success": "#34bfa3",
                    "info": "#36a3f7",
                    "warning": "#ffb822",
                    "danger": "#fd3995",
                    "focus": "#9816f4"
                },
                "base": {
                    "label": [
                        "#c5cbe3",
                        "#a1a8c3",
                        "#3d4465",
                        "#3e4466"
                    ],

                    "shape": [
                        "#f0f3ff",
                        "#d9dffa",
                        "#afb4d4",
                        "#646c9a"
                    ]
                }
            }
        };
    </script>

    <script src="/Scripts/jquery-ui.js"></script>
    <script src="/Scripts/jsrender.min.js"></script>
    <script src="/Scripts/jquery-confirm.min.js"></script>
    <script src="/Scripts/select2.min.js"></script>
    <script src="/Scripts/swiper.min.js"></script>
    <script src="/Scripts/jquery.blockUI.js"></script>
    <script src="/Scripts/daterangepicker.js"></script>
    <script src="/Scripts/jquery.fancybox.min.js"></script>
    <script src="/Scripts/chart.js"></script>
    <script src="/Scripts/qrcode.min.js"></script>
    <script src="/Scripts/fullcalendar5.min.js"></script>
</body>
</html>










