import requests
from bs4 import BeautifulSoup

pg = requests.get(
    'http://en.wikipedia.org/wiki/User:West.andrew.g/Popular_pages')
pg_html = pg.content
out_pg = BeautifulSoup(pg_html)
a_tags = out_pg.select('td > a[title]')
popular_links = []
fobj = open('top5000.txt', 'a')
for tag in a_tags:
    fobj.write(tag['href'].replace('/wiki/', '').replace('_', ' ') + '\n')
fobj.close()
