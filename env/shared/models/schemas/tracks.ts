import {type LanguagesCode, languagesCodes} from '../enums/countries';
import {IsEnumArray, IsId, TransformDefault} from '../enums/decorators';
import {
	IsBoolean,
	isEnum,
	IsEnum,
	IsInt,
	isISO31661Alpha2,
	IsISO31661Alpha2,
	IsNumber,
	IsOptional,
	IsPositive,
	IsString,
	MaxLength,
	Min,
	registerDecorator,
	ValidateNested
} from 'class-validator';
import {Transform, Type} from 'class-transformer';

export const TRACKS_SORT = [
	'popularity',
	'plays_count',
	'likes_count',
	'downloads_count',
	'bpm',
	'difficulty',
	'today',
	'week',
	'month',
	'year'
] as const;

export const DIFFICULTIES_TRACKS = ['easy', 'normal', 'hard'] as const;

const IsRow = () => {
	return (target: any, propertyName: string) => {
		registerDecorator({
			name: 'IsRow',
			target: target.constructor,
			propertyName,
			validator: {
				validate(value: any) {
					return (
						typeof value === 'number' ||
						(typeof value === 'string' && (isISO31661Alpha2(value) || isEnum(value, DIFFICULTIES_TRACKS)))
					);
				},
				defaultMessage() {
					return `${propertyName} must be a number, ISO3166-1 Alpha2, or one in DIFFICULTIES_TRACKS`;
				}
			}
		});
	};
};

class Cursor {
	@IsId()
	id: number;

	@IsNumber()
	popularity: number;

	@IsRow()
	@IsOptional()
	row?: string | number;
}

export class TracksQuery {
	@IsEnum(TRACKS_SORT)
	sort: (typeof TRACKS_SORT)[number];

	@Transform(({value}) => (Array.isArray(value) ? value : [value]))
	@IsEnumArray(DIFFICULTIES_TRACKS)
	difficulty: (typeof DIFFICULTIES_TRACKS)[number][];

	@ValidateNested()
	@Type(() => Cursor)
	cursor: Cursor;

	@Transform(({value}) => (Array.isArray(value) ? value : [value]))
	@IsEnumArray(languagesCodes)
	lang: LanguagesCode[];
}

const IsCount = () => {
	return (target: object, propertyName: string) => {
		TransformDefault(0)(target, propertyName);
		IsInt()(target, propertyName);
		Min(0)(target, propertyName);
	};
};

class TrackBase {
	@IsId()
	id: number;

	@IsCount()
	likes_count: number = 0;

	@IsCount()
	downloads_count: number;

	@IsCount()
	plays_count: number;

	@IsISO31661Alpha2()
	created_at: string;

	@TransformDefault(false)
	@IsBoolean()
	is_deleted: boolean;
}
export class TrackDto extends TrackBase {}

// TODO: Если у пользователя интерфейс выбран на языке, и трек на таком же языке,
//  то название главное показывать на нём, если нет то на английском
export class Track extends TrackBase {
	@IsString()
	@MaxLength(32)
	name_en: string;

	@IsString()
	@MaxLength(32)
	name: string;

	@IsId()
	author: number;

	@IsString()
	@MaxLength(128)
	performer: string;

	@IsString()
	@IsOptional()
	cover_path?: string;

	@IsString()
	file_path: string;

	@IsEnum(DIFFICULTIES_TRACKS)
	difficulty: (typeof DIFFICULTIES_TRACKS)[number];

	@IsInt()
	@IsPositive()
	bpm: number;

	@IsEnum(languagesCodes)
	lang: LanguagesCode;
}

export type AllTracksServerReturn = {
	tracks: Track[];
	cursor: Cursor;
};
