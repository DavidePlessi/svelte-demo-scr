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

<div class="overflow-x-auto shadow-md">
    <table class="w-full text-sm text-left text-white">
        <thead class="text-xs text-gray-700 uppercase bg-[#1a1a1a]">
            <tr>
                {#each columns as column}
                    <th scope="col" class="px-6 py-3 text-white">
                        <div class="flex flex-col space-y-2">
                            <span>{column.label}</span>
                            {#if onfilter}
                                {#if column.type === "select"}
                                    <select
                                        bind:value={
                                            filters[column.key as keyof TFilter]
                                        }
                                        onchange={handleFilterChange}
                                        class="p-1 text-xs border rounded text-white font-normal"
                                    >
                                        <option value="" class="bg-[#1a1a1a]"
                                            >All</option
                                        >
                                        {#each column.options || [] as option}
                                            <option
                                                value={option}
                                                class="bg-[#1a1a1a]"
                                                >{option}</option
                                            >
                                        {/each}
                                    </select>
                                {:else if column.type === "number"}
                                    <input
                                        type="number"
                                        bind:value={
                                            filters[column.key as keyof TFilter]
                                        }
                                        oninput={handleFilterChange}
                                        placeholder="Filter..."
                                        class="p-1 text-xs border rounded text-white font-normal w-full"
                                    />
                                {:else}
                                    <input
                                        type="text"
                                        bind:value={
                                            filters[column.key as keyof TFilter]
                                        }
                                        oninput={handleFilterChange}
                                        placeholder="Filter..."
                                        class="p-1 text-xs border rounded text-white font-normal w-full"
                                    />
                                {/if}
                            {/if}
                        </div>
                    </th>
                {/each}
                {#if ondelete || onupdate}
                    <th scope="col" class="px-6 py-3 text-white">Actions</th>
                {/if}
            </tr>
        </thead>
        <tbody>
            {#each data as item}
                <tr class="bg-[#1a1a1a] border-b hover:bg-[#1a1a1a]">
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
                                        class="p-1 text-sm border rounded text-white w-full"
                                    >
                                        {#each column.options || [] as option}
                                            <option
                                                value={option}
                                                class="bg-[#1a1a1a]"
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
                                        class="p-1 text-sm border rounded text-white w-full"
                                    />
                                {:else}
                                    <input
                                        type="text"
                                        bind:value={
                                            editData[column.key as keyof T]
                                        }
                                        class="p-1 text-sm border rounded text-white w-full"
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
                                    class="text-green-200 hover:text-green-400 mr-2 cursor-pointer"
                                    >Save</button
                                >
                                <button
                                    onclick={cancelEdit}
                                    class="text-gray-200 hover:text-gray-400 cursor-pointer"
                                    >Cancel</button
                                >
                            {:else}
                                {#if onupdate}
                                    <button
                                        onclick={() => startEdit(item)}
                                        class="text-blue-200 hover:text-blue-400 mr-2 cursor-pointer"
                                        >Edit</button
                                    >
                                {/if}
                                {#if ondelete}
                                    <button
                                        onclick={() => handleDelete(item.id)}
                                        class="text-red-200 hover:text-red-400 cursor-pointer"
                                        >Delete</button
                                    >
                                {/if}
                            {/if}
                        </td>
                    {/if}
                </tr>
            {/each}
            {#if data.length === 0}
                <tr class="bg-[#1a1a1a] border-b">
                    <td
                        colspan={columns.length +
                            (ondelete || onupdate ? 1 : 0)}
                        class="px-6 py-4 text-center">No data found.</td
                    >
                </tr>
            {/if}
        </tbody>
    </table>
</div>
