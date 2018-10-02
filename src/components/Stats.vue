<template>
  <div class="stats">
    <h1>A different component</h1>
    <p>There are currently {{ countLinks }} links</p>
    <ul>
        <li v-for="(link, index) in links" v-bind:key="index">
            {{link.name}} : {{link.url}}
        </li>
    </ul>
    <button v-on:click="removeAllLinks">Remove all links</button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'

export default {
  name: 'Stats',
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapGetters([
      'countLinks'
    ]),
    ...mapState(['links'])
  },
  methods: {
    ...mapActions(['asyncDoRemoveAll']),
    removeAllLinks() {
      this.msg = 'Removing links...'
      this.asyncDoRemoveAll().then(() => {
        this.msg = 'Links removed'
      });
    }
  }
}
</script>

button {
    padding: 10px;
    margin-top: 30px;
    width: 100%;
    background: none;
    border: 1px solid lightgray;
    outline: 0;
    cursor: pointer;
}