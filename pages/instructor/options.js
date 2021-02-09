// Commands
export const commands = {
    DELETE_BLOG: "DELETE_BLOG",
    EDIT_BLOG: "EDIT_BLOG",
    TOGGLE_FEATURE: "TOGGLE_FEATURE",
};

const createCommand = (name, command) => ({ name, command });

// Options (PUBLISHED)
const DELETE_BLOG = createCommand("Delete Blog", commands.DELETE_BLOG);
const EDIT_BLOG = createCommand("Edit Blog", commands.EDIT_BLOG);
const FEATURE_BLOG = createCommand("Feature Blog", commands.TOGGLE_FEATURE);
const UNFEATURE_BLOG = createCommand("Unfeature Blog", commands.TOGGLE_FEATURE);

// Options (DRAFTS)
const DELETE_DRAFT = createCommand("Delete Draft", commands.DELETE_BLOG);
const EDIT_DRAFT = createCommand("Edit Draft", commands.EDIT_BLOG);

export const createPublishedOptions = (isFeatured) => {
    const options = [EDIT_BLOG, DELETE_BLOG];
    isFeatured ? options.push(UNFEATURE_BLOG) : options.push(FEATURE_BLOG);
    return options;
};

export const createDraftOptions = () => [EDIT_DRAFT, DELETE_DRAFT];
