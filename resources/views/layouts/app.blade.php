<!DOCTYPE html>
<html lang="en">

{{-- HEAD --}}
<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- TITLE --}}
    <title>Mypher Charity - @yield('title')</title>

    {{-- FAVICON --}}
    <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">

    {{-- CSS --}}
    <link rel="stylesheet" href="{{ asset('assets/main/css/fonts.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/main/css/style.css') }}">
    {{-- <link rel="stylesheet" href="{{ asset('assets/main/css/select2.min.css') }}"> --}}
    <link rel="stylesheet" href="{{ asset('assets/plugins/sweetalert2/sweetalert2.min.css') }}">
    <link rel="stylesheet" href="{{ asset('assets/plugins/dropify/dist/dropify.min.css') }}">

    {{-- CUSTOM STYLE --}}
    <style>
        .cursor-default{
            cursor:default !important;
        }
        button:disabled {
            pointer-events:none !important;
        }
        .btn-outline-light{
            color:#9E9E9E;
            box-shadow:none;
            border:none;
        }
        .btn-outline-light:hover{
            background-color: #fff !important;
            color: #F58220 !important;
        }
        a.custom-href{
            color:#F58220;
        }
        a.custom-href:hover{
            text-decoration:underline!important;
        }
        .footer-custom{
            position: absolute;
            bottom: 0;
            width: 100%;
        }
        .center-content {
            display: -webkit-flexbox;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-flex-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
            justify-content: center;
            padding-bottom: 50px;
            padding-top: 50px;
            height:calc(100vh - 145px);
        }
        .form-control{
            border-radius:8px !important;
            padding-left:17px !important;
            padding-right:17px !important;
            padding-top: 0px !important;
            padding-bottom: 0px !important;
            height: 53px !important;
            color:#333 !important;
        }
        .btn-upload {
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 1px solid #EBEBEB;
            border-radius: 10px;
            opacity: 1;
        }
        .btn-upload:hover {
            color: #000000;
        }
        .btn-primary:hover{
            background-color: #e26a0d !important;
        }
        .btn-primary:disabled{
            color: #fff;
            background-color: #e26a0d;
            border-color: #e26a0d;
        }
        .btn-shadow-lg{
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.25s ease 0s;
        }
        .btn-shadow-lg:hover{
            transform: translateY(-3px);
            box-shadow: 0px 15px 20px rgba(245, 130, 32, 0.4);
        }
        .btn-lg{
            padding-top:12px;
            padding-bottom:12px;
            border-radius:8px;
            font-weight:400;
            font-size:15px;
        }
        .btn-link {
            color: #F58220;
            text-decoration: none !important;
        }
        .btn-link:hover {
            color: #F58220;
            text-decoration: underline !important;
        }
        input.error, textarea.error, select.error{
            border:1px solid red;
        }
        label.error{
            width: 100%;
            text-align: right;
            margin-bottom: 0px !important;
            margin-top: 2px;
            color: red;
            font-size:13px;
        }
        .icn-spinner {
            animation: fade-in 1.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) both;
            display: inline-block;
        }
        @keyframes fade-in {
            0% {
                transform: rotateX(80deg);
                opacity: 0;
            }
            100% {
                transform: rotateX(0);
                opacity: 1;
            }
        }
        .card.custom-card {
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 10px 20px #ABABAB26;
            border: 1px solid #EBEBEB;
            border-radius: 10px;
            opacity: 1;
            width: 100%;
        }
        .custom-card-header {
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 1px solid #EBEBEB;
            border-radius: 10px;
            opacity: 1;
            padding: 12px;
        }
        .card.custom-card-warning {
            background: #F582201A 0% 0% no-repeat padding-box;
            border: 1px solid #F58220;
            border-radius: 10px;
            opacity: 1;
            width: 100%;
        }
        .card.custom-card-success {
            background: #03DAB81A 0% 0% no-repeat padding-box;
            border: 1px solid #03DAB8;
            border-radius: 10px;
            opacity: 1;
            width: 100%;
        }
        .card.custom-card-danger {
            background: #EC008C1A 0% 0% no-repeat padding-box;
            border: 1px solid #EC008C;
            border-radius: 10px;
            opacity: 1;
            width: 100%;
        }
        .form-input-image {
            background: #FBFBFB 0% 0% no-repeat padding-box;
            border: 1px solid #EBEBEB;
            border-radius: 10px;
            opacity: 1;
            width: 410px;
            height: 230px;
        }
        button.close{
            position: absolute;
            right: 0;
            background-color: transparent;
            border: none;
            font-size: 18px;
            margin-right: 12px;
            display: flex;
            top: 50%;
            transform: translate(-50%, -50%);
            color:#eee;
        }
        button.close:hover{
            color:#fff;
        }
        .alert{
            border-radius:7px !important;
        }
        .alert-danger{
            background-color:#F76363;
            color:#fff;
        }
        .alert-warning{
            background-color:#F58220;
            color:#fff;
        }
        .form-check-input{
            width:20px;
            height:20px;
            box-shadow:none !important;
        }
        .form-check-input:checked{
            border-color:#F58220;
            background-color:#F58220;
        }
        .custom-control-input:focus ~ .custom-control-label::before {
            box-shadow:none !important;
        }
        .swal2-popup{
            border-radius:10px;
        }
        .swal2-icon.swal2-question{
            color:#F58220;
            border-color:#F58220;
        }
        .swal2-styled.swal2-confirm, .swal2-styled.swal2-cancel{
            border-radius:7px;
            box-shadow:none !important;
            font-family: 'Nunito Sans Regular';
            font-weight:600;
            font-size:16px;
        }
        .swal2-styled.swal2-confirm{
            background-color: #F58220;
        }
        .swal2-title, .swal2-content{
            color:#333;
            font-family: 'Nunito Sans Regular';
            margin-bottom:8px;
        }
        .swal2-styled{
            padding:.5em 2.3em;
        }
        .btn-outline-primary{
            border-color: #F58220;
            color: #F58220;
            background-color: transparent;
        }
        .btn-outline-primary:hover{
            border-color: #F58220;
            background-color: #F58220;
            color:#fff;
        }
        p{
            font-family: 'Nunito Sans Regular' !important;
            letter-spacing:0.4px !important;
        }
        .center-vertical{
            position: relative;
            top: 50%;
            -webkit-transform: translateY(-50%);
            -ms-transform: translateY(-50%);
            transform: translateY(-50%);
        }
        .mb-custom-1{
            margin-bottom:28px!important;
        }
    </style>

    @yield('css')

