<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('utilisateurs', function (Blueprint $table) {
            $table->id(); // id (primary key auto_increment)
            $table->string('prenom', 100); // Ajout du prénom
            $table->string('nom', 100);
            $table->string('email', 150)->unique();
            $table->binary('photo')->nullable(); // Chemin vers la photo de profil
            $table->string('date_naissance', 10)->nullable(); // Date de naissance au format 'YYYY-MM-DD'
            $table->string('password'); // Hashé
            $table->string('code_permanent', 20)->unique();
            $table->string('telephone', 20)->nullable(); // Ajout du numéro de téléphone
            $table->enum('role', ['etudiant', 'tuteur', 'enseignant', 'admin']);
            $table->foreignId('niveau_id')->nullable()->constrained('niveaux')->onDelete('set null');
            $table->unsignedBigInteger('groupe_id')->nullable();
            $table->boolean('actif')->default(true);
            $table->dateTime('derniere_connexion')->nullable();
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('utilisateurs');
    }
};
