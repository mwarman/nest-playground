import * as Joi from 'joi';

export const updateTodoSchema = Joi.object({
  id: Joi.string().required(),
  summary: Joi.string().required(),
  isComplete: Joi.boolean().required(),
});

export class UpdateTodoDto {
  id: string;
  summary: string;
  isComplete: boolean;
}
