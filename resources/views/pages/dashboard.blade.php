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

    

</script>

@endsection
