import html2canvas from 'html2canvas';

const EditorHeader = () => {
  const downloadImage = () => {
    const c = document.getElementById('canvas');
    console.log(c.height);

    html2canvas(c, {
      scale: 3,
      backgroundColor: null,
    }).then((canvas) => {
      const imageURL = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = imageURL;
      a.download = imageURL;
      a.click();
    });
  };

  return (
    <nav className="w-full px-10 flex justify-between items-center bg-blue-700 py-3">
      <h1 className="text-xl text-white font-black">Quotin</h1>
      <button
        onClick={downloadImage}
        className="bg-gray font-semibold p-2 rounded-lg bg-white"
      >Download
      </button>
    </nav>
  );
};

export default EditorHeader;
