const inputBox = document.getElementById('inputBox');
const output = document.getElementById('output');

function generatePermutations4(numbers) {
    const result = [];
    const helper = (arr, index) => {
        if (index === arr.length - 1) {
            result.push([...arr]);
            return;
        }
        for (let i = index; i < arr.length; i++) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            helper(arr, index + 1);
            [arr[i], arr[index]] = [arr[index], arr[i]];
        }
    };
    helper(numbers.split(''), 0);
    return result.map(arrangement => arrangement.join(''));
}

function generatePermutations10(numbers) {
    const result = [];
    const fixedDigits = numbers.slice(0, 2); 
    const remainingDigits = numbers.slice(2); 

    const helper = (arr, index) => {
        if (index === arr.length - 1) {
            result.push([...arr]);
            return;
        }
        for (let i = index; i < arr.length; i++) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            helper(arr, index + 1);
            [arr[i], arr[index]] = [arr[index], arr[i]]; 
        }
    };

    helper(remainingDigits.split(''), 0); 
    result.forEach(arrangement => {
        arrangement.unshift(...fixedDigits);
    });

    return result.map(arrangement => arrangement.join(''));
}

function generatePermutations16(numbers) {
    const result = [];

    const helper = (arr, index) => {
        if (index === arr.length) {
            result.push([...arr]);
            return;
        }
        for (let i = index; i < arr.length; i++) {
            [arr[i], arr[index]] = [arr[index], arr[i]];
            helper(arr, index + 1);
            [arr[i], arr[index]] = [arr[index], arr[i]];
        }
    };

    if (numbers.length !== 16) {
        throw new Error('Input must be exactly 16 digits.');
    }

    helper(numbers.split(''), 0);
    return result.map(arrangement => arrangement.join(''));
}


function generateArrangements() {
    const inputNumbers = inputBox.value;
    const inputLength = inputNumbers.length;

    try {
        if (inputLength === 4) {
            if (/^\d{4}$/.test(inputNumbers)) {
                const arrangements = generatePermutations4(inputNumbers);
                displayArrangements(arrangements);
            } else {
                output.innerHTML = 'Please enter exactly 4 digits.';
            }
        } else if (inputLength === 10) {
            if (/^98\d{8}$/.test(inputNumbers)) {
                const arrangements = generatePermutations10(inputNumbers);
                displayArrangements(arrangements);
            } else {
                output.innerHTML = 'Please enter 10 digits starting with "98".';
            }
        } 
        if (inputLength === 16) {
            if (/^\d{16}$/.test(inputNumbers)) {
                const arrangements = generatePermutations16(inputNumbers);
                displayArrangements(arrangements);
            } else {
                output.innerHTML = 'Please enter exactly 16 digits.';
            }
        } else {
            output.innerHTML = 'Please enter a valid number of digits (16 digits required).';
        }
    } catch (error) {
        output.innerHTML = error.message; 
    }
}

function displayArrangements(arrangements) {
    const output = document.getElementById('output');
    output.innerHTML = '<p>Possible Arrangements:</p>';
    arrangements.forEach(arrangement => {
        const div = document.createElement('div');
        div.classList.add('arrangement');
        div.textContent = arrangement;
        output.appendChild(div);
    });
}
