// Function to update the text associated with an image
function updateImageText(index, text) {
    // Update or store the text associated with the image at the specified index
    console.log(`Text for image ${index}: ${text}`);
}

// Function to add custom fields dynamically
function addCustomField() {
    const customFieldsContainer = document.getElementById('customFieldsContainer');

    // Create a new div for the custom field and value
    const customFieldDiv = document.createElement('div');
    customFieldDiv.className = 'custom-field';

    // Create input for custom field
    const customFieldInput = document.createElement('input');
    customFieldInput.type = 'text';
    customFieldInput.placeholder = 'Enter Custom Field';
    customFieldDiv.appendChild(customFieldInput);

    // Create input for custom field value
    const customFieldValueInput = document.createElement('input');
    customFieldValueInput.type = 'text';
    customFieldValueInput.placeholder = 'Enter Value';
    customFieldDiv.appendChild(customFieldValueInput);

    // Append the new custom field to the container
    customFieldsContainer.appendChild(customFieldDiv);
}




// Placeholder function to simulate fetching previous jobs from the database
function getPreviousJobs() {
    // In a real application, you would fetch the data from your database
    // For demonstration purposes, let's return an array of sample jobs
    return [
        {
            clientName: 'Client A',
            clientReference: 'Ref-001',
            ringSize: '7',
            stoneSize: '1 carat',
            shankSize: 'Medium',
            customFields: [{ field: 'Metal', value: 'Gold' }],
            images: ['path/to/image1.png', 'path/to/image2.png'],
            dateTime: '20220201_120000', // Format: YYYYMMDD_HHMMSS
        },
        // Add more sample jobs as needed
    ];
}
// Function to get custom fields dynamically
function getCustomFields() {
    const customFieldsContainer = document.getElementById('customFieldsContainer');
    const customFields = [];

    // Iterate through each custom field div
    const customFieldDivs = customFieldsContainer.querySelectorAll('.custom-field');
    customFieldDivs.forEach((customFieldDiv) => {
        const customFieldInput = customFieldDiv.querySelector('input:first-child');
        const customFieldValueInput = customFieldDiv.querySelector('input:last-child');

        // Get the values and add to the customFields array
        const customField = {
            field: customFieldInput.value,
            value: customFieldValueInput.value,
        };
        customFields.push(customField);
    });

    return customFields;
}

// Function to save data to the local database
function saveToDatabase(data) {
    // Implement logic to save data to the local database
    // For example, you can use IndexedDB or another storage mechanism

    // For demonstration purposes, let's assume there's a function saveJob() that saves a job to the database
    saveJob(data);
}


// Function to load a specific job
function loadJob(job) {
    // Implement logic to load the selected job details
    // For example, load data into form fields
    document.getElementById('clientName').value = job.clientName;
    document.getElementById('clientReference').value = job.clientReference;
    document.getElementById('ringSize').value = job.ringSize;
    document.getElementById('stoneSize').value = job.stoneSize;
    document.getElementById('shankSize').value = job.shankSize;

    // Set custom fields dynamically
    setCustomFields(job.customFields);

    // Display images
    displayImages(job.images);
}

// Function to set custom fields dynamically
function setCustomFields(customFields) {
    const customFieldsContainer = document.getElementById('customFieldsContainer');
    customFieldsContainer.innerHTML = '';

    customFields.forEach((customField) => {
        // Create a new div for the custom field and value
        const customFieldDiv = document.createElement('div');
        customFieldDiv.className = 'custom-field';

        // Create input for custom field
        const customFieldInput = document.createElement('input');
        customFieldInput.type = 'text';
        customFieldInput.placeholder = 'Enter Custom Field';
        customFieldInput.value = customField.field;
        customFieldDiv.appendChild(customFieldInput);

        // Create input for custom field value
        const customFieldValueInput = document.createElement('input');
        customFieldValueInput.type = 'text';
        customFieldValueInput.placeholder = 'Enter Value';
        customFieldValueInput.value = customField.value;
        customFieldDiv.appendChild(customFieldValueInput);

        // Append the new custom field to the container
        customFieldsContainer.appendChild(customFieldDiv);
    });
}


