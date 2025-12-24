// unocss.config.ts
import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss';
import { presetIkun, getCSSPreflights, getSafeList } from '@ikun-ui/preset';
export default defineConfig({
	presets: [presetUno(), presetAttributify(), presetIcons({
  collections: {
    carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default as any),
  }
}), presetIkun()],
	safelist: [...getSafeList()],
	preflights: [
		{
			layer: 'base',
			getCSS: () => `:root {${getCSSPreflights()}}`
		}
	]
});