// document.addEventListener("DOMContentLoaded", async () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const name = document.getElementById("name");
//     const address = document.getElementById("address");
//     const phone = document.getElementById("phone");
//     const email =document.getElementById("email");
//       const response = await fetch(
//         `http://localhost:4001/api/users/${_id}`
//       );
//       if (!response.ok) {
//         throw new Error("Unable to fetch data");
//       }
//       const data = await response.json();
//       console.log("Product data:", data.users);
//       // Display information on the form
//       name.value = data?.users?.name;
//       phone.value = data?.users?.phone;
//       email.value = data?.users?.email;
//     form.addEventListener("submit", async (event) => {
//       event.preventDefault();
//       const getData = {
//         name: name.value,
//         phone: phone.value,
//         email: email.value,
//       };
//       try {
//         const response = await fetch(
//           `http://localhost:4001/api/users/${id}`,
//           {
//             method: "PUT",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(getData),
//           }
//         );
//         if (!response.ok) {
//           throw new Error("Unable to update data");
//         }
//         const data = await response.json();
//         console.log("Item updated:", data);
//         // Handle success after updating
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     });
//   });
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id'); // Assuming you have a parameter named 'id' in your URL
    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const form = document.getElementById("checkoutForm");
    const users = JSON.parse(localStorage.getItem("user"));
    console.log("🚀 ~ file: checkout.js:57 ~ document.addEventListener ~ users:", users);

    // Display information on the form
        name.value = users?.name;
        phone.value = users?.phone;
        email.value = users?.email;

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const postData = {
            name: name.value,
            phone: phone.value,
            email: email.value,
        };

        try {
            const response = await fetch(`http://localhost:4001/api/users/654a2eb6a017069f884a1bfc`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("Unable to update data");
            }

            const updatedData = await response.json();
            console.log("Item updated:", updatedData);
            // Handle success after updating
        } catch (error) {
            console.error("Error:", error);
        }
    });
});