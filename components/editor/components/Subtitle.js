import { Node } from "tiptap";

export default class Subtitle extends Node {
    get name() {
        return "subtitle";
    }

    get schema() {
        return {
            content: "inline*",
            // Define how the editor detects your node from parsed HTML
            parseDOM: [
                {
                    tag: "h2",
                },
            ],
            // This is how this node will be rendered
            toDOM: () => ["h2", { class: "subtitle" }, 0],
        };
    }
}
