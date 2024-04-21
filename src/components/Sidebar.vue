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
                    <li><router-link to="/cat">Lägg till en katt</router-link></li>
                    <li><router-link to="/seeallcats">Se alla dina katter</router-link></li>
                    <li><router-link to="/addarticle">Skapa artikel</router-link></li>
                </ul>
            </nav>
        </div>
    </aside>
</template>