async function generateArray() {
    const arraySizeInput = document.getElementById("array-size").value;
    const array = Array.from({ length: arraySizeInput }, () => Math.floor(Math.random() * 100) + 1);
    createBars(array);
    document.getElementById("output-container").style.display = "block";
}

function createBars(array) {
    const output = document.getElementById("output");
    output.innerHTML = "";
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${(value / Math.max(...array)) * 100}%`;
        output.appendChild(bar);
    });
}

async function bubbleSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            const bar1 = bars[j];
            const bar2 = bars[j + 1];
            const height1 = parseFloat(bar1.style.height);
            const height2 = parseFloat(bar2.style.height);
            if (height1 > height2) {
                await swapBars(bar1, bar2);
            }
        }
    }
}

async function insertionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let i = 1; i < n; i++) {
        let j = i - 1;
        const key = parseFloat(bars[i].style.height);
        while (j >= 0 && parseFloat(bars[j].style.height) > key) {
            await swapBars(bars[j], bars[j + 1]);
            j--;
        }
    }
}

async function selectionSort() {
    const bars = document.querySelectorAll('.bar');
    const n = bars.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (parseFloat(bars[j].style.height) < parseFloat(bars[minIndex].style.height)) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            await swapBars(bars[i], bars[minIndex]);
        }
    }
}

async function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        let pivotIndex = await partition(arr, left, right);
        await quickSort(arr, left, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, right);
    }
}

async function partition(arr, left, right) {
    let pivotValue = parseFloat(arr[right].style.height);
    let pivotIndex = left;
    for (let i = left; i < right; i++) {
        if (parseFloat(arr[i].style.height) < pivotValue) {
            await swapBars(arr[i], arr[pivotIndex]);
            pivotIndex++;
        }
    }
    await swapBars(arr[pivotIndex], arr[right]);
    return pivotIndex;
}

async function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const mid = Math.floor(arr.length / 2);
    const left = await mergeSort(arr.slice(0, mid));
    const right = await mergeSort(arr.slice(mid));

    return await merge(left, right, arr);
}

async function merge(left, right, arr) {
    let leftIndex = 0, rightIndex = 0, mainIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        const leftValue = parseFloat(left[leftIndex].style.height);
        const rightValue = parseFloat(right[rightIndex].style.height);

        if (leftValue < rightValue) {
            arr[mainIndex++].style.height = left[leftIndex++].style.height;
        } else {
            arr[mainIndex++].style.height = right[rightIndex++].style.height;
        }
    }

    while (leftIndex < left.length) {
        arr[mainIndex++].style.height = left[leftIndex++].style.height;
    }

    while (rightIndex < right.length) {
        arr[mainIndex++].style.height = right[rightIndex++].style.height;
    }

    return arr;
}

async function swapBars(bar1, bar2) {
    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;
    await delay(50);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sort(algorithm) {
    const bars = document.querySelectorAll('.bar');
    let arr = Array.from(bars);

    switch (algorithm) {
        case 'bubble':
            await bubbleSort();
            break;
        case 'insertion':
            await insertionSort();
            break;
        case 'selection':
            await selectionSort();
            break;
        case 'quick':
            await quickSort(arr);
            break;
        case 'merge':
            await mergeSort(arr);
            break;
        default:
            break;
    }
}
