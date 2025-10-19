const Razorpay = require('razorpay');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'your_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'your_key_secret',
});

// Create order
const createOrder = async (amount, currency = 'INR', receipt) => {
  try {
    const options = {
      amount: amount * 100, // amount in paise
      currency,
      receipt,
      payment_capture: 1, // Auto capture
    };
    
    const order = await razorpay.orders.create(options);
    return { success: true, order };
  } catch (error) {
    console.error('Razorpay order creation error:', error);
    return { success: false, error: error.message };
  }
};

// Verify payment signature
const verifyPayment = (orderId, paymentId, signature) => {
  const crypto = require('crypto');
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || 'your_key_secret');
  hmac.update(orderId + '|' + paymentId);
  const generatedSignature = hmac.digest('hex');
  
  return generatedSignature === signature;
};

module.exports = {
  razorpay,
  createOrder,
  verifyPayment,
};