async function generatePDF() {
    // Use browser's print function
            window.print();
}

// Function to reset the form
function resetForm() {
    const resetConfirmation = confirm('Are you sure you want to reset the form? This will clear all entered data.');

    if (resetConfirmation) {
        // Clear all form fields
        document.getElementById('clientName').value = '';
        document.getElementById('clientReference').value = '';
        document.getElementById('ringSize').value = '';
        document.getElementById('stoneSize').value = '';
        document.getElementById('shankSize').value = '';
        document.getElementById('clientInputs').value = '';

        // Clear uploaded images and associated controls
        const imageUploadContainer = document.getElementById('imageUploadContainer');
        imageUploadContainer.innerHTML = '';

        // Clear previous jobs list
        const jobList = document.getElementById('jobList');
        jobList.innerHTML = '';
    }
}

// Function to get dynamic input-value pairs
function getDynamicInputValuePairs() {
    const inputValuePairDivs = document.querySelectorAll('.input-value-pair');
    const inputValues = [];

    inputValuePairDivs.forEach((inputValuePairDiv) => {
        const inputTextArea = inputValuePairDiv.querySelector('.input-text');
        const valueTextArea = inputValuePairDiv.querySelector('.value-text');

        // Add the input-value pair to the array
        inputValues.push({
            text: inputTextArea.value,
            value: valueTextArea.value,
        });
    });

    return inputValues;
}


// Function to save data to a JSON file with a custom file name
function saveData() {
    const data = {
        clientName: document.getElementById('clientName').value,
        clientReference: document.getElementById('clientReference').value,
        ringSize: document.getElementById('ringSize').value,
        stoneSize: document.getElementById('stoneSize').value,
        shankSize: document.getElementById('shankSize').value,
        clientInputs: getDynamicInputValuePairs(),
        images: getUploadedImages(),
    };

    // Filter out properties with empty values
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== '' && v !== null && v !== undefined));

    // Convert the data to a JSON string
    const jsonData = JSON.stringify(filteredData);

    // Prompt the user for the file name
    const fileName = prompt('Enter the file name (include .json extension):', 'saved_data.json');

    if (fileName) {
        // Create a Blob with the JSON data
        const blob = new Blob([jsonData], { type: 'application/json' });

        // Create an anchor element to trigger the download
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}

// Function to load data from a JSON file
function loadData() {
    // Create an input element for file selection
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.addEventListener('change', handleFileSelect);
    input.click();
}



// Function to clear saved data
function clearSavedData() {
    localStorage.removeItem('savedData');
    alert('Saved data cleared successfully!');
}

// Function to delete an uploaded image
function deleteImage(index) {
    const imageContainer = document.getElementById('imageUploadContainer');
    const images = getUploadedImages();

    // Remove the selected image and delete button
    imageContainer.removeChild(imageContainer.childNodes[index * 2]); // Image
    imageContainer.removeChild(imageContainer.childNodes[index * 2]); // Delete button
    images.splice(index, 1);

    // Update local storage
    saveData();
}

// Function to get uploaded images
function getUploadedImages() {
    const imageContainer = document.getElementById('imageUploadContainer');
    const images = [];

    // Iterate through each image
    const imageElements = imageContainer.querySelectorAll('.uploaded-image');
    imageElements.forEach((imageElement) => {
        images.push(imageElement.src);
    });

    return images;
}


// Function to get the current date time as a string
function getCurrentDateTimeString() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
}

// Function to delete an uploaded image and its text
function deleteImage(container) {
    const imageContainer = document.getElementById('imageUploadContainer');
    imageContainer.removeChild(container);
}


function removeInputValuePair(button) {
    // Get the parent div (input-value pair) and remove it
    const inputValuePairDiv = button.parentElement;
    inputValuePairDiv.remove();
}

