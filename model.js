let students = [];
let vampireCount = 0;
let nonVampireCount = 0;

/**
 * Determine whether this student is a vampire or not based on the given information.
 */
function calculateVampire(name, sex, garlic, shadow, complexion, comment, modelType) {
    let isVampire;
    switch (modelType) {
        case "Random Guess": {
            isVampire = isVampireRandom();
            break;
        }

        case "Threshold Based": {
            isVampire = isVampireThreshold(garlic, shadow, complexion);
            break;
        }
    }

    let isVampireText = isVampire ? "IS a vampire!" : "IS NOT a vampire!";

    $("#is_vampire_text").html(name + " " + isVampireText);

    storeStudent(name, sex, garlic, shadow, complexion, comment, isVampire, modelType);
    generateTable(name, sex, garlic, shadow, complexion, comment, isVampire, modelType);
    genPlot(vampireCount, nonVampireCount);
}

/**
 * Stores the student in the student list.
 */
function storeStudent(name, sex, garlic, shadow, complexion, comment, isVampire, modelType) {

    //Find the index of the name provided
    //If the index is not found, simply append to the existing list
    //If the index is found, update with the new information given
    let index = students.findIndex(function (e) {
        return e.name === name;
    });

    if (index === -1) {
        students.push({
            name: name,
            sex: sex,
            garlic: garlic,
            shadow: shadow,
            complexion: complexion,
            comment: comment,
            isVampire: isVampire,
            modelType: modelType
        });
    } else {
        let row = students[index];
        row.name = name;
        row.sex = sex;
        row.garlic = garlic;
        row.shadow = shadow;
        row.complexion = complexion;
        row.comment = comment;
        row.isVampire = isVampire;
        row.modelType = modelType;
        students[index] = row;
    }
}

/**
 * Generates the table from the students array.
 */
function generateTable() {
    //Grab and clear the table
    let table = $("#classmate_table tbody");
    table.empty();
    vampireCount = 0;
    nonVampireCount = 0;

    //Get the table DOM object, which we will use to insert rows
    const tableDom = table[0];

    //Loop through the array to generate each table row
    students.forEach(elem => {
        const row = tableDom.insertRow(0);
        const nameCell = row.insertCell(0);
        const sexCell = row.insertCell(1);
        const shadowCell = row.insertCell(2);
        const garlicCell = row.insertCell(3);
        const complexionCell = row.insertCell(4);
        const isVampireCell = row.insertCell(5);
        const modelTypeCell = row.insertCell(6);
        const commentCell = row.insertCell(7);

        // Add some text to the new cells:
        nameCell.innerHTML = elem.name;
        sexCell.innerHTML = elem.sex;
        shadowCell.innerHTML = elem.shadow;
        garlicCell.innerHTML = elem.garlic;
        complexionCell.innerHTML = elem.complexion;
        isVampireCell.innerHTML = elem.isVampire;
        modelTypeCell.innerHTML = elem.modelType;
        commentCell.innerHTML = elem.comment;

        if (elem.isVampire) {
            vampireCount++;
        } else {
            nonVampireCount++;
        }
    });
}

/**
 * Randomly guess if this student is a vampire.
 * @returns {boolean}
 */
function isVampireRandom() {
    return Math.random() > .5;
}

/**
 * Use a threshold to calculate if this student is a vampire.
 * @param garlic
 * @param shadow
 * @param complexion
 * @returns {boolean}
 */
function isVampireThreshold(garlic, shadow, complexion) {
    return (garlic * 3 + shadow * 4 + complexion * 3) > 6;
}

/**
 * Generate a plot that is displayed to the user.
 * Where each parameter is 0 or 1
 */

function genPlot(vampires, nonVampires) {
    let total = vampires + nonVampires;
    let data = [{
        values: [vampires / total, nonVampires / total],
        labels: ['Vampire', 'Not Vampire'],
        type: 'pie'
    }];

    let layout = {
        height: 400,
        width: 500
    };

    Plotly.react('vampire_plot_output', data, layout);
}