<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Page;

use File;
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
        return response()->json($page);
    }  

    public function getPages() {
        $pages = Page::get();
        return response()->json($pages);
    }

    public function updatePage(Request $request) {
        $page = Page::where('page_name', $request->name)->first();
        $data = json_decode($page->data);
        $request_data = json_decode($request->data, true);
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
                if ($data->header->footer_url != $request_data['footer_url']) {
                    if (strpos($request_data['footer_url'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['footer_url']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['footer_url']);
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
                    $request_data['footer_url'] = $path;
                }
                $data->header = $request_data;
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
                if ($data->icon_urls->quality->path != $request_data['icon_urls']['quality']['path']) {
                    if (strpos($request_data['icon_urls']['quality']['path'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['icon_urls']['quality']['path']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['icon_urls']['quality']['path']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_quality.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['icon_urls']['quality']['path'] = $path;
                } 
                if ($data->icon_urls->time->path != $request_data['icon_urls']['time']['path']) {
                    if (strpos($request_data['icon_urls']['time']['path'], 'data:image/jpeg;base64') !== false) {
                        $img = str_replace('data:image/jpeg;base64,', '', $request_data['icon_urls']['time']['path']);
                    } else {
                        $img = str_replace('data:image/png;base64,', '', $request_data['icon_urls']['time']['path']);
                    }
                    $base_code = base64_decode($img);
                    $name = $request->name .'_time.png';
                    $file = $uploads_dir . $name;
                    if(File::exists($file)) {
                        File::delete($file);
                    }
                    file_put_contents($file, $base_code); // create image file into $upload_dir
                    $url = url("/assets/uploads") ."/" . $name;
                    $arr = explode("/", $url);
                    $path = "/".$arr[3]."/".$arr[4]."/".$arr[5];
                    $request_data['icon_urls']['time']['path'] = $path;
                }
                $data = $request_data;
                $page->data = json_encode($data);
                $page->save();
            }
        } else if ($request->name == "about" || $request->name == "contact") {
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
                $data = $request_data;
                $page->data = json_encode($data);
                $page->save();
            }
        }
        return response()->json('update success');
    }
}
