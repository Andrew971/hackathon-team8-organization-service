const AWS = require('aws-sdk');
const ses = new AWS.SES({
  apiVersion: '2010-12-01'
});
const S3 = new AWS.S3({
  apiVersion: '2010-12-01'
});
// const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const getTemplate = require('./lib/getTemplate');

function EmailHtml ( { Issue, Reason, UserId}) {
  return `
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <!-- [if !mso]><! -->
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <!-- <![endif] -->
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title></title>
    <style type="text/css">
      @media screen and (max-width: 500px) {
        .h1 {
          font-size: 42px !important;
          line-height: 48px !important;
        }
        .h2 {
          font-size: 26px !important;
          line-height: 36px !important;
        }
        .h3 {
          font-size: 20px !important;
          line-height: 26px !important;
        }
        #strav_desktop {
          display: none !important;
        }
        #strav_mobile {
          display: block !important;
          min-width: 100% !important;
          min-height: 100% !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible !important;
        }
        #strav_mobile_img {
          min-height: 100px;
        }
        .strav_w100 {
          width: 100% !important;
        }
        .strav_minwidth {
          min-width: 0 !important;
        }
        .strav_footer_icons {
          width: 100% !important;
          max-width: 350px !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }
        .strav_footer_icons td {
          padding-right: 0 !important;
        }
      }
    </style>
    <style type="text/css">
      @font-face {
        font-family: "Book";
        font-style: normal;
        src: local("Maison"), local("Maison Web"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeue-Book.ttf")
            format("truetype"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueWEB-Book.woff")
            format("woff"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueWEB-Book.woff2")
            format("woff2");
      }
      @font-face {
        font-family: "Light";
        font-style: normal;
        src: local("Maison"), local("Maison Web"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueWEB-Light.ttf")
            format("truetype"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueWEB-Light.woff")
            format("woff"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueWEB-Light.woff2")
            format("woff2");
      }
      @font-face {
        font-family: "XDemi";
        font-style: normal;
        src: local("Maison"), local("Maison Web"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueExtended-Demi.ttf")
            format("truetype"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueExtended-Demi.woff")
            format("woff"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueExtended-Demi.woff2")
            format("woff2");
      }
      @font-face {
        font-family: "Bold";
        font-style: normal;
        src: local("Maison"), local("Maison Web"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeue-Bold.ttf")
            format("truetype"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeue-Bold.woff")
            format("woff"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeue-Bold.woff2")
            format("woff2");
      }
      @font-face {
        font-family: "Mono";
        font-style: normal;
        src: local("Maison"), local("Maison Web"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueMono-Regular.ttf")
            format("truetype"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueMono-Regular.woff")
            format("woff"),
          url("https://s3.amazonaws.com/strava.static/webfonts/maison_neue/MaisonNeueMono-Regular.woff2")
            format("woff2");
      }
    </style>
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        table {
          border-collapse: collapse !important;
        }
      </style>
    <![endif]-->
  </head>
  <body
    style="padding: 0px; background-color: rgb(245, 245, 245); width: 100%; m
  <table style="border-spacing:0;font-family:sans-serif;color:#333333; background-color: #ffffff" width="100%">
    <tbody>
      <tr>
        <td class="inner contents" style="padding-top:48px;padding-bottom:34px;padding-right:50px;padding-left:50px;width:100%;text-align:center;" width="100%">
          <p style="font-size: 48px; font-weight: normal; font-family: XDemi, Book, Light, Helvetica, Arial, sans-serif; line-height: 1.3; color: #000000; margin-bottom:0px; margin:0; padding:0;">New Report Detected!
          </p>
        </td>
      </tr>
    </tbody>
  </table>
   <table style="border-spacing:0;font-family:sans-serif;color:#333333; background-color: #ffffff" width="100%">
   <tbody>
   <tr>
       <td class="inner contents" style="padding-top:0px;padding-bottom:0px;padding-right:79px;padding-left:79px;width:100%;text-align:center;" width="100%">
           <p style="font-size: 18px; font-weight: normal; font-family: Light, Book, Helvetica, Arial, sans-serif; line-height: 1.78; color: #242428; margin-bottom:0px; margin:0; padding:0;">
              Warning ! A new Abuse report has arrived. Please take care of it !
              <br />
              <b>Issue</b> : ${Issue.Value}<br />
              <b>Reason</b> : ${Reason.Value}<br />
              <b>Posted By</b> : User Id - ${UserId.Value}<br />
              </p>
       </td>  
   </tr>
  </tbody>
  </table>
  </body>
  `
}

exports.handler = (event,context, callback) => {
  
  event.Records.forEach(record => {
  const body = JSON.parse(record.body)
  console.log(body)
  console.log(body.MessageAttributes)

  var eParams = {
    Destination: {
      ToAddresses: [
        `${body.MessageAttributes.UserEmail.Value}`
      ]
    },
    Message: {
      Body: {
        Html: {
          //  Charset: "UTF-8", 
          Data: getTemplate(body.MessageAttributes.Type.Value, 'html')(body.MessageAttributes)
        },
        Text: {
          Data: getTemplate(body.MessageAttributes.Type.Value, 'txt')(body.MessageAttributes)
        }
      },
      Subject: {
        Data: `New Report has Arrived ! Issue - ${body.MessageAttributes.Type.Value}`
      }
    },
    ReturnPathArn: "arn:aws:ses:us-west-2:867591841084:identity/textras.com",
    Source: process.env.EMAIL_FROM,
    SourceArn: "arn:aws:ses:us-west-2:867591841084:identity/textras.com"
  }

  ses.sendEmail(eParams)
    .promise().then(res=>{
      callback(null, event)})
    .catch(err => callback(err))
    });

    return {};

}


