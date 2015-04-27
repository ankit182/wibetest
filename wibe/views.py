from gevent import monkey
monkey.patch_all()

from django.template.loader import get_template
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.shortcuts import redirect
from django.http import HttpResponse
from django.template import Context
from django.shortcuts import render
from bs4 import BeautifulSoup
# from requests_futures.sessions import FuturesSession as async

import simplejson
import wikipedia
import grequests
import requests
import random
import json
import sys
import re
import os

base_dir = os.path.dirname(os.path.dirname(__file__))

def main_pg(request):
    context = {}
    return render(request, 'index.html', context)


def title_listing(request):
    # Listing pages titles from text file.
    # titles_file = open('../wiki-titles', 'r+')
    # temp = titles_file.read().split('\n')
    # Removing un-necessary items
    # temp.pop(0)
    # temp.pop(1)
    # temp.pop(-1)
    # Reading file to get all results
    fobj = open(base_dir + '/wibe/top5000.txt', 'r+')
    pop_links = fobj.read().split('\n')
    fobj.close()
    context = {'links': pop_links}
    return render(request, 'pages/index.html', context)


def article_pg(request, param):
    # URL = "http://en.wikipedia.org/wibe/Jessica-Alba"

    info_list = []
    param = param.replace('-', ' ')
    try:
        # Requesting WP page for the topic
        suggested_title = wikipedia.suggest(param)
        # Suggested title for query searched
        if suggested_title is not None:
            query = suggested_title
        else:
            query = param
        # If nothing comes in search result then redirect on main page
        try:
            title = wikipedia.search(query)[0]
        except:
            return redirect('/')
        # If user query is different from page title then redirecting to
        # original page
        if title != query:
            title = title.replace(' ', '-')
            return redirect('/wibe/' + title + "/")
        try:
            wp_pg = wikipedia.page(title)
        except:
            # Redirecting to suggested ambiguation page
            new_query = sys.exc_info()[1].options[0]
            new_query = new_query.replace(' ', '-')
            return redirect('/wibe/' + new_query + "/")
        pg_title = wp_pg.title
        print pg_title
        wp_cnt = wp_pg.content

        meta_info = wp_cnt[:1000]

        # extracting the content by finding the regex for == Head ==
        headings = re.findall(
            r'[\s]{1}[=]{2}[\s]{1}.*[\s]{1}[=]{2}[\s]{1}', wp_cnt)

        pg_links = wp_pg.links
        for link in pg_links:
            rel_url = link.replace(" ", "-")
            try:
                wp_cnt = re.sub(
                    r'(?i) ' + link + ' ', ' <a href="/wibe/' + rel_url + '/" class="inter-links">' + link + "</a> ", wp_cnt)
            except:
                pass
        # extracting the content for each heading by splitting whole content by
        # == Heading ==
        content = re.split(
            r'[\s]{1}[=]{2}[\s]{1}.*[\s]{1}[=]{2}[\s]{1}', wp_cnt)

        # short content
        wrd_cnt, pos = 0, 0
        title_content = ''
        a_flg = 0
        while (wrd_cnt < 75):
            if (len(content[0]) > pos):
                title_content += content[0][pos]
                if (content[0][pos] == '<' and len(content[0]) > pos + 1 and content[0][pos + 1] == 'a'):
                    a_flg = 1
                elif (content[0][pos] == 'a' and len(content[0]) > pos + 1 and content[0][pos + 1] == '>'):
                    a_flg = 0
                elif (content[0][pos] == ' ' and a_flg == 0):
                    wrd_cnt += 1
                pos += 1
            else:
                break

        cnt = 0
        for cnt in xrange(len(content)):
            content[cnt] = re.sub(r"[\s]{2}[=]{3}[\s]", r"<b>", content[cnt])
            content[cnt] = re.sub(r"[\s][=]{3}[\s]{1}", r"</b>", content[cnt])
            content[cnt] = re.sub(r"[\s]{2}[=]{4}[\s]", r"<b>", content[cnt])
            content[cnt] = re.sub(r"[\s][=]{4}[\s]{1}", r"</b>", content[cnt])
            content[cnt] = re.sub(r"[\n]{2}", r"\n", content[cnt])
            content[cnt] = re.sub(r"[\n]", "<br> <br>", content[cnt])

        wp_title = wp_pg.title

        # fetching YT data for Main heading :
        og_meta_img = []
        YTurl = "https://gdata.youtube.com/feeds/api/videos?q=" + wp_title + "&alt=json&v=2&max-results=3&orderby=relevance&lr=en";
        YTdata = requests.get(YTurl)
        YTjson = YTdata.json()

        try:
            vidID = YTjson["feed"]["entry"][0]["id"]["$t"].split(":")[-1]
            og_meta_img.append('http://i.ytimg.com/vi/' + vidID)
        except:
            og_meta_img.append('http://i.ytimg.com/vi/yMVxJCCuzqc')
        try:
            vidID = YTjson["feed"]["entry"][1]["id"]["$t"].split(":")[-1]
            og_meta_img.append('http://i.ytimg.com/vi/' + vidID)
        except:
            og_meta_img.append('http://i.ytimg.com/vi/yMVxJCCuzqc')
        try:
            vidID = YTjson["feed"]["entry"][2]["id"]["$t"].split(":")[-1]
            og_meta_img.append('http://i.ytimg.com/vi/' + vidID)
        except:
            og_meta_img.append('http://i.ytimg.com/vi/yMVxJCCuzqc')

        head_list = []
        # removing the == for every heading  from start and end
        for i in xrange(0, len(headings) - 1):
            head_title = headings[i][4:-4]
            # print head_title
            if (head_title == "Bibliography" or head_title == "Footnotes" or head_title == "References" or head_title == "Notes" or head_title == "See also" or head_title == "External links" or head_title == "undefined" or head_title == "Further reading"):
                continue
            # short content
            wrd_cnt, pos = 0, 0
            shrt_content = ''
            a_flg = 0
            br_cnt = 0
            while (wrd_cnt < 50):
                if (len(content[i + 1]) > pos):
                    shrt_content += content[i + 1][pos]
                    if (content[i + 1][pos] == '<' and len(content[i + 1]) > pos + 1 and content[i + 1][pos + 1] == 'a'):
                        a_flg = 1
                    elif (content[i + 1][pos] == 'a' and len(content[i + 1]) > pos + 1 and content[i + 1][pos + 1] == '>'):
                        a_flg = 0
                    elif (content[i + 1][pos] == ' ' and a_flg == 0):
                        wrd_cnt += 1
                    elif (content[i + 1][pos] == '<' and len(content[i + 1]) > pos + 1 and content[i + 1][pos + 1] == 'b'):
                        if (len(content[i + 1]) > pos + 2 and content[i + 1][pos + 2] == 'r'):
                            br_cnt += 1
                    if br_cnt == 6:
                        shrt_content = shrt_content[:-1]
                        wrd_cnt = 51
                    pos += 1
                else:
                    break
            info_list.append(
                [[head_title, content[i + 1], i + 1, shrt_content]])
            head_list.append([head_title, i + 1])
    except:
        content = []
        return redirect('/')

    context = {"title": wp_title,
               "shrt_title_content": title_content,
               "meta_info": meta_info,
               "og_meta_img": og_meta_img,
               "title_content": content[0],
               # "sug_links": sug_links,
               "heads": info_list,
               "headings": head_list,
               "ready": '<div id="ready"></div>'}
    return render(request, 'wibe/index.html', context)


