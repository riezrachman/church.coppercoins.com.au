@extends('layouts.app')

@section('title', 'Settings')

@section('content')

<div class="row">
    <div class="col-md-12">
        <div class="card custom-card">
            <div class="card-body">
                <div class="d-flex justify-content-end align-items-baseline" style="margin-bottom: 20px;">
                    <button class="btn btn-primary btn-lg btn-shadow-lg" style="width: 180px;" data-is_form_disabled="true" onclick="editOrganizationFormState(this);">Edit</button>
                </div>
                <form id="form-organization" onsubmit="updateOrCreateOrganization(event);">
                    <div id="alert"></div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="name">Charity Name</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="name" name="name" placeholder="Enter charity name" disabled>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="address">Office Address</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="address" name="address" placeholder="Enter office address" disabled>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">

                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="city" name="city" placeholder="Enter city" disabled>
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="country" name="country" placeholder="Enter country" disabled>
                        </div>
                        <div class="col-md-2">
                            <input type="text" class="form-control" id="postal_code" name="postal_code" placeholder="Enter postal code" disabled>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="business_phone">ABN</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="business_phone" name="business_phone" placeholder="Enter ABN" disabled>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="category_id">Category</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <select class="form-control form-select" id="category_id" name="category_id" style="cursor:pointer;" disabled>
                                <option value="" disabled selected>Please wait...</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="website_url">Charity Website</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="website_url" name="website_url" placeholder="Enter charity website" disabled>
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 0px;">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center"></div>
                        </div>
                        <div class="col-md-10">
                            <button type="submit" class="btn btn-primary btn-lg" id="btn-organization_form_submit" disabled>Save Changes</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card custom-card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-baseline" style="margin-bottom: 20px;">
                    <h5 class="card-title">Login Details</h5>
                </div>
                <form id="form-password" onsubmit="changePassword(event);">
                    <div id="alert"></div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="current_password">Current Password</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="current_password" name="current_password" placeholder="Enter current password">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="new_password">New Password</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="new_password" name="new_password" placeholder="Enter new password">
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center">
                                <label for="confirm_new_password">Confirm Password</label>
                            </div>
                        </div>
                        <div class="col-md-10">
                            <input type="text" class="form-control" id="confirm_new_password" name="confirm_new_password" placeholder="Enter confirm new password">
                        </div>
                    </div>
                    <div class="form-group row" style="margin-bottom: 0px;">
                        <div class="col-md-2">
                            <div class="d-flex flex-column align-items-stretch justify-content-center"></div>
                        </div>
                        <div class="col-md-10">
                            <button type="submit" class="btn btn-primary btn-lg">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')

<script>

    $(function () {

        getCategory();
        getProfile();

    });

    const getCategory = async () => {

        var res = await axios.get(`/api/category`, {
            headers: {
                "Authorization": `Bearer ${apiToken}`,
            },
        });

        if (res.data.status == true) {

            var data = res.data.data;

            $('#category_id').empty().append(`<option value="" disabled selected>Please select...</option>`);

            data.map((e) => {
                $('#category_id').append($('<option>', {
                    value: e.id,
                    text: e.name,
                }));
            });

        }

    }

    const getProfile = async () => {

        var res = await axios.get(`/api/auth/profile`, {
            headers: {
                "Authorization": `Bearer ${apiToken}`,
            },
        });

        if (res.data.status == true) {

            var data = res.data.data;

            $('#name').val(data.organization.name);
            $('#address').val(data.organization.address);
            $('#city').val(data.organization.city);
            $('#country').val(data.organization.country);
            $('#postal_code').val(data.organization.postal_code);
            $('#business_phone').val(data.organization.business_phone);
            $('#category_id').val(data.organization.categories[0].id);
            $('#website_url').val(data.organization.website_url);

        }

    }

    const editOrganizationFormState = (el) => {

        var isDisabled = $(el).attr('data-is_form_disabled');

        isDisabled = isDisabled === 'true' ? false : true;

        $('#name').attr('disabled', isDisabled);
        $('#address').attr('disabled', isDisabled);
        $('#city').attr('disabled', isDisabled);
        $('#country').attr('disabled', isDisabled);
        $('#postal_code').attr('disabled', isDisabled);
        $('#business_phone').attr('disabled', isDisabled);
        $('#category_id').attr('disabled', isDisabled);
        $('#website_url').attr('disabled', isDisabled);

        $(el).attr('data-is_form_disabled', isDisabled);

        $('#btn-organization_form_submit').attr('disabled', isDisabled);

    }

    const updateOrCreateOrganization = (e) => {

        e.preventDefault();

        blockUI();

        $('#form-organization').find('#alert').empty();

        var form = $('#form-organization')[0];
        var data = new FormData(form);

        axios.post(`/api/auth/organization`, data, {
            headers: {
                "content-type": "multipart/form-data",
                "Authorization": `Bearer ${apiToken}`,
            },
        }).then(function (res) {

            if (res.data.status == false) {

                $('#form-organization').find('#alert').html(`
                    <div class="alert alert-danger alert-dismissible fade show mb-4" role="alert">
                        ${res.data.message}
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            } else {

                getProfile();
                editOrganizationFormState();

                $('#form-organization').find('#alert').html(`
                    <div class="alert alert-success alert-dismissible fade show mb-4" role="alert">
                        Successfully saved changes!
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close" onclick="alertClose(this);">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                `);

                document.body.scrollTop = 0; // For Safari
                document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

            }

            unblockUI();

        }).catch(function (err) {

            var res = err.response;

            if (res.data.status == false) {

                $('#form-organization').find('#alert').html(`
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

    const changePassword = (e) => {

        e.preventDefault();

    }

</script>

@endsection