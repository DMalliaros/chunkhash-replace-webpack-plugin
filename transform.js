function transform(template, chunks) {
    let htmlOutput = template;

    for (let chunk of chunks) {
        const { hash, files, names } = chunk;

        for (let file of files) {
            const lastSlash = file.lastIndexOf('/')+1
                , lastDot = file.lastIndexOf('.')
                , extension = file.substring( lastDot + 1)
                , folder =  file.substring(0, lastSlash);

            const fileName = file
                .substring(0, lastDot ) // remove extension
                .substring(lastSlash) // remove folder if exist
                .replace(`.${hash}`,'')
                .replace(hash,'')
            ;

            let extRef = null;
            switch (extension) {
                case 'js': {
                    extRef= "src";
                    break;
                }
                case 'css': {
                    extRef = "href";
                    break;
                }
                default:
                    continue;
            }
            let regex = new RegExp(`(${extRef}=["'].*)(${folder}${fileName}\\.${extension})(["'])`, 'i');

            htmlOutput = htmlOutput.replace(regex, `$1${file}$3`);
        }
    }

    return htmlOutput;
}

module.exports = transform;
