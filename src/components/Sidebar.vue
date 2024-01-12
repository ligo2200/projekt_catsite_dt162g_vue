<script>

export default {
    name: "Sidebar"
}

</script>

<template>
    <aside class="">
        <div class="aside-cont">

            <nav>
                <ul>
                    <li><router-link to="/home">Hem</router-link></li>
                    <li><router-link to="/addpost">Gör en kattpost</router-link></li>
                    <li><router-link to="/seeallposts">Se alla dina poster</router-link></li>
                    <li><router-link to="/"></router-link></li>
                </ul>
            </nav>
        </div>
    </aside>
</template>