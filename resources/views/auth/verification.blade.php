@extends('layouts.app')

@section('title', 'Verify Your Email Address')

@section('css')

<style>
	body {
		background-color: #fff !important;
	}
	.progressbar li{
		float: left;
		width: 20%;
		position: relative;
		text-align: center;
		color:#696969;
		font-size:15px;
	}
	.progressbar li:before{
		font-family: "Font Awesome 5 Free";
		content:"\f00c";
		width: 36px;
		height: 36px;
		border: 2px solid #EBEBEB;
		display: block;
		margin: 0 auto 8px auto;
		border-radius: 50%;
		line-height: 32.8px;
		background: white;
		color: #EBEBEB;
		text-align: center;
		font-weight: bold;
	}
	.progressbar li:after{
		content: '';
		position: absolute;
		width:100%;
		height: 5px;
		background: #EBEBEB;
		top: 17px;
		left: -50%;
		z-index: -1;
	}
	.progressbar li:first-child:after{
		content: none;
	}
	.progressbar li.active:after{
		background: #03DAB8;
	}
	.progressbar li.active:before{
		border-color: #03DAB8;
		background: #03DAB8;
		color: white
	}
	.progressbar li.active{
		color:#03DAB8;
	}
</style>

@endsection

@section('content')

<center>
	<div class="pt-5" style="padding-bottom:34px;">
		<div style="display:flow-root;max-width:1150px;">
			<ul class="progressbar">
				<li class="active">Organisation</li>
				<li class="active">Contact Person</li>
				<li class="active">Bank Account</li>
				<li class="active">Agreement</li>
				<li class="active">Verification</li>
			</ul>
		</div>
	</div>
	<h2 class="mb-4" style="color:#333;">Verification</h2>
	<img src="{{ asset('assets/images/verification.png') }}" class="mt-2" style="width:250px;" draggable="false">
	<p class="mt-4 pt-1" style="font-size:15px;color:#696969;line-height:25px;">
		Please check your email to verify your account.<br>
		Let's go you started on your goals. Already verified?
	</p>
</center>

@endsection

@section('js')

<script>

	//

</script>

@endsection