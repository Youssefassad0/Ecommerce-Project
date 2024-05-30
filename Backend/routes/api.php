<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckOutController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// routes/web.php or routes/api.php

// Route::middleware(['role:admin'])->group(function () {
// Route::get('/dashboard', [DashboardController::class, 'index']);
// Add other team routes here
Route::resource('/products', ProductController::class);
Route::resource('place-order', CheckOutController::class);
// });


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/user/profile', [ProfileController::class, 'index']);
    Route::put('/user/profile/update', [ProfileController::class, 'update']);
});
Route::resource('/category', CategoryController::class);
// Route::resource('/comments', CommentsController::class);
Route::post('/comments', [CommentController::class, 'store']);
Route::get('/products/{productId}/comments', [CommentController::class, 'index']);
Route::resource('/contact', ContactController::class);
Route::post('/validate-order', [CheckOutController::class, 'validateOrder']);
Route::post('/products/{productId}/reviews', [ReviewController::class, 'store']);

// Route::middleware('auth:api')->group(function () {
// });
