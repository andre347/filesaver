const chokidar = require("chokidar");
const notifier = require("node-notifier");
const moveFile = require("move-file");
const fs = require("fs");

chokidar.watch("test", { ignored: /[\/\\]\./, awaitWriteFinish: true }).on("all", function(event, path) {
  console.log(event, path);
  // this moves all the JS file
  if (path.match(/.*\.js/)) {
    (async () => {
      try {
        const fileName = path.replace(/.+\//g, "");
        notifier.notify({ title: "File Mover", message: `Change in Download Folder: ${event} ${path}` });
        await moveFile(path, `destination/${fileName}`);
        console.log("The file has been moved");
      } catch (error) {
        console.error(error);
      }
    })();
  }
});
