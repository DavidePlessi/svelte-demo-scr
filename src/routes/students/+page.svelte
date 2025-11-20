<script lang="ts">
    import EntityTable from "$lib/components/EntityTable.svelte";
    import EntityForm from "$lib/components/EntityForm.svelte";
    import { StudentService } from "$lib/services/studentService";
    import type { Student, Column, Field, StudentFilter } from "$lib/types";

    import { handleError } from "$lib/utils";

    let students = $state<Student[]>(StudentService.getInstance().get());

    const columns: Column<Student>[] = [
        { key: "firstName", label: "First Name", type: "text" },
        { key: "lastName", label: "Last Name", type: "text" },
        { key: "age", label: "Age", type: "number" },
        { key: "classCode", label: "Class", type: "text" },
    ];

    const fields: Field[] = [
        { name: "firstName", label: "First Name", type: "text" },
        { name: "lastName", label: "Last Name", type: "text" },
        { name: "age", label: "Age", type: "number" },
        { name: "classCode", label: "Class", type: "text" },
    ];

    function handleAddStudent(data: Student) {
        try {
            const newStudent = {
                ...data,
                age: Number(data.age),
            };
            StudentService.getInstance().addStudent(newStudent);
            students = StudentService.getInstance().get();
            return true;
        } catch (error) {
            handleError(error);
            return false;
        }
    }

    function handleFilter(filter: StudentFilter) {
        students = StudentService.getInstance().get(filter);
    }

    function handleDelete(id: string) {
        try {
            StudentService.getInstance().delete(id);
            students = StudentService.getInstance().get();
        } catch (error) {
            handleError(error);
        }
    }

    function handleUpdate(item: Student) {
        try {
            const updatedStudent = {
                ...item,
                age: Number(item.age),
            };
            StudentService.getInstance().update(updatedStudent);
            students = StudentService.getInstance().get();
        } catch (error) {
            handleError(error);
        }
    }
</script>

<div class="space-y-8">
    <h1 class="text-3xl font-bold text-white">Students</h1>
    <div>
        <EntityForm
            {fields}
            onsubmit={handleAddStudent}
            title="Add New Student"
            submitLabel="Add Student"
        />
    </div>
    <div>
        <EntityTable
            data={students}
            {columns}
            onfilter={handleFilter}
            ondelete={handleDelete}
            onupdate={handleUpdate}
        />
    </div>
</div>
