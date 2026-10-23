
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu when a link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Automatically update the footer year
document.getElementById("year").textContent =
    new Date().getFullYear();


// We will connect this to the Spring Boot API later.
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formStatus.textContent =
        "Frontend is working! Backend connection will be added in the next steps.";
});


document.addEventListener("DOMContentLoaded", function() {
    // HTML ke ID 'contactForm' se exact match kar diya hai
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus'); 
    
    if(contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Page refresh hone se rokna

            // Form ka data nikalna
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            if(formStatus) {
                formStatus.innerText = "Sending message...";
                formStatus.style.color = "blue";
            }

            try {
                // Spring Boot backend ko data bhejna
               const response = await fetch('https://portfolio-backend-9r2w.onrender.com/api/contact', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                       },
                  body: JSON.stringify(formData)
                         });
                if (response.ok) {
                    // Success hone par
                    alert("Message sent successfully!");
                    contactForm.reset(); 
                    if(formStatus) {
                        formStatus.innerText = "Message sent successfully!";
                        formStatus.style.color = "green";
                    }
                } else {
                    alert("Failed to send message.");
                    if(formStatus) {
                        formStatus.innerText = "Error sending message.";
                        formStatus.style.color = "red";
                    }
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Server se connect nahi ho paya. Backend check karein!");
                if(formStatus) {
                    formStatus.innerText = "Server connection failed. Is backend running?";
                    formStatus.style.color = "red";
                }
            }
        });
    }
});