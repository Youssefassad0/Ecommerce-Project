<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'id_user', 'name', 'email', 'pays', 'city', 'no_street', 'zipcode', 'payment_id', 'tracking_no', 'status', 'remark'
    ];
}
