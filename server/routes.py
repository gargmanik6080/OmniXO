import requests

url = "https://nattyworld-server.onrender.com/api/v1/diet/dietList"
res = requests.get(url)
print(res.json())