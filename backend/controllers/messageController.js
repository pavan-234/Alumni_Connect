
const Message = require('../models/Message');

const sendMessage = async (req, res) => {
  try {
    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const message = new Message({
      sender: req.user._id,
      receiver: receiverId,
      content,
    });

    await message.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: userId },
        { sender: userId, receiver: req.user._id },
      ],
    }).sort('timestamp');

    res.json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { sendMessage, getMessages };
