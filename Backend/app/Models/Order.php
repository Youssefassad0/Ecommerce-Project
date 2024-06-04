<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $table = 'orders';
    protected $fillable = [
        'id_user', 'name', 'email', 'pays', 'no_street', 'city', 'zipcode', 'payment_mode', 'payment_id', 'tracking_no', 'status', 'remark'
    ];
    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
    public function getTotalPriceAttribute()
    {
        return $this->orderDetails->sum(function ($detail) {
            return $detail->quantity * $detail->price;
        });
    }
}
