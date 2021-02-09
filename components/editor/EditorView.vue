<template>
    <div class="editor editor-squished">
        <EditorContent class="editor__content" :editor="editor" />
    </div>
</template>

<script>
import { Editor, EditorContent } from "tiptap";
import {
    Heading,
    Bold,
    Code,
    Italic,
    Strike,
    Underline,
    Blockquote,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    CodeBlockHighlight,
} from "tiptap-extensions";

import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";

import Title from "@/components/editor/components/Title";
import Subtitle from "@/components/editor/components/Subtitle";
import Doc from "@/components/editor/components/Doc";

export default {
    components: {
        EditorContent,
    },
    props: {
        initialContent: {
            type: String,
            required: true,
        }
    },
    data() {
        return {
            editor: null,
            extensions: [
                new CodeBlockHighlight({
                    languages: {
                        css,
                        javascript,
                    },
                }),
            ],
        };
    },
    mounted() {
        this.editor = new Editor({
            editable: false,
            extensions: [
                new Doc(),
                new Title(),
                new Subtitle(),
                new Heading({ levels: [1, 2, 3] }),
                new Bold(),
                new Code(),
                new Italic(),
                new Strike(),
                new Underline(),
                new Blockquote(),
                new HorizontalRule(),
                new OrderedList(),
                new BulletList(),
                new ListItem(),
                new CodeBlockHighlight(),
            ],
        });

        if (this.initialContent) {
            this.editor.setContent(this.initialContent);
        }
    },
    beforeDestroy() {
        this.editor.destroy();
    },
};
</script>
