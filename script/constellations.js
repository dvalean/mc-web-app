var currentPhotoIndex = 0;
var photos = ["images/aquarius.png", "images/aries.png", "images/capricornus.png", "images/libra.png", "images/pisces.png"]; // Add more photo URLs as needed

function showPhoto(index, direction) {
    const photoElement = document.getElementById("photo");

    if (direction === 'left'){
        translateDirectionOut = "300"
        translateDirectionIn = "-300"
    } else {
        translateDirectionOut = "-300"
        translateDirectionIn = "300"
    }

    if (photoElement) {
        photoElement.style.opacity = 1;
        photoElement.style.transform = "translateX(0px)";

        setTimeout(function() {
            photoElement.style.transition = "opacity 0.5s ease-in-out, transform 0.5s ease-in-out";
            photoElement.style.opacity = 0;
            photoElement.style.transform = "translateX(" + translateDirectionOut + "px)";
        }, 0);

        setTimeout(function() {
            photoElement.style.transition = "";
            photoElement.style.transform = "translateX(" + translateDirectionIn + "px)";
        }, 500);

        setTimeout(function() {
            photoElement.src = photos[index];
            photoElement.style.transition = "opacity 1.5s ease-in-out, transform 1.5s ease-in-out";
            photoElement.style.opacity = 1;
            photoElement.style.transform = "translateX(0px)";
        }, 550);

        setTimeout(function() {
            photoElement.style.transition = "";
        }, 2050);
    }
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex, 'left');
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex, 'right');
}