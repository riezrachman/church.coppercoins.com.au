@extends('layouts.app')

@section('title', 'Campaign Management')

@section('css')

<style>
    .page-titles{
        padding-bottom:0px !important;
    }
    .form-input-image{
        box-shadow:inset 0 0 0 150vw rgb(255 255 255 / 75%);
        border:1px solid #EBEBEB;
    }
</style>

@endsection

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card custom-card">
            <div class="card-body">
                <form id="form-campaign" onsubmit="updateOrCreateCampaign(event);">
                    <div id="alert"></div>
                    <div class="form-group row mb-custom-1">
                        <div class="col-md-2">
                            <div class="center-vertical">
                                <label for="logo_image">Charity Logo</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <table>
                                <tr>
                                    <td style="width:120px;">
                                        <img src="{{ asset('assets/img/default_image.png') }}" alt="" id="logo_image_display" style="border-radius:50%; object-fit:cover;border:2px dashed #EBEBEB;" width="100px" height="100px" draggable="false">
                                    </td>
                                    <td style="vertical-align:middle;">
                                        <div class="d-flex flex-column align-items-stretch justify-content-center">
                                            <input type="file" class="form-control-file" id="logo_image" name="logo_image" onchange="readImage(this, '#logo_image_display');" hidden>
                                            <label for="logo_image" class="btn btn-upload w-50 mb-0 text-dark" style="font-weight:600;">Upload File</label>
                                            <small id="logo_image_help" class="form-text mt-2" style="color:#696969;">
                                                Format file JPG, PNG and max image size is 2MB
                                            </small>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="form-group row mb-custom-1">
                        <div class="col-md-2">
                            <div class="center-vertical">
                                <label for="banner_image">Charity Banner</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <div class="form-input-image d-flex flex-column align-items-center justify-content-center" id="banner_image_display">
                                <input type="file" class="form-control-file" id="banner_image" name="banner_image" onchange="readImageDiv(this, '#banner_image_display');"  hidden>
                                <label for="banner_image" class="btn btn-upload w-40 mb-0 text-dark" style="font-weight:600;">Upload File</label>
                                <small id="banner_image_help" class="form-text mt-2" style="color:#696969;">
                                    Format file JPG, PNG and max image size is 2MB
                                </small>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row mb-custom-1">
                        <div class="col-md-2">
                            <div class="center-vertical">
                                <label for="name">Charity Name</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="name" name="name" placeholder="Enter charity name" spellcheck="false" autocomplete="off">
                        </div>
                    </div>
                    <div class="form-group row mb-custom-1">
                        <div class="col-md-2">
                            <div class="mt-3">
                                <label for="introduction">Charity Introduction</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <textarea class="form-control" style="padding-top: 13px !important; padding-bottom: 13px !important; height: 100px !important; resize: none;" cols="30" rows="10" id="introduction" name="introduction" placeholder="Enter charity introduction" spellcheck="false" autocomplete="off"></textarea>
                        </div>
                    </div>
                    <div class="form-group row mb-custom-1">
                        <div class="col-md-2">
                            <div class="mt-3">
                                <label for="campaign_content">Campaign Content</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <textarea class="form-control" style="padding-top: 13px !important; padding-bottom: 13px !important; height: 200px !important; resize: none;" cols="30" rows="10" id="campaign_content" name="campaign_content" placeholder="Enter campaign content" spellcheck="false" autocomplete="off"></textarea>
                        </div>
                    </div>
                    <div class="form-group row mb-custom-1">
                        <div class="col-md-2">
                            <div class="mt-3">
                                <label for="donation_content">Donation Content</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <textarea class="form-control" style="padding-top: 13px !important; padding-bottom: 13px !important; height: 150px !important; resize: none;" cols="30" rows="10" id="donation_content" name="donation_content" placeholder="Enter donation popup content" spellcheck="false" autocomplete="off"></textarea>
                        </div>
                    </div>
                    <div class="form-group row mb-1" style="margin-top:31px;">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center"></div>
                        </div>
                        <div class="col-md-10">
                            <button type="submit" class="btn btn-outline-primary btn-lg px-5">Save & Preview</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

{{-- MODAL PREVIEW --}}
<div class="modal fade" id="modal-preview">
    <div class="modal-dialog modal-xl mt-0 mb-0 modal-dialog-scrollable" style="height:100vh;max-height:100vh;">
        <div class="modal-content" style="border-radius:12px 12px 0px 0px;max-height:100vh;">
            <div class="modal-header" style="box-shadow:0 0 20px rgb(89 102 122 / 10%) !important;">
                <h5 class="modal-title" style="color:#333;font-size:20px;align-self:normal;margin-top:-5px;">Charity Page Preview</h5>
                <div>
                    <button class="btn btn-outline-primary btn-lg" onclick="modalPreview.modal('hide');">Cancel</button>
                    &nbsp;&nbsp;
                    <button class="btn btn-primary btn-lg" id="btn-publish" onclick="publishCampaign(this, 1);" style="display:none;">Publish</button>
                    <button class="btn btn-danger btn-lg" id="btn-unpublish" onclick="publishCampaign(this, 0);" style="display:none;">Unpublish Campaign</button>
                </div>
            </div>
            <div class="modal-body">
                {{-- JS --}}
            </div>
            <div class="modal-footer py-3" style="justify-content:center;">
                <button type="button" class="btn btn-outline-primary btn-lg" id="btn-donation">Donation Popup Preview</button>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')

