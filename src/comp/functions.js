const tags = "Coding Community Announcement Event Funny Comedy Svelte Framework JS HTML CSS Backend Discussion Question Advice Story".split(" ");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomizeNameAndTags() {
    const r = (max) => Math.floor(Math.random() * max);
    let user = "";
    let newtags = [null, null, null];
    switch (r(9)) {
        case 0:
            user = "James Jameson";
            break;
        case 1:
            user = "Monkey Man";
            break;
        case 2:
            user = "Matteo Paz";
            break;
        case 3:
            user = "Hermione Granger";
            break;
        case 4:
            user = "Guest User";
            break;
        case 5:
            user = "John Sandman";
            break;
        case 6:
            user = "Aelbuchert Einschtiegn";
            break;
        case 7:
            user = "Buggs Bunny";
            break;
        case 8:
            user = "The Unspeakable One";
            break;
    }
    const tagger = () => {
        for (let i = 0; i < 3; i++) {
            newtags[i] = tags[r(16)];
        }
    }
    let empty = true;
    while (empty) {
        tagger();
        newtags = newtags.filter(e => e !== null);
        newtags = [...new Set(newtags)];
        if (!newtags[0] && !newtags[1] && !newtags[2]) {
            empty = true;
        } else {
            empty = false;
        }
    }
    return [user, newtags];
}

export { capitalizeFirstLetter, randomizeNameAndTags };