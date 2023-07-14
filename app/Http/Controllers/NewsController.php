<?php

namespace App\Http\Controllers;

use App\Http\Resources\NewsCollection;
use App\Models\News;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $news = new NewsCollection(News::OrderByDesc('id')->paginate(8));
        return Inertia::render('Homepage', [
            'title' => "News",
            'description' => "Selamat Datang di News Dari Controller",
            'news' => $news,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     *
     *
     */
    public function store(Request $request)
    {
        $news = new News();
        $news->title = $request->title;
        $news->description = $request->description;
        $news->category = $request->category;
        $news->author = auth()->user()->email;
        $news->save();

        return redirect()->back()->with('message', 'Berita berhasil dibuat');


    }

    /**
     * Display the specified resource.
     */
    public function show(News $news)
    {

        $myNews = $news::where('author', auth()->user()->email)->get();
        return Inertia::render('Dashboard', [

            'myNews' => $myNews,
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news, Request $request)
    {
        return Inertia::render('EditNews', [
            'myNews' => $news->find($request->id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        News::where('id', $request->id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'category' => $request->category,
        ]);
        return redirect()->route('dashboard')->with('message', 'Update berita berhasil');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, News $news)
    {
        $news = News::find($request->id);
        $news->delete();
        return redirect()->route('dashboard')->with('message', 'Hapus berita berhasil');
    }
}
