// Input parsing
let input = document.body.children[0].innerText
                .split('\n')
                .slice(0, -1)
                .map(num => +num);


//Part 1
let checkValidity = (num, set) => {
    for (let int of set) {
        if (set.has(num - int)) return true;
    }
    return false;
}

let findFirstInvalidNumberAndIndex = (nums, preamble) => {
    let currNums = new Set([...nums.slice(0, preamble)]);
    let i = preamble;

    while (i < nums.length) {
        if (checkValidity(nums[i], currNums)) {
            currNums.delete(nums[i - preamble]);
            currNums.add(nums[i]);
            i++;
        } else {
            break;
        }
    }

    return [nums[i], i];
}

let firstInvalid = findFirstInvalidNumber(input, 25);

let part1 = firstInvalid[0];


//Part 2
let findContiguousSet = (nums, target, maxIdx) => {
    let [l, r] = [0, 1];
    let sum = nums[l] + nums[r];

    while (r <= maxIdx) {
        if (sum === target) {
            return nums.slice(l, r + 1);
        }
        if (sum < target) {
            r++;
            sum += nums[r];
        } else if (sum > target) {
            sum -= nums[l];
            l++;
        }
    }

    return 'No contiguous set exists';
}

let contiguousSet = findContiguousSet(input, firstInvalid[0], firstInvalid[1]);

let part2 = Math.max(...contiguousSet) + Math.min(...contiguousSet);