<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUpdateProductRequest;
use App\Models\Product;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{

    public function index(){

        $products = Product::all();

        return ProductResource::collection($products);
    }

    public function store(StoreUpdateProductRequest $request){

        $data = $request->validated();
        $product = Product::create($data);

        return new ProductResource($product);
    }

    public function show(int $id){
        // $product = Product::find($id);

        // if(!$product){
        //     return response()->json(['message' => 'produto não encontrado'], 404);
        // }

        $product = Product::findOrFail($id);

        return new ProductResource($product);
    }


    public function update(int $id, StoreUpdateProductRequest $request){

        $product = Product::findOrFail($id);

        $data = $request->validated();
        $product->update($data);

        return new ProductResource($product);
    }

    public function destroy(int $id){
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json([
            'message' => 'Produto excluído com sucesso.'
        ], 200);
    }
}
