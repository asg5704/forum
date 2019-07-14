<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model.lazy="form.title"
        @blur="$v.form.title.$touch()"
        type="text" id="thread_title" class="form-input" name="title">
      <template v-if="$v.form.title.$error">
        <span v-if="!$v.form.title.minLength" class="form-error">The title needs to be 10 characters long</span>
      </template>
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        id="thread_content"
        v-model="form.text"
        @blur="$v.form.text.$touch()"
        class="form-input"
        name="content"
        rows="8"
        cols="140">
      </textarea>
      <template v-if="$v.form.text.$error">
        <span v-if="!$v.form.text.minLength" class="form-error">The text needs to be 60 characters long. {{charactersLong}} characters left</span>
      </template>
    </div>

    <div class="btn-group">
      <button @click.prevent="cancel" class="btn btn-ghost">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">{{isUpdate ? 'Update' : 'Publish'}} </button>
    </div>
  </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(10)
      },
      text: {
        minLength: minLength(60)
      }
    }
  },
  data () {
    return {
      form: {
        title: this.title,
        text: this.text
      }
    }
  },

  methods: {
    // Options:
    // 1. Emit event and let parent component handle it
    // 2. Dispatch directly in component
    save () {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        return
      }
      return this.$emit('save', {title: this.form.title, text: this.form.text})
    },

    cancel () {
      this.$emit('cancel')
    }
  },

  computed: {
    isUpdate () {
      return !!this.title
    },
    charactersLong () {
      return 60 - this.form.text.length
    }
  }
}
</script>

<style>

</style>
