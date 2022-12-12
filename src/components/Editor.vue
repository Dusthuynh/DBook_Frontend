<!-- :class="{ 'is-active ': editor.isActive('link') }" -->
<template>
  <div v-if="editor">
    <div class="extension-section mb-2">
      <button @click="addImage" class="btn btn-sm btn-outline-dark">
        setImage
      </button>
      <button
        @click="setLink"
        :class="
          editor.isActive('link')
            ? 'is-active btn btn-sm btn-outline-dark'
            : 'btn btn-sm btn-outline-dark'
        "
      >
        setLink
      </button>
      <button
        @click="editor.chain().focus().unsetLink().run()"
        :disabled="!editor.isActive('link')"
        class="btn btn-sm btn-outline-dark"
      >
        unsetLink
      </button>
    </div>
    <editor-content :editor="editor" />
  </div>
</template>

<script lang="js">
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Link from '@tiptap/extension-link'
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      editor: null,
    };
  },

  methods: {
    addImage() {
      const url = window.prompt("URL");

      if (url) {
        this.editor.chain().focus().setImage({ src: url }).run();
      }
    },
    setLink() {
      const previousUrl = this.editor.getAttributes('link').href
      const url = window.prompt('URL', previousUrl)

      // cancelled
      if (url === null) {
        return
      }

      // empty
      if (url === '') {
        this.editor
          .chain()
          .focus()
          .extendMarkRange('link')
          .unsetLink()
          .run()

        return
      }

      // update link
      this.editor
        .chain()
        .focus()
        .extendMarkRange('link')
        .setLink({ href: url })
        .run()
    },
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit, Document, Paragraph, Text, Image, Dropcursor, Link.configure({
          openOnClick: false,
        })],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script>
<style lang="css">
/* Basic editor styles */
.ProseMirror > * + * {
  margin-top: 0.75em;
}
.ProseMirror img {
  max-width: 100%;
  height: auto;
}
.ProseMirror img.ProseMirror-selectednode {
  outline: 3px solid #68cef8;
}
.ProseMirror a {
  color: #68cef8;
}
.ProseMirror code {
  font-size: 0.9rem;
  padding: 0.25em;
  border-radius: 0.25em;
  background-color: rgba(97, 97, 97, 0.1);
  color: #616161;
  box-decoration-break: clone;
}
.extension-section button {
  margin-right: 0.5rem;
}
</style>

<!-- <template>
  <editor-content :editor="editor" />
</template>

<script lang="js">
import StarterKit from "@tiptap/starter-kit";
import { Editor, EditorContent } from "@tiptap/vue-3";

export default {
  components: {
    EditorContent,
  },

  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },

  emits: ["update:modelValue"],

  data() {
    return {
      editor: null,
    };
  },

  watch: {
    modelValue(value) {
      // HTML
      const isSame = this.editor.getHTML() === value;

      // JSON
      // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

      if (isSame) {
        return;
      }

      this.editor.commands.setContent(value, false);
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [StarterKit],
      content: this.modelValue,
      onUpdate: () => {
        // HTML
        this.$emit("update:modelValue", this.editor.getHTML());

        // JSON
        // this.$emit('update:modelValue', this.editor.getJSON())
      },
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
};
</script> -->
