const express = require ('express');
const router = express.Router();
const mongoose = require ('mongoose');

const Url = require('../models/shorts');

//redirect to the original URL,code is a placeholder
router.get('/:code',async (req,res,next) => {
    try {
        const url = await Url.findOne({urlCode: req.params.code})

        if (url){
            return res.redirect(url.longUrl);
        }else {
            return res.status(404).json('No url found')
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
})







module.exports = router;