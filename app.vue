<template>
    <NuxtPage />
</template>


<script setup lang="ts">


</script>


<style>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: monospace;
}
body{
    body{
    margin-top:20px;
    background:#4c4c4c;
}
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;

}

::-webkit-scrollbar-track {
  -webkit-box-shadow: 5px 5px 5px -5px rgba(0, 0, 0, 0) inset;
  background-color: #111;
  position: absolute;

}

::-webkit-scrollbar-thumb {
  background-color: hsl(0, 0%, 21%);
  background-image: -webkit-gradient(linear, 0 0, 0 100%,
  color-stop(.5, transparent), to(transparent));
  border-radius: 15%;
  position: absolute;

}
::-webkit-scrollbar-thumb:hover {
  background-color: hsl(0, 0%, 20%);
  transition: .3s;
}
</style>