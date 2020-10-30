import requests
import json

def post_data(uid,place,p_code,no_mask):
    url="http://hsdlapi.ap-northeast-2.elasticbeanstalk.com/api/detecitve"
    data={"transportId":uid,
    "placeName":place,
    "placeCode":p_code,
    "detectiveCount":no_mask}
    response=requests.post(url=url,data=json.dumps(data),headers={'Content-Type': 'application/json'})
    dict_meta = {'status_code':response.status_code, 'ok':response.ok, 'encoding':response.encoding, 'Content-Type': response.headers['Content-Type']}
    return {**dict_meta, **{'text':response.text}}


"""data={"transportId":"ckgp6h7a8dsoj0a260dl78ey8",
    "placeName":"송정공원",
    "placeCode":"12345"}

print(post_data(data))"""