import { Node } from "tiptap";

export default class Title extends Node {
    get name() {
        return "title";
    }

    get schema() {
        return {
            content: "inline*",
            // Define how the editor detects your node from parsed HTML
            parseDOM: [
                {
                    tag: "h1",
                },
            ],
            // This is how this node will be rendered
            toDOM: () => ["h1", { class: "title" }, 0],
        };
    }
}
