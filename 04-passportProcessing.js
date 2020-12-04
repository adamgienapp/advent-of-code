let input = document.body.children[0].innerText.split(/\s\n/);
input = input.map(x => x.split(/:|,|\n|\s/));

let findValid = () => {
    let validCount = 0;

    for (let i = 0; i < input.length; i++) {
        let id = input[i];
        let [a,b,c,d,e,f,g] = [
            id.indexOf('byr'),
            id.indexOf('iyr'),
            id.indexOf('eyr'),
            id.indexOf('hgt'),
            id.indexOf('hcl'),
            id.indexOf('ecl'),
            id.indexOf('pid')
           ];
        if (a > -1) {
            if (+id[a+1] < 1920 || +id[a+1] > 2002) continue;
        } else {
            continue;
        }
        if (b > -1) {
            if (+id[b+1] < 2010 || +id[b+1] > 2020) continue;
        } else {
            continue;
        }
        if (c > -1) {
            if (+id[c+1] < 2020 || +id[c+1] > 2030) continue;
        } else {
            continue;
        }
        if (d > -1) {
            let unit = id[d+1].slice(-2);
            let hgt = id[d+1].slice(0,-2);
            if (unit === 'cm') {
                if (hgt < 150 || hgt > 193) continue;
            } else if (unit === 'in') {
                if (hgt < 59 || hgt > 76) continue;
            } else {
                continue;
            }
        } else {
            continue;
        }
        if (e > -1) {
            if (id[e+1].length !== 7 || id[e+1][0] !== '#') continue;
        } else {
            continue;
        }
        if (f > -1) {
            if (!['amb','blu','brn','gry','grn','hzl','oth'].includes(id[f+1])) continue;
        } else {
            continue;
        }
        if (g > -1) {
            if (id[g+1].length !== 9) continue;
        } else {
            continue;
        }
        validCount++;
    }

    return validCount;
}

findValid();
// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)