</head>

{{-- BODY --}}
<body class="cursor-default" style="background-color:#FBFBFB;">

    <div id="main-wrapper" class="show">

        @php
            $__except = ['login', 'register'];
        @endphp

        @if(!in_array(Request::segment(1), $__except) && !@$____notVerified)

            {{-- SIDEBAR --}}
            @include('layouts.sidebar')

            {{-- NAVBAR --}}
            @include('layouts.navbar')

            {{-- CONTENT --}}
            <div class="content-body">

                <div class="warper container-fluid">

                    <div class="row page-titles mx-0">

                        <div class="col-lg-12 p-md-0">

                            <div class="welcome-text mb-3">
                                <h4 class="text-primary">@yield('title')</h4>
                            </div>

                            @yield('content')

                        </div>

                    </div>

                </div>

            </div>

        @else

            <div class="container" style="position:relative;min-height:100vh;">

                {{-- NAVBAR --}}
                @include('layouts.navbar-2')

                {{-- CONTENT --}}
                <div class="">

                    @yield('content')

                </div>

                {{-- FOOTER --}}
                @include('layouts.footer')

            </div>

        @endif

    </div>

    {{-- JS --}}
    <script src="{{ asset('assets/plugins/jquery/jquery3-2.1.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/popper/popper.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/bootstrap/js/bootstrap.js') }}"></script>
    <script src="{{ asset('assets/plugins/moment/moment.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/daterangepicker/daterangepicker.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/sweetalert2/sweetalert2.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/datatables/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/dropify/dist/dropify.min.js') }}"></script>
    <script src="{{ asset('assets/plugins/axios/dist/axios.min.js') }}"></script>
    <script src="{{ asset('assets/js/init-tdatatable.js') }}"></script>
    <script src="{{ asset('assets/js/toggleFullScreen.js') }}"></script>
    <script src="{{ asset('assets/js/main.js') }}"></script>
    <script src="{{ asset('assets/js/jquery-blockUI.js') }}"></script>
    <script src="{{ asset('assets/js/toast.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.mask.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('assets/js/jquery.steps.min.js') }}"></script>
    <script src="{{ asset('assets/js/select2.min.js') }}"></script>

    <script>

        const myStorage = window.localStorage;

        const apiToken = myStorage.getItem('apiToken');

        // console.log(`API Token: ${apiToken}`);

        const current = location.pathname.split("/").slice(-1)[0].replace(/^\/|\/$/g, '');

        let sidebar = $('aside');

        $(function () {

            $('.navigation li a', sidebar).each(function() {
                var $this = $(this);
                addActiveClass($this);
            });

        });

        const addActiveClass = (element) => {

            if (current === "") {

                // for root url
                if (element.attr('href').indexOf("index.html") !== -1) {
                    element.parents('.has-submenu').last().addClass('active');
                    // if (element.parents('.sub-menu').length) {
                    //     element.closest('.collapse').addClass('show');
                    //     element.addClass('active');
                    // }
                }

            } else {

                // for other url
                if (element.attr('href').indexOf(current) !== -1) {
                    element.parents('.has-submenu').last().addClass('active');
                    // if (element.parents('.sub-menu').length) {
                    //     element.closest('.collapse').addClass('show');
                    //     element.addClass('active');
                    // }
                    // if (element.parents('.submenu-item').length) {
                    //     element.addClass('active');
                    // }
                }

            }
            
        }

        const blockUI = () => {

            $.blockUI({
                message: `
                    <center>
                        <img src="{{ asset('assets/img/icon.png') }}" class="icn-spinner" style="width: 60px;" draggable="false" onerror="imgError(this)">
                        <br />
                        <div class="spinner-border spinner-border-sm text-primary mt-4" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                    </center>
                `,
                overlayCSS: {
                    backgroundColor: '#fff',
                    opacity: 0.75,
                    zIndex: 99998,
                    cursor: 'default'
                },
                css: {
                    border: 0,
                    color: '#fff',
                    padding: 0,
                    zIndex: 99999,
                    backgroundColor: 'transparent',
                    cursor: 'default'
                }
            });

        }

        const unblockUI = () => {

            $('#white-bg').remove();
            $.unblockUI();

        }

        const signOut = () => {

            Swal.fire({
                title : "Logout",
                text : "Are you sure?",
                icon : "question",
                showCancelButton : true,
                confirmButtonText : "Logout",
                cancelButtonText : "Cancel"
            }).then(function (t) {

                if (t.value) {

                    blockUI();

                    axios.post(`/api/auth/sign-out`, {
                        headers: {
                            "content-type": "multipart/form-data",
                        },
                    }).then(function (res) {

                        if (res.data.status == false) {

                            // TODO

                        } else {

                            myStorage.clear();

                            window.location.replace("/login");

                        }

                    }).catch(function (err) {

                        var res = err.response; console.log(err);

                        if (res.data.status == false) {

                            // TODO

                        }

                    });

                }

            });

        }

        {{-- ADDITIONAL --}}
        const alertClose = (sel) => {
            $(sel).parent().remove();
        }

    </script>

    @yield('js')

</body>
</html>