function quickSort(arr: number[]): number[] {
    //input your code here
    return quick(arr, 0, arr.length - 1);
}

function compare(a: number, b: number): number {
    if (a === b) {
        return 0;
    } else if (a > b) {
        return -1;
    } else {
        return 1;
    }
}

function swap(array: number[], a: number, b: number) {
    const temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}

function quick(array: number[], left: number, right: number) {
    let index;
    if (array.length > 1) {
        index = partition(array, left, right);
        if (left < index - 1) {
            quick(array, left, index - 1);
        }
        if (index < right) {
            quick(array, index, right);
        }
    }
    return array;
}

function partition(array: number[], left: number, right: number): number {
    const pivot = array[Math.floor((right + left) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
        while (compare(array[i], pivot) === -1) {
            i++;
        }

        while (compare(array[j], pivot) === 1) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i;
}

function generateCases(length: number, step: number = 1): number[] {
    const a: number[] = []
    let value = 0
    for (let i = 0; i < length; i++) {
        a.push(value)
        value += step
    }
    let tmp: number
    for (let i = 0; i < length; i++) {
        const f = Math.random() * (length - i)
        const r = i + Math.floor(f)
        tmp = a[r]
        a[r] = a[i]
        a[i] = tmp
    }
    return a
}

function checkRes(arr: number[], step: number): boolean {
    for (let i = 0; i < arr.length - 1; ++i) {
        if (arr[i] + step !== arr[i+1]) return false
    }
    return true
}


function testQuickSort() {
    for (let i = 6; i <= 100000; i = i * 2) {
        const randomStep = Math.ceil(Math.random() * 10)
        const arr = generateCases(i, randomStep)
        const start = Date.now()
        const ret = quickSort(arr)
        const end = Date.now()
        console.log(`Quick sort for ${i} numbers costs ${end - start}ms`)
        if (!checkRes(ret, randomStep)){
            console.log(`Fail`)
            return false
        } else {
            console.log("Passed")
        }
    }
    return true
}

// testQuickSort()
console.log(quickSort([60, 66, 90, 30, 96, 42, 6, 84, 0, 24, 18, 54, 48, 78, 102, 36, 72, 12]));

