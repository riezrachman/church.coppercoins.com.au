@extends('layouts.app')

@section('title', 'Register')

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
	.steps{
		display:none;
	}
	.form-check-label{
		width: 100%;
		padding-left: 12px;
		text-align: left;
		font-size: 15px;
		color: #696969;
		margin-top: 3px;
		cursor:pointer;
		user-select: none;
	}
	.form-check-input{
		cursor:pointer;
	}
	.wizard > .actions > ul > li.disabled {
		display: none;
	}
</style>

@endsection

@section('content')

{{-- CARD 1 --}}
<div id="register-1" class="center-content">

	<center style="width:350px;">

		<form id="form-register-1">

			<img src="{{ asset('assets/images/logo.png') }}" style="width:180px;" draggable="false">
			<h2 style="color:#333333;" class="mt-4 mb-4">Register your Church</h2>

			<div id="alert"></div>

			<input type="text" name="email" class="form-control" placeholder="Email address" spellcheck="false" maxlength="100">
			<div style="position:relative;">
				<a id="show-password" class="custom-href" style="font-size:14px;position:absolute;right:0;margin-top:15px;margin-right:14px;background-color:#fff;cursor:pointer;user-select:none;">Show</a>
				<input type="password" name="password" class="form-control mt-3" placeholder="New password" spellcheck="false" maxlength="30">
			</div>

			<div class="mt-2">
				<table style="width:100%;">
					<tr>
						<td style="padding-right:7px;color:#ABABAB;">
							<i class="fas fa-info-circle"></i>
						</td>
						<td style="font-size:12.5px;color:#ABABAB;">
							<i>Please use 8 or more characters with a mix uppercase, lowercase, and numbers</i>
						</td>
					</tr>
				</table>
			</div>

			<div class="mt-4" style="color:#777777;font-size:15px;">
				By clicking "Create Account", you agree to our <br><a href="javascript:void(0);" class="custom-href">Terms of use</a> and <a href="javascript:void(0);" class="custom-href">Privacy Policy</a>
			</div>

			<button type="submit" class="btn btn-primary btn-lg btn-shadow-lg w-100 mt-4" id="create-btn">Create Account</button>

		</form>

	</center>

</div>

{{-- CARD 2 --}}
<div id="register-2" style="display:none;">
	<form id="form-register-2">
		<center>
			<div class="pt-5" style="padding-bottom:34px;">
				<div style="display:flow-root;max-width:1150px;">
					<ul class="progressbar">
						<li class="active">Church</li>
						<li>Contact Person</li>
						<li>Agreement</li>
						<li>Verification</li>
					</ul>
				</div>
			</div>
			<div style="width:520px;" id="steps">

				<h1 style="display:none;"></h1>
				<section>
					<h2 class="mb-4" style="color:#333;">Church</h2>
					<input type="text" name="church[name]" class="form-control mt-3" placeholder="Enter church name" spellcheck="false" maxlength="255" minlength="5" autocomplete="off" required>
					<textarea name="church[address]" class="form-control mt-3" placeholder="Enter church address" spellcheck="false" maxlength="255" minlength="5" style="padding-top:13px !important;padding-bottom:13px !important;height:100px !important;resize:none;" autocomplete="off" required></textarea>
					<div class="row">
						<div class="col-6">
							<input type="text" name="church[city]" class="form-control mt-3" placeholder="City" spellcheck="false" maxlength="255" autocomplete="off" required>
						</div>
						<div class="col-6">
							<input type="text" name="church[state]" class="form-control mt-3" placeholder="State" spellcheck="false" maxlength="255" autocomplete="off" required>
						</div>
						<div class="col-6">
							<input type="text" name="church[country]" class="form-control mt-3" placeholder="Country" spellcheck="false" maxlength="255" autocomplete="off" required>
						</div>
						<div class="col-6">
							<input type="text" name="church[postal_code]" class="form-control mt-3" placeholder="ZIP Code" spellcheck="false" maxlength="255" minlength="3" autocomplete="off" required>
						</div>
					</div>
				</section>

				<h1 style="display:none;"></h1>
				<section>
					<h2 class="mb-4" style="color:#333;">Contact Person</h2>
					<input type="text" name="name" class="form-control mt-3" placeholder="Enter your full name" spellcheck="false" minlength="3" maxlength="255" autocomplete="off" required>
					<input type="text" name="phone" class="form-control mt-3" placeholder="Enter your phone number" spellcheck="false" maxlength="20" minlength="5" autocomplete="off" required>
					<input type="hidden" name="role" value="church">
				</section>

				<h1 style="display:none;"></h1>
				<section>
					<h2 class="mb-4" style="color:#333;">Agreement</h2>
					<p class="mb-3" style="font-size:15px;color:#696969;text-align:left;line-height:25px;">
						I declare that i have read and fully understand and i agree to comply by the following legal documents.
					</p>
					<div id="alert-2"></div>
					<div class="form-check pt-1">
						<input class="form-check-input" type="checkbox" value="" id="cb-all">
						<label class="form-check-label" for="cb-all">
							I agree and understand all documents
						</label>
					</div>
					<div class="form-check mt-3">
						<input class="form-check-input" type="checkbox" value="" id="cb-1">
						<label class="form-check-label" for="cb-1">
							I agree and understand the <a href="javascript:void(0);" style="text-decoration:underline!important;color:#696969;">Privacy Policy</a>
						</label>
					</div>
					<div class="form-check mt-3">
						<input class="form-check-input" type="checkbox" value="" id="cb-2">
						<label class="form-check-label" for="cb-2">
							I agree and understand the <a href="javascript:void(0);" style="text-decoration:underline!important;color:#696969;">Website Terms of Use</a>
						</label>
					</div>
					<div class="form-check mt-3">
						<input class="form-check-input" type="checkbox" value="" id="cb-3">
						<label class="form-check-label mb-1" for="cb-3">
							I agree and understand the <a href="javascript:void(0);" style="text-decoration:underline!important;color:#696969;">Charity Terms of Use</a>
						</label>
					</div>
				</section>
				
			</div>
		</center>
	</form>
