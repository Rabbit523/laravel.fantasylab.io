<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Review;

use Auth;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    public function index() {
        $page_data = Page::where('id', 1)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => false
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->header->meta_title, 'description' => $page->header->meta_description]);
    }

    public function login() {
        $page = "login";
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => false
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => "Login", 'description' => ""]);
    }

    public function Register() {
        $page = "register";
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => false
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Register', 'description' => ""]);
    }

    public function webDevelopment() {
        $page_data = Page::where('id', 2)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function mobileDevelopment() {
        $page_data = Page::where('id', 3)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function uiDesign() {
        $page_data = Page::where('id', 4)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function branding() {
        $page_data = Page::where('id', 5)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function illustration() {
        $page_data = Page::where('id', 6)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function marketingMaterial() {
        $page_data = Page::where('id', 7)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function managedHosting() {
        $page_data = Page::where('id', 14)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function features() {
        $page_data = Page::where('id', 9)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function about() {
        $page_data = Page::where('id', 10)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function portfolio() {
        $page_data = Page::where('id', 8)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
     public function singlePortfolio(Request $request) {
        $page_data = $data = Portfolio::where('type', $request->type)->orWhere('url', $request->type)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page_data->meta_title, 'description' => $page_data->meta_description]);
    }
    public function blog() {
        $page_data = Page::where('id', 11)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function contact() {
        $page_data = Page::where('id', 12)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function privacy() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function security() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function terms() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function confidentiality() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }

    public function no_index() {
        $page_data = Page::where('id', 1)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => false
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->header->no_meta_title, 'description' => $page->header->no_meta_description]);
    }

    public function no_login() {
        $page = "login";
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => false
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => "Logg Inn", 'description' => ""]);
    }

    public function no_Register() {
        $page = "register";
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => false
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Registrere', 'description' => ""]);
    }

    public function no_webDevelopment() {
        $page_data = Page::where('id', 2)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_mobileDevelopment() {
        $page_data = Page::where('id', 3)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_uiDesign() {
        $page_data = Page::where('id', 4)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_branding() {
        $page_data = Page::where('id', 5)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_illustration() {
        $page_data = Page::where('id', 6)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_marketingMaterial() {
        $page_data = Page::where('id', 7)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_managedHosting() {
        $page_data = Page::where('id', 14)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_features() {
        $page_data = Page::where('id', 9)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->meta_title, 'description' => $page->meta_description]);
    }
    public function no_about() {
        $page_data = Page::where('id', 10)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_portfolio() {
        $page_data = Page::where('id', 8)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_singlePortfolio(Request $request) {
        $page_data = $data = Portfolio::where('type', $request->type)->orWhere('url', $request->type)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page_data->no_meta_title, 'description' => $page_data->no_meta_description]);
    }
    public function no_blog() {
        $page_data = Page::where('id', 11)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_contact() {
        $page_data = Page::where('id', 12)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_privacy() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_security() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_terms() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    public function no_confidentiality() {
        $page_data = Page::where('id', 13)->first();
        $page = json_decode($page_data->data);
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => $page->no_meta_title, 'description' => $page->no_meta_description]);
    }
    
    public function adminPages() {
        $page = Page::get();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminPortfolios() {
        $page = Portfolio::get();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminReviews() {
        $page = Review::get();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminLegal() {
        $page = Page::get();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminSinglePortfolioPage(Request $request) {
        $page = Portfolio::get();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminHomePage() {
        $page = Page::where('id', 1)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminPortfolioPage() {
        $page = Page::where('id', 8)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminAboutPage() {
        $page = Page::where('id', 10)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminContactPage() {
        $page = Page::where('id', 12)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminServiceWebPage() {
        $page = Page::where('id', 2)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminServiceMobilePage() {
        $page = Page::where('id', 3)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminServiceUIPage() {
        $page = Page::where('id', 4)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminServiceBrandingPage() {
        $page = Page::where('id', 5)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminServiceIllustrationPage() {
        $page = Page::where('id', 6)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminServiceMarketingPage() {
        $page = Page::where('id', 7)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminFeaturesPage() {
        $page = Page::where('id', 9)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }

    public function adminHostingPage() {
        $page = Page::where('id', 14)->first();
        $status = [
            'isAuthenticated' => Auth::user()?true:false,
            'isAdmin'=> false,
            'isFooter' => true
        ];
        if (Auth::user() != null) {
            $status['isAdmin'] = Auth::user()->role == 0 ? true : false;
        }
        return view('home', compact('page', 'status'), ['title' => 'Admin', 'description' => '']);
    }
}