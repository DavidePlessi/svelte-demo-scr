<script lang="ts" generics="T extends Entity">
    import type { Field, Entity } from "$lib/types";

    let { fields, onsubmit, title, submitLabel } = $props<{
        fields: Field[];
        onsubmit: (data: T) => boolean;
        title: string;
        submitLabel: string;
    }>();

    let formData = $state<T>({} as T);
    let isCollapsed = $state(true);

    function handleSubmit(e: Event) {
        e.preventDefault();
        const result = onsubmit(formData);
        if (result) {
            formData = {} as T;
        }
    }

    function toggleCollapse() {
        isCollapsed = !isCollapsed;
    }
</script>

<div class="bg-[#1a1a1a] shadow-md overflow-hidden text-white">
    <button
        type="button"
        class="p-6 flex justify-between items-center cursor-pointer w-full bg-transparent border-none text-left"
        onclick={toggleCollapse}
        aria-expanded={!isCollapsed}
    >
        <h2 class="text-xl font-semibold">{title}</h2>
        <div class="text-white">
            <span>{isCollapsed ? "▼" : "▲"}</span>
        </div>
    </button>

    {#if !isCollapsed}
        <form
            onsubmit={handleSubmit}
            class="p-6 space-y-8 border-t border-white pt-10"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {#each fields as field}
                    <div class={field.type === "select" ? "md:col-span-2" : ""}>
                        <label
                            for={field.name}
                            class="block text-sm font-medium text-white"
                            >{field.label}</label
                        >
                        {#if field.type === "select"}
                            <select
                                id={field.name}
                                bind:value={formData[field.name as keyof T]}
                                required
                                class="mt-1 block w-full border-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
                            >
                                <option
                                    value=""
                                    disabled
                                    selected
                                    class="bg-[#1a1a1a]"
                                    >Select {field.label}</option
                                >
                                {#each field.options || [] as option}
                                    <option value={option} class="bg-[#1a1a1a]"
                                        >{option}</option
                                    >
                                {/each}
                            </select>
                        {:else}
                            <input
                                type={field.type}
                                id={field.name}
                                bind:value={formData[field.name as keyof T]}
                                required
                                class="mt-1 block w-full border-white shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm border p-2"
                            />
                        {/if}
                    </div>
                {/each}
            </div>
            <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-orange-400 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
            >
                {submitLabel}
            </button>
        </form>
    {/if}
</div>
