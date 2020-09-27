<?php

namespace App\Http\Controllers\Api;

use App\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Http\Requests\ItemRequest;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return LengthAwarePaginator|mixed
     */
    public function index(Request $request)
    {
        return Item::loadAll();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ItemRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemRequest $request)
    {
        $user = $request->user();

        $item = new Item($request->validated());
        $item->slug = Str::slug($request->get('title'));
        $user->items()->save($item);

        return response()->json($item, 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param ItemRequest $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(ItemRequest $request, $id)
    {
        $item = Item::findOrFail($id);

        $data = $request->validated();
        $data['slug'] = Str::slug($data['title']);
        $item->update($data);

        return response()->json($item, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $item = Item::findOrFail($id);

        $item->delete();

        return response([], 200);
    }
}
