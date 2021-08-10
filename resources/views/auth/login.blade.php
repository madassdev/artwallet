@extends('layouts.auth')
@section('title')
<title>Artwallet | Login</title>
@endsection
@section('content')
<div class="card">
    <div class="card-inner card-inner-lg">
        <div class="nk-block-head">
            <div class="nk-block-head-content">
                <h4 class="nk-block-title">Sign-In</h4>
                <div class="nk-block-des">
                    <p>Access the ArtWallet dashboard using your email and password.</p>
                </div>
            </div>
        </div>
        <form action="{{route('login')}}" method="post">
            @csrf
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="default-01">Email</label>
                </div>
                <div class="form-control-wrap">
                    <input type="email" name="email" class="form-control form-control-lg @error('email') error @enderror" id="default-01" value="{{old('email')}}" placeholder="Enter your email address or username">
                </div>
                @error('email')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
            </div>
            <div class="form-group">
                <div class="form-label-group">
                    <label class="form-label" for="password">Password</label>
                    <!-- <a class="link link-primary link-sm" href="{route('password.reset',)}}">Forgot Password?</a> -->
                </div>
                <div class="form-control-wrap">
                    <a href="#" class="form-icon form-icon-right passcode-switch lg" data-target="password">
                        <em class="passcode-icon icon-show icon ni ni-eye"></em>
                        <em class="passcode-icon icon-hide icon ni ni-eye-off"></em>
                    </a>
                    <input type="password" name="password" class="form-control form-control-lg @error('password') error @enderror" id="password" placeholder="Enter your password">
                </div>
                @error('password')
                <p class="text-danger font-bold">
                    {{$message}}
                </p>
                @enderror
                <p class="form-note-s2 float-right mb-3">
                    <a href="{{route('password.request')}}">Forgot password?</a>
                </p>
            </div>
            <div class="form-group">
                <button typr="submit" class="btn btn-lg btn-primary btn-block">Sign in</button>
            </div>
        </form>
        <div class="form-note-s2 text-center pt-4"> New on our platform? <a href="{{route('register')}}">Create an account</a>
        </div>
    </div>
</div>
@endsection