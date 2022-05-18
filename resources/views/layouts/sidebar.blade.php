<div class="nav-header" style="clip-path: inset(-5px 0px -5px -5px);">
    <div class="brand-logo">
        <a href="{{ url('') }}" draggable="false">
            <img class="logo-tabib" src="{{ asset('assets/img/icon.png') }}" alt="" draggable="false" style="max-width:35px!important;">
        </a>
        <a href="{{ url('') }}" draggable="false">
            <img class="brand-title mt-0" src="{{ asset('assets/img/logo.png') }}" alt="" draggable="false" style="margin-left:5px;max-width:140px!important;">
        </a>
    </div>
</div>
<aside class="left-panel nicescroll-box">
    <nav class="navigation">
        <ul class="list-unstyled main-menu">
            <li class="has-submenu">
                <a href="{{ url('dashboard') }}">
                    <i class="fas fa-th-large"></i>
                    <span class="nav-label">Dashboard</span>
                </a>
            </li>
            <li class="has-submenu">
                <a href="{{ url('campaign-management') }}">
                    <i class="fas fa-clipboard"></i>
                    <span class="nav-label">Campaign Management</span>
                </a>
            </li>
            <li class="has-submenu">
                <a href="{{ url('finance') }}">
                    <i class="fas fa-wallet"></i>
                    <span class="nav-label">Finance</span>
                </a>
            </li>
            <li class="has-submenu">
                <a href="{{ url('settings') }}">
                    <i class="fas fa-user-cog"></i>
                    <span class="nav-label">Settings</span>
                </a>
            </li>
            <li class="has-submenu">
                <a href="{{ url('materials') }}">
                    <i class="fas fa-folder-open"></i>
                    <span class="nav-label">Materials</span>
                </a>
            </li>
        </ul>
    </nav>
    <div class="sidebar-widgets">
        <div class="top-sidebar box-shadow mx-25 m-b-30 p-b-20 text-center">
            <a draggable="false">
                <img src="{{ asset('assets/img/icon_fade.png') }}" class="side-img" alt="img" style="right:0;position:absolute;bottom:0;z-index:-1;" draggable="false">
            </a>
        </div>
    </div>
</aside>