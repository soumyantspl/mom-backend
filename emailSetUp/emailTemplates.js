



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
  });

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


module.exports = {
    signInByOtpEmail,updateMeeting
  };