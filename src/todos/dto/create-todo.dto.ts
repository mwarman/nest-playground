import * as Joi from 'joi';

export const createTodoSchema = Joi.object({
  summary: Joi.string().required(),
  isComplete: Joi.boolean().required(),
});

export class CreateTodoDto {
  summary: string;
  isComplete: boolean;
}
