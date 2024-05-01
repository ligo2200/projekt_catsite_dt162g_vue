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
                    <li><router-link to="/cat">Lägg till/Ändra katt</router-link></li>
                    <li><router-link to="/addarticle">Skapa/Ändra artikel</router-link></li>
                    <li><router-link to="/seeallposts">Se alla dina poster</router-link></li>
                </ul>
            </nav>
        </div>
    </aside>
</template>

<style scoped>
ul {
    padding: 8%;
    background: rgba(0, 0, 0, 0.78);
    list-style: none;
    width: 80%;
    box-shadow: 0px 1px 5px rgb(49, 7, 73);
}
li a {
    margin-left: 5px;
    margin-right: 5px;
    transition: color 0.2s;
    padding: 2%;
    color: rgb(170, 103, 233);
}

li a:hover {
    color: white;
}

</style>