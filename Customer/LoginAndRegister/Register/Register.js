// // Selecting form and input elements
// const form = document.querySelector("form");
// const passwordInput = document.getElementById("password");
// const passToggleBtn = document.getElementById("pass-toggle-btn");

// // Function to display error messages
// const showError = (field, errorText) => {
//   field.classList.add("error");
//   const errorElement = document.createElement("small");
//   errorElement.classList.add("error-text");
//   errorElement.innerText = errorText;
//   field.closest(".form-group").appendChild(errorElement);
// };

// // Function to handle form submission
// const handleFormData = (e) => {
//   e.preventDefault();

  // Retrieving input elements
  // const fullnameInput = document.getElementById("fullname");
  // const emailInput = document.getElementById("email");
  // const dateInput = document.getElementById("date");
  // const genderInput = document.getElementById("gender");

  // // Getting trimmed values from input fields
  // const fullname = fullnameInput.value.trim();
  // const email = emailInput.value.trim();
  // const password = passwordInput.value.trim();
  // const date = dateInput.value;
  // const gender = genderInput.value;

  // // Regular expression pattern for email validation
  // const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

//   // Clearing previous error messages
//   document
//     .querySelectorAll(".form-group .error")
//     .forEach((field) => field.classList.remove("error"));
//   document
//     .querySelectorAll(".error-text")
//     .forEach((errorText) => errorText.remove());

//   // Performing validation checks
//   if (fullname === "") {
//     showError(fullnameInput, "Enter your full name");
//   }
//   if (!emailPattern.test(email)) {
//     showError(emailInput, "Enter a valid email address");
//   }
//   if (password === "") {
//     showError(passwordInput, "Enter your password");
//   }


//   // Checking for any remaining errors before form submission
//   const errorInputs = document.querySelectorAll(".form-group .error");
//   if (errorInputs.length > 0) return;

//   // Submitting the form
//   form.submit();
// };

// // Toggling password visibility
// passToggleBtn.addEventListener("click", () => {
//   passToggleBtn.className =
//     passwordInput.type === "password"
//       ? "fa-solid fa-eye-slash"
//       : "fa-solid fa-eye";
//   passwordInput.type = passwordInput.type === "password" ? "text" : "password";
// });

// // Handling form submission event
// form.addEventListener("submit", handleFormData);
document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Perform your form validation here
  // For simplicity, let's just log the form data to the console
  const fullname = document.getElementById("fullname").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("password_confirm").value;

  console.log("Full Name:", fullname);
  console.log("Email:", email);
  console.log("Phone:", phone);
  console.log("Address:", address);
  console.log("Password:", password);
  console.log("Confirm Password:", passwordConfirm);

  if(password !== passwordConfirm) {
  alert("Password confirmation must similar to the password");
  }
  //goi api
  const apiUrl = "http://localhost:4001/api/users/register";
  const formData = {
    name: fullname,
    phone: phone,
    email: email,
    address: address,
    password: password,
  };

  fetch(apiUrl, {
    method: "POST", // Adjust the method based on your API requirements
    headers: {
      "Content-Type": "application/json",
      // Add any additional headers if required by your API
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the API response data here
      console.log("API Response:", data);
      alert("Registration successful!");
    })
    .catch((error) => {
      // Handle errors during the fetch operation
      console.error("Fetch Error:", error);
      alert("Registration failed. Please try again.");
    });



  // Add your registration logic and API calls here
});