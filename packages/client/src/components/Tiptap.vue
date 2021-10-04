<template>
  <div>
    <bubble-menu
      class="bubble-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        Bold
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        Italic
      </button>
      <button
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        Strike
      </button>
    </bubble-menu>

    <floating-menu
      class="floating-menu"
      :tippy-options="{ duration: 100 }"
      :editor="editor"
      v-if="editor"
    >
      <button
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        H1
      </button>
      <button
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        H2
      </button>
      <button
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'is-active': editor.isActive('bulletList') }"
      >
        Bullet List
      </button>
    </floating-menu>
    <editor-content :editor="editor" />
    <div class="tiptap--bottom">
      <div
        v-if="editor"
        :class="{
          'character-count': true,
          'character-count--warning': editor.getCharacterCount() === limit,
        }"
      >
        <svg
          height="20"
          width="20"
          viewBox="0 0 20 20"
          class="character-count__graph"
        >
          <circle r="10" cx="10" cy="10" fill="#e9ecef" />
          <circle
            r="5"
            cx="10"
            cy="10"
            fill="transparent"
            stroke="currentColor"
            stroke-width="10"
            :stroke-dasharray="`calc(${percentage} * 31.4 / 100) 31.4`"
            transform="rotate(-90) translate(-20)"
          />
          <circle r="6" cx="10" cy="10" fill="white" />
        </svg>

        <div class="character-count__text">
          {{ editor.getCharacterCount() }}/{{ limit }} simbolių
        </div>
      </div>
      <button @click.prevent="send">Siųsti</button>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import axios from "axios";

export default {
  components: {
    EditorContent,
    BubbleMenu,
    FloatingMenu,
  },
  props: ["jarCode"],
  data() {
    return {
      editor: null,
      limit: 280,
    };
  },
  methods: {
    async send() {
      const jarCode = this.jarCode;
      const { data } = await axios.post("/api/posts/new", {
        withCredentials: true,
        jarCode,
        content: this.editor.getHTML(),
      });
      console.log("data:", data);
    },
  },
  beforeMount() {
    this.editor = new Editor({
      content: "",
      extensions: [
        StarterKit,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        CharacterCount.configure({
          limit: this.limit,
        }),
        Placeholder.configure({
          placeholder: "Palikite komentarą apie įmonę",
        }),
      ],
    });
  },

  beforeUnmount() {
    this.editor.destroy();
  },
  computed: {
    percentage() {
      return Math.round((100 / this.limit) * this.editor.getCharacterCount());
    },
  },
};
</script>
<style lang="scss">
.is-active {
  background-color: black;
  color: white;
}
.ProseMirror {
  background-color: rgb(236, 230, 230);
  border: 1px solid rgb(204, 204, 204);
  border-radius: 0.5rem;
  padding: 0.5rem;
  width: 300px;
  min-height: 150px;
  outline: none;
  p,
  h1,
  h2,
  h3 {
    text-align: left;
  }
  ul {
    padding-left: 1.5rem;
  }
}
.ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #8c8d8f;
  pointer-events: none;
  height: 0;
}
.tiptap--bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;

  .character-count {
    display: flex;
    align-items: center;
    margin-right: 0.5rem;
    svg {
      margin-right: 0.5rem;
    }
  }
  button {
    color: #000;
    text-decoration: none;
    background-color: white;
    border: 1px solid #000;
    padding: 0.3rem 0.8rem;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.8rem;
    &:hover {
      color: #ffc107;
      background-color: #000;
    }
  }
}
</style>
