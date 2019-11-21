<template>
  <div class="flex flex-col justify-center items-center mt-8 px-4">
    <p class="text-4xl">{{ joke }}</p>

    <button
      title="Get a Joke"
      type="button"
      class="flex md:hidden bg-blue text-white font-bold hover:bg-blue-dark justify-center items-center rounded focus:outline-none h-10 px-3 mt-12"
      @click="getJoke"
    >Gimme Another</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      joke: null
    };
  },
  mounted() {
    this.getJoke();
  },
  methods: {
    getJoke() {
      axios
        .get("/api/dad-joke")
        .then(response => (this.joke = response.data.msg))
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>
