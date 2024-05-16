const Joi = require("joi");
const Responses = require("../helpers/response");
const { errorLog } = require("../middlewares/errorLog");
// CREATE MEETING VALIDATOR
const createMeetingValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
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
      fromTime: Joi.number().required(),
      toTime: Joi.number().required(),
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

    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
// CANCEL MEETING VALIDATOR
const cancelMeetingValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
      status: Joi.string().required(),
      remarks: Joi.string(),
    }).required();
    await schema.validateAsync(req.body);
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
//UPDATE MEETING VALIDATOR
const updateMeetingValidator = async (req, res, next) => {
  try {
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
      fromTime: Joi.number(),
      toTime: Joi.number(),
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
            id: Joi.string().required(),
            rsvp: Joi.string().valid("YES", "NO", "WAITING"),
          })
          .required(),
        otherwise: Joi.array()
          .min(1)
          .messages({
            "attendees.min": "attendees can't be empty!",
          })
          .items({
            id: Joi.string().required(),
            rsvp: Joi.string().valid("YES", "NO", "WAITING"),
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
    const paramsSchema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
    });

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
    const schema = Joi.object({
      searchKey: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),

      organizationId: Joi.string().trim().alphanum().required(),
    });
    const paramsSchema = Joi.object({
      limit: Joi.number().required(),
      page: Joi.number().required(),
      order: Joi.number().required(),
    });

    await paramsSchema.validateAsync(req.query);
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    // errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
// UPDATE USER RSVP FOR MEETING VALIDATOR
const updateRsvpValidator = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string().trim().alphanum().required(),
      userId: Joi.string().trim().alphanum().required(),
      rsvp: Joi.string().required(),
    }).required();
    await schema.validateAsync(req.body);
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
    const schema = Joi.object({
      organizationId: Joi.string().trim().alphanum().required(),
    }).required();
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    console.log(error);
    errorLog(error);
    return Responses.errorResponse(req, res, error);
  }
};
const MeetingActivitiesValidator = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      activitiesDetails: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
      meetingId: Joi.string().trim().alphanum().required(),
      actionDetails: Joi.string()
        .trim()
        .pattern(/^[0-9a-zA-Z ,/-]+$/)
        .messages({
          "string.pattern.base": `HTML tags & Special letters are not allowed!`,
        }),
    });
    await bodySchema.validateAsync(req.body);
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
  MeetingActivitiesValidator,
};
