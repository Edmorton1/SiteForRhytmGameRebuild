const {zLanguageCode} = require('../enums/countries');
const {toArrayPreprocess, zId, zIntNum, zISOString} = require('../enums/zod');
const z = require('zod');

// prettier-ignore
const TRACKS_SORT = [
	'popularity', 'plays_count', 'likes_count', 
	'downloads_count', 'bpm', 'difficulty',
	'today', 'week', 'month', 'year'
];

const DIFFICULTIES_TRACKS = ['easy', 'normal', 'hard'];

const difficultiesZodSchema = z.enum(DIFFICULTIES_TRACKS);

const TracksSortZodSchema = z.enum(TRACKS_SORT);

const TracksQueryParamsZodSchema = z.object({
	sort: TracksSortZodSchema.default('popularity'),
	difficulty: toArrayPreprocess(difficultiesZodSchema).optional(),
	cursor: z
		.object({
			id: zId,
			popularity: zIntNum,
			row: z.union([zIntNum, difficultiesZodSchema, zISOString, z.undefined()]),
		})
		.optional(),
	lang: z
		.union([zLanguageCode.transform(lang => [lang]), z.array(zLanguageCode)])
		.optional(),
});

// TODO: Если у пользователя интерфейс выбран на языке, и трек на таком же языке, то название главное показывать на нём, если нет то на английском
const TrackZodSchema = z.object({
	id: zId,
	name_en: z.string().max(32),
	name: z.string().max(32),
	author: zId,
	performer: z.string().max(128),
	cover_path: z.string().nullable(),
	file_path: z.string(),
	difficulty: difficultiesZodSchema,
	bpm: z.number().int().positive(),
	lang: zLanguageCode,
	likes_count: z.number().int().nonnegative().default(0),
	downloads_count: z.number().int().nonnegative().default(0),
	plays_count: z.number().int().nonnegative().default(0),
	created_at: zISOString,
	is_deleted: z.boolean().default(false),
});

const TrackDtoZodSchema = TrackZodSchema.omit({
	id: true,
	likes_count: true,
	downloads_count: true,
	plays_count: true,
	created_at: true,
	is_deleted: true,
});

module.exports = {
	TRACKS_SORT,
	DIFFICULTIES_TRACKS,
	difficultiesZodSchema,
	TracksSortZodSchema,
	TracksQueryParamsZodSchema,
	TrackZodSchema,
	TrackDtoZodSchema
};

