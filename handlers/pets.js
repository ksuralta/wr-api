'use strict';

/**
 * Operations on /pets
 */
module.exports = {
    
    /**
     * 
     * parameters: limit
     * produces: 
     */
    get: function listPets(req, res) {
        res.status(200).json({message:'hello there!'});
    }, 
    
    /**
     * 
     * parameters: 
     * produces: 
     */
    post: function createPets(req, res) {
        res.sendStatus(501);
    }
    
};
