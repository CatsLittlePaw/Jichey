<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ErrorPage.aspx.cs" Inherits="Jichey.ErrorPage.ErrorPage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>錯誤</title>
    <link rel="icon" href="/Images/Login/LoginTitle.png" type="image/png" />
    <link href="/lib/keen/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/style.bundle.css" rel="stylesheet" />
    <link href="/lib/keen/assets/css/pages/error/404-v1.css" rel="stylesheet" />

    <link href="/lib/keen/assets/css/skins/header/base/light.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/skins/header/menu/light.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/skins/brand/navy.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/css/skins/aside/navy.css" rel="stylesheet" type="text/css" />
    <link href="/lib/keen/assets/plugins/custom/jstree/jstree.bundle.css" rel="stylesheet" />
</head>
<body class="kt-bg-light kt-quick-panel--right kt-Jichey-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed">



    <!-- begin:: Page -->
    <div class="kt-grid kt-grid--ver kt-grid--root">
        <div class="kt-error404-v1">
            <div class="kt-error404-v1__content">
                <div class="kt-error404-v1__title" style="text-align: center;">錯誤</div>
                <div class="kt-error404-v1__desc"><strong>OOPS!</strong> 網頁發生錯誤，請聯絡工程師</div>
            </div>
            <div class="kt-error404-v1__image">
                <img src="/Images/Error.png" class="kt-error404-v1__image-content" alt="" title="" />
            </div>
        </div>
    </div>
    <!-- end:: Page -->


    <!-- begin::Global Config(global config for global JS sciprts) -->
    <script>
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
    <!-- end::Global Config -->

    <!--begin::Global Theme Bundle(used by all pages) -->
    <script src="/lib/keen/assets/plugins/global/plugins.bundle.js" type="text/javascript"></script>
    <script src="/lib/keen/assets/js/scripts.bundle.js"></script>
    <!--end::Global Theme Bundle -->



    <!-- end::Body -->
</body>
</html>
