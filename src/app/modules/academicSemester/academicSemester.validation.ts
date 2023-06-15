import { z } from 'zod';
import { codeEnum, monthEnum, titleEnum } from './academicSemester.utils';

export const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...titleEnum] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...codeEnum] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...monthEnum] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...monthEnum] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});
export const updateAcademicSemesterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...titleEnum] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .number({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...codeEnum] as [string, ...string[]], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...monthEnum] as [string, ...string[]], {
          required_error: 'Start Month is required',
        })
        .optional(),
      endMonth: z
        .enum([...monthEnum] as [string, ...string[]], {
          required_error: 'End Month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be probvided or neither',
    }
  );
