const welcomeEmail = require('../emailTemplate/welcome')
const expiredTrialEmail = require('../emailTemplate/expiredTrial')
const expiringTrialEmail = require('../emailTemplate/expiringTrial')
const resetPasswordEmail = require('../emailTemplate/resetPassword')
const userInviteEmail = require('../emailTemplate/userInvite')

function getTemplate (name,type) {

  switch(name){
    case "welcome":
      return welcomeEmail[type];
    case "expired trial":
      return expiredTrialEmail[type];
    case "expiring trial":
      return expiringTrialEmail[type];
    case "rest password":
      return resetPasswordEmail[type];
    case "user invite":
      return userInviteEmail[type];
    default:
      return welcomeEmail[type];
  }

}

module.exports = getTemplate;