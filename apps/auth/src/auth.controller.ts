import { NoticeService } from '@app/task';
import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AccountDto } from './dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly notice: NoticeService,
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
    const url = await this.authService.queryLoginAuth();
    (req.session as any).accountID = null;
    req.session.save();
    req.res.setHeader('Authorization', '');
    return `${req.headers.origin}${url}`;
  }

  @Get('/weixin')
  async weixinLogin(@Query() query: any) {
    console.log(query);
  }

  @Get('/jobs')
  async jobs() {
    this.notice.createScanCode();
  }

  @Post('/success/:id')
  async successJob(@Param('id') id: any) {
    this.notice.scanCode(id);
  }
}
