<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Portfolio;
use App\Models\Review;
use File;
use function GuzzleHttp\json_decode;

class PagesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function getPage(Request $request) {
        $page = Page::where('page_name', $request->name)->first();
        if ($request->name == "home") {
            $portfolios = Portfolio::get();
            $reviews = Review::get();
            return response()->json(['page' => $page, 'portfolio' => $portfolios, 'review' => $reviews ]);
        } elseif ($request->name == "portfolio") {
            $portfolios = Portfolio::get();
            return response()->json(['page' => $page, 'portfolio' => $portfolios ]);
        }else {
            return response()->json($page);
        }
    }  

    public function getPages() {
        $pages = Page::get();
        return response()->json($pages);
    }

    public function updatePage(Request $request) {
        $page = Page::where('page_name', $request->name)->first();
        $data = json_decode($page->data);
        if ($request->name != "privacy") {
            $request_data = json_decode($request->data, true);   
        }
        $uploads_dir = "./assets/uploads/";
        // identify the case with page name
        if ($request->name == "home") {
            // if the on going updated conent is header section
            if ($request->type == "header") {
                // if header background image is updated or not
                if ($data->header->header_url != $request_data['header_url']) {
                    if (strpos($request_data['header_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['header_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'-header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['header_url'] = $path;
                } 
                if ($data->header->mobile_header != $request_data['mobile_header']) {
                    if (strpos($request_data['mobile_header'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['mobile_header']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['mobile_header']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_mobile_header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code);
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['mobile_header'] = $path;
                }                
                $data->header = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "footer") {
                if ($data->footer->url != $request_data['url']) {
                    if (strpos($request_data['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'-footer.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code);
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['url'] = $path;
                }
                $data->footer = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "service") {
                $service_type = $request->service_type;
                if (count($data->services) > 0) {
                    if (array_key_exists($service_type, $data->services)) {
                        if ($data->services[$service_type]->avatar != $request_data[$service_type]['avatar']) {
                            if (strpos($request_data[$service_type]['avatar'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['avatar']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['avatar']);
                            }
                            $base_code = base64_decode($img);
                            $name = $request->name.'-'.$request->type.'-'.$request_data[$service_type]['url'].'-avatar.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                            $request_data[$service_type]['avatar'] = $path;
                        }
                        if ($data->services[$service_type]->backimage != $request_data[$service_type]['backimage']) {
                            if (strpos($request_data[$service_type]['backimage'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['backimage']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['backimage']);
                            }
                            $base_code = base64_decode($img);
                            $name = $request->name.'-'.$request->type.'-'.$request_data[$service_type]['url'].'-back.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                            $request_data[$service_type]['backimage'] = $path;
                        }
                        $data->services[$service_type] = $request_data[$service_type];
                    } else {
                        if (strpos($request_data[$service_type]['avatar'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['avatar']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['avatar']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request->name.'-'.$request->type.'-'.$request_data[$service_type]['url'].'-avatar.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data[$service_type]['avatar'] = $path;
                        if (strpos($request_data[$service_type]['backimage'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['backimage']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['backimage']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request->name.'-'.$request->type.'-'.$request_data[$service_type]['url'].'-back.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data[$service_type]['backimage'] = $path;
                        array_push($data->services, $request_data[$service_type]);
                    }
                }
                if (count($data->services) == 0) {
                    if (strpos($request_data[$service_type]['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name.'-'.$request->type.'-'.$request_data[$service_type]['url'].'-avatar.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$service_type]['avatar'] = $path;
                    if (strpos($request_data[$service_type]['backimage'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['backimage']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['backimage']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name.'-'.$request->type.'-'.$request_data[$service_type]['url'].'-back.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$service_type]['backimage'] = $path;
                    array_push($data->services, $request_data[$service_type]);
                }
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "badge") {
                $service_type = $request->service_type;
                if ($data->badges->$service_type->url != $request_data[$service_type]['url']) {
                    if (strpos($request_data[$service_type]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->service_type .'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$service_type]['url'] = $path;
                }
                $data->badges = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "carousel") {
                $service_type = $request->service_type;
                if ($data->carousels[$service_type]->avatar != $request_data[$service_type]['avatar']) {
                    if (strpos($request_data[$service_type]['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request_data[$service_type]['name'] .'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$service_type]['avatar'] = $path;
                }
                $data->carousels = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "news") {
                $service_type = $request->service_type;
                if ($data->news[$service_type]->url != $request_data[$service_type]['url']) {
                    if (strpos($request_data[$service_type]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request_data[$service_type]['author'] .'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$service_type]['url'] = $path;
                }
                $request_data[$service_type]['time'] = date("d.m").".".substr(date("Y"), 2, 3);
                $data->news = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'service_delete') {
                foreach ($data->services as $key => $item) {
                    if ($key == $request->key) {
                        array_splice($data->services, $key, 1);
                    }
                }
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            } else if ($request->type == 'service_title') {
                $data->translate_titles->service = $request_data['service'];
                $data->translate_titles->no_service = $request_data['no_service'];
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            } else if ($request->type == 'portfolio_title') {
                $data->translate_titles->portfolio = $request_data['portfolio'];
                $data->translate_titles->no_portfolio = $request_data['no_portfolio'];
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            } else if ($request->type == 'news_title') {
                $data->translate_titles->news = $request_data['news'];
                $data->translate_titles->no_news = $request_data['no_news'];
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            } else if ($request->type == 'estimation_title') {
                $data->translate_titles->estimation = $request_data['estimation'];
                $data->translate_titles->no_estimation = $request_data['no_estimation'];
                $data->translate_titles->estimation_des = $request_data['estimation_des'];
                $data->translate_titles->no_estimation_des = $request_data['no_estimation_des'];
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            } else if ($request->type == 'review_title') {
                $data->translate_titles->excellence = $request_data['excellence'];
                $data->translate_titles->no_excellence = $request_data['no_excellence'];
                $data->translate_titles->excellence_des = $request_data['excellence_des'];
                $data->translate_titles->no_excellence_des = $request_data['no_excellence_des'];
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            }
        } else if ($request->name == "portfolio") {
            $service_type = $request->type;
            if ($service_type == "header") {
                if ($data->header_url != $request_data['header_url']) {
                    if (strpos($request_data['header_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['header_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['header_url'] = $path;
                }
                foreach($data->icon_urls as $key=> $item) {
                    if ($item->path != $request_data['icon_urls'][$key]['path']) {
                        if (strpos($request_data['icon_urls'][$key]['path'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data['icon_urls'][$key]['path']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['icon_urls'][$key]['path']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request->name .'_'.$key.'.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data['icon_urls'][$key]['path'] = $path;
                    }
                }
                $data = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "footer") {
                if ($data->footer_url != $request_data['footer_url']) {
                    if (strpos($request_data['footer_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['footer_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['footer_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_footer.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['footer_url'] = $path;
                }
                $data->footer_button = $request_data['footer_button'];
                $data->footer_description = $request_data['footer_description'];
                $data->footer_link = $request_data['footer_link'];
                $data->footer_link_name = $request_data['footer_link_name'];
                $data->footer_title = $request_data['footer_title'];
                $data->footer_url = $request_data['footer_url'];
                $page->data = json_encode($data);
                $page->save();
            }
        } else if ($request->name == "about") {
            $service_type = $request->type;
            if ($service_type == "header") {
                if ($data->header_url != $request_data['header_url']) {
                    if (strpos($request_data['header_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['header_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['header_url'] = $path;
                }
                $data = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "guides") {
                if($data->guides[$request->id]->avatar != $request_data['avatar']) {
                    if (strpos($request_data['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'about_guide'.$request->id.'_avatar.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['avatar'] = $path;
                }
                $data->guides[$request->id] = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "values") {
                $data->values->title = $request_data['title'];
                $data->values->no_title = $request_data['no_title'];
                $data->values->data[$request->id] = $request_data['data'][$request->id];
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "services_data") {
                if (array_key_exists($request->id, $data->services->data)) {
                    if($data->services->data[$request->id]->avatar != $request_data[$request->id]['avatar']) {
                        if (strpos($request_data[$request->id]['avatar'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data[$request->id]['avatar']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data[$request->id]['avatar']);
                        }
                        $base_code = base64_decode($img);
                        $name = 'about_'.$request_data[$request->id]['url'].'_avatar.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data[$request->id]['avatar'] = $path;
                    }
                    if($data->services->data[$request->id]->backimage != $request_data[$request->id]['backimage']) {
                        if (strpos($request_data[$request->id]['backimage'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data[$request->id]['backimage']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data[$request->id]['backimage']);
                        }
                        $base_code = base64_decode($img);
                        $name = 'about_'.$request_data[$request->id]['url'].'_back.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data[$request->id]['backimage'] = $path;
                    }
                    $data->services->data[$request->id] = $request_data[$request->id];
                } else {
                    if ($request_data[$request->id]['avatar'] != null) {
                        if (strpos($request_data[$request->id]['avatar'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data[$request->id]['avatar']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data[$request->id]['avatar']);
                        }
                        $base_code = base64_decode($img);
                        $name = 'about_'.$request_data[$request->id]['url'].'_avatar.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data[$request->id]['avatar'] = $path;
                    }
                    if ($request_data[$request->id]['backimage'] != null) {
                        if (strpos($request_data[$request->id]['backimage'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data[$request->id]['backimage']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data[$request->id]['backimage']);
                        }
                        $base_code = base64_decode($img);
                        $name = 'about_'.$request_data[$request->id]['url'].'_back.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data[$request->id]['backimage'] = $path;
                    }
                    array_push($data->services->data, $request_data[$request->id]);
                }
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "services_title") {
                $data->services->title = $request->title;
                $data->services->no_title = $request->no_title;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "services_delete") {
                unset($data->services->data[$request->id]);
                $data->services->data = array_values($data->services->data);
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "headquarter-item") {
                if($data->headquarters->data[$request->id]->avatar != $request_data['data'][$request->id]['avatar']) {
                    if (strpos($request_data['data'][$request->id]['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['data'][$request->id]['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['data'][$request->id]['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'about_headquater_item'.$request->id.'_avatar.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['data'][$request->id]['avatar'] = $path;
                }
                $data->headquarters->data[$request->id] = $request_data['data'][$request->id];
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "headquarters") {
                if($data->headquarters->backimage != $request_data['backimage']) {
                    if (strpos($request_data['backimage'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['backimage']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['backimage']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'about_headquarter_back.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['backimage'] = $path;
                }
                $data->headquarters->title = $request_data['title'];
                $data->headquarters->description = $request_data['description'];
                $data->headquarters->no_title = $request_data['no_title'];
                $data->headquarters->no_description = $request_data['no_description'];
                $data->headquarters->backimage = $request_data['backimage'];
                $page->data = json_encode($data);
                $page->save();
            }
        } else if ($request->name == "contact") {
            $service_type = $request->type;
            if ($service_type == "header") {
                if ($data->header_url != $request_data['header_url']) {
                    if (strpos($request_data['header_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['header_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['header_url'] = $path;
                }
                $data = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "headquarters") {
                if($data->headquarters[$request->id]->avatar != $request_data['avatar']) {
                    if (strpos($request_data['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'contact_headquarter'.$request->id.'_avatar.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['avatar'] = $path;
                }
                $data->headquarters[$request->id] = $request_data;
                $page->data = json_encode($data);
                $page->save();
            }
        } else if (strpos($request->name, "service")!== false) {
            $service_type = $request->type;
            if ($service_type == "header") {
                if ($data->header_url != $request_data['header_url']) {
                    if (strpos($request_data['header_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['header_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['header_url'] = $path;
                }
                if ($data->footer_url != $request_data['footer_url']) {
                    if (strpos($request_data['footer_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['footer_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['footer_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_footer.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['footer_url'] = $path;
                } 
                foreach($data->icons as $key=> $item) {
                    if ($item->icon != $request_data['icons'][$key]['icon']) {
                        if (strpos($request_data['icons'][$key]['icon'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data['icons'][$key]['icon']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['icons'][$key]['icon']);
                        }
                        $base_code = base64_decode($img);
                        $name = 'service_icon'.$key.'.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $request_data['icons'][$key]['icon'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    }
                }
                $data = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "footer") {
                if ($data->footer_url != $request_data['footer_url']) {
                    if (strpos($request_data['footer_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['footer_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['footer_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_footer.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['footer_url'] = $path;
                }
                $data->footer_button = $request_data['footer_button'];
                $data->no_footer_button = $request_data['no_footer_button'];
                $data->footer_description = $request_data['footer_description'];
                $data->no_footer_description = $request_data['no_footer_description'];
                $data->footer_link = $request_data['footer_link'];
                $data->no_footer_link = $request_data['no_footer_link'];
                $data->footer_link_name = $request_data['footer_link_name'];
                $data->no_footer_link_name = $request_data['no_footer_link_name'];
                $data->footer_title = $request_data['footer_title'];
                $data->no_footer_title = $request_data['no_footer_title'];
                $data->footer_url = $request_data['footer_url'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "study") {
                if ($data->study->avatar != $request_data['avatar']) {
                    if (strpos($request_data['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'-avatar.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['avatar'] = $path;
                }
                if ($data->study->backimage != $request_data['backimage']) {
                    if (strpos($request_data['backimage'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['backimage']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['backimage']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'-back.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['backimage'] = $path;
                }
                $data->study = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == 'tech') {
                $id = $request->id;
                if ($data->technologies[$id]->icon != $request_data[$id]['icon']) {
                    if (strpos($request_data[$id]['icon'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$id]['icon']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$id]['icon']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request_data[$id]['lang'] .'_icon.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$id]['icon'] = $path;
                }
                $data->technologies = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == 'estimation') {
                $id = $request->id;
                if ($data->estimation[$id]->url != $request_data[$id]['url']) {
                    if (strpos($request_data[$id]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$id]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$id]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request_data[$id]['number'] .'_service_estimation_icon.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$id]['url'] = $path;
                }
                $data->estimation = $request_data;
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "start_update") {
                $id = $request->id;
                if (array_key_exists($id, $data->starting->data)) {
                    if ($data->starting->data[$id]->url != $request_data['starting'][$id]['url']) {
                        if (strpos($request_data['starting'][$id]['url'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data['starting'][$id]['url']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['starting'][$id]['url']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request_data['url'].'_start'.$request_data['starting']['title'].'_icon.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data['starting'][$id]['url'] = $path;
                    }
                    if ($data->starting->data[$id]->backimage != $request_data['starting'][$id]['backimage']) {
                        if (strpos($request_data['starting'][$id]['backimage'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data['starting'][$id]['backimage']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['starting'][$id]['backimage']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request_data['url'].'_start'.$request_data['starting'][$id]['title'].'_back.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data['starting'][$id]['backimage'] = $path;
                    }
                    $data->starting->data[$id] = $request_data['starting'][$id];
                } else {
                    if ($request_data['starting'][$id]['url'] != null) {
                        if (strpos($request_data['starting'][$id]['url'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data['starting'][$id]['url']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['starting'][$id]['url']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request_data['url'].'_start'.$request_data['starting'][$id]['title'].'_icon.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data['starting'][$id]['url'] = $path;
                    }
                    if ($request_data['starting'][$id]['backimage'] != null) {
                        if (strpos($request_data['starting'][$id]['backimage'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $request_data['starting'][$id]['backimage']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['starting'][$id]['backimage']);
                        }
                        $base_code = base64_decode($img);
                        $name = $request_data['url'].'_start'.$request_data['starting'][$id]['title'].'_back.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data['starting'][$id]['backimage'] = $path;
                    }
                    $array_data = json_decode(json_encode($data));
                    array_push($array_data, $request_data['starting'][$id]);
                    $data = $array_data;
                }
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data);
            } else if ($service_type == "start_delete") {
                $id = $request->id;
                unset($data->starting->data[$id]);
                $data->starting->data = array_values($data->starting->data);
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data->starting->data);
            } else if ($service_type == "start_delete_image") {
                $id = $request->id;
                $key = $request->key;
                $data->starting->data[$id]->$key = null;
                $page->data = json_encode($data);
                $page->save();
                return response()->json($data->starting->data);
            } else if ($service_type == 'start_title') {
                $data->starting->start_title = $request_data['starting']['start_title'];
                $data->starting->no_start_title = $request_data['starting']['no_start_title'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == 'tech_title') {
                $data->translate_titles->tech = $request_data['tech'];
                $data->translate_titles->no_tech = $request_data['no_tech'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == 'estimation_title') {
                $data->translate_titles->estimation = $request_data['estimation'];
                $data->translate_titles->no_estimation= $request_data['no_estimation'];
                $data->translate_titles->estimation_des = $request_data['estimation_des'];
                $data->translate_titles->no_estimation_des= $request_data['no_estimation_des'];
                $page->data = json_encode($data);
                $page->save();
            }
        } else if ($request->name == "privacy") {
            $service_type = $request->type;
            if ($service_type == "header") {
                $data->meta_title = $request->data['meta_title'];
                $data->meta_description = $request->data['meta_description'];
                $data->no_meta_title = $request->data['no_meta_title'];
                $data->no_meta_description = $request->data['no_meta_description'];
            } else if ($service_type == "privacy") {
                $data->privacy = $request->data['en'];
                $data->no_privacy = $request->data['no'];
            } else if ($service_type == "security") {
                $data->security = $request->data['en'];
                $data->no_security = $request->data['no'];
            } else if ($service_type == "terms") {
                $data->terms = $request->data['en'];
                $data->no_terms = $request->data['no'];
            } else if ($service_type == "confident") {
                $data->confident = $request->data['en'];
                $data->no_confident = $request->data['no'];
            }
            $page->data = json_encode($data);
            $page->save();
        } else if ($request->name == 'hosting') {
            if ($request->type == 'header') {
                //  if header background image is updated or not
                if ($data->back_url != $request_data['back_url']) {
                    if (strpos($request_data['back_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['back_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['back_url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'-header.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['back_url'] = $path;
                }
                foreach ($data->icons as $key => $item) {
                    if ($item->icon != $request_data['icons'][$key]['icon']) {
                        $changed_icon = $request_data['icons'][$key]['icon'];
                        if (strpos($changed_icon, 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '', $changed_icon);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $changed_icon);
                        }
                        $base_code = base64_decode($img);
                        $name = 'hosting-header-icon'.$key.'.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        $request_data['icons'][$key]['icon'] = $path;
                    }
                }
                $data->back_url = $request_data['back_url'];
                $data->title = $request_data['title'];
                $data->description = $request_data['description'];
                $data->no_title = $request_data['no_title'];
                $data->no_description = $request_data['no_description'];
                $data->meta_title = $request_data['meta_title'];
                $data->meta_description = $request_data['meta_description'];
                $data->no_meta_title = $request_data['no_meta_title'];
                $data->no_meta_description = $request_data['no_meta_description'];
                $data->icons = $request_data['icons'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'plan_header') {
                $data->plans->title = $request_data['plans']['title'];
                $data->plans->no_title = $request_data['plans']['no_title'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'plan_item') {
                $index = $request->index;
                $plan_item = $request_data['plans']['data'][$index];
                if ($data->plans->data[$index]->url != $plan_item['url']) {
                    if (strpos($plan_item['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $plan_item['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $plan_item['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-plan-avatar'.$index.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $plan_item['url'] = $path;
                }
                $data->plans->data[$index] = $plan_item;
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'deploy') {
                $index = $request->index;
                if ($index == 0) {
                    $data->distributions->title = $request_data['distributions']['title'];
                    $data->distributions->no_title = $request_data['distributions']['no_title'];
                    $data->distributions->description = $request_data['distributions']['description'];
                    $data->distributions->no_description = $request_data['distributions']['no_description'];
                    foreach ($data->distributions->items as $key => $item) {
                        $request_destribution_item = $request_data['distributions']['items'][$key];
                        if ($item->avatar != $request_destribution_item['avatar']) {
                            if (strpos($request_destribution_item['avatar'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '', $request_destribution_item['avatar']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_destribution_item['avatar']);
                            }
                            $base_code = base64_decode($img);
                            $name = 'hosting-distribution-avatar'.$key.'.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                            $request_data['distributions']['items'][$key]['avatar'] = $path;
                        }
                    }
                    $data->distributions->items = $request_data['distributions']['items'];
                    $page->data = json_encode($data);
                    $page->save();
                } else if ($index == 1) {
                    $data->click_app->title = $request_data['click_app']['title'];
                    $data->click_app->no_title = $request_data['click_app']['no_title'];
                    $data->click_app->description = $request_data['click_app']['description'];
                    $data->click_app->no_description = $request_data['click_app']['no_description'];
                    foreach ($data->click_app->items as $key => $item) {
                        $request_click_app_item = $request_data['click_app']['items'][$key];
                        if ($item->avatar != $request_click_app_item['avatar']) {
                            if (strpos($request_click_app_item['avatar'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '', $request_click_app_item['avatar']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_click_app_item['avatar']);
                            }
                            $base_code = base64_decode($img);
                            $name = 'hosting-click-app-avatar'.$key.'.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                            $request_data['click_app']['items'][$key]['avatar'] = $path;
                        }
                    }
                    $data->click_app->items = $request_data['click_app']['items'];
                    $page->data = json_encode($data);
                    $page->save();
                } else if ($index == 2) {
                    $data->custom_image->title = $request_data['custom_image']['title'];
                    $data->custom_image->no_title = $request_data['custom_image']['no_title'];
                    $data->custom_image->description = $request_data['custom_image']['description'];
                    $data->custom_image->no_description = $request_data['custom_image']['no_description'];
                    foreach ($data->custom_image->items as $key => $item) {
                        $request_custom_image_item = $request_data['custom_image']['items'][$key];
                        if ($item->avatar != $request_custom_image_item['avatar']) {
                            if (strpos($request_custom_image_item['avatar'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '', $request_custom_image_item['avatar']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_custom_image_item['avatar']);
                            }
                            $base_code = base64_decode($img);
                            $name = 'hosting-custom-image-avatar'.$key.'.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                            $request_data['custom_image']['items'][$key]['avatar'] = $path;
                        }
                    }
                    $data->custom_image->items = $request_data['custom_image']['items'];
                    $page->data = json_encode($data);
                    $page->save();
                }
            } else if ($request->type == 'manage_header') {
                $data->manage->title = $request_data['manage']['title'];
                $data->manage->no_title = $request_data['manage']['no_title'];
                $data->manage->description = $request_data['manage']['description'];
                $data->manage->no_description = $request_data['manage']['no_description'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'manage_item') {
                $index = $request->index;
                if ($data->manage->items[$index]->avatar != $request_data['manage']['items'][$index]['avatar']) {
                    if (strpos($request_data['manage']['items'][$index]['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['manage']['items'][$index]['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['manage']['items'][$index]['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-manage-avatar'.$index.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['manage']['items'][$index]['avatar'] = $path;
                }
                if ($data->manage->items[$index]->img != $request_data['manage']['items'][$index]['img']) {
                    if (strpos($request_data['manage']['items'][$index]['img'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['manage']['items'][$index]['img']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['manage']['items'][$index]['img']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-manage-img'.$index.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['manage']['items'][$index]['img'] = $path;
                }
                $data->manage->items = $request_data['manage']['items'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'scale_header') {
                $data->scale->title = $request_data['scale']['title'];
                $data->scale->no_title = $request_data['scale']['no_title'];
                $data->scale->description = $request_data['scale']['description'];
                $data->scale->no_description = $request_data['scale']['no_description'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'scale_item') {
                $index = $request->index;
                if ($data->scale->items[$index]->avatar != $request_data['scale']['items'][$index]['avatar']) {
                    if (strpos($request_data['scale']['items'][$index]['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['scale']['items'][$index]['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['scale']['items'][$index]['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-scale-avatar'.$index.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['scale']['items'][$index]['avatar'] = $path;
                }
                if ($data->scale->items[$index]->img != $request_data['scale']['items'][$index]['img']) {
                    if (strpos($request_data['scale']['items'][$index]['img'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['scale']['items'][$index]['img']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['scale']['items'][$index]['img']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-scale-img'.$index.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['scale']['items'][$index]['img'] = $path;
                }
                $data->scale->items = $request_data['scale']['items'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'feature_header') {
                $data->features->title = $request_data['features']['title'];
                $data->features->no_title = $request_data['features']['no_title'];
                $data->features->description = $request_data['features']['description'];
                $data->features->no_description = $request_data['features']['no_description'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'feature_item') {
                $index = $request->index;
                $data->features->items = $request_data['features']['items'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'server_header') {
                $data->servers->title = $request_data['servers']['title'];
                $data->servers->no_title = $request_data['servers']['no_title'];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == 'server_item') {
                $index = $request->index;
                if ($data->servers->data[$index]->url != $request_data['servers']['data'][$index]['url']) {
                    if (strpos($request_data['servers']['data'][$index]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['servers']['data'][$index]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['servers']['data'][$index]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-server-avatar'.$index.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['servers']['data'][$index]['url'] = $path;
                }
                $data->servers->data[$index] = $request_data['servers']['data'][$index];
                $page->data = json_encode($data);
                $page->save();
            } else if ($request->type == "news") {
                $service_type = $request->service_type;
                if ($data->news[$service_type]->url != $request_data[$service_type]['url']) {
                    if (strpos($request_data[$service_type]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'hosting-'.$request_data[$service_type]['author'] .'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data[$service_type]['url'] = $path;
                }
                $request_data[$service_type]['time'] = date("d.m").".".substr(date("Y"), 2, 3);
                $data->news = $request_data;
                $page->data = json_encode($data);
                $page->save();
            }
        }
        return response()->json('update success');
    }    

    public function getPortfolioPage(Request $request) {
        $data = Portfolio::where('type', $request->type)->orWhere('url', $request->type)->first();
        return response()->json($data);
    }

    public function getAdminPortfolioPage(Request $request) {
        $data = Portfolio::where('type', $request->type)->first(); 
        $reviews = Review::all();       
        return response()->json(['portfolio' => $data, 'review' => $reviews]);
    }

    public function getPortfolios() {
        $portfolios = Portfolio::get();
        return response()->json($portfolios);
    }
    
    public function createPortfolio(Request $request) {
        $request_data = $request->data;
        $data = [
            "title" => $request_data['title'],
            "description" => $request_data['description'],
            "type" => $request_data['type'],
            "url" => $request_data['url'],
            "avatar" => $request_data['avatar'],
            "back_url" => $request_data['back_url'],
            "data" => '{"footer_title":"","footer_description":"","footer_button":"","footer_link":"","footer_link_name":"","footer_url":"","header_back_url":"","header_description":"example","title":"example","header_sub_images":[null,null],"main_description":[{"title":"example","text":"example","sub":["example","example","example"]},{"title":"example","text":"example","sub":["example","example","example"]},{"title":"example","text":"example","sub":["example","example","example"]}],"reviews":[],"services":[{"backimage":"","color":"","description":"","title":"example","type":"web","url":""}],"sub_images":[{"url":"","text":""},{"url":"","text":""}]}'
        ];
        $uploads_dir = "./assets/uploads/";
        if ($request_data['avatar'] != null) {
            if (strpos($request_data['avatar'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request_data['avatar']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request_data['avatar']);
            }
            $base_code = base64_decode($img);
            $name = $request->data['type'] .'_avatar.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $data['avatar'] = $path;
        }
        if ($request_data['back_url'] != null) {
            if (strpos($request_data['back_url'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request_data['back_url']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request_data['back_url']);
            }
            $base_code = base64_decode($img);
            $name = $request->data['type'] .'_back_url.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $data['back_url'] = $path;
        }
        Portfolio::Create($data);
        $data = Portfolio::get();
        return response()->json($data);
    }

    public function updatePortfolio(Request $request) {
        $data = Portfolio::where('id', $request->id)->first();
        $origin_type = $data->type;
        $request_data = $request->data;
        
        $uploads_dir = "./assets/uploads/";
        if ($request_data['avatar'] != $data->avatar) {
            if (strpos($request_data['avatar'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request_data['avatar']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request_data['avatar']);
            }
            $base_code = base64_decode($img);
            $name = $request_data['type'] .'_logo.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $request_data['avatar'] = $path;
        }
        if ($request_data['back_url'] != $data->back_url) {
            if (strpos($request_data['back_url'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request_data['back_url']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request_data['back_url']);
            }
            $base_code = base64_decode($img);
            $name = $request_data['type'] .'_back.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $request_data['back_url'] = $path;
        }

        // update home page portfolio info
        $home = Page::where('page_name', 'home')->first();
        $home_data = json_decode($home->data);
        foreach ($home_data->portfolios as $key => $item) {
            if ($key == $origin_type) {
                unset($home_data->portfolios->$key);
                $new_portfolio = [
                    'from' => 'home',
                    'url' => $request_data['url'],
                    'title' => $request_data['title'],
                    'no_title' => $request_data['no_title'],
                    'description' => $request_data['description'],
                    'no_description' => $request_data['no_description'],
                    'icon_url' => $request_data['avatar'],
                    'back_url' => $request_data['back_url']
                ];
                $array = json_decode(json_encode($home_data->portfolios), true);
                $home_data->portfolios = array($request_data['type'] => $new_portfolio) + $array;
            }
        }
        $home->data = json_encode($home_data);
        $home->save();

        // update portfolio page portfolio info
        $portfolios = Page::where('page_name', 'portfolio')->first();
        $portfolio_data = json_decode($portfolios->data);
        foreach ($portfolio_data->portfolios as $key => $item) {
            if ($key == $origin_type) {
                unset($portfolio_data->portfolios->$key);
                $new_portfolio = [
                    'from' => 'portfolio',
                    'url' => $request_data['url'],
                    'title' => $request_data['title'],
                    'no_title' => $request_data['no_title'],
                    'description' => $request_data['description'],
                    'no_description' => $request_data['no_description'],
                    'back_url' => $request_data['back_url'],
                    'icon_url' => $request_data['avatar']
                ];
                $array = json_decode(json_encode($portfolio_data->portfolios), true);
                $portfolio_data->portfolios = array($request_data['type'] => $new_portfolio) + $array;
            }
        }
        $portfolios->data = json_encode($portfolio_data);
		$portfolios->save();
		
		$data->title = $request_data['title'];
        $data->no_title = $request_data['no_title'];
        $data->description = $request_data['description'];
        $data->no_description = $request_data['no_description'];
        $data->type = $request_data['type'];
        $data->url = $request_data['url'];
        $data->avatar = $request_data['avatar'];
        $data->back_url = $request_data['back_url'];
        $data->save();

        return response()->json($data);
    }

    public function deletePortfolio(Request $request) {
        $data = Portfolio::where('id', $request->id)->first();

        // update home page portfolio info
        $home = Page::where('page_name', 'home')->first();
        $home_data = json_decode($home->data);
        foreach ($home_data->portfolios as $key => $item) {
            if ($key == $data->type) {
                unset($home_data->portfolios->$key);
            }
        }
        $home->data = json_encode($home_data);
        $home->save();

        // update portfolio page portfolio info
        $portfolios = Page::where('page_name', 'portfolio')->first();
        $portfolio_data = json_decode($portfolios->data);
        foreach ($portfolio_data->portfolios as $key => $item) {
            if ($key == $data->type) {
                unset($portfolio_data->portfolios->$key);
            }
        }
        $portfolios->data = json_encode($portfolio_data);
        $portfolios->save();

        // delete from the portfolio table
        Portfolio::where('id', $request->id)->delete();
        $data = Portfolio::get();
        return response()->json($data);
    }

    public function updatePortfolioPage(Request $request) {
        $data = Portfolio::where('id', $request->id)->first();
        $list = json_decode($data->data);
        $request_data = $request->data;
        $uploads_dir = "./assets/uploads/";
        if ($request->type == "header") {
            $data->meta_title = $request->meta_title;
			$data->meta_description = $request->meta_description;
			$data->no_meta_title = $request->no_meta_title;
            $data->no_meta_description = $request->no_meta_description;
            if ($list->header_back_url != $request_data['header_back_url']) {
                if (strpos($request_data['header_back_url'], 'data:image/jpeg;base64') !== false) {
                    $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_back_url']);
                } else {
                    $img = str_replace('data:image/png;base64,', '', $request_data['header_back_url']);
                }
                $base_code = base64_decode($img);
                $name = $data->type .'_header_back.png';
                $file = $uploads_dir . $name;
                if(File::exists($file)) {
                    File::delete($file);
                }
                file_put_contents($file, $base_code); // create image file into $upload_dir
                $url = url("/assets/uploads") ."/" . $name;
                $arr = explode("/", $url);
                $request_data['header_back_url'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            }
            foreach($list->header_sub_images as $key=> $item) {
                if ($item != $request_data['header_sub_images'][$key]) {
                    if (strpos($request_data['header_sub_images'][$key], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_sub_images'][$key]);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['header_sub_images'][$key]);
                    }
                    $base_code = base64_decode($img);
                    $name = $data->type .'_header_sub' .$key .'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $request_data['header_sub_images'][$key] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                }
            }
            foreach($list->sub_images as $key=> $item) {
                if ($item->url != $request_data['sub_images'][$key]['url']) {
                    if (strpos($request_data['sub_images'][$key]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '',$request_data['sub_images'][$key]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['sub_images'][$key]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $data->type .'_sub' .$key .'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $request_data['sub_images'][$key]['url'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                }
            }
            if (count($request_data['sub_images']) > count($list->sub_images)) {
                foreach($request_data['sub_images'] as $key=> $item) {
                    if (!array_key_exists($key, $list->sub_images)) {
                        if (strpos($request_data['sub_images'][$key]['url'], 'data:image/jpeg;base64') !== false) {
                            $img = str_replace('data:image/jpeg;base64,', '',$request_data['sub_images'][$key]['url']);
                        } else {
                            $img = str_replace('data:image/png;base64,', '', $request_data['sub_images'][$key]['url']);
                        }
                        $base_code = base64_decode($img);
                        $name = $data->type.$key.'.png';
                        $file = $uploads_dir . $name;
                        if(File::exists($file)) {
                            File::delete($file);
                        }
                        file_put_contents($file, $base_code); // create image file into $upload_dir
                        $url = url("/assets/uploads") ."/" . $name;
                        $arr = explode("/", $url);
                        $request_data['sub_images'][$key]['url'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    }
                }
            }
            $data->data = json_encode($request_data);
            $data->save();
        } else if ($request->type == "footer") {
            if ($list->footer_url != $request_data['footer_url']) {
                if (strpos($request_data['footer_url'], 'data:image/jpeg;base64') !== false) {
                    $img = str_replace('data:image/jpeg;base64,', '', $request_data['footer_url']);
                } else {
                    $img = str_replace('data:image/png;base64,', '', $request_data['footer_url']);
                }
                $base_code = base64_decode($img);
                $name = $data->type .'page_footer_back.png';
                $file = $uploads_dir . $name;
                if(File::exists($file)) {
                    File::delete($file);
                }
                file_put_contents($file, $base_code); // create image file into $upload_dir
                $url = url("/assets/uploads") ."/" . $name;
                $arr = explode("/", $url);
                $request_data['footer_url'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            }
            $data->data = json_encode($request_data);
            $data->save();
        } else if ($request->type == "description") {
            $data->data = json_encode($request_data);
            $data->save();
        } else if ($request->type == "service") {
            foreach($list->services as $key => $item) {
                if ($item->avatar != $request_data['services'][$key]['avatar']) {
                    if (strpos($request_data['services'][$key]['avatar'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['services'][$key]['avatar']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['services'][$key]['avatar']);
                    }
                    $base_code = base64_decode($img);
                    $name = $data->type.'_portfolio_service_icon'.$key.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $request_data['services'][$key]['avatar'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                }
                if ($item->backimage != $request_data['services'][$key]['backimage']) {
                    if (strpos($request_data['services'][$key]['backimage'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['services'][$key]['backimage']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['services'][$key]['backimage']);
                    }
                    $base_code = base64_decode($img);
                    $name = $data->type.'_portfolio_service_back'.$key.'.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $request_data['services'][$key]['backimage'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                }
            }
            if (count($request_data['services']) > count($list->services)) {
                foreach($request_data['services'] as $key=> $item) {
                    if (!array_key_exists($key, $list->services)) {
                        if ($request_data['services'][$key]['avatar'] != null) {
                            if (strpos($request_data['services'][$key]['avatar'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '',$request_data['services'][$key]['avatar']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_data['services'][$key]['avatar']);
                            }
                            $base_code = base64_decode($img);
                            $name = $data->type.'_portfolio_service_icon'.$key.'.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $request_data['services'][$key]['avatar'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        }
                        if ($request_data['services'][$key]['backimage'] != null) {
                            if (strpos($request_data['services'][$key]['backimage'], 'data:image/jpeg;base64') !== false) {
                                $img = str_replace('data:image/jpeg;base64,', '',$request_data['services'][$key]['backimage']);
                            } else {
                                $img = str_replace('data:image/png;base64,', '', $request_data['services'][$key]['backimage']);
                            }
                            $base_code = base64_decode($img);
                            $name = $data->type.'_portfolio_service_back'.$key.'.png';
                            $file = $uploads_dir . $name;
                            if(File::exists($file)) {
                                File::delete($file);
                            }
                            file_put_contents($file, $base_code); // create image file into $upload_dir
                            $url = url("/assets/uploads") ."/" . $name;
                            $arr = explode("/", $url);
                            $request_data['services'][$key]['backimage'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                        }
                    }
                }
            }
            $data->data = json_encode($request_data);
            $data->save();
        } else if ($request->type == "service_delete") {
            $key = $request->key;
            unset($list->services[$key]);
            $list->services = array_values($list->services);
            $data->data = json_encode($list);
            $data->save();
            return response()->json($list->services);
        } else if ($request->type == "review") {
            if ($list->review->avatar != $request_data['review']['avatar']) {
                if (strpos($request_data['review']['avatar'], 'data:image/jpeg;base64') !== false) {
                    $img = str_replace('data:image/jpeg;base64,', '', $request_data['review']['avatar']);
                } else {
                    $img = str_replace('data:image/png;base64,', '', $request_data['review']['avatar']);
                }
                $base_code = base64_decode($img);
                $name = $data->type .'_avatar.png';
                $file = $uploads_dir . $name;
                if(File::exists($file)) {
                    File::delete($file);
                }
                file_put_contents($file, $base_code); // create image file into $upload_dir
                $url = url("/assets/uploads") ."/" . $name;
                $arr = explode("/", $url);
                $request_data['review']['avatar'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            }
            if ($list->review->back_url != $request_data['review']['back_url']) {
                if (strpos($request_data['review']['back_url'], 'data:image/jpeg;base64') !== false) {
                    $img = str_replace('data:image/jpeg;base64,', '', $request_data['review']['back_url']);
                } else {
                    $img = str_replace('data:image/png;base64,', '', $request_data['review']['back_url']);
                }
                $base_code = base64_decode($img);
                $name = $data->type .'_review_back.png';
                $file = $uploads_dir . $name;
                if(File::exists($file)) {
                    File::delete($file);
                }
                file_put_contents($file, $base_code); // create image file into $upload_dir
                $url = url("/assets/uploads") ."/" . $name;
                $arr = explode("/", $url);
                $request_data['review']['back_url'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            }
            if ($list->review->logo_url != $request_data['review']['logo_url']) {
                if (strpos($request_data['review']['logo_url'], 'data:image/jpeg;base64') !== false) {
                    $img = str_replace('data:image/jpeg;base64,', '', $request_data['review']['logo_url']);
                } else {
                    $img = str_replace('data:image/png;base64,', '', $request_data['review']['logo_url']);
                }
                $base_code = base64_decode($img);
                $name = $data->type .'_logo_url.png';
                $file = $uploads_dir . $name;
                if(File::exists($file)) {
                    File::delete($file);
                }
                file_put_contents($file, $base_code); // create image file into $upload_dir
                $url = url("/assets/uploads") ."/" . $name;
                $arr = explode("/", $url);
                $request_data['review']['logo_url'] = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            }
            $data->data = json_encode($request_data);
            $data->save();
        }
        return response()->json('success');
    }

    public function deletePortfolioPage(Request $request) {
        $page = Page::where('page_name', $request->from)->first();
        $type = $request->type;
        $json_page = json_decode($page->data);
        $portfolios = $json_page->portfolios;
        unset($portfolios->$type);
        $json_page->portfolios = $portfolios;
        $page->data = json_encode($json_page);
        $page->save();
        return response()->json($portfolios);
    }

    public function addPortfolioPage(Request $request) {
        $page = Page::where('page_name', $request->from)->first();
        $json_page = json_decode($page->data);
        $portfolios = $json_page->portfolios;
        $type = $request->data['type'];
        $data = [
            'from' => $request->from,
            'title' => $request->data['title'],
            'description' => $request->data['description'],
            'url' => $request->data['url'],
            'back_url' => $request->data['back_url']
        ];
        if ($request->from == "home") {
            $data['icon_url'] = $request->data['avatar'];            
        }
        $array = json_decode(json_encode($portfolios), true);
        $portfolios = array($type => $data) + $array;
        $json_page->portfolios = $portfolios;
        $page->data = json_encode($json_page);
        $page->save();
        return response()->json($portfolios);
    }    

    public function getReviews() {
        $reviews = Review::get();
        return response()->json($reviews);
    }

    public function createReview(Request $request) {
        $data = [
            "title" => $request->data['title'],
            "description" => $request->data['description'],
            "name" => $request->data['name'],
            "job" => $request->data['job'],
            "avatar" => $request->data['avatar'],
            "logo_url" => $request->data['logo_url'],
            "back_url" => $request->data['back_url']
        ];
        $uploads_dir = "./assets/uploads/";
        if ($request->data['avatar'] != null) {
            if (strpos($request->data['avatar'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request->data['avatar']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request->data['avatar']);
            }
            $base_code = base64_decode($img);
            $name = trim($request->data['name'], " ") .'-review-avatar.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $data['avatar'] = $path;
        }
        if ($request->data['logo_url'] != null) {
            if (strpos($request->data['logo_url'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request->data['logo_url']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request->data['logo_url']);
            }
            $base_code = base64_decode($img);
            $name = trim($request->data['name'], " ") .'-review-logo.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $data['logo_url'] = $path;
        }
        if ($request->data['back_url'] != null) {
            if (strpos($request->data['back_url'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request->data['back_url']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request->data['back_url']);
            }
            $base_code = base64_decode($img);
            $name = trim($request->data['name'], " ") .'-review-back.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $data['back_url'] = $path;
        }
        Review::Create($data);
        $reviews = Review::get();
        return response()->json($reviews);
    }

    public function updateReview(Request $request) {
        $review = Review::where('id', $request->id)->first();
        $review->title = $request->data['title'];
		$review->description = $request->data['description'];
		$review->no_description = $request->data['no_description'];
        $review->name = $request->data['name'];
        $review->job = $request->data['job'];

        $uploads_dir = "./assets/uploads/";
        if ($review->avatar != $request->data['avatar']) {
            if (strpos($request->data['avatar'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request->data['avatar']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request->data['avatar']);
            }
            $base_code = base64_decode($img);
            $name = trim($request->data['name'], " ") .'-review-avatar.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $review['avatar'] = $path;
        }
        if ($review->logo_url != $request->data['logo_url']) {            
            if (strpos($request->data['logo_url'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request->data['logo_url']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request->data['logo_url']);
            }
            $base_code = base64_decode($img);
            $name = trim($request->data['name'], " ") .'-review-logo.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $review['logo_url'] = $path;
        }
        if ($review->back_url != $request->data['back_url']) {            
            if (strpos($request->data['back_url'], 'data:image/jpeg;base64') !== false) {
                $img = str_replace('data:image/jpeg;base64,', '', $request->data['back_url']);
            } else {
                $img = str_replace('data:image/png;base64,', '', $request->data['back_url']);
            }
            $base_code = base64_decode($img);
            $name = trim($request->data['name'], " ") .'-review-back.png';
            $file = $uploads_dir . $name;
            if(File::exists($file)) {
                File::delete($file);
            }
            file_put_contents($file, $base_code); // create image file into $upload_dir
            $url = url("/assets/uploads") ."/" . $name;
            $arr = explode("/", $url);
            $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
            $review['back_url'] = $path;
        }
        $review->save();

        $home = Page::where('page_name', 'home')->first();
        $home_data = json_decode($home->data);
        foreach ($home_data->carousels as $key => $item) {
            if ($item->name == $review->name) {
                $item->title = $review->title;
				$item->description = $review->description;
				$item->no_description = $review->no_description;
                $item->name = $review->name;
                $item->job = $review->job;
                $item->avatar = $review->avatar;
                $item->logo_url = $review->logo_url;
            }
        }
        $home->data = json_encode($home_data);
        $home->save();

        $portfolios = Portfolio::get();
        foreach ($portfolios as $portfolio) {
            $data = json_decode($portfolio->data);
            if (count($data->reviews) > 0 && $review->name == $data->reviews[0]->name) {
                $data->reviews[0]->title = $review->title;
				$data->reviews[0]->description = $review->description;
				$data->reviews[0]->no_description = $review->no_description;
                $data->reviews[0]->name = $review->name;
                $data->reviews[0]->job = $review->job;
                $data->reviews[0]->avatar = $review->avatar;
                $data->reviews[0]->logo_url = $review->logo_url;
                $portfolio->data = json_encode($data);
                $portfolio->save();
            }
        }

        return response()->json('success');
    }

    public function deleteReview(Request $request) {
        $review = Review::where('id', $request->id)->first();

        $home = Page::where('page_name', 'home')->first();
        $home_data = json_decode($home->data);
        foreach ($home_data->carousels as $key => $item) {
            if ($item->name == $review->name) {
                unset($home_data->carousels->$key);
            }
        }
        $home_data->carousels = array_values($home_data->carousels);
        $home->data = json_encode($home_data);
        $home->save();

        $portfolios = Portfolio::get();
        foreach ($portfolios as $portfolio) {
            $data = json_decode($portfolio->data);
            if (count($data->reviews)>0 && $review->name == $data->reviews[0]->name) {
                unset($data->reviews[0]);
                $portfolio->data = json_encode($data);
                $portfolio->save();
            }
        }
        $review->delete();
        $reviews = Review::get();
        return response()->json($reviews);
    }

    public function addReviewPage(Request $request) {
        if ($request->from == 'portfolio') {
            $page = Portfolio::where('type', $request->page)->first();
            $data = json_decode($page->data);
            array_push($data->reviews, $request->data);
            $page->data = json_encode($data);
            $page->save();
        } else if ($request->from == 'home') {
            $page = Page::where('page_name', 'home')->first();
            $data = json_decode($page->data);
            $reviews = json_decode(json_encode(($data->carousels), true));
            array_push($reviews, $request->data);
            $data->carousels = $reviews;            
            $page->data = json_encode($data);
            $page->save();
            return response()->json($reviews);
        }
        return response()->json("success");
    }

    public function deleteReviewPage(Request $request) {
        if ($request->from == 'portfolio') {
            $page = Portfolio::where('type', $request->page)->first();
            $data = json_decode($page->data);
            unset($data->reviews[0]);
            $data->reviews = array_values($data->reviews);
            $page->data = json_encode($data);
            $page->save();
        } else if ($request->from == 'home') {
            $page = Page::where('page_name', $request->from)->first();
            $data = json_decode($page->data);
            unset($data->carousels[$request->type]);
            $data->carousels = array_values($data->carousels);
            $page->data = json_encode($data);
            $page->save();
            return response()->json($data->carousels);
        }
        return response()->json("success");
    }
}