function addInputValuePair() {
    const inputValuePairContainer = document.getElementById('inputValuePairs');

    // Create a new div for the input and value pair
    const inputValuePairDiv = document.createElement('div');
    inputValuePairDiv.className = 'input-value-pair';

    // Create textarea for input
    const inputTextArea = document.createElement('textarea');
    inputTextArea.className = 'input-key';
    inputTextArea.placeholder = 'Enter Key';
    inputValuePairDiv.appendChild(inputTextArea);

    // Create textarea for value
    const valueTextArea = document.createElement('textarea');
    valueTextArea.className = 'input-value';
    valueTextArea.placeholder = 'Enter Value (up to 300 characters)';
    valueTextArea.maxLength = 300;
    inputValuePairDiv.appendChild(valueTextArea);

    // Create a button to remove the input-value pair
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn'; // Add the remove-btn class
    removeButton.onclick = function () {
        removeInputValuePair(this);
    };
    inputValuePairDiv.appendChild(removeButton);

    // Get the computed style of the first input-value pair
    const computedStyle = window.getComputedStyle(inputValuePairContainer.firstElementChild);

    // Apply the computed style to the dynamically added input-value pair
    inputValuePairDiv.style.width = computedStyle.width;
    inputValuePairDiv.style.marginBottom = computedStyle.marginBottom;

    // Append the new input-value pair to the container
    inputValuePairContainer.appendChild(inputValuePairDiv);
}


// Function to handle image upload
function handleImageUpload(event) {
    const container = document.getElementById('imageUploadContainer');
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageURL = URL.createObjectURL(file);

        // Create a new container for the image and its text
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';

        // Create a new image element
        const imageElement = document.createElement('img');
        imageElement.className = 'uploaded-image';
        imageContainer.appendChild(imageElement);

        // Create a new input for text
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = 'Enter text for this image';
        textInput.className = 'image-text-input';
        imageContainer.appendChild(textInput);

        // Create a new delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-image-btn';
        deleteButton.onclick = function () {
            deleteImage(imageContainer);
        };
        imageContainer.appendChild(deleteButton);

        // Append the new container to the main container
        container.appendChild(imageContainer);

        // Add an event listener to calculate totalImageHeight once the image is loaded
        imageElement.onload = function () {
            calculateTotalImageHeight();
        };

        // Resize the image and set the src attribute
        resizeImage(imageElement, imageURL, 400);
    }
}

// Function to resize the image while maintaining aspect ratio
function resizeImage(imageElement, imageURL, maxWidth) {
    const img = new Image();
    img.src = imageURL;

    img.onload = function () {
        const aspectRatio = img.width / img.height;
        const newWidth = Math.min(maxWidth, img.width);
        const newHeight = newWidth / aspectRatio;

        imageElement.src = imageURL;
        imageElement.style.width = `${newWidth}px`;
        imageElement.style.height = `${newHeight}px`;
    };
}

// Function to calculate and update totalImageHeight
function calculateTotalImageHeight() {
    const imageElements = document.querySelectorAll('.uploaded-image');
    let totalImageHeight = 0;

    imageElements.forEach((imageElement) => {
        totalImageHeight += imageElement.naturalHeight;
    });

    console.log("Value of totalImageHeight:----------------->", totalImageHeight);

    // Set the body height to the calculated totalImageHeight
    document.body.style.height = totalImageHeight + 'px';
}




function setBodyHeight() {

    const imageContainer = document.getElementById('imageUploadContainer');
    const images = imageContainer.querySelectorAll('.uploaded-image');

    
    const totalImageHeight = calculateTotalImageHeight()
    console.log("Value of totalImageHeight:", totalImageHeight);
    console.log("Value of document.documentElement.scrollHeight", document.documentElement.scrollHeight);
    const contentHeight = document.documentElement.scrollHeight + totalImageHeight;
    
    //document.body.style.height = `${contentHeight}px`;
}
// Call the function after images are uploaded or when content changes
function handleContentChange() {
    // ... (your existing code for handling content changes)

    // After handling content changes, update the body height
    setBodyHeight();
}
// Flag to track whether form data has been modified
let formDataModified = false;

// Add an event listener to detect changes in form data
document.addEventListener('input', function () {
    formDataModified = true;
});

// Add an event listener to warn the user before refreshing the page
window.addEventListener('beforeunload', function (event) {
    if (formDataModified) {
        const message = 'You have unsaved changes. Are you sure you want to leave?';
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
    }
});

window.addEventListener('load', setBodyHeight);