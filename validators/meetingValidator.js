const Joi = require("joi");
const Responses = require("../helpers/response");

const createMeetingValidator = async (req, res, next) => {
    try {
        const schema = Joi.object({
            title: Joi.string()
                .trim()
                .pattern(/^[0-9a-zA-Z ,/-]+$/)
                .messages({
                    "string.pattern.base": `HTML tags & Special letters are not allowed!`,
                })
                .required(),
            organizationId: Joi.string().trim().alphanum().required(),
            mode: Joi.string().valid('VIRTUAL', 'PHYSICAL').required(),
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
                // roomId: Joi.when("isMeetingRoom.value", {
                //     is: Joi.boolean().valid(true),
                //     then: Joi.string().trim().alphanum().required()
                // }),
                location: Joi.when('isMeetingRoom', {
                    is: Joi.boolean().valid(false),
                    then: Joi.string()
                    .trim()
                    .pattern(/^[0-9a-zA-Z ,/-]+$/)
                    .messages({
                        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
                    }).required(),
                    otherwise: Joi.string()
                    .trim()
                    .pattern(/^[0-9a-zA-Z ,/-]+$/)
                    .messages({
                        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
                    }),
                }),
                roomId: Joi.when('isMeetingRoom', {
                    is: Joi.boolean().valid(true),
                    then: Joi.string().trim().alphanum().required(),
                    otherwise: Joi.string().trim().alphanum(),
                }),

            }).required()

        })


        await schema.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        return Responses.errorResponse(req, res, error);
    }
};

const updateMeetingValidator = async (req, res, next) => {
    try {
        const bodySchema = Joi.object({
            title: Joi.string()
                .trim()
                .pattern(/^[0-9a-zA-Z ,/-]+$/)
                .messages({
                    "string.pattern.base": `HTML tags & Special letters are not allowed!`,
                })
                .required(),
            organizationId: Joi.string().trim().alphanum().required(),
            mode: Joi.string().valid('VIRTUAL', 'PHYSICAL').required(),
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
                // roomId: Joi.when("isMeetingRoom.value", {
                //     is: Joi.boolean().valid(true),
                //     then: Joi.string().trim().alphanum().required()
                // }),
                location: Joi.when('isMeetingRoom', {
                    is: Joi.boolean().valid(false),
                    then: Joi.string()
                    .trim()
                    .pattern(/^[0-9a-zA-Z ,/-]+$/)
                    .messages({
                        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
                    }).required(),
                    otherwise: Joi.string()
                    .trim()
                    .pattern(/^[0-9a-zA-Z ,/-]+$/)
                    .messages({
                        "string.pattern.base": `HTML tags & Special letters are not allowed!`,
                    }),
                }),
                roomId: Joi.when('isMeetingRoom', {
                    is: Joi.boolean().valid(true),
                    then: Joi.string().trim().alphanum().required(),
                    otherwise: Joi.string().trim().alphanum(),
                }),

        }),
        step: Joi.number().required(),
        attendees: Joi.when('step', {
            is: Joi.number().valid(2),
            then: Joi.array()
            .items({
              id: Joi.string()
                .required(),
              rsvp:Joi.string().valid("YES", "NO", "WAITING").required(),
            }).required(),
            otherwise:  Joi.array()
            .items({
                id: Joi.string()
                  .required(),
                rsvp:Joi.string().valid("YES", "NO", "WAITING").required(),
              })
        }),
        agendas: Joi.when('step', {
            is: Joi.number().valid(3),
            then: Joi.array()
            .items({
              title: Joi.string()
                .required(),
              topic:Joi.string(),
              timeLine:Joi.string().required()
            }).required(),
            otherwise:  Joi.array()
            .items({
                title: Joi.string()
                .required(),
              topic:Joi.string(),
              timeLine:Joi.string().required()
              })
        })

    });
        const paramsSchema = Joi.object({
            id: Joi.string().trim().alphanum().required(),
        });

        await paramsSchema.validateAsync(req.params);
        await bodySchema.validateAsync(req.body);
        next();
    } catch (error) {
        console.log(error);
        return Responses.errorResponse(req, res, error);
    }
};

const deleteUnitValidator = async (req, res, next) => {
    try {
        const paramsSchema = Joi.object({
            id: Joi.string().trim().alphanum().required(),
        });

        await paramsSchema.validateAsync(req.params);
        next();
    } catch (error) {
        console.log(error);
        return Responses.errorResponse(req, res, error);
    }
};
module.exports = {
    createMeetingValidator,
    updateMeetingValidator,
    deleteUnitValidator,
};
