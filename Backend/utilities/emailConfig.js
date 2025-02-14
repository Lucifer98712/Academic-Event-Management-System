// Mock transporter for local development
const transporter = {
    sendMail: async (mailOptions) => {
        return { response: 'Logged locally' };
    }
};

module.exports = transporter;