const express = require('express')
const router = express.Router()
const {
    getAllTransactions,
    getTransactionsBySchool,
    createAllTransactions,
    checkTransactionStatus,
    updateTransactionStatusWebhook
} = require('../controllers/Tasks')

router.route('/').get(getAllTransactions)
router.route('/:school_id').get(getTransactionsBySchool)
router.route('/post').post(createAllTransactions)
router.route('/check-status/:custom_order_id').get(checkTransactionStatus)
router.route('/webhook').post(updateTransactionStatusWebhook)

module.exports = router
