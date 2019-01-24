<template>
  <div class="hello">
    <div class="left">
      <h1>{{ renamedTitleProperty }}</h1>
      <form v-on:submit.prevent="onSubmit">
        <input class="link-input" type="text" placeholder="Add a Link" v-model="newLink.url" />
        <input class="link-input" type="text" placeholder="Name" v-model="newLink.name" />
        <button v-on:click="addLink">Add</button>
      </form>
      <ul>
        <li v-for="(link, index) in links" v-on:dblclick="edit(index)" v-bind:key="index">
          <input class="edit" v-if="editIndex == index" type="text" v-model="editedLink.name">
          <input class="edit" v-if="editIndex == index" type="text" v-model="editedLink.url">
          <span v-if="editIndex != index">name: {{link.name}} url: {{link.url}}</span>
          <button class="rm" v-if="editIndex == index" v-on:click="save">Save</button>
          <button class="rm" v-if="editIndex == index" v-on:click="cancel">Cancel</button>
          <button v-on:click="removeLink(index)" v-if="editIndex != index" class="rm">Remove</button>
        </li>
      </ul>
    </div>
    <div class="right">
      <stats/>
    </div>
  </div>
</template>

<script>
import Stats from '@/components/Stats.vue';
import { mapState, mapMutations, mapActions } from 'vuex'

function getNewLink() {
  return {
    url: '',
    name: ''
  }
}

export default {
  name: 'HelloWorld',
  data() {
    console.log('data called')
    return {
      newLink: getNewLink(),
      editIndex: -1,
      editedLink: null
    }
  },
  components: {
    Stats
  },
  computed: {
    ...mapState({
      renamedTitleProperty: 'title',
      links: 'links'
    })
  },
  methods: {
    ...mapMutations(['doAddLink', 'doUpdateLink']),
    ...mapActions(['asyncDoRemoveLink', 'asyncDoUpdateLink']),
    edit: function(index) {
      this.editIndex = index
      this.editedLink = Object.assign({},this.links[index]) //need to copy object else all vue components will update
      console.log(this.editedLink)
    },
    save: function() {
      // this.links[this.editIndex] = this.editedLink
      this.doUpdateLink({link: this.editedLink, index: this.editIndex})
      this.editIndex = -1
      this.editedLink = null
    },
    cancel: function(e) {
      this.editIndex = -1
      this.editedLink = null
    },
    addLink: function() {
      this.doAddLink(this.newLink)
      this.newLink = getNewLink()
    },
    removeLink: function (link) {
      this.asyncDoRemoveLink(link)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  html, #app, .home {
    height: 100%;
  }
  body {
    background-color: #F4F4F4;
    margin: 0;
    height: 100%;
  }

  .hello {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 100%;
    grid-template-areas:
      "left right";
    height: 100%;
  }

  .left, .right {
    padding: 30px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  ul li {
    padding: 20px;
    background: white;
    margin-bottom: 8px;
  }

  .right {
    grid-area: right;
    background-color: #E9E9E9;
  }

  input {
    border: none;
    padding: 20px;
    width: calc(100% - 40px);
    box-shadow: 0 5px 5px lightgrey;
    margin-bottom: 50px;
    outline: none;
  }

  input.edit {
    width: 60%;
    margin: 0 10px 0 0;
  }

  .rm {
    float: right;
    text-transform: uppercase;
    font-size: .8em;
    background: #f9d0e3;
    border: none;
    padding: 5px;
    color: #ff0076;
    cursor:pointer;
  }

</style>