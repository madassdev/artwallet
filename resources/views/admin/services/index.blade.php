@extends('layouts.admin')
@section('content')
<h2>Services</h2>
<table class="table table-tranx">
    <thead>
        <tr class="tb-tnx-head">
            <th class="tb-tnx-id"><span class="">#</span></th>
            <th class="tb-tnx-info">
                <span class="tb-tnx-desc d-none d-sm-inline-block">
                    <span>Title</span>
                </span>
                <span class="tb-tnx-date d-md-inline-block d-none">
                    <span class="d-md-none">Date</span>
                    <span class="d-none d-md-block">
                        <span>Description</span>
                    </span>
                </span>
            </th>
            <th class="tb-tnx-amount is-alt">
                <span class="tb-tnx-total">Providers</span>
                <span class="tb-tnx-status d-none d-md-inline-block">Status</span>
            </th>
            <th class="tb-tnx-action">
                <span>&nbsp;</span>
            </th>
        </tr>
    </thead>
    <tbody>
        @foreach ($services as $service)
        <tr class="tb-tnx-item">
            <td class="tb-tnx-id">
                <a href="#"><span>{{$service->id}}</span></a>
            </td>
            <td class="tb-tnx-info">
                <div class="tb-tnx-desc">
                    <span class="title">{{ucfirst($service->title)}}</span>
                </div>
                <div class="tb-tnx-date">
                    <span class="date">{{$service->description}}</span>
                </div>
            </td>
            <td class="tb-tnx-amount is-alt">

                <div class="tb-tnx-total">
                    <span class="service-providers amount text-primary cursor-pointer" data-providers="{{$service->providers}}">{{$service->providers->count()}} providers</span>
                </div>
                <div class="tb-tnx-status">
                    <span class="badge badge-dot badge-success">Active</span>
                </div>
            </td>
            <td class="tb-tnx-action">
                <div class="dropdown">
                    <a class="text-soft dropdown-toggle btn btn-icon btn-trigger" data-toggle="dropdown" aria-expanded="false"><em class="icon ni ni-more-h"></em></a>
                    <div class="dropdown-menu dropdown-menu-right dropdown-menu-xs">
                        <ul class="link-list-plain">
                            <li><a href="#">View</a></li>
                            <li><a href="#">Edit</a></li>
                            <li><a href="#">Remove</a></li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>
        @endforeach
    </tbody>
</table>
<script type="text/javascript">
    $('.service-providers').click(function(){
        var this_providers = $(this).data('providers');

        console.log(this_providers)
    })
</script>
@endsection