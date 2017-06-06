
echo "Build des images"
docker build -t http/static apache_static_server/
docker build -t http/dynamic express_dynamic_server/
docker build -t http/reverse apache_reverse_proxy/

echo "Suppression des container existants"
docker kill $(docker ps -aq) && docker rm $(docker ps -aq)

echo "Démarrage des containers static"
docker run -d http/static
docker run -d http/static
docker run -d http/static
docker run -d --name static http/static

echo "Démarage des containers dynamic"
docker run -d http/dynamic
docker run -d http/dynamic
docker run -d --name dynamic http/dynamic
docker run -d http/dynamic

echo "IP STATIC"
docker inspect static | grep -i ipadd

echo "IP DYNAMIC"
docker inspect dynamic | grep -i ipadd

docker run -e STATIC_APP=172.17.0.5:80 -e DYNAMIC_APP=172.17.0.8:3000 -p 8080:80 http/reverse






