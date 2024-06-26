

const commonHelper = require("../helpers/commonHelper");

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


  const sendCancelMeetingEmailTemplate= async (meetingData,attendeeName,logo) => new Promise((resolve, reject) => {
    console.log("logo-----------------",logo)
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
      +'<p style="color: #000 !important">Dear'} ${attendeeName},</p>`
      +'<p style="color: #000 !important">We hope this message finds you well. This is to inform you that a meeting has been cancelled through our Meeting Minutes application.</p>'
  +'<p style="color: #000 !important">Below are the details:</p>'
  +'<p style="color: #000 !important"><strong>When (Cancelled)</strong></p>'
  +`<p style="color: #000 !important">${new Date(meetingData.date).toDateString()}</p>`
    +'<p style="color: #000 !important"><strong>Reason of Cancellation</strong></p>'
  +`<p style="color: #000 !important">${meetingData.meetingStatus.remarks}</p>`
     +'<p style="color: #000 !important"><strong>Meeting Mode</strong></p>'
  +`<p style="color: #000 !important">${meetingData.mode}</p>`
     +'<p style="color: #000 !important"><strong>Meeting Link</strong></p>'
  +`<p style="color: #000 !important">${meetingData.link}</p>`
       +'<p style="color: #000 !important"><strong>Location</strong></p>'
  +`<p style="color: #000 !important">${meetingData.locationDetails?.isMeetingRoom === true?  meetingData?.roomDetail[0]?.location : meetingData?.locationDetails?.location}</p>`
       +'<p style="color: #000 !important"><strong>Guests</strong></p>'
  +`<div>${meetingData?.attendees.map((attendee)=>{return `<p>${attendee.name}(${attendee.email})</p>`})}</div>`
   +'<p style="color: #000 !important"><strong>Agenda(s)</strong></p>'
   +`${meetingData?.agendasDetail.map((agenda)=>{return `<table style="border: 1px solid black;border-collapse: collapse; width:100%"><tr style="border: 1px solid black;border-collapse: collapse;" >Agenda Title : ${agenda.title}</tr><tr style="border: 1px solid black;border-collapse: collapse;">Topic to Discuss : ${agenda.topic}</tr><tr style="border: 1px solid black;border-collapse: collapse;">Timeline : ${agenda.timeLine} Mins</tr></table><br>`})}`
      +'<br />'
      +'<p style="color: #000 !important; margin-top:0">'
          +'Regards,'
          + `<br />${meetingData.createdByDetail.name} <br />`  
              + `<br />${meetingData.createdByDetail.email} <br />`  
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


    const sendScheduledMeetingEmailTemplate= async (meetingData,attendeeName,logo) => new Promise((resolve, reject) => {
      console.log("logo-----------------",logo)
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
        +'<p style="color: #000 !important">Dear'} ${attendeeName},</p>`
        +'<p style="color: #000 !important">We hope this message finds you well. This is to inform you that a meeting has been scheduled through our Meeting Minutes application. </p>'
            +'<p style="color: #000 !important">Please make sure to mark your calendar accordingly. If you have any conflicts or questions regarding this meeting, feel free to reach out to the meeting organizer.</p>'
        +'<p style="color: #000 !important">Thank you, and we look forward to your participation. Below are the details:</p>'
    +'<p style="color: #000 !important"><strong>When </strong></p>'
    +`<p style="color: #000 !important">${new Date(meetingData.date).toDateString()} ${commonHelper.formatTimeFormat(meetingData.fromTime)}
    -  ${commonHelper.formatTimeFormat(meetingData.toTime)}</p>`
       +'<p style="color: #000 !important"><strong>Meeting Mode</strong></p>'
    +`<p style="color: #000 !important">${meetingData.mode}</p>`
       +'<p style="color: #000 !important"><strong>Meeting Link</strong></p>'
    +`<p style="color: #000 !important">${meetingData.link}</p>`
         +'<p style="color: #000 !important"><strong>Location</strong></p>'
    +`<p style="color: #000 !important">${meetingData.locationDetails?.isMeetingRoom === true?  meetingData?.roomDetail[0]?.location : meetingData?.locationDetails?.location}</p>`
         +'<p style="color: #000 !important"><strong>Guests</strong></p>'
    +`<div>${meetingData?.attendees.map((attendee)=>{return `<p style="color: #000 !important">${attendee.name} (${attendee.email})</p>`})}</div>`
     +'<p style="color: #000 !important"><strong>Agenda(s)</strong></p>'
     +`${meetingData?.agendasDetail.map((agenda,index)=>{return `<table style="border: 1px solid black;border-collapse: collapse; width:100%"><tr style="border: 1px solid black;border-collapse: collapse;" ><strong>Agenda ${index+1}</strong></tr><tr style="border: 1px solid black;border-collapse: collapse;" >Agenda Title :${agenda.title}</tr><tr style="border: 1px solid black;border-collapse: collapse;">Topic to Discuss :${agenda.topic}</tr><tr style="border: 1px solid black;border-collapse: collapse;">Timeline :${agenda.timeLine} Mins</tr></table><br>`})}`
        +'<br />'
        +'<p style="color: #000 !important; margin-top:0">'
            +'Regards,'
            + `<br />${meetingData.createdByDetail.name} <br />`  
                + `<br />${meetingData.createdByDetail.email} <br />`  
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
    signInByOtpEmail,updateMeeting,sendOtpEmailTemplate,sendCancelMeetingEmailTemplate,sendScheduledMeetingEmailTemplate
  };