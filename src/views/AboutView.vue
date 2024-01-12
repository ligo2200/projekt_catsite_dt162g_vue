<script>

</script>

<template>
    <main>
        <h1>Om oss</h1>
        <div>
            <p>Vi som startade den här webbplatsen är ett härligt kompisgäng med stor kärlek för katter.
                Eftersom vi bor långt ifrån varandra var det svårt att få se varandras pälsklingar så mycket som vi ville,
                så vi bestämde oss för att dela med oss av våra katter till varandra över nätet istället och därav kom den
                här webbplatsen till.
            </p>
            <img src="@/assets/images/vanner.webp" alt="Bild på vänner som pratar">
        </div>
        <div>
            <img src="@/assets/images/katt.webp" alt="Bild på vänner som pratar">
            <p>
                På den här webbplatsen kan du hitta artiklar om katter, till exempel om specifika beteenden, raser med mera.
                Som medlem kan du välja att göra poster om dina katter och dela dem med andra människor.
                Det kan vara extra nyttigt om en katt försvinner så att ett signalement finns att tillgå lätt och smidigt.
            </p>
        </div>
        <p class="welcome">
            Varmt välkommen hit!
        </p>

    </main>
</template>

<style scoped>
main {
    text-align: center;
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

div {
    width: 75%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

p {
    width: 50%;
}

.welcome {
    font-size: 1.8em;
    margin-top: 4%;
    margin-bottom: 4%;
}</style>
