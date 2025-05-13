let fileLoc;

if (location.origin === "file://") {
    fileLoc = "local";
} else if (location.hostname.toLowerCase().includes(".github.io")) {
    fileLoc = "gh-pages";
} else if (location.hostname.toLowerCase().includes(".netlify.app")) {
    if (location.hostname.toLowerCase().includes("royalsgamedev.netlify.app")) {
        fileLoc = "netlify-prod";
    } else {
        fileLoc = "netlify-test";
    }
} else {
    fileLoc = "unknown";
}

document.querySelector("#warning-banner").setAttribute("data-loc", fileLoc);