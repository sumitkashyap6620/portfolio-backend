const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Mobile navigation
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Contact form
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!name || !email || !message) {
            if (formStatus) {
                formStatus.textContent = "Please fill in all fields.";
                formStatus.style.color = "red";
            }
            return;
        }

        const submitButton = contactForm.querySelector(
            'button[type="submit"], input[type="submit"]'
        );

        if (submitButton) submitButton.disabled = true;

        if (formStatus) {
            formStatus.textContent = "Sending message...";
            formStatus.style.color = "blue";
        }

        try {
   try {
    const response = await fetch(
        "https://portfolio-backend-1-i1cy.onrender.com/api/contact",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, message })
        }
    );

    if (response.ok) {
        alert("Message sent successfully!");
    } else {
        alert("Server error occurred.");
    }
} catch (error) {
    console.error("Connection failed:", error);
    alert("Connection failed. Render server might be waking up, please try again in 30 seconds.");
}

            if (!response.ok) {
                const errorDetails = await response.text();

                console.error(
                    "API error:",
                    response.status,
                    errorDetails
                );

                throw new Error(`HTTP ${response.status}`);
            }

            if (formStatus) {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "green";
            }

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            if (formStatus) {
                formStatus.textContent =
                    error.message.startsWith("HTTP ")
                        ? `Failed to send message (${error.message}).`
                        : "Connection failed. Please check the backend and CORS settings.";

                formStatus.style.color = "red";
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
            }
        }
    });
}