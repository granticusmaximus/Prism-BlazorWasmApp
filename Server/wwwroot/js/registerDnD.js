document.addEventListener('DOMContentLoaded', function () {
	const dropZone = document.getElementById('dragDropArea');
	const fileInput = dropZone.querySelector('input[type=file]');
	const fileNameDisplay = document.getElementById('fileDragName');
	const previewContainer = document.getElementById('imagePreview'); // Container for image preview

	dropZone.addEventListener('click', function () {
		fileInput.click();
	});

	fileInput.addEventListener('change', function () {
		handleFiles(fileInput.files);
	});

	['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
		dropZone.addEventListener(eventName, preventDefaults, false);
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	['dragenter', 'dragover'].forEach((eventName) => {
		dropZone.addEventListener(eventName, highlight, false);
	});

	['dragleave', 'drop'].forEach((eventName) => {
		dropZone.addEventListener(eventName, unhighlight, false);
	});

	function highlight() {
		dropZone.classList.add('dragover-border');
	}

	function unhighlight() {
		dropZone.classList.remove('dragover-border');
	}

	dropZone.addEventListener('drop', handleDrop, false);

	function handleDrop(e) {
		const dt = e.dataTransfer;
		fileInput.files = dt.files;
		handleFiles(fileInput.files);
	}

	function handleFiles(files) {
		if (files.length) {
			fileNameDisplay.textContent = files[0].name;
			updateImagePreview(files[0]);
		}
	}

	function updateImagePreview(file) {
		if (file.type.startsWith('image/')) {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function () {
				const img = document.createElement('img');
				img.src = reader.result;
				img.alt = 'Preview Image';
				previewContainer.innerHTML = ''; // Clear any existing content
				previewContainer.appendChild(img);
			};
		} else {
			previewContainer.innerHTML = ''; // Clear if not an image
		}
	}
});
