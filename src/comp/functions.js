function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomizeNameAndTags() {
    const r = () => Math.floor(Math.random() * 9);
    let user = "";
    let tags = [null, null, null];
    switch (r()) {
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
            switch (r()) {
                case 0:
                    tags[i] = "Community";
                    break;
                case 1:
                    tags[i] = "Svelte";
                    break;
                case 2:
                    tags[i] = "CSS";
                    break;
                case 3:
                    tags[i] = "JS";
                    break;
                case 4:
                    tags[i] = "Announcement";
                    break;
                default:
                    continue;
            }
        }
    }
    let empty = true;
    while (empty) {
        tagger();
        tags = tags.filter(e => e !== null);
        tags = [...new Set(tags)];
        if (!tags[0] && !tags[1] && !tags[2]) {
            empty = true;
        } else {
            empty = false;
        }
    }
    return [user, tags];
}

export { capitalizeFirstLetter, randomizeNameAndTags };