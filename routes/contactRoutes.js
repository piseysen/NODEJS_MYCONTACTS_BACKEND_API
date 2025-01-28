const express = require('express');
const { 
    getContact, 
    createContact, 
    getContactById, 
    updateContact, 
    deleteContact  
} = require('../controllers/contactController');
const validateToken = require('../middleware/validateToekHandler');


const router = express.Router();
router.use(validateToken);

router.route('/').get(getContact);

router.route('/').post(createContact);

router.route('/:id').get(getContactById);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);


module.exports = router;