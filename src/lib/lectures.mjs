import { getCollection } from 'astro:content';

/** 과목의 강의 목록 (오래된 순, n = 회차) */
export async function lecturesOf(semester, course) {
	const prefix = `${semester}/${course}/`;
	const docs = await getCollection('docs');
	return docs
		.filter((d) => d.id.startsWith(prefix))
		.map((d) => ({ id: d.id, date: d.id.slice(prefix.length), title: d.data.title }))
		.sort((a, b) => a.date.localeCompare(b.date))
		.map((l, i) => ({ ...l, n: i + 1 }));
}

/** 2026-09-14 → 9월 14일 */
export function fmtDate(iso) {
	const [, m, d] = iso.split('-');
	return `${Number(m)}월 ${Number(d)}일`;
}

export const lecturePath = (id) => `/${id}/`;
