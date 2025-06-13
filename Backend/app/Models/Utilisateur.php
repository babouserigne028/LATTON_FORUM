<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Utilisateur extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'utilisateurs';

    protected $fillable = [
        'prenom',
        'nom',
        'email',
        'photo',
        'date_naissance',
        'password',
        'code_permanent',
        'role',
        'niveau_id',
        'telephone',
        'groupe_id',
        'actif',
        'derniere_connexion',
        // 'created_at', // Optionnel, géré automatiquement par Eloquent
        // Ajoute ici les autres champs si besoin
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
