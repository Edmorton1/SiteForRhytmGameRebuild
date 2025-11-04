import {Injectable} from '@nestjs/common';
import {micropenis} from '../shared/asdasd';

@Injectable()
export class AppService {
	getHello(): string {
		return `ВАывsdf ${micropenis}`;
	}
}
