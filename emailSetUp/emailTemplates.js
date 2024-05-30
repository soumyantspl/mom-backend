



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


const sendOtpEmailTemplate= async (userData,otp,time,supportData) => new Promise((resolve, reject) => {
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




module.exports = {
    signInByOtpEmail,updateMeeting,sendOtpEmailTemplate
  };