@extends('layouts.auth')
@section('title')
<title>Register | Artwallet</title>
@endsection
@section('content')
<div class="card">
    <div class="card-inner card-inner-lg">
        <div class="nk-block-head">
            <div class="nk-block-head-content">
                <h4 class="nk-block-title">Sign-Up</h4>
                <div class="nk-block-des">
                    <p>Create an ArtWallet account.</p>
                </div>
            </div>
        </div>
        <form action="{{route('register')}}" method="post">
            @csrf
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="default-01">First Name</label>
                </div>
                <div class="form-control-wrap">
                    <input type="text" name="first_name" class="form-control form-control-lg @error('first_name') error @enderror" id="default-01" required value="{{old('first_name')}}" placeholder="Enter First name">
                </div>
                @error('first_name')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="default-01">Last Name</label>
                </div>
                <div class="form-control-wrap">
                    <input type="text" name="last_name" class="form-control form-control-lg @error('last_name') error @enderror" id="default-01" required value="{{old('last_name')}}" placeholder="Enter your Last name">
                </div>
                @error('last_name')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="default-01">Email</label>
                </div>
                <div class="form-control-wrap">
                    <input type="email" name="email" class="form-control form-control-lg @error('email') error @enderror" id="default-01" required value="{{old('email')}}" placeholder="Enter your email address">
                </div>
                @error('email')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="default-01">Phone Number</label>
                </div>
                <div class="form-control-wrap">
                    <input type="number" name="mobile" class="form-control form-control-lg @error('mobile') error @enderror" id="default-01" required value="{{old('mobile')}}" placeholder="Enter your Phone number">
                </div>
                @error('mobile')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="password">Password</label>
                </div>
                <div class="form-control-wrap">
                    <a href="#" class="form-icon form-icon-right passcode-switch lg" data-target="password">
                        <em class="passcode-icon icon-show icon ni ni-eye"></em>
                        <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input type="password" name="password" class="form-control form-control-lg @error('password') error @enderror" id="password" required placeholder="Enter your password">
                </div>
                @error('password')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="password">Confirm Password</label>
                </div>
                <div class="form-control-wrap">
                    <a href="#" class="form-icon form-icon-right passcode-switch lg" data-target="password_confirmation">
                        <em class="passcode-icon icon-show icon ni ni-eye"></em>
                        <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input type="password" name="password_confirmation" class="form-control form-control-lg @error('password') error @enderror" id="password_confirmation" required placeholder="Confirm password">
                </div>
                @error('password')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="default-01">Referral code</label>
                </div>
                <div class="form-control-wrap">
                    <input type="text" name="referral_code" class="form-control form-control-lg @error('referral_code') error @enderror" id="default-01" value="{{old('referral_code')}}" placeholder="Enter a referral code">
                </div>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-lg btn-primary btn-block">Create Account</button>
            </div>
        </form>
        <div class="form-note-s2 text-center pt-4"> Have an account? <a href="{{route('login')}}">Login to dashboard</a>
        </div>

    </div>
</div>
@endsection