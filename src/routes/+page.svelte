<script lang="ts">
    import { localStorageEnabled } from "$lib/stores";
</script>

<div class="text-center flex flex-col items-center">
    <img
        src="https://fiveamtech.it/logo.png"
        alt="logo"
        width="350"
        height="350"
        class="self-center"
    />
    <h1 class="text-4xl font-bold text-white mb-4">
        Welcome to the Svelte Demo SCR
    </h1>
    <p class="text-lg text-gray-300 mb-8">
        Manage students and teachers testing svelte.
    </p>

    <label class="flex items-center space-x-2 cursor-pointer text-white mb-4">
        <input
            type="checkbox"
            bind:checked={$localStorageEnabled}
            class="form-checkbox h-4 w-4 text-orange-500 rounded border-gray-300 focus:ring-orange-500"
        />
        <span class="text-sm hover:text-orange-300 transition"
            >Use Local Storage to preserve data</span
        >
    </label>
    <div class="flex justify-center space-x-4">
        <a
            href="/students"
            class="px-6 py-3 bg-orange-400 text-white shadow hover:bg-orange-700 transition"
            >Manage Students</a
        >
        <a
            href="/teachers"
            class="px-6 py-3 bg-orange-400 text-white shadow hover:bg-orange-700 transition"
            >Manage Teachers</a
        >
    </div>
    <div class="flex justify-center mt-4">
        <a
            href="https://github.com/DavidePlessi/svelte-demo-scr.git"
            class="px-6 py-3 bg-gradient-to-r from-[#ff9b00] to-[#ff00ff] text-white hover:scale-110 transition"
            >Git Hub</a
        >
    </div>
</div>