def trending_topics(request):
    # Suggesting randomly 10 trending topics from list of 500
    fobj = open(base_dir + '/wibe/trending_topics.txt', 'r')
    trending_links = fobj.read().split('\n')
    sug_links = random.sample(trending_links, 10)
    # Breaking link and image path
    for pos in xrange(len(sug_links)):
        sug_links[pos] = sug_links[pos].split('\t')
    # print sug_links
    fobj.close()
    data = simplejson.dumps(sug_links)
    return HttpResponse(data, content_type='application/json')

def related(request, param):
    b = []
    final_list = []
    r = requests.get("http://en.wikipedia.org/wiki?search=" + param)
    data = r.text
    soup = BeautifulSoup(data)
    soup.prettify()
    all_links = soup.select('p a[href]')
    for link in all_links:
        if len(link.text) <= 1:
            all_links.remove(link)
    res = [grequests.get(
        "http://stats.grok.se/json/en/latest30/" + l.text) for l in all_links[:30]]
    response = grequests.map(res)
    for r in response:
        data = r.json()
        temp = data['daily_views']
        views = 0
        for t in temp:
            views += temp[t]
        b.append([views, data['title']])
    for e in b[:30]:
        if e not in final_list and e[1] != u'' and len(e[1]) != 1:
            final_list.append(e)
    final_list.sort(reverse=True)
    data = simplejson.dumps(final_list[:10])
    return HttpResponse(data, content_type='application/json')

def err404(request):
    return render(request,'error/index.html',{})
def sitemap(request, param):
    context = {}
    url = "sitemap/" + param
    return render(request, url, {}, content_type="application/xml")