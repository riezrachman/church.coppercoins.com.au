@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')

<div class="row">
    <div class="col-md-4">
        <div class="card custom-card-warning">
            <div class="card-body" style="padding: 15px;">
                <div class="card-title" style="color: #F58220;">Total Donated</div>
                <h4 style="margin-bottom: 0px">$ <span id="total-donated">0</span> AUD</h4>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card custom-card-success">
            <div class="card-body" style="padding: 15px;">
                <div class="card-title" style="color: #03DAB8;">Current Active Balance</div>
                <h4 style="margin-bottom: 0px">$ <span id="current-active-balance">0</span> AUD</h4>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card custom-card-danger">
            <div class="card-body" style="padding: 15px;">
                <div class="card-title" style="color: #EC008C;">Added to Watchlist</div>
                <h4 style="margin-bottom: 0px"><span id="watchlist-count">0</span></h4>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card custom-card">
            <div class="card-body" style="padding: 15px;" id="div-charity-detail">
                <center>
                    <div class="spinner-border spinner-border-sm text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </center>
            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-12">
        <div class="card custom-card">
            <div class="card-body" style="padding: 15px;">
                <div class="d-flex justify-content-between align-items-baseline">
                    <h5 class="card-title" style="margin-bottom: 0px;">Donations</h5>
                    <button class="btn btn-primary btn-lg btn-shadow-lg" onclick="exportDonorData(this);">Export Donor Data</button>
                </div>
                <div class="mt-3">
                    <table class="table table-borderless" id="table-donor">
                        <thead>
                            <tr>
                                <th scope="col">Time, Data</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Donor Name</th>
                                <th scope="col">Donor Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection

@section('js')

<script>

    $(function () {

        getCardCounter();
        getCharityDetail();
        getDonorData();

    });

    const getCardCounter = async () => {

        var res = await axios.get(`/api/dashboard/counter`, {
            headers: {
                "Authorization": `Bearer ${apiToken}`,
            },
        });

        if (res.data.status == true) {

            var data = res.data.data;

            $('#total-donated').text(data.total_donated);
            $('#current-active-balance').text(data.current_active_balance);
            $('#watchlist-count').text(data.watchlist_count);

        }

    }

    const getCharityDetail = async () => {

        var res = await axios.get(`/api/auth/profile`, {
            headers: {
                "Authorization": `Bearer ${apiToken}`,
            },
        });

        if (res.data.status == true) {

            var data = res.data.data;

            $('#div-charity-detail').html(`
                <div class="custom-card-header mb-3">
                    <h5 class="card-title" style="margin-bottom: 0px;">${data.organization.name}</h5>
                </div>
                <div class="d-flex px-3">
                    <img src="{{ asset('assets/images/default_image.png') }}" alt="" style="border-radius: 50%;" width="100px" height="100px">
                    <div class="d-flex flex-column align-items-stretch" style="margin-left: 40px;">
                        <p>
                            <span class="text-muted">ABN</span><br/>
                            <b>${data.organization.business_phone}</b>
                        </p>
                        <p>
                            <span class="text-muted">Category</span><br/>
                            <b>${data.organization.categories[0].ch_category_name}</b>
                        </p>
                    </div>
                    <div class="d-flex flex-column align-items-stretch" style="margin-left: 90px;">
                        <p>
                            <span class="text-muted">Email</span><br/>
                            <b>${data.email}</b>
                        </p>
                        <p>
                            <span class="text-muted">Phone</span><br/>
                            <b>${data.organization.phone}</b>
                        </p>
                    </div>
                </div>
            `);

        }


    }

    const getDonorData = () => {

        var html = `
            <tr>
                <td colspan="4"><center>No Data</center></td>
            </tr>
        `;

        // html = `
        //     <tr>
        //         <td>05:00 PM, 04-10-2021</td>
        //         <td>$ 65 AUD</td>
        //         <td>Rebecca Foster</td>
        //         <td>rebeccafoster@gmail.com</td>
        //     </tr>
        //     <tr>
        //         <td>05:00 PM, 04-10-2021</td>
        //         <td>$ 65 AUD</td>
        //         <td>Rebecca Foster</td>
        //         <td>rebeccafoster@gmail.com</td>
        //     </tr>
        //     <tr>
        //         <td>05:00 PM, 04-10-2021</td>
        //         <td>$ 65 AUD</td>
        //         <td>Rebecca Foster</td>
        //         <td>rebeccafoster@gmail.com</td>
        //     </tr>
        // `;

        $('#table-donor').find('tbody').html(html);

    }

    const exportDonorData = () => {

        // TODO

    }

</script>

@endsection
