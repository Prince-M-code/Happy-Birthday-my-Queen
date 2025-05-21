document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const capturedPhoto = document.getElementById('capturedPhoto');
    const cameraButton = document.getElementById('cameraButton');
    let stream = null;
    let isCapturing = false;

    // Function to start the camera
    async function startCamera() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            video.srcObject = stream;
            video.style.display = 'block';
            await video.play();
            cameraButton.textContent = 'Take Photo';
            isCapturing = true;
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Unable to access camera. Please make sure you have granted camera permissions.');
        }
    }

    // Function to capture photo
    function capturePhoto() {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        
        capturedPhoto.src = canvas.toDataURL('image/jpeg');
        capturedPhoto.style.display = 'block';
        video.style.display = 'none';
        
        // Stop all video streams
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
        
        cameraButton.textContent = 'Take Another Photo';
        isCapturing = false;
    }

    // Camera button click handler
    cameraButton.addEventListener('click', () => {
        if (!isCapturing) {
            startCamera();
        } else {
            capturePhoto();
        }
    });
}); 