</div>

@endsection

@section('js')

<script>
	
	{{-- ADDITIONAL --}}
	$(document).ready(function(){
		$('[name="email"]').focus();
		$('[name="church[phone]"],[name="phone"]').mask('00000000000000000000', {reverse: true});
		$('[name="church[postal_code]"]').mask('00000000');
		$('[name="church[business_phone]"]').mask('00 000 000 000');
		$('[name="bank[account_number]"]').mask('00000000000000000000000000000000000000000000000000');
		$('[name="bank[account_bsb]"]').mask('000 000 000');
	});

	$('[name="email"]').keyup(function(){
		this.value = this.value.toLowerCase();
	});

	{{-- SHOW HIDE PASSWORD --}}
	$('#show-password').on('click', function(){
		if($(this).text() === 'Show'){
			$(this).text('Hide');
			$('[name="password"]').prop('type', 'text');
		}else{
			$(this).text('Show');
			$('[name="password"]').prop('type', 'password');
		}
	});

	{{-- ADD VALIDATOR --}}
	$.validator.addMethod("regexEmail", function (value, element) {
		return /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
	}, "Please enter a valid email address.");

	{{-- FORM SUBMIT VALIDATE --}}
	$("#form-register-1").validate({
		submitHandler: function(form){

			blockUI();
			$('#alert').empty();

			$.post(`${mainAppUrl}/api/auth/validate-email`, {email: $('[name="email"]').val()}, function(){

				setTimeout(async function(){

					await $.get(`${mainAppUrl}/api/category`, function(data){

						$('[name="category_id"]').empty().removeAttr('readonly').append($('<option>', {
							value: '',
							text: 'Select category'
						}));

						$.each(data.data, function(index, val){
							$('[name="category_id"]').append($('<option>', {
								value: val.id,
								text: val.name
							}));
						});

					});

					await $.get(`${mainAppUrl}/api/bank-institution`, function(data){

						$('[name="bank[ms_institution_id]"]').empty().removeAttr('readonly').append($('<option>', {
							value: '',
							text: 'Select bank'
						}));

						$.each(data.data, function(index, val){
							$('[name="bank[ms_institution_id]"]').append($('<option>', {
								value: val.id,
								text: val.full_name
							}));
						});

					});

					$('[name="email_2"]').val($('[name="email"]').val());

					$('#register-1').fadeOut('fast');

					setTimeout(function(){

						$('#register-2').fadeIn('fast');

						unblockUI();

					}, 250);

				}, 250);
				
			}).fail(function(){
				
				setTimeout(function(){

					$('#alert').html(`
						<div class="alert alert-warning alert-dismissible fade show mb-4" role="alert">
							The user with email <b>${$('[name="email"]').val()}</b> is already registered, please sign in instead.
							<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
					`);

					$('#form-register-1').find('input').val('');
					$('#create-btn').focus();

					unblockUI();

				}, 250);

			});

		},
		rules: {
			email: {
				required: true,
				email: true,
				maxlength: 100,
				regexEmail: true
			},
			password: {
				required: true,
				minlength: 8,
				maxlength: 30
			}
		},
		success: function(label){
			label.parent().removeClass('has-danger').find('input').removeClass('is-invalid');
			label.remove();
        }
	});

	{{-- INIT STEPS --}}
	const form = $('#form-register-2');

	$("#steps").steps({
		headerTag: "h1",
		bodyTag: "section",
		autoFocus: true,
		onInit: function(){
			$('.actions').find('[href="#previous"]').css('float', 'left').css('padding-left', '0px').css('color', '#F58220').text('Back');
			$('.actions').find('[href="#previous"]').addClass('btn btn-outline-light btn-lg');
			$('.actions').find('[href="#next"],[href="#finish"]').addClass('btn btn-primary btn-lg btn-shadow-lg px-5');
			$('.actions').find('[href="#next"],[href="#finish"]').css('float', 'right');
			$('.actions').find('[href="#finish"]').text('Submit');
			$('.actions').addClass('mt-4 mb-5');
		},
		onStepChanging: function(event, currentIndex, newIndex){
			form.validate().settings.ignore = ":disabled,:hidden";
			return form.valid();
		},
		onStepChanged: function(event, currentIndex, newIndex){
			setStep(currentIndex + 1);
		},
		onFinishing: function(event, currentIndex){
			if($('#cb-all').prop('checked') && $('#cb-1').prop('checked') && $('#cb-2').prop('checked') && $('#cb-3').prop('checked')){
				form.validate().settings.ignore = ":disabled";
				return form.valid();
			}else{
				$('#alert-2').html(`
					<div class="alert alert-warning alert-dismissible fade show mb-3" role="alert">
						You must agree and understand all documents.
						<button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
				`);
			}
		},
		onFinished: function(event, currentIndex){

			blockUI();

			$('[name="church[business_phone]"],[name="bank[account_bsb]"]').unmask();

			var form = $('#form-register-2')[0];
			var fd   = new FormData(form);

			fd.append("email",    $('[name="email"]').val());
			fd.append("password", $('[name="password"]').val());

			// console.log([...fd])

			$.ajax({
				method: 'POST',
				headers: {'X-CSRF-Token': "{{ csrf_token() }}"},
				processData: false,
				contentType: false,
				cache: false,
				data: fd,
				enctype: 'multipart/form-data',
				url: `${mainAppUrl}/api/auth/sign-up`,
				success: function(data){

					window.localStorage.setItem('apiToken', data.data.token);
					window.location.replace("/dashboard");

				}
			});

		}
	});

	form.validate({
		rules: {
			//
		},
		success: function(label){
			label.parent().removeClass('has-danger').find('input').removeClass('is-invalid');
			label.remove();
        }
	});

	{{-- STEPS ADDITIONAL --}}
	function setStep(idx){
		$('ul.progressbar').find('li').each(function(index, el){
			if(idx > 0){
				$(el).addClass('active');
			}else{
				$(el).removeClass('active');
			}
			idx--;
		});
	};

	{{-- CHECKBOX --}}
	$('#cb-all').change(function(){
        if(this.checked){
        	$('#cb-1,#cb-2,#cb-3').prop('checked', true);
        }else{
        	$('#cb-1,#cb-2,#cb-3').prop('checked', false);
        }
        $('#alert-2').empty();
    });

    $('#cb-1,#cb-2,#cb-3').change(function(){
    	if($('#cb-1').prop('checked') && $('#cb-2').prop('checked') && $('#cb-3').prop('checked')){
    		$('#cb-all').prop('checked', true);
    	}else{
    		$('#cb-all').prop('checked', false);
    	}
    	$('#alert-2').empty();
    });

</script>

@endsection