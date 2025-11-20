<script lang="ts">
    import EntityTable from "$lib/components/EntityTable.svelte";
    import EntityForm from "$lib/components/EntityForm.svelte";
    import { TeacherService } from "$lib/services/teacherService";
    import {
        type Teacher,
        type Column,
        type Field,
        Subject,
        type TeacherFilter,
    } from "$lib/types";
    import { handleError } from "$lib/utils";

    let teachers = $state<Teacher[]>(TeacherService.getInstance().get());

    const columns: Column<Teacher>[] = [
        { key: "firstName", label: "First Name", type: "text" },
        { key: "lastName", label: "Last Name", type: "text" },
        {
            key: "subject",
            label: "Subject",
            type: "select",
            options: Object.values(Subject),
        },
    ];

    const fields: Field[] = [
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        {
            name: "subject",
            label: "Subject",
            type: "select",
            options: Object.values(Subject),
        },
    ];

    function handleAddTeacher(data: Teacher) {
        try {
            TeacherService.getInstance().addTeacher(data);
            teachers = TeacherService.getInstance().get();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    function handleFilter(filter: TeacherFilter) {
        teachers = TeacherService.getInstance().get(filter);
    }

    function handleDelete(id: string) {
        try {
            TeacherService.getInstance().delete(id);
            teachers = TeacherService.getInstance().get();
        } catch (error) {
            handleError(error);
        }
    }

    function handleUpdate(item: Teacher) {
        try {
            TeacherService.getInstance().update(item);
            teachers = TeacherService.getInstance().get();
        } catch (error) {
            handleError(error);
        }
    }
</script>

<div class="space-y-8">
    <h1 class="text-3xl font-bold text-white">Teachers</h1>

    <div>
        <EntityForm
            {fields}
            onsubmit={handleAddTeacher}
            title="Add New Teacher"
            submitLabel="Add Teacher"
        />
    </div>
    <div class="lg:col-span-2">
        <EntityTable
            data={teachers}
            {columns}
            onfilter={handleFilter}
            ondelete={handleDelete}
            onupdate={handleUpdate}
        />
    </div>
</div>
