// api/send-feedback-make.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const response = await fetch(process.env.MAKE_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        if (!response.text === "Accepted") {
            throw new Error(`Make API responded with ${response.status}`);
        }

        const data = await response.json();
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error('Error sending feedback to Make:', error.message);
        res.status(500).json({ success: false, error: error.message });
    }
}