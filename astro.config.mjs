// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { loadCourses, coursePath } from './src/lib/courses.mjs';

const { current, groups, courses } = loadCourses();

const sidebar = [
	...groups
		.map((group) => ({
			label: group,
			collapsed: false,
			items: courses
				.filter((c) => c.semester === current && !c.archived && c.group === group)
				.map((c) => ({
					label: c.name,
					collapsed: true,
					items: [
						{ label: '강의 목록', link: coursePath(c) },
						{ autogenerate: { directory: `${c.semester}/${c.id}` } },
					],
				})),
		}))
		.filter((g) => g.items.length > 0),
	{ label: '지난 학기 · 보관함', link: '/archive/' },
];

// https://astro.build/config
export default defineConfig({
	site: 'https://ccongdde.github.io',
	base: '/snu-lecture-vault',
	integrations: [
		starlight({
			title: '강의 기록',
			defaultLocale: 'root',
			locales: { root: { label: '한국어', lang: 'ko' } },
			head: [{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } }],
			sidebar,
		}),
	],
});
