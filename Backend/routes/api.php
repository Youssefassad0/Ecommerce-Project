<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CheckOutController;
use App\Http\Controllers\StatusProductController;

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

// });

//          Authtentification 
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('/user/profile', [ProfileController::class, 'index']);
    Route::post('/user/profile/update', [ProfileController::class, 'update']);
    Route::get('/getUserReviews', [ProfileController::class, 'getUserReviews']);
    Route::get('/getUserOrders', [ProfileController::class, 'getUserOrders']);
    Route::get('/user/orders', [OrderController::class, 'getUserOrders']);
});

//          CRUD Products
Route::resource('/products', ProductController::class);
//           CRUD ORDERS  
Route::resource('place-order', CheckOutController::class);
//          CRUD CAtegory 
Route::resource('/category', CategoryController::class);
//          CRUD USERS
Route::resource('/users', UserController::class);
//          CRUD CONTACT
Route::resource('/contact', ContactController::class);
//  ajouter et afficher les commataires (reviews)
Route::post('/products/{productId}/reviews', [ReviewController::class, 'store']);
Route::get('/products/{productId}/reviews', [ReviewController::class, 'listLastFiveReviews']);
Route::get('/orders', [OrderController::class, 'index']);
Route::get('/reviews/{id}', [ProfileController::class, 'getReviewsUser']);
//changer status de Commande  
Route::post('/orders/{id}/accept', [StatusProductController::class, 'acceptOrder']);
Route::post('/orders/{id}/reject', [StatusProductController::class, 'rejectOrder']);

//    ACCETPTER OU REFUSER COMMANDE 
Route::post('/validate-order', [CheckOutController::class, 'validateOrder']);
// :Lister les Commandes par status
Route::get('/ordersAcc', [OrderController::class, 'accepted']);
Route::get('/ordersRef', [OrderController::class, 'refused']);
Route::put('/api/user-update/{id}', [UserController::class, 'updateUser']);


Route::get('/sales-category', [SalesController::class, 'getSalesByCategory']);
Route::get('/salesBYcategory', [SalesController::class, 'salesByCategory']);
