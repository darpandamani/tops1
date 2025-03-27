

    // Event listener for clicking on gallery items
    document.addEventListener("click", function (e) {
        if (e.target.classList.contains("gallery-item")) {
            // Get the image source of the clicked item
            const src = e.target.getAttribute("src");

            // Update the modal image source
            document.querySelector(".modal-img").src = src;

            // Show the Bootstrap modal
            const myModal = new bootstrap.Modal(document.getElementById('gallery-modal'));
            myModal.show();
        }
    });
