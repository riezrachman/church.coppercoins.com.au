<div class="pt-4" style="width:100%;">
    <div class="d-flex flex-inline justify-content-between">
        <div class="brand-logo">
            <a href="{{ url('') }}" draggable="false">
                <img class="brand-title mt-0 d-none d-md-inline" src="{{ asset('assets/images/logo_full.png') }}" alt="" draggable="false" style="margin-left:5px;max-width:140px!important;">
            </a>
        </div>
        <div class="mt-1" style="color:#696969;font-size:16px">
            @if(Request::segment(1) === 'register')
                Already have an account? <a class="custom-href" href="{{ url('login') }}">Login Here</a>
            @elseif(Request::segment(1) === 'login')
                Don't have any account yet? <a class="custom-href" href="{{ url('register') }}">Register Here</a>
            @else
                @if(@$____notVerified)
                    <a class="custom-href" style="cursor:pointer;" onclick="signOut();">Sign Out</a>
                @endif
            @endif
        </div>
    </div>
</div>