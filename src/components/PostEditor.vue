<template>
  <form @submit.prevent="save">
    <div>
      <textarea
        v-model.lazy="postText"
        @blur="$v.postText.$touch()"
        cols="30" rows="10"
        class="form-input text-max"
        ></textarea>
        <template v-if="$v.postText.$error">
          <span v-if="$v.postText.required" class="form-error">Your comment is required</span>
          <span v-else-if="$v.postText.minLength" class="form-error">Your comment must be at least 10 characters long</span>
        </template>
    </div>
    <div class="form-actions">
      <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{isUpdate ? 'Update' : 'Submit post'}}</button>
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
import {required, minLength} from 'vuelidate/lib/validators'
export default {
  props: {
    threadId: {
      required: false
    },
    post: {
      type: Object,
      validator: obj => {
        const keyIsValid = typeof obj['.key'] === 'string'
        const textIsValid = typeof obj.text === 'string'
        return keyIsValid && textIsValid
      }
    }
  },
  validations: {
    postText: {
      required,
      minLength: minLength(10)
    }
  },
  data () {
    return {
      postText: this.post ? this.post.text : ''
    }
  },

  computed: {
    isUpdate () {
      return !!this.post
    }
  },

  methods: {
    ...mapActions('posts', ['createPost', 'updatePosts']),

    save () {
      // call create or update conditionally
      this.persist()
        .then(post => {
          this.$emit('save', {post})
        })
    },

    cancel () {
      this.$emit('cancel')
    },

    create () {
      const post = {
        text: this.postText,
        threadId: this.threadId
      }

      this.postText = ''

      return this.createPost(post)
    },

    update () {
      const payload = {
        id: this.post['.key'],
        text: this.postText
      }

      return this.updatePost(payload)
    },

    persist () {
      return this.isUpdate ? this.update() : this.create()
    }
  }
}
</script>

<style>
  .text-max {
    width: 100%;
    min-width: 750px;
    padding: 7px;
  }
</style>
