// Function to handle image upload
function handleImageUpload(event) {
    const container = document.getElementById('imageUploadContainer');
    const imageControls = document.getElementById('imageControls');
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const imageURL = URL.createObjectURL(file);

        // Create a new image element
        const imageElement = document.createElement('img');
        imageElement.src = imageURL;
        imageElement.className = 'uploaded-image';
        container.appendChild(imageElement);

        // Create a new input for text
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = 'Enter text for this image';
        textInput.className = 'image-text-input';
        imageControls.appendChild(textInput);

        // Add an event listener to update image text when input changes
        textInput.addEventListener('input', function () {
            updateImageText(i, this.value);
        });
    }
}

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

// Function to handle image upload
function handleImageUpload(event) {
    const container = document.getElementById('imageUploadContainer');
    const imageControls = document.getElementById('imageControls');
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Read the file as a Data URL (Base64-encoded)
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageURL = e.target.result;

            // Create a new image element
            const imageElement = document.createElement('img');
            imageElement.src = imageURL;
            imageElement.className = 'uploaded-image';
            container.appendChild(imageElement);

            // Create a new input for text
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.placeholder = 'Enter text for this image';
            textInput.className = 'image-text-input';
            imageControls.appendChild(textInput);

            // Add an event listener to update image text when input changes
            textInput.addEventListener('input', function () {
                updateImageText(i, this.value);
            });
        };

        // Read the image file as a Data URL
        reader.readAsDataURL(file);
    }
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

// Function to load data from the local database
function loadFromDatabase() {
    // Implement logic to load data from the local database
    // For example, you can use IndexedDB or another storage mechanism

    // For demonstration purposes, let's assume there's a function getPreviousJobs() that returns an array of jobs
    const previousJobs = getPreviousJobs();

    // Display previous jobs in a list
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';
    previousJobs.forEach((job) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${job.clientName} - ${job.dateTime}`;
        listItem.addEventListener('click', () => loadJob(job));
        jobList.appendChild(listItem);
    });
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

// Function to display images
function displayImages(images) {
    const container = document.getElementById('imageUploadContainer');
    container.innerHTML = '';

    images.forEach((imageURL, index) => {
        // Create a new image element
        const imageElement = document.createElement('img');
        imageElement.src = imageURL;
        imageElement.className = 'uploaded-image';
        container.appendChild(imageElement);

        // Create a new input for text
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.placeholder = 'Enter text for this image';
        textInput.className = 'image-text-input';
        textInput.addEventListener('input', function () {
            updateImageText(index, this.value);
        });
        container.appendChild(textInput);
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

// Function to save data to local storage
function saveData() {
    const data = {
        clientName: document.getElementById('clientName').value,
        clientReference: document.getElementById('clientReference').value,
        ringSize: document.getElementById('ringSize').value,
        stoneSize: document.getElementById('stoneSize').value,
        shankSize: document.getElementById('shankSize').value,
        clientInputs: document.getElementById('clientInputs').value,
        images: getUploadedImages(),
    };

    // Filter out properties with empty values
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== '' && v !== null && v !== undefined));

    // Save data to local storage
    localStorage.setItem('savedData', JSON.stringify(filteredData));
    alert('Data saved successfully!');
}


// Function to load data from local storage
function loadData() {
    const savedData = localStorage.getItem('savedData');

    if (savedData) {
        const data = JSON.parse(savedData);

        // Set form fields
        document.getElementById('clientName').value = data.clientName || '';
        document.getElementById('clientReference').value = data.clientReference || '';
        document.getElementById('ringSize').value = data.ringSize || '';
        document.getElementById('stoneSize').value = data.stoneSize || '';
        document.getElementById('shankSize').value = data.shankSize || '';
        document.getElementById('clientInputs').value = data.clientInputs || '';

        // Display uploaded images
        displayImages(data.images);
    } else {
        alert('No saved data found.');
    }
}

// Function to clear saved data
function clearSavedData() {
    localStorage.removeItem('savedData');
    alert('Saved data cleared successfully!');
}

// Function to display images
function displayImages(images) {
    const container = document.getElementById('imageUploadContainer');
    container.innerHTML = '';

    images.forEach((imageURL, index) => {
        const imageElement = document.createElement('img');
        imageElement.src = imageURL;
        imageElement.className = 'uploaded-image';
        container.appendChild(imageElement);

        // Create a delete button for each image
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-image-btn';
        deleteButton.onclick = function () {
            deleteImage(index);
        };
        container.appendChild(deleteButton);
    });
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
// Call loadFromDatabase to display previous jobs when the page loads
window.onload = loadFromDatabase;
