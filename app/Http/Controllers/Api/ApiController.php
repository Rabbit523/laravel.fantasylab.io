<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;

use App\Mail\ContactMail;

class ApiController extends Controller
{
	public function sendMessage(Request $request) {
		// Mail::to("support@fantasylab.io")->send(new ContactMail($request->all()));
		return "success";
	}
}
