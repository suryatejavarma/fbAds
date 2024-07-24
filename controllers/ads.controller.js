const axios = require('axios');
const adsSdk = require('facebook-nodejs-business-sdk');
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;
const FB = require('fb');

const api = adsSdk.FacebookAdsApi.init(accessToken);
api.setDebug(true);
const accountId = 'act_993363841317818'


const accessToken = 'EAAMUbFgyAWkBO6W0vq7DVGo0TkZCtcX2dLIu1DTKkUUSM4kZBmgWm4Avb1mROZCd2LlAeGhESMAlsIDYZCZBMruN3vApSWERNgkSotu6sDDZAEZBt0BZB70yZCMWqp3YAjAZAY9WA0KIYLXcYDbNpY863WQNjByWn0pySBMQcjw6pH1Epx1tD2ZAvFaNQZDZD';

const fetchAdCreatives = async (request, response) => {
  try {
    const account = new AdAccount(accountId);

    const campaigns = await account.getAdCreatives([
      'id',
      'name',
      'status'
    ]);
    response.status(200).send(campaigns);
  } catch (error) {}
}

const fetchCampaigns = async (request, response) => {
  try {
    const account = new AdAccount(accountId);

    const campaigns = await account.getCampaigns([
      'id',
      'name',
      'status'
    ]);
    response.status(200).send(campaigns);
  } catch (error) {  }
};

const fetchAdsets = async (request, response) => {
  try {
    const account = new AdAccount(accountId);

    const campaigns = await account.getAdSets([
      'id',
      'name',
      'status'
    ]);
    response.status(200).send(campaigns);
  } catch (error) {}
};

const fetchAds = async (request, response) => {
  try {
    const account = new AdAccount(accountId);

    const campaigns = await account.getAds([
      'id',
      'name',
      'status'
    ]);
    response.status(200).send(campaigns);
  } catch (error) {}
};
const createAdsCampaign = async (request, response) => {
  try {
    const account = new AdAccount(accountId);
    account
      .createCampaign(
        [Campaign.Fields.id],
        {
          special_ad_categories: 'NONE',
          [Campaign.Fields.name]: 'Page likes campaign',
          [Campaign.Fields.status]: Campaign.Status.paused,
          [Campaign.Fields.objective]: Campaign.Objective.outcome_leads,
        }
      )
      .then((campaign) => {
        response.status(200).send(campaign)
      })
      .catch((error) => {
      });
  } catch (err) {
  }
}

const createAdSet = async (request, response) => {
  try {
    
    FB.setAccessToken('EAAMUbFgyAWkBO5rHCJUKzCx6VW9JoiCRlFl6et9Yuo3ORrbMuRg2NhGvyGcNK8ZCTgRpPHNFSjyXR9uiA5NqYeGtZADudXSFEd0HbbrqnodZC3ZCJEgnfYz2Ev5NmZCAdGd9cbQl5qfQhYBO0yeh9UkTbk52mDEuyRDwdaj7dFIkSiHlyYtCVCQZDZD');
    FB.api(
      `/${accountId}/adsets`,
      "POST",
      {
          "name": "test AdSet",
          "daily_budget": "100",
          "bid_amount": "100",
          "billing_event": "IMPRESSIONS",
          "optimization_goal": "REACH",
          "campaign_id": "120212184701090120",
          "targeting": "{\"facebook_positions\":[\"feed\"],\"geo_locations\":{\"countries\":[\"US\"]}}",
          "status": "PAUSED"
      },
      function (res) {
        response.status(200).send(res)
      }
  )
  } catch (error) {
  }
};

const createAdCreative = async (request, response) => {
  
  const adCreativeData = {
    name: 'test adcreative',
    object_story_spec: {
      page_id: '118400324530182',
      link_data: {
        link: 'https://example.com/',
        message: 'check our msg',
      }
    },
    degrees_of_freedom_spec: {
      creative_features_spec: {
        standard_enhancements: {
          enroll_status: 'opt_out'
        }
      }
    },
    status: 'PAUSED'
  };
  try {
    const res = await axios.post(`https://graph.facebook.com/v12.0/${accountId}/adcreatives`, adCreativeData, {
      params: {
        access_token: accessToken
      }
    });

    response.status(200).send(res);
  } catch (error) {
  }

};

  
const createAd = async (request, response) => {
  const adCreativeData = {
    name: 'Trst Ad',
    adset_id: '120212204651720120',
    creative: {
      creative_id: '120212263539310120'
    },
    status: 'PAUSED'
  };
  try {
    const res = await axios.post(`https://graph.facebook.com/v12.0/${accountId}/ads`, adCreativeData, {
      params: {
        access_token: accessToken
      }
    });

    response.status(200).send(res);
  } catch (error) {
  }
};


module.exports = {
  createAdsCampaign: createAdsCampaign,
  fetchCampaigns: fetchCampaigns,
  fetchAds: fetchAds,
  fetchAdsets: fetchAdsets,
  fetchAdCreatives: fetchAdCreatives,
  createAdSet: createAdSet,
  createAd: createAd,
  createAdCreative: createAdCreative
}
