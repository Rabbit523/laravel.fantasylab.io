<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

use App\Http\Controllers\Controller;

use App\Mail\ContactMail;
use App;

class ApiController extends Controller
{
	public function getLang(Request $request) {
		$lang = session()->get('locale');
		if (isset($lang)) {
			return response()->json($lang);
		} else {
			session()->put('locale', 'en');
			return response()->json('en');
		}
	}

	public function setLang(Request $request) {
		App::setLocale($request->lang);
		session()->put('locale', $request->lang);
		return response()->json($request->lang);
	}

	public function sendMessage(Request $request) {
		Mail::to("support@fantasylab.io")->send(new ContactMail($request->all()));
		return "success";
	}
}
