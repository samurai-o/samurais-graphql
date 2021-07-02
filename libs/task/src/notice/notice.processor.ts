import { Processor } from '@nestjs/bull';

@Processor('notice')
export class NoticeProcessor {}
