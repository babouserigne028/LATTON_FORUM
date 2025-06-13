<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Utilisateur; // Ajoutez cette ligne
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Mail;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'prenom' => 'required|string|max:100',
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:utilisateurs',
            'password' => 'required|string|min:6|confirmed',
            'niveau_id' => 'required|exists:niveaux,id', // Assurez-vous que le niveau_id est optionnel
            'groupe_id' => 'nullable|exists:groupes,id', // Assurez-vous que le groupe_id est optionnel
            'telephone' => ['nullable', 'string' ,'max:20' ,'regex:/^\+\d{6,15}$/', 'unique:utilisateurs,telephone'], // Optionnel, si vous souhaitez ajouter un numéro de téléphone
            'photo' => 'nullable|image|max:2048', // Ajout de validation image
            'date_naissance' => 'nullable|date|before:today',
            // 'role' => 'required|in:etudiant,tuteur,enseignant,admin', // On retire cette ligne car le rôle est fixé à 'etudiant'
            // 'actif' => 'boolean', // On retire cette ligne car l'utilisateur est actif par défaut
   
        ]);

        // Génération du code permanent unique
        $nom = strtoupper(substr($request->nom, 0, 6)); // 6 premières lettres du nom
        $annee = date('y');
        $base_code = $nom . $annee;

        // Ajoute un suffixe numérique si le code existe déjà
        $code_permanent = $base_code;
        $i = 1;
        while (\App\Models\Utilisateur::where('code_permanent', $code_permanent)->exists()) {
            $code_permanent = $base_code . $i;
            $i++;
        }

        // Création de l'utilisateur dans la table 'utilisateurs'
        $utilisateur = Utilisateur::create([
            'prenom' => $request->prenom,
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'code_permanent' => $code_permanent,
            'role' => 'etudiant',
            'telephone' => $request->telephone,
            'niveau_id' => $request->niveau_id ?? null,
            'groupe_id' => $request->groupe_id ?? null,
            'date_naissance' => $request->date_naissance,
            'photo' => $request->hasFile('photo') 
               ? file_get_contents($request->file('photo')->getRealPath()) 
               : null,
            'actif' => true,
            'derniere_connexion' => null,
            'created_at' => now(),
             'updated_at' => now(),
        ]);

        if ($utilisateur->photo) {
            $utilisateur->photo = base64_encode($utilisateur->photo);
        }

        return response()->json([
            'message' => 'Inscription réussie. Veuillez vous connecter.',
            'utilisateur' => $utilisateur

            //Mail::to($utilisateur->email)->send(new \App\Mail\WelcomeMail($utilisateur));

        ], 201);


    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'code_permanent' => 'required|string',
            'password' => 'required'
        ]);

            $utilisateur = \App\Models\Utilisateur::where('code_permanent', $request->code_permanent)->first();

        if (!$utilisateur || !\Hash::check($request->password, $utilisateur->password)) {
            return response()->json(['message' => 'Code ou Mot de Passe invalides'], 401);
        }

        // Récupère l'utilisateur depuis la table 'utilisateurs'


        $token = $utilisateur->createToken('user-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'utilisateur' => $utilisateur // Ajouté pour cohérence avec register
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnecté']);
    }
}
