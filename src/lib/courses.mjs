import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const file = path.resolve(process.cwd(), 'courses.yaml');

export function loadCourses() {
	const data = parse(fs.readFileSync(file, 'utf8'));
	const current = String(data.current);
	const courses = (data.courses ?? []).map((c) => ({
		...c,
		semester: String(c.semester ?? current),
		group: c.group ?? '기타',
		archived: c.status === 'archived',
	}));
	const groups = [...(data.groups ?? [])];
	for (const c of courses) if (!groups.includes(c.group)) groups.push(c.group);
	return { current, groups, courses };
}

export const coursePath = (c) => `/${c.semester}/${c.id}/`;
