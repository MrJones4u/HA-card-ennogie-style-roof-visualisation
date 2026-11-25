import sys, asyncio
from playwright.async_api import async_playwright
async def main(url, out, w):
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--allow-file-access-from-files'])
        pg = await b.new_page(viewport={'width': w, 'height': 900}, timezone_id='Europe/Berlin', device_scale_factor=1)
        msgs = []
        pg.on('console', lambda m: msgs.append(m.text))
        pg.on('pageerror', lambda e: msgs.append('ERR ' + str(e)))
        await pg.goto(url)
        await pg.wait_for_timeout(700)
        await pg.screenshot(path=out, full_page=True)
        print('\n'.join(msgs))
        await b.close()
asyncio.run(main(sys.argv[1], sys.argv[2], int(sys.argv[3]) if len(sys.argv) > 3 else 1050))
