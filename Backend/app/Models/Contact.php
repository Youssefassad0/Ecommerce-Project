<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contact extends Model
{
    use HasFactory;
    protected $fillable = ['id_user', 'name', 'email', 'phone', 'subject', 'message'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
