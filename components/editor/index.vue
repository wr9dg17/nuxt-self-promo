<template>
    <div class="editor editor-squished">
        <BasicMenu :editor="editor" />
        <BubbleMenu :editor="editor" />
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
    History,
    Blockquote,
    HorizontalRule,
    OrderedList,
    BulletList,
    ListItem,
    CodeBlockHighlight,
    Placeholder,
} from "tiptap-extensions";

import css from "highlight.js/lib/languages/css";
import javascript from "highlight.js/lib/languages/javascript";

import Title from "@/components/editor/components/Title";
import Subtitle from "@/components/editor/components/Subtitle";
import Doc from "@/components/editor/components/Doc";

import BasicMenu from "@/components/editor/BasicMenu";
import BubbleMenu from "@/components/editor/BubbleMenu";

export default {
    components: {
        BasicMenu,
        BubbleMenu,
        EditorContent,
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
            extensions: [
                new Doc(),
                new Title(),
                new Subtitle(),
                new Placeholder({
                    showOnlyCurrent: false,
                    emptyNodeText: (node) => {
                        if (node.type.name === "title") {
                            return "Inspirational title";
                        }
                        if (node.type.name === "subtitle") {
                            return "Some catchy subtitle";
                        }
                        return "Write your story";
                    },
                }),
                new Heading({ levels: [1, 2, 3] }),
                new Bold(),
                new Code(),
                new Italic(),
                new Strike(),
                new Underline(),
                new History(),
                new Blockquote(),
                new HorizontalRule(),
                new OrderedList(),
                new BulletList(),
                new ListItem(),
                new CodeBlockHighlight(),
            ],
        });
    },
    beforeDestroy() {
        this.editor.destroy();
    },
};
</script>

<style></style>
