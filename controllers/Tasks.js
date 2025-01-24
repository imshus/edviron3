const Transaction=require('../model/Task.js')

const createAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.create(req.body);
      res.status(200).json({ transactions });
    } catch (err){
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
}
const getAllTransactions = async (req, res) => {
    try {
      const transactions = await Transaction.find({});
      if (!transactions.length) {
        return res.status(404).json({ message: 'No transactions found' });
      }
      res.status(200).json({ transactions });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
}
const getTransactionsBySchool = async (req, res) => {
  try {
      const { school_id } = req.params;
      const transactions = await Transaction.find({ school_id });

      if (!transactions || transactions.length === 0) {
          return res.status(404).json({ message: `No transactions found for school ID: ${school_id}` });
      }

      res.status(200).json({ transactions });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error", error: err.message });
  }
};
const checkTransactionStatus = async (req, res) => {
  try {
      const { custom_order_id } = req.params; 
      console.log(custom_order_id)
      const transaction = await Transaction.findOne({ custom_order_id });
      if (!transaction) {
          return res.status(404).json({ 
              message: `Transaction with custom_order_id: ${custom_order_id} not found` 
          });
      }
      res.status(200).json({ 
          custom_order_id: transaction.custom_order_id,
          status: transaction.status 
      });
  } catch (error) {
      console.error("Error checking transaction status:", error);
      res.status(500).json({ 
          message: "Server error", 
          error: error.message 
      });
  }
};

const updateTransactionStatusWebhook = async (req, res) => {
    try {
        const { status, order_info } = req.body;
        if (!order_info || !order_info.order_id) {
            return res.status(400).json({
                message: "Invalid payload: Missing required fields."
            });
        }
        const { order_id, order_amount, transaction_amount, gateway, bank_reference } = order_info;
        const transaction = await Transaction.findOne({ collect_id: order_id });

        if (!transaction) {
            return res.status(404).json({
                message: `Transaction with collect_id: ${order_id} not found`
            });
        }

        transaction.status = status === 200 ? "SUCCESS" : "FAILED";
        transaction.order_amount = order_amount;
        transaction.transaction_amount = transaction_amount;
        transaction.payment_method = gateway; 
        transaction.bank_reference = bank_reference || transaction.bank_reference; 
        transaction.updatedAt = new Date();

        await transaction.save();

        res.status(200).json({
            message: "Transaction status updated successfully",
            transaction
        });
    } catch (error) {
        console.error("Error updating transaction status:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = { getAllTransactions,getTransactionsBySchool,createAllTransactions ,checkTransactionStatus,updateTransactionStatusWebhook};