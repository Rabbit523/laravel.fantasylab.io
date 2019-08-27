<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;

use App\Mail\ContactMail;

class ApiController extends Controller
{
	public function sendMessage(Request $request) {
		$mail = Mail::to("dmitrii@fantasylab.io")->send(new ContactMail($request->all()));
		if ($mail) {
			return "success";
		} else {
			return "false";
		}
	}
}
