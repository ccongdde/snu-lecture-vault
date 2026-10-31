/** 현재 주소에서 학기/과목/강의를 읽는다. 과목 밖의 페이지(홈 등)는 빈 객체. */
export function parseRoute(pathname) {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const [semester, course, lecture] = pathname.slice(base.length).split('/').filter(Boolean);
	if (!/^\d{4}-\d$/.test(semester ?? '')) return {};
	return { semester, course, lecture };
}
