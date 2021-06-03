import { ApiExceptionFilter } from './apiexception.filter';

describe('ExceptionFilter', () => {
  it('should be defined', () => {
    expect(new ApiExceptionFilter()).toBeDefined();
  });
});
