

exports.getNews = async (req, res) => {
    try {

        // Respond with the fetched messages
        res.status(200).json({ status: 200, messages: 'Hello world' });
    } catch (err) {
        // Handle any errors
        res.status(500).json({ status: 500, message: 'Server error' });
    }
};