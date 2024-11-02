
async function generateImage(text) {
    const resp = await fetch('https://api.deepai.org/api/text2img', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': '693cd6b7-da22-4c81-86d9-746d2464ea8d'
        },
        body: JSON.stringify({
            text: text,
        })
    });

    const data = await resp.json();
    return data;
}

async function openJpgFile(filePath) {
    const response = await fetch(filePath);
    const blob = await response.blob();
    return blob;
}

export { generateImage, openJpgFile };