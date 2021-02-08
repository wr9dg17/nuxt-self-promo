// Commands
export const commands = {
    DELETE_BLOG: "DELETE_BLOG",
    EDIT_BLOG: "EDIT_BLOG",
};

const createCommand = (name, command) => ({ name, command });

// Options (PUBLISHED)
const DELETE_BLOG = createCommand("Delete Blog", commands.DELETE_BLOG);
const EDIT_BLOG = createCommand("Edit Blog", commands.EDIT_BLOG);

// Options (DRAFTS)
const DELETE_DRAFT = createCommand("Delete Draft", commands.DELETE_BLOG);
const EDIT_DRAFT = createCommand("Edit Draft", commands.EDIT_BLOG);

export const createPublishedOptions = () => [EDIT_BLOG, DELETE_BLOG];
export const createDraftOptions = () => [EDIT_DRAFT, DELETE_DRAFT];
