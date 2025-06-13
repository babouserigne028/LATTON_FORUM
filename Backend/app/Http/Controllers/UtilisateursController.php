<?php

namespace App\Http\Controllers;

use App\Models\Utilisateur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UtilisateursController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    
    
     public function index()
    {
        $utilisateurs = Utilisateur::all();
        return response()->json($utilisateurs);
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
    public function store(Request $request)
    {
      $validatedData = $request->validate([
      'nom' => 'required|string|max:100',
      'email' => 'required|email|max:150|unique:utilisateurs,email',
      'password' => 'required|string|min:8',
      'code_permanent' => 'required|string|max:20|unique:utilisateurs,code_permanent',
      'role' => 'required|in:etudiant,tuteur,enseignant,admin',
      'telephone' => 'nullable|string|max:20|regex:/^\+\d{6,15}$/|unique:utilisateurs,telephone',
      'niveau_id' => 'nullable|exists:niveaux,id',
      'groupe_id' => 'nullable|exists:groupes,id',
      'actif' => 'boolean',
       'derniere_connexion' => 'nullable|date',
    ]);

      $validatedData['password'] = bcrypt($validatedData['password']);

      $utilisateur = Utilisateur::create($validatedData);

      return response()->json($utilisateur, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Utilisateur $utilisateur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Utilisateur $utilisateur)
    {
        //
        $utilisateur->delete();
        return response()->json(['message' => 'Utilisateur supprimé avec succès'], 204);
    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté avec succès']);
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}
