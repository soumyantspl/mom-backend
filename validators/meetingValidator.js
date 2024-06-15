const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");

// CREATE MEETING VALIDATOR
const createMeetingValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      sendNotification: Joi.boolean(),
      title: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        })
        .required(),
      organizationId: Joi.string().trim().alphanum().required(),
      mode: Joi.string().valid("VIRTUAL", "PHYSICAL").required(),
      link: Joi.string().uri(),
      date: Joi.string().trim().required(),
      fromTime: Joi.string().required(),
      toTime: Joi.string().required(),
      locationDetails: Joi.object({
        isMeetingRoom: Joi.boolean().required().strict(),
        location: Joi.string()
          .trim()
          .pattern(/^[0-9a-zA-Z ,/-]+$/)
          .messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
          }),
        location: Joi.when("isMeetingRoom", {
          is: Joi.boolean().valid(false),
          then: Joi.string()
            .trim()
            .pattern(/^[0-9a-zA-Z ,/-]+$/)
            .messages({
              "string.pattern.base": `HTML tags & Special letters are not allowed!`,
            })
            .required(),
          otherwise: Joi.string()
            .trim()
            .pattern(/^[0-9a-zA-Z ,/-]+$/)
            .messages({
              "string.pattern.base": `HTML tags & Special letters are not allowed!`,
            }),
        }),
        roomId: Joi.when("isMeetingRoom", {
          is: Joi.boolean().valid(true),
          then: Joi.string().trim().alphanum().required(),
          otherwise: Joi.string().trim().alphanum(),
        }),
      }).required(),
    });

    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};
// CANCEL MEETING VALIDATOR
const cancelMeetingValidator = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    const bodySchema = Joi.object({
      remarks: Joi.string(),
    }).required();
    await bodySchema.validateAsync(req.body);
    await headerSchema.validateAsync({ headers: req.headers });
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//UPDATE MEETING VALIDATOR
const updateMeetingValidator = async (req, res, next) => {
  console.log(req.body.attendees);
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      sendNotification: Joi.boolean(),
      title: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),

      organizationId: Joi.string().trim().alphanum().required(),
      mode: Joi.string().valid("VIRTUAL", "PHYSICAL"),
      link: Joi.string().uri(),
      date: Joi.string().trim(),
      fromTime: Joi.string(),
      toTime: Joi.string(),
      locationDetails: Joi.object({
        isMeetingRoom: Joi.boolean().required().strict(),
        location: Joi.string()
          .trim()
          .pattern(/^[0-9a-zA-Z ,/-]+$/)
          .messages({
            "string.pattern.base": `HTML tags & Special letters are not allowed!`,
          }),
        location: Joi.when("isMeetingRoom", {
          is: Joi.boolean().valid(false),
          then: Joi.string()
            .trim()
            .pattern(/^[0-9a-zA-Z ,/-]+$/)
            .messages({
              "string.pattern.base": `HTML tags & Special letters are not allowed!`,
            })
            .required(),
          otherwise: Joi.string()
            .trim()
            .pattern(/^[0-9a-zA-Z ,/-]+$/)
            .messages({
              "string.pattern.base": `HTML tags & Special letters are not allowed!`,
            }),
        }),
        roomId: Joi.when("isMeetingRoom", {
          is: Joi.boolean().valid(true),
          then: Joi.string().trim().alphanum().required(),
          otherwise: Joi.string().trim().alphanum(),
        }),
      }),
      step: Joi.number().valid(1, 2, 3).required(),
      attendees: Joi.when("step", {
        is: Joi.number().valid(2),
        then: Joi.array()
          .min(1)
          .messages({
            "attendees.min": "attendees can't be empty!",
          })
          .items({
            isEmployee: Joi.boolean(),
            _id:Joi.when("isEmployee", {
              is: Joi.boolean().valid(true),
              then: Joi.string().required(),
              otherwise:  Joi.string()
            }),
            organizationId:Joi.when("isEmployee", {
              is: Joi.boolean().valid(false),
              then: Joi.string().trim().alphanum().required(),
              otherwise:  Joi.string().trim().alphanum()
            }),
         //   email:Joi.string().email().required(),
            email:Joi.when("isEmployee", {
              is: Joi.boolean().valid(false),
              then: Joi.string().email().required(),
              otherwise: Joi.string().email()
            }),
            name:Joi.when("isEmployee", {
              is: Joi.boolean().valid(false),
              then: Joi.string().required(),
              otherwise: Joi.string()
            }),
          //  name: Joi.string(),
            // rsvp: Joi.string().valid("YES", "NO", "WAITING"),
         //   isEmployee: Joi.boolean(),
          //  organizationId:Joi.string().trim().alphanum().required(),
          })
          .required(),
        otherwise: Joi.array()
          .min(1)
          .messages({
            "attendees.min": "attendees can't be empty!",
          })
          .items({
            _id: Joi.string(),
            email:Joi.string().email().required(),
            name: Joi.string(),
            // rsvp: Joi.string().valid("YES", "NO", "WAITING"),
            isEmployee: Joi.boolean(),
          }),
      }),
      agendas: Joi.when("step", {
        is: Joi.number().valid(3),
        then: Joi.array()
          .min(1)
          .messages({
            "agendas.min": "agendas can't be empty!",
          })
          .items({
            title: Joi.string().required(),
            topic: Joi.string(),
            timeLine: Joi.string().required(),
          })
          .required(),
        otherwise: Joi.array()
          .min(1)
          .messages({
            "agendas.min": "agendas can't be empty!",
          })
          .items({
            title: Joi.string().required(),
            topic: Joi.string(),
            timeLine: Joi.string().required(),
          }),
      }),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    //   errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
