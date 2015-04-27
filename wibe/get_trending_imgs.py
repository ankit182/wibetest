import requests as req
import shutil

fobj = open('trending_topics.txt', 'r+')
data = fobj.read().split('\n')
fobj.close()

fobj = open('trending_topics.txt', 'w')
fobj.close()

new_ttobj = open('trending_topics.txt', 'a')
for title in data:
    pg = req.get('http://en.wikipedia.org/w/api.php?action=query&titles=' + title + '&prop=pageimages&format=json&pithumbsize=200&continue')
    # print 'http://en.wikipedia.org/w/api.php?action=query&titles=' + title + '&prop=pageimages&format=json&pithumbsize=200&continue'
    content = pg.json()
    pg = content['query']['pages']
    try:
        img_src = pg[pg.keys()[0]]['thumbnail']['source']
        img = req.get(img_src, stream=True)
        img_format = img_src.split('.')[-1]
        print img_format
        img_name = title.replace(' ', '_')
        img_src = 'trending_imgs/' + img_name + '.' + img_format
        fobj = open(img_src, 'wb')
        shutil.copyfileobj(img.raw, fobj)
        fobj.close()
    except:
        img_src = 'trending_imgs/default.jpg'
        print 'notfound'
    new_ttobj.write(title + '\t' + img_src + '\n')
new_ttobj.close()
print 'done'