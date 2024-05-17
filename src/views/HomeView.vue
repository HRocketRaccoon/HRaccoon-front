<template>
  <main>
    <div>This is HomePage</div>
    <v-bottom-sheet>
      <template v-slot:activator="{ props }">
        <v-btn text="Click Me" v-bind="props"></v-btn>
      </template>

      <v-card
        text="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut, eos? Nulla aspernatur odio rem, culpa voluptatibus eius debitis dolorem perspiciatis asperiores sed consectetur praesentium! Delectus et iure maxime eaque exercitationem!"
        title="Bottom Sheet"
      ></v-card>
    </v-bottom-sheet>
  </main>
</template>

<script setup></script>
