/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
            fontSize: {
                '2xs': '0.625rem', // 10px
                'xs': '0.75rem'
            },
			colors: {
				gray: {
                      "50": "#f9f9f9",
                      "100": "#f2f2f3",
                      "200": "#E9ECEC",
                      "300": "#d9d9dc",
                      "400": "#ccccd0",
                      "500": "#bfbfc4",
                      "600": "#99999d",
                      "700": "#737376",
                      "750": "#5f5f61",
                      "800": "#4c4c4e",
                      "850": "#3a3a3c",
                      "900": "#262627",
                      "950": "#130F07"
				}
			},
			typography: {
				DEFAULT: {
					css: {
						pre: false,
						code: false,
						'pre code': false,
						'code::before': false,
						'code::after': false
					}
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography')]
};
