<?php

use App\Models\Reservation;
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
        Schema::create(Reservation::TABLE, function (Blueprint $table) {
            $table->id();
            $table->dateTime('reservation_date');
            $table->string('email')->default('');
            $table->string('phone')->default('');
            $table->text('message')->default('');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('service_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(Reservation::TABLE);
    }
};
