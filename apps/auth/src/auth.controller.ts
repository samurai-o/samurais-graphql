import { NoticeService } from '@app/task';
import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccountDto } from './dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly task: NoticeService,
  ) {}

  @Post('/login')
  async login(@Body() data: AccountDto, @Req() req: Request) {
    const account = await this.authService.login(data);
    (req.session as any).accountID = account.id;
    req.session.save();
    const token = await this.authService.token(account);
    req.res.setHeader('Authorization', token);
    return true;
  }

  @Post('/register')
  async register(@Body() data: AccountDto, @Req() req: Request) {
    const account = await this.authService.register(data);
    (req.session as any).accountID = account.id;
    req.session.save();
    const token = await this.authService.token(account);
    req.res.setHeader('Authorization', token);
    return true;
  }

  @Get('/checkLogin')
  async checkLogin(@Req() req: Request) {
    const { accountID } = req.session as any;
    if (!accountID) {
      req.res.setHeader('Authorization', '');
      return false;
    }
    const account = await this.authService.findIdToAccount(accountID);
    const token = await this.authService.token(account);
    req.res.setHeader('Authorization', token);
    return true;
  }

  @Get('/token')
  async token(@Req() req: Request) {
    const { accountID } = req.session as any;
    const account = await this.authService.findIdToAccount(accountID);
    const token = await this.authService.token(account);
    req.res.setHeader('Authorization', token);
    return true;
  }

  @Post('/outlogin')
  async outlogin(@Req() req: Request) {
    (req.session as any).accountID = null;
    req.session.save();
    req.res.setHeader('Authorization', '');
    return true;
  }

  @Post('/scancode/:id')
  async scancode(@Param('id') id: string, @Body() data: any) {
    await this.task.scanCode(id, data);
  }
}
