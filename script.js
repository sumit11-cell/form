// Save form data to localStorage (Create)
function saveFormData(data) {
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(data);
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

// Fetch all registrations from localStorage (Read)
function getRegistrations() {
    return JSON.parse(localStorage.getItem('registrations')) || [];
}

// Update a registration by index (Update)
function updateRegistration(index, data) {
    let registrations = getRegistrations();
    registrations[index] = data;
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

// Delete a registration by index (Delete)
function deleteRegistration(index) {
    let registrations = getRegistrations();
    registrations.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(registrations));
}

// Form submission event listener
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Example of form validation
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const education = document.getElementById('education').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;
    const profilePic = document.getElementById('profilePic').files[0];
    const documents = document.getElementById('documents').files;

    if (!firstName || !lastName || !gender || !education || !address || !phone || !profilePic || documents.length === 0) {
        alert('Please fill in all the required fields.');
        return;
    }

    // Collect form data into an object
    const formData = {
        firstName,
        lastName,
        gender,
        education,
        address,
        phone,
        profilePic: URL.createObjectURL(profilePic), // Simulate image upload by using object URL
        documents: Array.from(documents).map(doc => doc.name)  // Just storing document names for demo purposes
    };

    // Call saveFormData to save the form data (Create operation)
    saveFormData(formData);

    // Simulate a file upload progress
    let progressBar = document.getElementById('progressBar');
    let progress = 0;

    const interval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;

        if (progress === 100) {
            clearInterval(interval);
            alert('Registration successful!');
            document.getElementById('registrationForm').reset();
            progressBar.value = 0;
        }
    }, 100);
});
