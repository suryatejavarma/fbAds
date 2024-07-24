const controller = require('../controllers/ads.controller');


module.exports = (router) => {
    router.get('/facebookAds', controller.getFacebookAds);
    router.get('/getCampaign', controller.fetchCampaigns);
    router.get('/getAdSets', controller.fetchAdsets);
    router.get('/getAdCreatives', controller.fetchAdCreatives);
    router.get('/getAds', controller.fetchAds);
    router.post('/createCampaign', controller.createAdsCampaign);
    router.post('/createAdSet', controller.createAdSet);
    router.post('/createAd', controller.createAd);
    router.post('/createAdCreative', controller.createAdCreative);
}