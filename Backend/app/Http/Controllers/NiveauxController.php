<?php

namespace App\Http\Controllers;

use App\Models\Niveau;
use Illuminate\Http\Request;

class NiveauxController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         return response()->json(Niveau::all());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

     
        // Ajoute un niveau
    public function store(Request $request)
    {
        $validated = $request->validate([
        'libelle' => 'required|string|max:50',
        'code' => 'required|string|max:10|unique:niveaux,code',
        'ordre' => 'required|integer',
        'actif' => 'boolean'
        ]);
        $niveau = Niveau::create($validated);
        return response()->json($niveau, 201);
    }

    /**
     * Display the specified resource.
     */

    public function show($id)
    {
        $niveau = Niveau::findOrFail($id);
        return response()->json($niveau);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Niveaux $niveaux)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $niveau = Niveau::findOrFail($id);
        $validated = $request->validate([
            'libelle' => 'sometimes|required|string|max:50',
            'code' => 'sometimes|required|string|max:10|unique:niveaux,code,' . $id,
            'ordre' => 'sometimes|required|integer',
            'actif' => 'boolean'
        ]);
        $niveau->update($validated);
        return response()->json($niveau);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $niveau = Niveau::findOrFail($id);
        $niveau->delete();
        return response()->json(['message' => 'Niveau supprimé']);
    }
}
