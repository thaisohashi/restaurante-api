/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class RequestDto {
  static validators(): any {
    throw new Error('Validators not implemented!');
  }
}
