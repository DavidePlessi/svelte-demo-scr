<script lang="ts">
    import { onMount } from "svelte";
    import { localStorageEnabled } from "$lib/stores";
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";

    let { children } = $props();

    onMount(() => {
        const stored = localStorage.getItem("localStorageEnabled");
        if (stored === null) {
            localStorage.setItem("localStorageEnabled", "false");
            localStorageEnabled.set(false);
        } else {
            localStorageEnabled.set(stored === "true");
        }

        localStorageEnabled.subscribe((value) => {
            localStorage.setItem("localStorageEnabled", value.toString());
        });
    });
</script>

<svelte:head>
    <link rel="icon" href="https://fiveamtech.it/favicon.ico" />
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a]">
    <Navbar />
    <main class="container mx-auto p-4">
        {@render children()}
    </main>
</div>
