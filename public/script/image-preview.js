const imagePickerElement = document.querySelector('#image-upload-control input');

const imagePreviewElemnt = document.querySelector('#image-upload-control');


function updateImagePreview() {
    const files = imagePickerElement.files;

    if(!files || files.lenght === 0 ) {
        imagePreviewElemnt.style.display = "none";
        return;
    }

    const pickerFile = files[0];

    imagePreviewElemnt.src = URL.createObjectURL(pickerFile);
    imagePickerElement.style.display = 'block';

}

imagePickerElement.addEventListener('change', updateImagePreview);