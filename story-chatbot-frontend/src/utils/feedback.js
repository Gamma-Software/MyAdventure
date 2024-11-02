const sendFeedbackToSlack = async (message) => {
    const url = '/api/send-feedback-slack'; // API route in the same Vercel deployment
    const payload = JSON.stringify({ text: JSON.stringify(message, null, 2) });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('Error sending feedback to Slack:', error);
        throw error;
    }
};

const sendFeedbackToMake = async (message) => {
    const url = '/api/send-feedback-make'; // API route in the same Vercel deployment
    const payload = JSON.stringify({ text: JSON.stringify(message, null, 2) });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return true;
    } catch (error) {
        console.error('Error sending feedback to Make:', error);
        throw error;
    }
};

export { sendFeedbackToSlack, sendFeedbackToMake };