<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
          /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'pages';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * @var array
     */

    protected $fillable = ['id', 'page_name', 'data'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
