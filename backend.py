import json

data = []

def loadsave():
    with open('data.json') as json_file:
        data = json.load(json_file)
    return data

def exportsave(data):
    with open('data.json', 'w') as fp:
        json.dump(data, fp)

def add(lat, long, name, paid, notes, address, data):
    data["features"].append({"type": "Feature","properties": {"SITE_ID": data["last_site_id"],"NAME": str(name),"ADDRESS": str(address),"PAID": str(paid),"NOTES": str(notes),"MODIFIED_D": "2018/01/18",},"geometry": {"type": "Point","coordinates": [lat, long]}})
    data["last_site_id"] = data["last_site_id"] + 1

def runvancouverimport():
    data = loadsave()
    with open('public-washrooms.json') as vancouverfile:
        vancouverdata = json.load(vancouverfile)
    for i in vancouverdata:
        add(i["geom"]["geometry"]["coordinates"][0],i["geom"]["geometry"]["coordinates"][1],i["name"],"No",i["type"],i["address"],data)
    exportsave(data)
