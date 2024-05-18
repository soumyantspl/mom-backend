var fonts = {
  Roboto: {
    normal: "fonts/Roboto-Regular.ttf",
    bold: "fonts/Roboto-Medium.ttf",
    italics: "fonts/Roboto-Italic.ttf",
    bolditalics: "fonts/Roboto-MediumItalic.ttf",
  },
};

const pdfmake = require("pdfmake");
const fs = require("fs");
const { ObjectId } = require("mongodb");

const printer = new pdfmake(fonts);
const generatePdf = (minutesData) => {
  console.log(
    "minutesData-------------------22222222",
    minutesData.agendaDetails[0]
  );
  return new Promise((resolve, reject) => {
    const filenumber = Math.floor(Math.random() * 100000000000 + 1);
    const filePath = `pdfFiles/${filenumber}.pdf`;

    const agendaDataObject = minutesData.agendaDetails.map((item) => {
      console.log('item-----------------',item)
    const result= {
        layout: "noBorders",
        fontSize: 11,
        table: {
          widths: ["50%", "50%"],
          body: [
            [
              { text: "title", margin: [0, 10, 0, 0] },
              { text: item.title, alignment: "left", margin: [0, 10, 0, 0] },
            ],
            [
              { text: "Topic", margin: [0, 10, 0, 0] },
              { text: item.topic, alignment: "left", margin: [0, 10, 0, 0] },
            ],
            //  [{text:'Location',margin:[0,10,0,0]},{text:minutesData.meetingDetail.location, alignment:'left',margin:[0,10,0,0]}],
            //  [{text:'Link',margin:[0,10,0,0]},{text:minutesData.meetingDetail.link, alignment:'left',margin:[0,10,0,0]}],
            //  [{text:'Date & Time',margin:[0,10,0,0]},{text:`${new Date(minutesData.meetingDetail.date).toLocaleDateString()},${minutesData.meetingDetail.fromTime} to ${minutesData.meetingDetail.toTime}`, alignment:'left',margin:[0,10,0,0]}],
            //  [{text:'Attendees',margin:[0,10,0,0]},{text:minutesData.meetingDetail.attendeesDetails.map((item)=>{return item.name}).join(), alignment:'left',margin:[0,10,0,0]}],
            ["", ""],
            ["", ""],
            ["", ""],
            ["", ""],
          ],
        },
      };

      if(item.minutesDetail.length!==0){
        item.minutesDetail.map((minuteItem)=>{
         const result2= {
            layout: "noBorders",
            fontSize: 11,
            table: {
              widths: ["50%", "50%"],
              body: [
                [
                  { text: "title", margin: [0, 10, 0, 0] },
                  {
                    text: minuteItem
                      .description,
                    alignment: "left",
                    margin: [0, 10, 0, 0],
                  },
                ],
                ///  [{text:'Topic',margin:[0,10,0,0]},{text:minutesData.agendaDetails[0].topic, alignment:'left',margin:[0,10,0,0]}],
                //  [{text:'Location',margin:[0,10,0,0]},{text:minutesData.meetingDetail.location, alignment:'left',margin:[0,10,0,0]}],
                //  [{text:'Link',margin:[0,10,0,0]},{text:minutesData.meetingDetail.link, alignment:'left',margin:[0,10,0,0]}],
                //  [{text:'Date & Time',margin:[0,10,0,0]},{text:`${new Date(minutesData.meetingDetail.date).toLocaleDateString()},${minutesData.meetingDetail.fromTime} to ${minutesData.meetingDetail.toTime}`, alignment:'left',margin:[0,10,0,0]}],
                //  [{text:'Attendees',margin:[0,10,0,0]},{text:minutesData.meetingDetail.attendeesDetails.map((item)=>{return item.name}).join(), alignment:'left',margin:[0,10,0,0]}],
                ["", ""],
                ["", ""],
                ["", ""],
                ["", ""],
              ],
            },
          }
         return {...result,...result2}
          
        })
      }
    });
console.log("agendaDataObject--------------",agendaDataObject)
    const docDefinition = {
      content: [
        {
          fontSize: 11,
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                {
                  text: "Meeting Details",
                  border: [false, false, false, true],
                  margin: [-5, 0, 0, 10],
                },
                {
                  text: "",
                  alignment: "right",
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 10],
                },
              ],
            ],
          },
        },
        {
          layout: "noBorders",
          fontSize: 11,
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                { text: "title", margin: [0, 10, 0, 0] },
                {
                  text: minutesData.meetingDetail.title,
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              [
                { text: "Meeting Mode", margin: [0, 10, 0, 0] },
                {
                  text: minutesData.meetingDetail.mode,
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              [
                { text: "Location", margin: [0, 10, 0, 0] },
                {
                  text: minutesData.meetingDetail.location,
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              [
                { text: "Link", margin: [0, 10, 0, 0] },
                {
                  text: minutesData.meetingDetail.link,
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              [
                { text: "Date & Time", margin: [0, 10, 0, 0] },
                {
                  text: `${new Date(
                    minutesData.meetingDetail.date
                  ).toLocaleDateString()},${
                    minutesData.meetingDetail.fromTime
                  } to ${minutesData.meetingDetail.toTime}`,
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              [
                { text: "Attendees", margin: [0, 10, 0, 0] },
                {
                  text: minutesData.meetingDetail.attendeesDetails
                    .map((item) => {
                      return item.name;
                    })
                    .join(),
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
          },
        },

        {
          fontSize: 11,
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                {
                  text: "Agenda Details",
                  border: [false, false, false, true],
                  margin: [-5, 0, 0, 10],
                },
                {
                  text: "",
                  alignment: "right",
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 10],
                },
              ],
            ],
          },
        },
        agendaDataObject,
        {
          fontSize: 11,
          table: {
            widths: ["40%", "40%"],
            body: [
              [
                {
                  text: "Minutes Details",
                  border: [false, false, false, true],
                  margin: [-5, 0, 0, 10],
                },
                {
                  text: "",
                  alignment: "right",
                  border: [false, false, false, true],
                  margin: [0, 0, 0, 10],
                },
              ],
            ],
          },
        },
        {
          layout: "noBorders",
          fontSize: 11,
          table: {
            widths: ["50%", "50%"],
            body: [
              [
                { text: "title", margin: [0, 10, 0, 0] },
                {
                  text: minutesData.agendaDetails[0].minutesDetail[0]
                    .description,
                  alignment: "left",
                  margin: [0, 10, 0, 0],
                },
              ],
              ///  [{text:'Topic',margin:[0,10,0,0]},{text:minutesData.agendaDetails[0].topic, alignment:'left',margin:[0,10,0,0]}],
              //  [{text:'Location',margin:[0,10,0,0]},{text:minutesData.meetingDetail.location, alignment:'left',margin:[0,10,0,0]}],
              //  [{text:'Link',margin:[0,10,0,0]},{text:minutesData.meetingDetail.link, alignment:'left',margin:[0,10,0,0]}],
              //  [{text:'Date & Time',margin:[0,10,0,0]},{text:`${new Date(minutesData.meetingDetail.date).toLocaleDateString()},${minutesData.meetingDetail.fromTime} to ${minutesData.meetingDetail.toTime}`, alignment:'left',margin:[0,10,0,0]}],
              //  [{text:'Attendees',margin:[0,10,0,0]},{text:minutesData.meetingDetail.attendeesDetails.map((item)=>{return item.name}).join(), alignment:'left',margin:[0,10,0,0]}],
              ["", ""],
              ["", ""],
              ["", ""],
              ["", ""],
            ],
          },
        },
      ],

      // minutesData
      //   .map((item, index) => {
      //     console.log(item);
      //     return [
      //       { text: `Meeting`, style: "header" },
      //       {
      //         text: `Meeting Title ${index + 1}: ${item.meetingDetail.title}`,
      //         style: "subheader",
      //       },
      //       // {
      //       //   text: `Minute ${index + 1}: ${item.description}`,
      //       //   style: "subheader",
      //       // },
      //       // {
      //       //   text: `Due Date: ${new Date(item.dueDate).toLocaleString()}`,
      //       //   style: "subheader",
      //       // },
      //       // { text: `Priority: ${item.priority}`, style: "subheader" },
      //       // {
      //       //   text: `Organization: ${item.organizationDetail.name}`,
      //       //   style: "subheader",
      //       // },
      //       // {
      //       //   text: `Responsible Person: ${item.createdByDetails.name}`,
      //       //   style: "subheader",
      //       // },
      //       // {
      //       //   text: `Assigned User: ${item.assignedUserDetail.name}`,
      //       //   style: "subheader",
      //       // },
      //       // {
      //       //   text: `Reassigned To: ${item.reAssignedUserDetail.name}`,
      //       //   style: "subheader",
      //       // },

      //       // {
      //       //   text: `Rejected By: ${item.actionData.rejectedBy.join()}`,
      //       //   style: "subheader",
      //       // },
      //       // {
      //       //   text: `Accepted By: ${item.actionData.acceptedBy.join()}`,
      //       //   style: "subheader",
      //       // },
      //       {
      //         text: `Attendees: ${item.attendeesDetails
      //           .map((item) => item.name)
      //           .join()}`,
      //         style: "subheader",
      //       },

      //       { text: " ", margin: [0, 10] },
      //     ];
      //   })
      //   .flat(),
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10],
        },
        subheader: {
          fontSize: 12,
          margin: [0, 5, 0, 5],
        },
      },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const stream = pdfDoc.pipe(fs.createWriteStream(filePath));
    pdfDoc.end();
    stream.on("finish", () => {
      resolve(filePath);
    });
    stream.on("error", (error) => {
      reject(error);
    });
  });
};

module.exports = {
  generatePdf,
};
