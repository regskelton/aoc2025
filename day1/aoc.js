const controller = function () {
    function processLines(filename, part2 = false) {
        console.log('Process lines from ' + filename);

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {

                const lines = xmlhttp.responseText.split(/\r?\n/);

                let dial = 50;
                let zeroes = 0;

                for (const line of lines) {
                    let oldDial = dial;

                    const dir = line.charAt(0);

                    const dist = parseInt(line.substring(1, line.length));

                    if (dir === 'L') dial -= dist; else dial += dist;

                    if( dial < 0) {
                        while (dial < 0) {
                            dial += 100

                            if (part2 && oldDial > 0) {
                                zeroes++;
                            }
                        }
                    } else if (dial > 99) {
                        while (dial > 99) {
                            dial -= 100

                            if (part2 && oldDial <= 99) {
                                zeroes++;
                            }
                        }
                    } else if (dial === 0) zeroes++;

                    console.log(dir + ' ' + dist + ' ' + dial + ' ' + zeroes);
                }

                console.log('Zeroes: ' + zeroes);
            }
        }

        xmlhttp.open("GET", filename, true);
        xmlhttp.send();
    }

    return {
        init: function () {
            console.log('controller init');

            //processLines('example.txt', true);
            //processLines('input.txt');
            processLines('input.txt', true);
        }
    }
}();

controller.init();