@extends('emails.layouts.app')

@section('content')

<tr>
    <td style="text-align:left;font-size:16px;line-height:25px;padding-bottom:25px;">
        <p>
            Hi, <strong>{{ $user['name'] }}</strong>,<br/>
            This is your {{ env('APP_NAME') }} secret verification code: <strong>{{ $user['email_verification_code'] }}</strong>
        </p>
        <p>
            Or you can <a href="{{ url('login') . '?code=' . $user['email_verification_code'] . '&token=' . md5($user['email']) }}">click here</a> to validate your email.
        </p>
    </td>
</tr>
<tr>
    <td style="text-align:left;font-size:16px;line-height:25px;padding-bottom:25px;">
        <p>Please never share this code with anyone. Thank you for using our services.</p>
        <p>
            Best,<br/>
            The Mypher Team
        </p>
    </td>
</tr>

@endsection