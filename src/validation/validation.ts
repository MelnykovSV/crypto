import * as Yup from "yup";


interface ValidationSchema {
  validate(data: any, options?: Yup.ValidateOptions): Promise<any>;
}

export async function validate(scheme: ValidationSchema, data: any) {

  try {

    await scheme.validate(data, {
      abortEarly: false,
    });
    return null
  } catch (error) {

    const { errors } = error as unknown as { errors: string[] };
    return errors

  }
}
