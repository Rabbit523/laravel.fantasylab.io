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
                if ($data->services->$service_type->url != $request_data[$service_type]['url']) {
                    if (strpos($request_data[$service_type]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->type .'.png';
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
                if ($data->services->$service_type->backimage != $request_data[$service_type]['backimage']) {
                    if (strpos($request_data[$service_type]['backimage'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data[$service_type]['backimage']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data[$service_type]['backimage']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->type .'-background.png';
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
                $data->services = $request_data;
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
                $data->values->data[$request->id] = $request_data['data'][$request->id];
                $page->data = json_encode($data);
                $page->save();
            } else if ($service_type == "services") {
                $data->services->title = $request_data['title'];
                if($data->services->data[$request->id]->url != $request_data['data'][$request->id]['url']) {
                    if (strpos($request_data['data'][$request->id]['url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['data'][$request->id]['url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['data'][$request->id]['url']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'about_'.$request_data['data'][$request->id]['type'].'_avatar.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['data'][$request->id]['url'] = $path;
                }
                if($data->services->data[$request->id]->backimage != $request_data['data'][$request->id]['backimage']) {
                    if (strpos($request_data['data'][$request->id]['backimage'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['data'][$request->id]['backimage']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['data'][$request->id]['backimage']);
                    }
                    $base_code = base64_decode($img);
                    $name = 'about_'.$request_data['data'][$request->id]['type'].'_back.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['data'][$request->id]['url'] = $path;
                }
                $data->services->data[$request->id] = $request_data['data'][$request->id];
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
                    $request_data['data'][$request->id]['url'] = $path;
                }
                $data->headquarters->backimage = $request_data['backimage'];
                $data->headquarters->data[$request->id] = $request_data['data'][$request->id];
                $page->data = json_encode($data);
                $page->save();
            }
        }else if ($request->name == "contact") {
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
                $data->footer_description = $request_data['footer_description'];
                $data->footer_link = $request_data['footer_link'];
                $data->footer_link_name = $request_data['footer_link_name'];
                $data->footer_title = $request_data['footer_title'];
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
            }
        } else if ($request->name == "privacy") {
            $service_type = $request->type;
            if ($service_type == "header") {
                $data->meta_title = $request_data['meta_title'];
                $data->meta_description = $request_data['meta_description'];
            } else if ($service_type == "privacy") {
                $data->privacy = $request->data;
            } else if ($service_type == "security") {
                $data->security = $request->data;
            } else if ($service_type == "terms") {
                $data->terms = $request->data;
            } else if ($service_type == "confident") {
                $data->confident = $request->data;
            }
            $page->data = json_encode($data);
            $page->save();
        }
        return response()->json('update success');
    }    

    public function getPortfolioPage(Request $request) {
        $data = Portfolio::where('type', $request->type)->first();        
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
                    'description' => $request_data['description'],
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
                    'description' => $request_data['description'],
                    'back_url' => $request_data['back_url']
                ];
                $array = json_decode(json_encode($portfolio_data->portfolios), true);
                $portfolio_data->portfolios = array($request_data['type'] => $new_portfolio) + $array;
            }
        }
        $portfolios->data = json_encode($portfolio_data);
        $portfolios->save();

        $data->title = $request_data['title'];
        $data->description = $request_data['description'];
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
            if ($list->header_back_url != $request_data['header_back_url']) {
                if (strpos($request_data['header_back_url'], 'data:image/jpeg;base64') !== false) {
                    $img = str_replace('data:image/jpeg;base64,', '', $request_data['header_back_url']);
                } else {
                    $img = str_replace('data:image/png;base64,', '', $request_data['header_back_url']);
                }
                $base_code = base64_decode($img);
                $name = $data->type .'page_header_back.png';
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
                    $name = $data->type .$key.'header_sub.png';
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
            $page = Page::where('type', $request->page)->first();
            $data = json_decode($page->data);
            array_push($data->reviews, $request->data);
            $page->data = json_encode($data);
            $page->save();
        }
        return response()->json("success");
    }

    public function deleteReviewPage(Request $request) {
        if ($request->from == 'portfolio') {
            $page = Portfolio::where('type', $request->page)->first();
            $data = json_decode($page->data);
            unset($data->reviews[0]);
            $page->data = json_encode($data);
            $page->save();
        } else if ($request->from == 'home') {
            $page = Page::where('type', $request->page)->first();
            $data = json_decode($page->data);
            unset($data->reviews[0]);
            $page->data = json_encode($data);
            $page->save();
        }
        return response()->json("success");
    }
}
