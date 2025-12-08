import { createParamDecorator } from '@nestjs/common';

export const Protocol = createParamDecorator((data: unknown, ctx) => {
  const request = ctx.switchToHttp().getRequest();
  return request.protocol;
});