<script>

    var modalPreview = $('#modal-preview');

    $(function(){

        blockUI();

        getCampaign();

        modalPreview.modal({
            backdrop: 'static',
            keyboard: true
        });

    });    

    const getCampaign = async () => {

        var res = await axios.get(`/api/campaign/0`, {
            headers: {
                "Authorization": `Bearer ${apiToken}`,
            },
        });

        if (res.data.status == true) {

            var data = res.data.data;

            $('#logo_image_display').attr('src', data.logo_image);

            $('#banner_image').parent().attr('style', `background-image: url(${data.banner_image}); background-position: center; background-repeat: no-repeat; background-size: cover;`)

            $('#name').val(data.name);
            $('#introduction').val(data.introduction);
            $('#campaign_content').val(data.campaign_content);
            $('#donation_content').val(data.donation_content);

            {{-- MODAL PREVIEW --}}
            if(data.status === 0){
                $('#btn-publish').show('fast');
            }else{
                $('#btn-unpublish').show('fast');
            }

            if($('#charity-preview').is(":hidden")){
                $('#btn-donation').click();
            }

            modalPreview.find('.modal-body').first().empty().append(`
                <div class="container">
                    <div class="container" id="charity-preview">
                        <img src="${data.banner_image}" class="mb-4" style="width:100%;border-radius:10px;max-height:400px;object-fit:cover;" draggable="false">
                        <h2 class="mb-4" style="color:#333;">${data.name}</h2>
                        <table class="mb-4">
                            <tr>
                                <td style="width:70px;">
                                    <img src="${data.logo_image}" style="width:52px;height:52px;border-radius:100px;object-fit:cover;" draggable="false">
                                </td>
                                <td style="vertical-align:middle;color:#333;font-size:15px;">
                                    ${data.ch_organization_name} &nbsp;<c class="text-muted" style="font-weight:300;">Creation date 03 Dec 2021</c>
                                </td>
                            </tr>
                        </table>
                        <p class="mb-2" style="color:#333;font-size:15px;white-space:break-spaces;line-height:22px;">${data.introduction}</p>
                        <hr class="my-4">
                        <p class="mb-0" style="color:#333;font-size:15px;white-space:break-spaces;line-height:22px;">${data.campaign_content}</p>
                    </div>
                    <div class="container" id="donation-preview" style="display:none;">
                        <h2 class="mb-4" style="color:#333;">${data.name}</h2>
                        <table class="mb-4">
                            <tr>
                                <td style="width:70px;">
                                    <img src="${data.logo_image}" style="width:52px;height:52px;border-radius:100px;object-fit:cover;" draggable="false">
                                </td>
                                <td style="vertical-align:middle;color:#333;font-size:15px;">
                                    ${data.ch_organization_name}
                                </td>
                            </tr>
                        </table>
                        <p class="mb-0" style="color:#333;font-size:15px;white-space:break-spaces;line-height:22px;">${data.donation_content}</p>
                    </div>
                </div>
            `);

        }

        unblockUI();

    }

    const updateOrCreateCampaign = async (e) => {

        e.preventDefault();

        blockUI();

        var form = $('#form-campaign')[0];
        var data = new FormData(form);

        axios.post(`/api/auth/campaign`, data, {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": `Bearer ${apiToken}`,
            },
        }).then(function(res){

            if(res.data.status == false){

                $('#alert').html(`
                    <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                        ${res.data.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            }else{

                $('#alert').html('');
                $('#btn-publish').hide();
                $('#btn-unpublish').hide();

                getCampaign();

                modalPreview.modal('show');

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

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            }

            unblockUI();

        });

    }

    const readImage = (input, element) => {

        if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $(element).attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);

        } else {

            $(element).attr('src', "{{ asset('assets/img/default_image.png') }}");

        }

    }

    const readImageDiv = (input, element) => {

        if (input.files && input.files[0]) {

            var reader = new FileReader();

            reader.onload = function (e) {
                $(element).attr('style', `background-image: url(${e.target.result}); background-position: center; background-repeat: no-repeat; background-size: cover;`);
            }
            reader.readAsDataURL(input.files[0]);

        } else {

            $(element).attr('style', `background-image: url({{ asset('assets/img/default_image.png') }}); background-position: center; background-repeat: no-repeat; background-size: cover;`);

        }

    }

    $('#btn-donation').on('click', function(){

        var _  = '#charity-preview';
        var __ = '#donation-preview';
        
        if($(__).is(":hidden")){
            $(_).fadeOut('fast');
            setTimeout(function(){
                $(__).fadeIn('fast');
            }, 200);
            $(this).html('Charity Page Preview');
            modalPreview.find('.modal-title').html('Donation Popup Preview');
        }else{
            $(__).fadeOut('fast');
            setTimeout(function(){
                $(_).fadeIn('fast');
            }, 200);
            $(this).html('Donation Popup Preview');
            modalPreview.find('.modal-title').html('Charity Page Preview');
        }

    });

    async function publishCampaign(sel, status){

        if(status === 0 || status === 1){

            blockUI();

            modalPreview.modal('hide');

            var fd = new FormData();    
            fd.append('status', status);

            await axios.post(`/api/auth/campaign`, fd, {
                headers: {
                    "content-type": "multipart/form-data",
                    "Authorization": `Bearer ${apiToken}`,
                }
            }).then(function(res){

                if(status === 1){
                    $('#alert').html(`
                        <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                            Congratulations!<br>
                            Your campaign has been <b>published</b>, and now it is live.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }else{
                    $('#alert').html(`
                        <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                            Your campaign is now <b>unpublished</b>.
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            }).catch(function (err) {

                var res = err.response;

                if(res.data.status == false){
                    $('#alert').html(`
                        <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                            ${res.data.message}
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    `);
                }

                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;

            });

            unblockUI();

        }

    }

</script>

@endsection
