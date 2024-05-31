



const signInByOtpEmail = async (userData,otp) => new Promise((resolve, reject) => {
    const myvar = `${'<!DOCTYPE html>'
      + '<html lang="en">'
      + '  <head>'
      + '    <meta charset="utf-8" />'
      + '    <title>MOM Management </title>'
      + '    <link'
      + '      rel="stylesheet"'
      + '      href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"/>'
      + '    <style type="text/css">'
      + '      body {'
      + '        font-family: Arial, sans-serif !important;'
      + '        color: #222222;'
      + '      }'
      + '    </style>'
      + '  </head>'
      + '<body>'
      + '<p style="font-size: 30px; color: #464646;margin-bottom: 0;">'
      + '              Welcome <b>'}${userData.name} </b> your otp is ${otp}`
      + '            </p>'
      + '  </body>'
      + '</html>';
      resolve(myvar);
})

const updateMeeting =async (action) => new Promise((resolve, reject) => {
  const myvar = `${'<!DOCTYPE html>'
    + '<html lang="en">'
    + '  <head>'
    + '    <meta charset="utf-8" />'
    + '    <title>MOM Management </title>'
    + '    <link'
    + '      rel="stylesheet"'
    + '      href="https://use.fontawesome.com/releases/v5.7.2/css/all.css"/>'
    + '    <style type="text/css">'
    + '      body {'
    + '        font-family: Arial, sans-serif !important;'
    + '        color: #222222;'
    + '      }'
    + '    </style>'
    + '  </head>'
    + '<body>'
    + '<p style="font-size: 30px; color: #464646;margin-bottom: 0;">'
    + '             Meeting is <b>'}${action} </b>`
    + '            </p>'
    + '  </body>'
    + '</html>';
  resolve(myvar);
});












const sendOtpEmailTemplate2= async (userData,otp,time,supportData) => new Promise((resolve, reject) => {
  const myVar= `${'<!DOCTYPE html>'
  +' <html lang="en">'
  + '<head>'
  +  '<meta charset="UTF-8" />'
  + ' <meta name="viewport" content="width=device-width, initial-scale=1.0" />'
  + '<link rel="stylesheet" href="style.css" />'
  + '<title>Browser</title>'
  +' </head>'
  + '<body>'
  + '<div>'
  + '<div style="text-align: center;">'     
  + '<span> <img src="https://d3uom8aq23ax4d.cloudfront.net/wp-content/themes/ntspl-corporate-website/images/favicon.ico" /></span>'
  +'</div>'
  +'<div style="padding-left: 350px;padding-top: 30px;">'
  +' <p>Hi,</br></br>'
  +'To ensure your accounts security and proceed with the login process, we require verification of your identity.</br></br>'
  +'Please use the following OTP (One-Time Password) to verify your account:</br></br>'
  +'OTP:'}${otp}</br></br>`
  +`Please enter this OTP in the designated field within ${time} to complete the verification process.</br></br>`
  +`If you did not request this OTP or have concerns about your accounts security, please contact our support team immediately at ${supportData}.</br></br>`
  +'Thank you for your cooperation.</br></br>'
  +'Warm regards,</br>'
  +'Team Meeting Plus'
  +'</p>'
  +'</div>'
  +'</div>'
  +'</div>'
  +'</body>'
  +'</html>';
resolve(myVar);
  })








  
const sendOtpEmailTemplate= async (userData,otp,time,supportData,logo) => new Promise((resolve, reject) => {
  const myVar= `${'<div style="background-color: #e9f3ff;margin:0;padding:0; width:100%;">'
    +'<div style="background-color: #e9f3ff; width:100%;padding-bottom:60px">'
    +'<table style="margin-top:0;margin-bottom:0;margin-right:auto;margin-left:auto;width:100%;max-width:640px" align="center" cellpadding="0" cellspacing="0" border="0">'
    +'<tbody>'
    +'<tr>'
    +'<td valign="middle" align="center" height="60" style="border-collapse:collapse"></td>'
    +'</tr>'
    +'</tbody>'
    +'</table>'
    +'<table cellspacing="0" cellpadding="0" style="width:100%;max-width:640px;margin:0 auto">'
    +'<tbody>'
    +'<tr>'
    +'<td>'
    +'<table cellspacing="0" cellpadding="0" width="100%" bgcolor="#FFFFFF">'
    +'<tbody>'
    +'<tr>'
    +'<td>'
    +'<table border="0" style="margin:0 auto" cellspacing="0" cellpadding="0" width="100%" bgcolor="#FFFFFF" valign="center" align="center">'
    +'<tbody>'
    +'<tr>'
   +'<td style="padding: 30px 0px 30px;color:#545d5e;font-family:Helvetica;font-size:12px;line-height:180%;vertical-align:top;text-align:center">'
    +'<span>'
    +'<a href="https://www.ntspl.co.in/" style="widht: 100%; text-align: center;">'
    +`<img style="float: none; margin: 0 auto; display: block;" src=${logo}>`
    +'</a>'
    +'</span>'
    +'</td>'
    +'</tr>'
    +'<tr>'
    +'<td valign="center" cellpadding="0" align="center" bgcolor="#FFFFFF" style="border-collapse:collapse;color:#545d5e;font-family:Arial,Tahoma,Verdana,sans-serif;font-size:14px;margin:0;text-align:left;line-height:165%;letter-spacing:0;padding-top:20px;padding-bottom:30px;padding-left: 30px;padding-right: 30px;">'
    +`<p style="color: #000 !important">Dear ${userData.name},</p>`
    +'<p style="color: #000 !important">To ensure your accounts security and proceed with the login process, we require verification of your identity.</p>'
+'<p style="color: #000 !important"> Please use the following OTP (One-Time Password) to verify your Meeting Plus account.</p>'
+'<p style="color: #000 !important"> OTP:<strong>'} ${otp}</strong></p>`
+`<p style="color: #000 !important">Please enter this OTP in the designated field within ${time} minutes to complete the verification process.</p>`
+`<p style="color: #000 !important">If you did not request this OTP or have concerns about your account's security, please contact our support team immediately at ${supportData}.</p>`
    +'<br />'
    +'<p style="color: #000 !important;margin-bottom: 0;"> Thank you for your cooperation.</p>'
    +'<br />'
    +'<p style="color: #000 !important; margin-top:0">'
        +'Warm regards,'
            + '<br />Team Meeting Plus <br />'  
        +'</p>'
   +'</td>'
    +'</tr>'
    +'<tr>'
    +'<table width="100%" style="margin: 0 auto;" cellpadding="0" cellspacing="0" border="0">'
   + '<tbody>'
   +'<tr>'
 
    +'</tr>'
    +'</tbody>'
    +'</table>'
    +'</tr>'
    +'</tbody>'
    +'</table>'
    +'</td>'
    +'</tr>'
    +'</tbody>'
    +'</table>'
    +'</td>'
    +'</tr>'
    +'</tbody>'
    +'</table>'
   + '</div>'
   + '</div>';
resolve(myVar);
  })




module.exports = {
    signInByOtpEmail,updateMeeting,sendOtpEmailTemplate
  };