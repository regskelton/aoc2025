const controller = function () {

    function processRange( start, stop) {

        let total=0;

        console.log(`Processing ${start} to ${stop}`);

        //stop= start + 10;

        for( let x= start; x<= stop; x++) {
            const xStr = "" + x;


            let repeat = false;
            for (let repeats = 2; repeats <= xStr.length && !repeat; repeats++) {

                // number to be tested must be a multiple of the length of the repeated sequence
                if ((xStr.length % repeats) === 0) {
                    repeat = true;

                    const sec = xStr.length / repeats;

                    for (let c = 0; c < sec && repeat; c++) {
                        for (let r = 1; r < repeats && repeat; r++) {
                            repeat = xStr.charAt(c) === xStr.charAt(c + r * sec);

                            //console.log( `Tested ${xStr} for ${repeats} reps: ${c}, ${r}, ${sec}: ${repeat} ${xStr.charAt(c)}, ${xStr.charAt( c + r * sec)}`)
                        }
                    }

                }

                if (repeat) {
                    total += x;
                }
            }

            //console.log(`${x} ${repeat?'':'no'} repeat`)
        }

        return total;
    }

    function runTests() {
        const tData = [
            {start: 11, stop: 22, total: 33, part2: false},
            {start: 95, stop: 115, total: 210, part2: true},
        ]

        for (let i=0; i < tData.length; i++) {
            const data= tData[i];

            const res = processRange(data.start, data.stop);

            console.assert(res === data.total, `test ${i}, data ${data.start},${data.stop},${data.total}, res ${res}`);
        }
    }

    function processLines(filename, part2 = false) {
        console.log('Process lines from ' + filename);

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
                let total=0;

                const lines = xmlhttp.responseText.split(',');

                for (const line of lines) {
                    const range= line.split('-');

                    total+= processRange( parseInt(range[0]), parseInt(range[1]));
                }

                console.log(`Total= ${total}`);
            }
        }

        xmlhttp.open("GET", filename, true);
        xmlhttp.send();
    }

    return {
        init: function () {
            console.log('controller init');

            //runTests();

            //processLines('example.txt');
            //processLines('example.txt', true);
            //processLines('input.txt');
            processLines('input.txt', true);
        }
    }
}();

controller.init();