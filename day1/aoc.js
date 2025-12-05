const controller = function () {


    function moveDial(from, dist, part2) {
        let zeroes = 0;
        let dial = from + dist

        if (dial < 0) {
            while (dial < 0) {
                if (part2 && from !== 0) {
                    zeroes++;
                }

                from = 1;

                dial += 100;
            }
        } else if (dial > 99) {
            while (dial > 99) {
                if (part2 && (dial !== 100)) {
                    zeroes++;
                }

                dial -= 100;
            }
        }

        if (dial === 0) zeroes++

        console.log(`${from} ${dist} -> ${dial} ${zeroes}`)

        return {newDial: dial, zeroes: zeroes}
    }

    function runTests() {
        const tData = [
            {dist: -68, newDial: 82, zeroes: 0, part2: false},
            {dist: -30, newDial: 52, zeroes: 0, part2: false},
            {dist: 48, newDial: 0, zeroes: 1, part2: false},
            {dist: -5, newDial: 95, zeroes: 0, part2: false},
            {dist: 60, newDial: 55, zeroes: 0, part2: false},
            {dist: -55, newDial: 0, zeroes: 1, part2: false},
            {dist: -1, newDial: 99, zeroes: 0, part2: false},
            {dist: -99, newDial: 0, zeroes: 1, part2: false},
            {dist: 14, newDial: 14, zeroes: 0, part2: false},
            {dist: -82, newDial: 32, zeroes: 0, part2: false},
            {dist: 18, newDial: 50, zeroes: 0, part2: false},
            {dist: -68, newDial: 82, zeroes: 1, part2: true},
            {dist: -30, newDial: 52, zeroes: 0, part2: true},
            {dist: 48, newDial: 0, zeroes: 1, part2: true},
            {dist: -5, newDial: 95, zeroes: 0, part2: true},
            {dist: 60, newDial: 55, zeroes: 1, part2: true},
            {dist: -55, newDial: 0, zeroes: 1, part2: true},
            {dist: -1, newDial: 99, zeroes: 0, part2: true},
            {dist: -99, newDial: 0, zeroes: 1, part2: true},
            {dist: 14, newDial: 14, zeroes: 0, part2: true},
            {dist: -82, newDial: 32, zeroes: 1, part2: true}
        ]

        let dial = 50

        console.log(`Iterating ${tData.length} items`)
        console.log(`First item ${tData[0].dist},${tData[0].newDial},${tData[0].zeroes}`)

        for (let i=0; i < tData.length; i++) {
            const data= tData[i];

            const res = moveDial(dial, data.dist, data.part2);

            console.assert(res.newDial === data.newDial, `test ${i}, newDial error. dial ${dial}, data ${data.dist},${data.newDial},${data.zeroes}, res ${res.newDial},${res.zeroes}`);
            console.assert(res.zeroes === data.zeroes, `test ${i}, zeroes error. dial ${dial}, data ${data.dist},${data.newDial},${data.zeroes}, res ${res.newDial},${res.zeroes}`);

            dial = res.newDial;
        }
    }

    function processLines(filename, part2 = false) {
        console.log('Process lines from ' + filename);

        const xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {

                const lines = xmlhttp.responseText.split(/\r?\n/);

                let dial = 50;
                let zeroes = 0;

                for (const line of lines) {
                    const dir = line.charAt(0);

                    let dist = parseInt(line.substring(1, line.length));

                    if (dir === 'L') dist = -dist;

                    let changed = moveDial(dial, dist, part2);

                    dial = changed.newDial;
                    zeroes += changed.zeroes;
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

            //runTests();

            //processLines('example.txt');
            //processLines('example.txt', true);
            //processLines('input.txt');
            processLines('input.txt', true);
        }
    }
}();

controller.init();