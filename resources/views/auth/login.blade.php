@extends('layouts.app')

@section('title', 'Login')

@section('css')

<style>
	body {
		background-color: #fff !important;
	}
</style>

@endsection

@section('content')

<div class="center-content">

	<center style="width:350px;">

		<form id="form-login">

			<img src="{{ asset('assets/img/login.png') }}" style="width:180px;" draggable="false">
			<h2 style="color:#333333;font-size:29px;" class="mt-4 mb-4">Welcome Back to Mypher</h2>

			<div id="alert"></div>

			<input type="text" name="email" class="form-control" placeholder="Email address" spellcheck="false" maxlength="100" onkeyup="this.value = this.value.toLowerCase();">
			<div style="position: relative;">
				<a id="show-password" class="custom-href" style="font-size: 14px; position: absolute; right: 0; margin-top: 15px; margin-right: 14px; background-color: #fff; cursor: pointer; user-select: none;" onclick="onPasswordStateChanged(this);">Show</a>
				<input type="password" name="password" class="form-control mt-3" placeholder="Password" spellcheck="false" maxlength="30">
			</div>
			
			<div class="mt-4">
				<table style="width:100%;">
					<tr>
						<td>
							<a href="javascript:void(0);" class="custom-href">Forgot Password?</a>
						</td>
					</tr>
				</table>
			</div>

			<button type="submit" class="btn btn-primary btn-lg btn-shadow-lg w-100 mt-4">Login</button>

		</form>
		
	</center>

</div>

@endsection

@section('js')

<script>
	
	$(document).ready(function() {

		$('[name="email"]').focus();

		$.validator.addMethod("regexEmail", function (value, element) {
			return /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		}, "Please enter a valid email address.");

		onEmailConfirm();

	});

	const onPasswordStateChanged = (el) => {

		if ($(el).text() === 'Show') {

			$(el).text('Hide');
			$(el).parent().find('input').prop('type', 'text');

			} else {

			$(el).text('Show');
			$(el).parent().find('input').prop('type', 'password');

		}

	}

	const onEmailConfirm = () => {

		const queryString = window.location.search;
		const urlParams = new URLSearchParams(queryString);

		const token = urlParams.get('token');
		const code = urlParams.get('code');

		if (token && code) {

			const data = {
				token: token,
				code: code
			};

			console.log(data);

			axios.post(`/api/auth/confirm-email`, data, {
				headers: {
					"Accept": "application/json",
				},
			}).then(function (res) {

				if (res.data.status == false) {

					$('#alert').html(`
						<div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
							${res.data.message}
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					`);

				} else {

					$('#alert').html(`
						<div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
							You've completed your registration!
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					`);

				}

				unblockUI();

			}).catch(function (err) {

				var res = err.response;

				if (res.data.status == false) {

					$('#alert').html(`
						<div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
							${res.data.message}
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					`);

				}

				unblockUI();

			});

		}

	}

	const loginValidationRules = {
		email: {
			required: true,
			email: true,
			maxlength: 100,
			regexEmail: true
		},
		password: {
			required: true,
			maxlength: 30
		}
	};

	const loginValidationOnSuccess = (label) => {

		label.parent().removeClass('has-danger').find('input').removeClass('is-invalid');
		label.remove();

	}

	{{-- FORM SUBMIT VALIDATE --}}
	$("#form-login").validate({

		submitHandler: function(form) {

			blockUI();
			
			$('#alert').empty();

			var form = $('#form-login')[0];
			var data = new FormData(form);

			axios.post(`/api/auth/sign-in`, data, {
				headers: {
					"content-type": "multipart/form-data",
				},
			}).then(function (res) {

				if (res.data.status == false) {

					$('[name="password"]').val('');

					$('#alert').html(`
						<div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
							${res.data.message}
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					`);

				} else {

					window.localStorage.setItem('apiToken', res.data.data.token);
					window.location.replace("/dashboard");

				}

				unblockUI();

			}).catch(function (err) {

				var res = err.response;

				if (res.data.status == false) {

					$('[name="password"]').val('');

					$('#alert').html(`
						<div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
							${res.data.message}
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					`);

				}

				unblockUI();

			});

		},
		rules: loginValidationRules,
		success: loginValidationOnSuccess
	});

</script>

@endsection