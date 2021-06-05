import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AccountDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() data: AccountDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const account = await this.authService.login(data);
    (req.session as any).accountID = account.id;
    req.session.save();
    res.redirect('/');
  }

  @Post('/register')
  async register(
    @Body() data: AccountDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const account = await this.authService.register(data);
    (req.session as any).accountID = account.id;
    req.session.save();
    res.redirect('/');
  }

  @Get('/checkLogin')
  async checkLogin(@Req() req: Request, @Res() res: Response) {
    const { accountID } = req.session as any;
    const url = await this.authService.queryLoginAuth();
    if (!accountID) return res.redirect(url);
    const account = await this.authService.findIdToAccount(accountID);
    const token = await this.authService.token(account);
    return { token };
  }

  @Get('/token')
  async token(@Req() req: Request, @Res() res: Response) {
    const { accountID } = req.session as any;
    const url = await this.authService.queryLoginAuth();
    if (!accountID) return res.redirect(`${req.headers.origin}${url}`);
    const account = await this.authService.findIdToAccount(accountID);
    const token = await this.authService.token(account);
    return { token };
  }

  @Post('/outlogin')
  async outlogin(@Req() req: Request, @Res() res: Response) {
    const url = await this.authService.queryLoginAuth();
    (req.session as any).accountID = null;
    req.session.save();
    res.redirect(`${req.headers.origin}${url}`);
  }
}