// VIEW SINGLE MEETING VALIDATOR
const viewMeetingValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// VIEW ALL MEETING VALIDATOR
const viewAllMeetingsValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const enumValues = [
      "closed",
      "scheduled",
      "rescheduled",
      "cancelled",
      "due",
    ];
    const bodySchema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      meetingStatus: Joi.string().valid(...enumValues),
      fromDate: Joi.date().iso(),
      toDate: Joi.date().iso(),
      // toDate: Joi.when("fromDate", {
      //   is: Joi.date().iso().valid(),
      //   then: Joi.date(),
      //   otherwise: Joi.date().iso(),
      // }),
      attendeeId: Joi.string().trim().alphanum(),
      organizationId: Joi.string().trim().alphanum().required(),
      // limit: Joi.number().required(),
      // page: Joi.number().required(),
      // order: Joi.number().required(),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number().required(),
      page: Joi.number().required(),
      order: Joi.number().required(),
    });
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.query);
    await bodySchema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    // errorLog(error);
    return Responses.errorResponse(req, res, error, 200);
  }
};

// UPDATE USER RSVP FOR MEETING VALIDATOR
const updateRsvpValidator = async (req, res, next) => {
  try {
    const enumValues = ["YES", "NO", "AWAITING", "MAYBE"];
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const bodySchema = Joi.object({
      //  id: Joi.string().trim().alphanum().required(),
      //  userId: Joi.string().trim().alphanum().required(),
      rsvp: Joi.string()
        .valid(...enumValues)
        .required(),
    }).required();
    await headerSchema.validateAsync({ headers: req.headers });
    await bodySchema.validateAsync(req.body);
    // await paramsSchema.validateAsync(req.query);

    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//LIST ATTENDEES FROM PREVIOUS MEETING//
const listAttendeesFromPreviousMeetingValidator = async (req, res, next) => {
  try {
    console.log(req.body);
    console.log(req.query);
    console.log(req.params);
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
    }).required();
    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// FUCNTION TO LIST MEETING ACTIVITIES
const meetingActivitieslist = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    }).required();

    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

// FUNCTION TO GET MEETING CREATE STEP STATUS
const getCreateMeetingStep = async (req, res, next) => {
  try {
    const headerSchema = Joi.object({
      headers: Joi.object({
        authorization: Joi.required(),
      }).unknown(true),
    });
    const paramsSchema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
    }).required();

    await headerSchema.validateAsync({ headers: req.headers });
    await paramsSchema.validateAsync(req.params);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};

module.exports = {
  createMeetingValidator,
  updateMeetingValidator,
  viewMeetingValidator,
  viewAllMeetingsValidator,
  updateRsvpValidator,
  cancelMeetingValidator,
  listAttendeesFromPreviousMeetingValidator,
  meetingActivitieslist,
  getCreateMeetingStep,
};
