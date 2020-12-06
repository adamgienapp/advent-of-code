// Part 1
let input_1 = document.body.children[0].innerText.split('\n\n').map(x => x.replace(/\n/g, ''));

let getQuestionCountsByGroup = (data) => {
    return data.map(x => new Set(x).size);
}

let part1 = getQuestionCountsByGroup(input_1).reduce((a,b) => a + b, 0);


// Part 2
let input_2 = document.body.children[0].innerText.split('\n\n').map(x => x.split('\n'));
input_2[input_2.length - 1].pop();

let getSameQuestionCountByGroup = (data) => {
    return data.map(x => {
        let intersect = new Set([...x[0]]);

        for (let i = 1; i < x.length && intersect.size > 0; i++) {
            let curr = new Set([...x[i]]);
            intersect = new Set([...intersect].filter(j => curr.has(j)));
        }

        return intersect.size;
    });
}

let part2 = getSameQuestionCountByGroup(input_2).reduce((a,b) => a + b, 0);