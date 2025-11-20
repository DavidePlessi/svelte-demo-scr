<script lang="ts" generics="T extends Entity, TFilter extends EntityFilter">
    import type { Column, Entity, EntityFilter } from "$lib/types";

    let { data, columns, onfilter, ondelete, onupdate } = $props<{
        data: T[];
        columns: Column<T>[];
        onfilter?: (filter: TFilter) => void;
        ondelete?: (id: string) => void;
        onupdate?: (item: T) => void;
    }>();

    let filters = $state<TFilter>({} as TFilter);
    let editingId = $state<string | null>(null);
    let editData = $state<T>({} as T);
    let showFilters = $state(false);

    function handleFilterChange() {
        if (onfilter) {
            onfilter(filters);
        }
    }

    function startEdit(item: any) {
        editingId = item.id;
        editData = { ...item };
    }

    function cancelEdit() {
        editingId = null;
        editData = {} as T;
    }

    function saveEdit() {
        if (onupdate) {
            onupdate(editData);
        }
        editingId = null;
        editData = {} as T;
    }

    function handleDelete(id: string) {
        if (confirm("Are you sure you want to delete this item?") && ondelete) {
            ondelete(id);
        }
    }
</script>

<div class="space-y-4">
    <!-- Filter Section -->
    {#if onfilter}
        <div class="bg-[#1a1a1a] p-6 shadow-md">
            <button
                onclick={() => (showFilters = !showFilters)}
                class="flex items-center justify-between w-full text-white font-medium"
            >
                <h2 class="text-xl font-semibold">Filters</h2>
                <span>{showFilters ? "▲" : "▼"}</span>
            </button>
            {#if showFilters}
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {#each columns as column}
                        <div class="flex flex-col space-y-1">
                            <label
                                for={column.key as string}
                                class="block text-sm font-medium text-white"
                                >{column.label}</label
                            >
                            {#if column.type === "select"}
                                <select
                                    id={column.key as string}
                                    bind:value={
                                        filters[column.key as keyof TFilter]
                                    }
                                    onchange={handleFilterChange}
                                    class="p-2 text-sm border text-white bg-[#2a2a2a] border-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                >
                                    <option value="">All</option>
                                    {#each column.options || [] as option}
                                        <option value={option}>{option}</option>
                                    {/each}
                                </select>
                            {:else if column.type === "number"}
                                <input
                                    id={column.key as string}
                                    type="number"
                                    bind:value={
                                        filters[column.key as keyof TFilter]
                                    }
                                    oninput={handleFilterChange}
                                    placeholder="Filter..."
                                    class="p-2 text-sm border text-white bg-[#2a2a2a] border-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                            {:else}
                                <input
                                    id={column.key as string}
                                    type="text"
                                    bind:value={
                                        filters[column.key as keyof TFilter]
                                    }
                                    oninput={handleFilterChange}
                                    placeholder="Filter..."
                                    class="p-2 text-sm border text-white bg-[#2a2a2a] border-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                            {/if}
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    {/if}

    <!-- Mobile Card View -->
    <div class="grid grid-cols-1 gap-4 md:hidden">
        {#each data as item}
            <div
                class="bg-[#1a1a1a] p-4 rounded shadow-md border border-gray-700"
            >
                {#each columns as column}
                    <div
                        class="flex justify-between py-2 border-b border-gray-700 last:border-0"
                    >
                        <span class="text-gray-400 text-sm">{column.label}</span
                        >
                        <span class="text-white text-right font-medium">
                            {#if editingId === item.id}
                                {#if column.type === "select"}
                                    <select
                                        bind:value={
                                            editData[column.key as keyof T]
                                        }
                                        class="p-1 text-sm border rounded text-white bg-[#2a2a2a] w-full"
                                    >
                                        {#each column.options || [] as option}
                                            <option value={option}
                                                >{option}</option
                                            >
                                        {/each}
                                    </select>
                                {:else if column.type === "number"}
                                    <input
                                        type="number"
                                        bind:value={
                                            editData[column.key as keyof T]
                                        }
                                        class="p-1 text-sm border rounded text-white bg-[#2a2a2a] w-full"
                                    />
                                {:else}
                                    <input
                                        type="text"
                                        bind:value={
                                            editData[column.key as keyof T]
                                        }
                                        class="p-1 text-sm border rounded text-white bg-[#2a2a2a] w-full"
                                    />
                                {/if}
                            {:else}
                                {item[column.key]}
                            {/if}
                        </span>
                    </div>
                {/each}
                {#if ondelete || onupdate}
                    <div class="flex justify-end mt-4 space-x-2">
                        {#if editingId === item.id}
                            <button
                                onclick={saveEdit}
                                class="px-3 py-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                            >
                                Save
                            </button>
                            <button
                                onclick={cancelEdit}
                                class="px-3 py-1 text-sm text-gray-400 hover:text-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                        {:else}
                            {#if onupdate}
                                <button
                                    onclick={() => startEdit(item)}
                                    class="px-3 py-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                >
                                    Edit
                                </button>
                            {/if}
                            {#if ondelete}
                                <button
                                    onclick={() => handleDelete(item.id)}
                                    class="px-3 py-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                                >
                                    Delete
                                </button>
                            {/if}
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
        {#if data.length === 0}
            <div class="text-center text-gray-400 py-8">No data found.</div>
        {/if}
    </div>

    <!-- Desktop Table View -->
    <div class="hidden md:block overflow-x-auto shadow-md rounded-lg">
        <table class="w-full text-sm text-left text-white">
            <thead class="text-xs text-gray-700 uppercase bg-[#1a1a1a]">
                <tr>
                    {#each columns as column}
                        <th scope="col" class="px-6 py-3 text-white">
                            {column.label}
                        </th>
                    {/each}
                    {#if ondelete || onupdate}
                        <th scope="col" class="px-6 py-3 text-white">Actions</th
                        >
                    {/if}
                </tr>
            </thead>
            <tbody>
                {#each data as item}
                    <tr
                        class="bg-[#1a1a1a] border-b border-gray-700 hover:bg-[#252525] transition-colors"
                    >
                        {#each columns as column}
                            <td
                                class="px-6 py-4 font-medium text-white whitespace-nowrap"
                            >
                                {#if editingId === item.id}
                                    {#if column.type === "select"}
                                        <select
                                            bind:value={
                                                editData[column.key as keyof T]
                                            }
                                            class="p-1 text-sm border text-white bg-[#2a2a2a] w-full"
                                        >
                                            {#each column.options || [] as option}
                                                <option value={option}
                                                    >{option}</option
                                                >
                                            {/each}
                                        </select>
                                    {:else if column.type === "number"}
                                        <input
                                            type="number"
                                            bind:value={
                                                editData[column.key as keyof T]
                                            }
                                            class="p-1 text-sm border text-white bg-[#2a2a2a] w-full"
                                        />
                                    {:else}
                                        <input
                                            type="text"
                                            bind:value={
                                                editData[column.key as keyof T]
                                            }
                                            class="p-1 text-sm border text-white bg-[#2a2a2a] w-full"
                                        />
                                    {/if}
                                {:else}
                                    {item[column.key]}
                                {/if}
                            </td>
                        {/each}
                        {#if ondelete || onupdate}
                            <td class="px-6 py-4 font-medium whitespace-nowrap">
                                {#if editingId === item.id}
                                    <button
                                        onclick={saveEdit}
                                        class="text-green-400 hover:text-green-300 mr-2 cursor-pointer"
                                        >Save</button
                                    >
                                    <button
                                        onclick={cancelEdit}
                                        class="text-gray-400 hover:text-gray-300 cursor-pointer"
                                        >Cancel</button
                                    >
                                {:else}
                                    {#if onupdate}
                                        <button
                                            onclick={() => startEdit(item)}
                                            class="text-blue-400 hover:text-blue-300 mr-2 cursor-pointer"
                                            >Edit</button
                                        >
                                    {/if}
                                    {#if ondelete}
                                        <button
                                            onclick={() =>
                                                handleDelete(item.id)}
                                            class="text-red-400 hover:text-red-300 cursor-pointer"
                                            >Delete</button
                                        >
                                    {/if}
                                {/if}
                            </td>
                        {/if}
                    </tr>
                {/each}
                {#if data.length === 0}
                    <tr class="bg-[#1a1a1a] border-b border-gray-700">
                        <td
                            colspan={columns.length +
                                (ondelete || onupdate ? 1 : 0)}
                            class="px-6 py-4 text-center text-gray-400"
                            >No data found.</td
                        >
                    </tr>
                {/if}
            </tbody>
        </table>
    </div>
</div>
