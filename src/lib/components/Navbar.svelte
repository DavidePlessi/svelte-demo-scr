<script lang="ts">
    import { page } from "$app/state";
</script>

<nav class="text-white p-4 shadow-md bg-[#1a1a1a]">
    <div class="container mx-auto flex justify-between items-center">
        <a href="/" class="text-xl font-bold hover:text-orange-400 transition"
            >SCR</a
        >
        <div class="flex items-center space-x-6">
            <ul class="flex space-x-6">
                <li>
                    <a
                        href="/"
                        class="hover:text-orange-300 transition {page.url
                            .pathname === '/'
                            ? 'text-orange-400 font-semibold'
                            : ''}">Home</a
                    >
                </li>
                <li>
                    <a
                        href="/students"
                        class="hover:text-orange-300 transition {page.url
                            .pathname === '/students'
                            ? 'text-orange-400 font-semibold'
                            : ''}">Students</a
                    >
                </li>
                <li>
                    <a
                        href="/teachers"
                        class="hover:text-orange-300 transition {page.url
                            .pathname === '/teachers'
                            ? 'text-orange-400 font-semibold'
                            : ''}">Teachers</a
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>
