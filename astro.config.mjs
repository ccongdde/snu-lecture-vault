// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
// https://astro.build/config
export default defineConfig({
	site: 'https://ccongdde.github.io',
	base: '/snu-lecture-vault',
	integrations: [
		starlight({
			title: '강의 기록',
			defaultLocale: 'root',
			locales: { root: { label: '한국어', lang: 'ko' } },
			customCss: ['./src/styles/custom.css'],
			components: {
				Header: './src/components/Header.astro',
				Sidebar: './src/components/Sidebar.astro',
				PageTitle: './src/components/PageTitle.astro',
				Pagination: './src/components/Pagination.astro',
			},
			head: [
				{ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap',
					},
				},
				{
					// 강의 페이지를 열면 "이어서 보기"용으로 기억해 둔다.
					tag: 'script',
					content:
						"addEventListener('DOMContentLoaded',function(){try{var m=document.querySelector('[data-meta]');var h=document.getElementById('_top');if(m&&h)localStorage.setItem('lastLecture',JSON.stringify({href:location.pathname,title:h.textContent,meta:m.getAttribute('data-meta')}))}catch(e){}})",
				},
			],
		}),
	],
});
