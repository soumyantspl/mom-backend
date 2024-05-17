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
        .map((item, index) =>{
            console.log(item)
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

          { text: " ", margin: [0, 10] },
        ]})
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
    // pdfDoc.pipe(fs.createWriteStream());

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

// Example usage
const data = [
  {
    _id: new ObjectId("664466fe7b586e82a6d8ae67"),
    assignedUserId: new ObjectId("66447cd4949f975786c9a9e2"),
    dueDate: new Date("2024-05-15T09:18:52.759Z"),
    priority: "HIGH",
    attendees: [{ name: "John Doe" }],
    amendmentDetails: [{ change: "Updated text" }],
    reassignedUserId: new ObjectId("66445a362319fab26bbe7b5d"),
    title: "minute 1",
    organizationDetail: { name: "NALCO" },
    attendeesDetails: [{ name: "John Doe" }],
    createdByDetails: { name: "soumya2" },
    amendmentDetail: { name: "soumyatest1" },
    assignedUserDetail: { name: "sourav" },
    reAssignedUserDetail: { name: "soumyatest1" },
  },
  {
    _id: new ObjectId("66472c5625e94ff964bf4394"),
    assignedUserId: new ObjectId("66447cd4949f975786c9a9e2"),
    dueDate: new Date("2024-05-15T09:18:52.759Z"),
    priority: "HIGH",
    attendees: [{ name: "Jane Doe" }],
    amendmentDetails: [{ change: "Updated text" }],
    reassignedUserId: new ObjectId("66445a362319fab26bbe7b5d"),
    title: "minute 2",
    organizationDetail: { name: "NALCO" },
    attendeesDetails: [{ name: "Jane Doe" }],
    createdByDetails: { name: "soumya2" },
    amendmentDetail: { name: "soumyatest1" },
    assignedUserDetail: { name: "sourav" },
    reAssignedUserDetail: { name: "soumyatest1" },
  },
];

// generatePDF(data, 'output.pdf');

module.exports = {
  generatePdf,
};
