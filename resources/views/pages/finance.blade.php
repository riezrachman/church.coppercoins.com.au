@extends('layouts.app')

@section('title', 'Finance')

@section('content')

<div class="row">
    <div class="col-md-4">
        <div class="card custom-card-warning" style="height: 9rem;">
            <div class="card-body" style="padding: 15px;">
                <div class="card-title" style="color: #F58220;">Total Donated</div>
                <h4 style="margin-bottom: 0px">$ <span id="total-donated">0</span> AUD</h4>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card custom-card-success" style="height: 9rem;">
            <div class="card-body" style="padding: 15px;">
                <div class="card-title" style="color: #03DAB8;">Current Active Balance</div>
                <h4 style="margin-bottom: 0px">$ <span id="current-active-balance">0</span> AUD</h4>
                <button class="btn btn-primary btn-lg btn-shadow-lg mt-3 w-100" onclick="openRequestWithdrawalModal(event);">Request Withdrawal</button>
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <div class="card custom-card-danger" style="height: 9rem;">
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
            <div class="card-body" style="padding: 15px;">
                <table class="table table-borderless" id="table-donor">
                    <thead>
                        <tr>
                            <th scope="col">Time, Data</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Activity</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="modal_request_withdrawal" tabindex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
    <input type="hidden" id="id" name="id">
    <form id="form" onsubmit="createOrUpdate(event);">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="text-center">
                        <h3 class="modal-title" id="title">Request Withdrawal</h3>
                        <p id="subtitle" style="font-size: 14px;">Your total active balance <span style="color: #008871; text-size: 18px;">$ 810 AUD</span></p>
                    </div>
                    <div id="error">
                        <!-- Error Placeholder -->
                    </div>
                    <div class="form-group">
                        <label for="amount">Amount <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" id="amount" name="amount" placeholder="Enter amount">
                    </div>
                    <div class="form-group">
                        <label for="account_name">Bank Account Name <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" id="account_name" name="account_name" placeholder="Enter bank account name">
                    </div>
                    <div class="form-group">
                        <label for="account_number">Bank Account Number <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" id="account_number" name="account_number" placeholder="Enter bank account number">
                    </div>
                    <div class="form-group">
                        <label for="bsb">BSB <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" id="bsb" name="bsb" placeholder="Enter BSB">
                    </div>
                    <div class="form-group">
                        <label for="password">Password <span style="color: red;">*</span></label>
                        <input type="text" class="form-control" id="password" name="password" placeholder="Enter your password">
                    </div>
                    <div class="">
                        <button class="btn btn-primary btn-lg btn-shadow-lg w-100">Submit</button>
                    </div>
                    <div class="mt-2">
                        <a class="btn btn-lg btn-link w-100">Cancel</a>
                    </div>
                </div>
            </div>
        </div>
    </form>
</div>

@endsection

@section('js')

<script>

    $(function () {

        getCardCounter();
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

    const openRequestWithdrawalModal = () => {

        blockUI();

        $('#modal_request_withdrawal').modal('show');

        unblockUI();

    }

</script>

@endsection
