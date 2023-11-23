export saveToPng(filename = "chart.png") {
    // 1. Serialize the SVG to a string
    const svgString = new XMLSerializer().serializeToString(document.querySelector(this.el + " svg"));

    // 2. Convert the SVG string to a Data URL
    const svgDataUri = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));

    // 3. Render the Data URL in an Image Element
    const img = new Image();

    img.onload = function() {
        // 4. Draw the Image onto a Canvas
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // 5. Save Canvas as PNG
        // For this example, we'll just create a link and click it
        const a = document.createElement('a');
        a.download = filename;
        a.href = canvas.toDataURL('image/png');
        document.body.appendChild(a); // This line is needed for Firefox
        a.click();
        document.body.removeChild(a); // Cleanup for Firefox
    };

    img.src = svgDataUri;
}