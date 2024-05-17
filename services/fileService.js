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
  return new Promise((resolve, reject) => {
    const filenumber = Math.floor(Math.random() * 100000000000 + 1);
    const filePath = `pdfFiles/${filenumber}.pdf`;
    const docDefinition = {
      content: minutesData
        .map((item, index) => {
          console.log(item);
          return [
            { text: `Minute ${index + 1}`, style: "header" },
            {
              text: `Minute ${index + 1}: ${item.description}`,
              style: "subheader",
            },
            {
              text: `Due Date: ${new Date(item.dueDate).toLocaleString()}`,
              style: "subheader",
            },
            { text: `Priority: ${item.priority}`, style: "subheader" },
            {
              text: `Organization: ${item.organizationDetail.name}`,
              style: "subheader",
            },
            {
              text: `Responsible Person: ${item.createdByDetails.name}`,
              style: "subheader",
            },
            {
              text: `Assigned User: ${item.assignedUserDetail.name}`,
              style: "subheader",
            },
            {
              text: `Reassigned To: ${item.reAssignedUserDetail.name}`,
              style: "subheader",
            },

            {
              text: `Rejected By: ${item.actionData.rejectedBy.join()}`,
              style: "subheader",
            },
            {
              text: `Accepted By: ${item.actionData.acceptedBy.join()}`,
              style: "subheader",
            },
            {
              text: `Attendees: ${item.attendeesDetails
                .map((item) => item.name)
                .join()}`,
              style: "subheader",
            },

            { text: " ", margin: [0, 10] },
          ];
        })
        .flat(),
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
