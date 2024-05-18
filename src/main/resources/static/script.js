function checkFiles(files) {
    console.log(files);

    if (files.length != 1) {
        alert("Bitte genau eine Datei hochladen.")
        return;
    }

    const fileSize = files[0].size / 1024 / 1024; // in MiB
    if (fileSize > 10) {
        alert("Datei zu gross (max. 10Mb)");
        return;
    }

    const answerPart = document.getElementById("answerPart");
    const jsonDisplayPart = document.getElementById("jsonDisplayPart");
    const preview = document.getElementById("preview");

    answerPart.style.visibility = "visible";
    const file = files[0];

    // Preview
    if (file) {
        preview.src = URL.createObjectURL(files[0])
    }

    // Upload
    const formData = new FormData();
    formData.append("image", file);

    fetch('/analyze', {
        method: 'POST',
        headers: {
        },
        body: formData
    }).then(
        response => response.json()
    ).then(
        data => {
            console.log(data);
            displayJsonData(data);
        }
    ).catch(
        error => console.log(error)
    );

    function displayJsonData(data) {
        jsonDisplayPart.style.visibility = "visible";
        const jsonDisplay = document.getElementById("jsonDisplay");
        jsonDisplay.innerHTML = ""; // Clear previous data
        data.forEach(item => {
            const row = document.createElement("tr");
            const classNameCell = document.createElement("td");
            classNameCell.textContent = item.className;
            const probabilityCell = document.createElement("td");
            probabilityCell.textContent = item.probability.toFixed(4); // Format probability to 4 decimal places
            row.appendChild(classNameCell);
            row.appendChild(probabilityCell);
            jsonDisplay.appendChild(row);
        });
    }
}