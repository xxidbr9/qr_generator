import React, { useEffect, useState } from 'react'
import QrCodeWithLogo from 'qrcode-with-logos'

const fileToDataUri = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    resolve(event.target.result)
  };
  reader.readAsDataURL(file);
})

const App = () => {
  const [url, setUrl] = useState(0);
  const [urlImage, setUrlImage] = useState(0);
  const [file, setFile] = useState({})
  const handleGenerate = () => {
    const date = new Date().getTime().toString()
    const qr = new QrCodeWithLogo({
      canvas: document.getElementById("canvas"),
      content: url,
      width: 380,
      downloadName: `xxidbr9_qr_code_${date}`,
      download: true,
      image: document.getElementById("image"),
      logo: {
        src: urlImage
      }
    }).toImage();
    qr.then(e => console.log(e)).catch(console.log)
  }

  useEffect(() => {
    if (!file) {
      setUrlImage('');
      return;
    }
    if (!!file.name) {
      fileToDataUri(file)
        .then(setUrlImage)
    }
  }, [file])

  return (
    <div className="bg-pink-400">
      <div className="container max-w-screen-md px-5 mx-auto text-center bg-yellow-400">
        <div>
          <input className="mb-4 w-full bg-gray-100 px-4 py-2" type="text" onChange={e => setUrl(e.target.value)} placeholder="masukan url" />
        </div>
        <div>
          <input className="w-full" type="file" onChange={e => setFile(e.target.files[0])} />
        </div>
        <div>
          <canvas id="canvas" style={{ display: "none" }}></canvas>
          <img src="" alt="" id="image" className="w-full" />
        </div>
        <div className="w-max">
          <button onClick={handleGenerate} className="bg-purple-500 w-full ">Generate QR</button>
        </div>
      </div>
    </div>
  );
}

export default App
