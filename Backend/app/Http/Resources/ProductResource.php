<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'gender' => $this->gender,
            'original_price' => $this->original_price,
            'new_price' => $this->new_price,
            'stock' => $this->stock,
            'category_id' => $this->category_id,
            'brand' => $this->brand,
            'rating' => $this->rating,
            'rating_count' => $this->rating_count,
            'sizes' => $this->sizes,
            'colors' => $this->colors,
            // 'nom' => $this->nom,
            // 'first_image' => $this->images->first() ? asset('storage/' . $this->images->first()->path) : null,
            'first_image' => $this->images->first() ?  $this->images->first()->path : null,
            'images' => $this->images->map(function ($image) {
                return  $image->path;
            }),
        ];
    }
}
