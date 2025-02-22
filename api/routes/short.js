const express = require ('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require ('config');


const Url = require('../models/shorts')

//routes 
//POST 
router.post('/shorten', async(req,res,next) => {
    const { longUrl } = req.body;
    const baseUrl = config.get('baseUrl');

    // check base url
    if (!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    };

    // create url code 
    const urlCode = shortid.generate();
    const shortUrl = baseUrl + '/' + urlCode;

    //check long url
    if (validUrl.isUri(longUrl)) {
     try {
        let url = await Url.findOne({longUrl});
        if (url) {
            res.json(url);
        } else {

            

            url = new Url ({
                longUrl,
                shortUrl,
                urlCode,
                date : new Date()
            });
            await url.save();

            res.json(url);
        }
     } catch (err) {
        console.error(err);
        res.status(500).json('Server error')
     }   
    } else {
        res.status(401).json('Invalid long url');
    };
});





module.exports = router;