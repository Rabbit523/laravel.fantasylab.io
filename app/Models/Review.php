<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
          /**
     * The table associated with the model.
     * 
     * @var string
     */
    protected $table = 'reviews';

    /**
     * The primary key for the model.
     * 
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * @var array
     */

    protected $fillable = ['id', 'title', 'description', 'no_description', 'avatar', 'name', 'job', 'logo_url', 'back_url'];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
