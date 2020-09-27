<?php

use Illuminate\Database\Seeder;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = \App\User::where('is_admin', true)->first();
        factory(App\Item::class, 5)->create([
            'user_id' => $user->id
        ]);
    }
}
