<html>
@if($type == 'hosting')
<p>A new order for Managed Hosting by {{$name}}.</p>
@else
<p>A new order for WP Service Agreement by {{$name}}.</p>
@endif
<p><b>Name:</b>&nbsp;{{$name}}</p>
<p><b>Company:</b>&nbsp;{{$company}}</p>
<p><b>Email:</b>&nbsp;{{$email}}</p>
<p><b>Phone:</b>&nbsp;{{$phone}}</p>
<p><b>Message:</b>&nbsp;{{$description}}</p>
<p><b>Agreement:</b>&nbsp;Enterprise Managed Hosting, kr 3 600,- excl. VAT pr. month</p>
</html>