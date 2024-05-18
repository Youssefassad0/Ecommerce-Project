<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 'description', 'gender', 'original_price', 'new_price',
        'stock', 'category_id', 'brand', 'model', 'rating',
        'rating_count', 'sizes', 'colors'
    ];

    protected $casts = [
        'sizes' => 'array',
        'colors' => 'array',
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }
}
