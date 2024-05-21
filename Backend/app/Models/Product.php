<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
    public function getCategory($id)
    {
        return Category::find($id)->nom;
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
    public function deleteWithImages()
    {
        // Delete associated images from storage
        foreach ($this->images as $image) {
            Storage::disk('public')->delete($image->path);
            $image->delete();
        }

        // Delete the product
        $this->delete();
    }
}
