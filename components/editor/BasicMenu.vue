<template>
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
        <div class="menubar">
            <button
                class="menubar__button"
                :class="{ 'is-active': isActive.bullet_list() }"
                @click="commands.bullet_list"
            >
                <icon name="list-ul" />
            </button>
            <button
                class="menubar__button"
                :class="{ 'is-active': isActive.ordered_list() }"
                @click="commands.ordered_list"
            >
                <icon name="list-ol" />
            </button>
            <button
                class="menubar__button"
                :class="{ 'is-active': isActive.blockquote() }"
                @click="commands.blockquote"
            >
                <icon name="quote-right" />
            </button>
            <button
                class="menubar__button"
                :class="{ 'is-active': isActive.code_block() }"
                @click="commands.code_block"
            >
                <icon name="file-code" />
            </button>
            <button class="menubar__button" @click="commands.horizontal_rule">
                <icon name="ruler-horizontal" />
            </button>
            <button class="menubar__button" @click="commands.undo">
                <icon name="undo-alt" />
            </button>
            <button class="menubar__button" @click="commands.redo">
                <icon name="redo" />
            </button>
            <slot name="saveButton"></slot>
        </div>
    </editor-menu-bar>
</template>

<script>
import { EditorMenuBar } from "tiptap";
import Icon from "~/components/shared/Icon";

export default {
    components: { EditorMenuBar, Icon },
    props: {
        editor: Object,
    },
};
</script>
